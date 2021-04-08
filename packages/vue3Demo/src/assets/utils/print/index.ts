// @ts-nocheck
import form from '@/views/main/expand/form'
import G6 from '@antv/g6'
import { isArray, isNumber } from '@antv/util'
import { store } from '@store/index'
import { ElMessage, ElMessageBox } from 'element-plus'

import { Alert } from './alert'

const { labelPropagation, louvain, findShortestPath } = G6.Algorithm;
// const { uniqueId } = G6.Util;
const uniqueId = (type = "print") => {
  // return type + "-" + Math.random() + Date.now();
  return type + "-" + Math.random();
};
// 实际开发中把 AntVUtil || window.AntVUtil 换成从 @antv/util 引入的模块
// Replace AntVUtil || window.AntVUtil by the module imported from @antv/util in your project
// const { isNumber, isArray } = AntVUtil;

const NODESIZEMAPPING = "degree";
const SMALLGRAPHLABELMAXLENGTH = 50;
let labelMaxLength = SMALLGRAPHLABELMAXLENGTH;
const DEFAULTNODESIZE = 20;
const DEFAULTAGGREGATEDNODESIZE = 53;
const NODE_LIMIT = 40; // TODO: find a proper number for maximum node number on the canvas

let graph = null;
let rawData = {}; // 后端获取的数据
let editModel = {}; // 缓存需要编辑的数据
let currentUnproccessedData = { nodes: [], edges: [] };
let nodeMap = {};
let aggregatedNodeMap = {};
let hiddenItemIds = []; // 隐藏的元素 id 数组
let largeGraphMode = true;
let cachePositions = {};
let manipulatePosition = undefined;
let descreteNodeCenter;
let layout = {
  type: "",
  instance: null,
  destroyed: true,
};
let expandArray = [];
let collapseArray = [];
let shiftKeydown = false;
let CANVAS_WIDTH = 800,
  CANVAS_HEIGHT = 800;

const duration = 2000;
const animateOpacity = 0.6;
const animateBackOpacity = 0.1;
const virtualEdgeOpacity = 0.1;
const realEdgeOpacity = 0.2;

const darkBackColor = "rgb(43, 47, 51)";
const disableColor = "#777";
const theme = "light";
const subjectColors = [
  "#5F95FF", // blue
  "#61DDAA",
  "#65789B",
  "#F6BD16",
  "#7262FD",
  "#78D3F8",
  "#9661BC",
  "#F6903D",
  "#008685",
  "#F08BB4",
];

const colorSets = G6.Util.getColorSetsBySubjectColors(
  subjectColors,
  darkBackColor,
  theme,
  disableColor
);

const global = {
  node: {
    style: {
      fill: "#2B384E",
    },
    labelCfg: {
      style: {
        fill: "#acaeaf",
        stroke: "#191b1c",
      },
    },
    stateStyles: {
      focus: {
        fill: "#2B384E",
      },
    },
  },
  edge: {
    style: {
      stroke: "#acaeaf",
      realEdgeStroke: "#acaeaf", //'#f00',
      realEdgeOpacity,
      strokeOpacity: realEdgeOpacity,
    },
    labelCfg: {
      style: {
        fill: "#acaeaf",
        realEdgeStroke: "#acaeaf", //'#f00',
        realEdgeOpacity: 0.5,
        stroke: "#191b1c",
      },
    },
    stateStyles: {
      focus: {
        stroke: "#fff", // '#3C9AE8',
      },
    },
  },
};

// Custom super node  第一级--椭圆形
G6.registerNode(
  "aggregated-node",
  {
    draw(cfg, group) {
      let width = 53,
        height = 27;
      const style = cfg.style || {};
      const colorSet = cfg.colorSet || colorSets[0];
      // halo for hover
      group.addShape("rect", {
        //椭圆形边框
        attrs: {
          x: -width * 0.55,
          y: -height * 0.6,
          width: width * 1.1,
          height: height * 1.2,
          fill: colorSet.mainFill,
          opacity: 0.9,
          lineWidth: 0,
          radius: (height / 2 || 13) * 1.2,
        },
        name: "halo-shape",
        visible: false,
      });

      // focus stroke for hover
      group.addShape("rect", {
        //椭圆形 底层
        attrs: {
          x: -width * 0.55,
          y: -height * 0.6,
          width: width * 1.1,
          height: height * 1.2,
          fill: colorSet.mainFill, // '#3B4043',
          stroke: "#AAB7C4",
          lineWidth: 1,
          lineOpacty: 0.85,
          radius: (height / 2 || 13) * 1.2,
        },
        name: "stroke-shape",
        visible: false,
      });

      const keyShape = group.addShape("rect", {
        //椭圆形 展示
        attrs: {
          ...style,
          x: -width / 2,
          y: -height / 2,
          width,
          height,
          fill: colorSet.mainFill, // || '#3B4043',
          stroke: colorSet.mainStroke,
          lineWidth: 2,
          cursor: "pointer",
          radius: height / 2 || 13,
          lineDash: [2, 2],
        },
        name: "aggregated-node-keyShape",
        // visible: false,
      });

      let labelStyle = {};
      if (cfg.labelCfg) {
        labelStyle = Object.assign(labelStyle, cfg.labelCfg.style);
      }
      group.addShape("text", {
        //椭圆形 文本
        attrs: {
          text: `${cfg.count}-addShape`,
          x: 0,
          y: 0,
          textAlign: "center",
          textBaseline: "middle",
          cursor: "pointer",
          fontSize: 12,
          fill: "#fff",
          opacity: 0.85,
          fontWeight: 400,
        },
        name: "count-shape",
        className: "count-shape",
        draggable: true,
      });

      // tag for new node
      if (cfg.new) {
        group.addShape("circle", {
          attrs: {
            x: width / 2 - 3,
            y: -height / 2 + 3,
            r: 4,
            fill: "#6DD400",
            lineWidth: 0.5,
            stroke: "#FFFFFF",
          },
          name: "typeNode-tag-circle",
        });
      }
      return keyShape;
    },
    setState: (name, value, item) => {
      //获取锚点（相关边的连入点） // name 状态名称  // value 状态是否可用
      const group = item.get("group"); // 获取元素的容器
      // console.log('name', name)
      // console.log('group', group)
      if (name === "layoutEnd" && value) {
        const labelShape = group.find((e) => e.get("name") === "text-shape");
        if (labelShape) labelShape.set("visible", true);
      } else if (name === "hover") {
        if (item.hasState("focus")) {
          return;
        }
        const halo = group.find((e) => e.get("name") === "halo-shape");
        const keyShape = item.getKeyShape();
        const colorSet = item.getModel().colorSet || colorSets[0];
        if (value) {
          halo && halo.show();
          keyShape.attr("fill", colorSet.activeFill);
        } else {
          halo && halo.hide();
          keyShape.attr("fill", colorSet.mainFill);
        }
      } else if (name === "focus") {
        const stroke = group.find((e) => e.get("name") === "stroke-shape");
        const keyShape = item.getKeyShape();
        const colorSet = item.getModel().colorSet || colorSets[0];
        if (value) {
          stroke && stroke.show();
          keyShape.attr("fill", colorSet.selectedFill);
        } else {
          stroke && stroke.hide();
          keyShape.attr("fill", colorSet.mainFill);
        }
      }
    },
    update: undefined,
  },
  "single-node" // extendedNodeName
);

// Custom real node   第二级--小圆形
G6.registerNode(
  "real-node",
  {
    draw(cfg, group) {
      // console.log('cfg', cfg)
      let r = 30;
      if (isNumber(cfg.size)) {
        r = cfg.size / 2;
      } else if (isArray(cfg.size)) {
        r = cfg.size[0] / 2;
      }
      const style = cfg.style || {};
      const colorSet = cfg.colorSet || colorSets[0];

      // halo for hover
      group.addShape("circle", {
        //  圆形边框
        attrs: {
          x: 0,
          y: 0,
          r: r + 5,
          fill: style.fill || colorSet.mainFill || "#2B384E",
          opacity: 0.9,
          lineWidth: 0,
        },
        name: "halo-shape",
        visible: false,
      });

      // focus stroke for hover
      group.addShape("circle", {
        // 圆形边框
        attrs: {
          x: 0,
          y: 0,
          r: r + 5,
          fill: style.fill || colorSet.mainFill || "#2B384E",
          stroke: "#fff",
          strokeOpacity: 0.85,
          lineWidth: 1,
        },
        name: "stroke-shape",
        visible: false,
      });

      const keyShape = group.addShape("circle", {
        // 圆形
        attrs: {
          ...style,
          x: 0,
          y: 0,
          r,
          fill: colorSet.mainFill,
          stroke: colorSet.mainStroke,
          lineWidth: 2,
          cursor: "pointer",
        },
        name: "aggregated-node-keyShape",
      });

      let labelStyle = {};
      if (cfg.labelCfg) {
        labelStyle = Object.assign(labelStyle, cfg.labelCfg.style);
      }

      if (cfg.label) {
        const text = cfg.label;
        let labelStyle = {};
        let refY = 0;
        if (cfg.labelCfg) {
          labelStyle = Object.assign(labelStyle, cfg.labelCfg.style);
          refY += cfg.labelCfg.refY || 0;
        }
        let offsetY = 0;
        const fontSize = labelStyle.fontSize < 8 ? 8 : labelStyle.fontSize;
        const lineNum = cfg.labelLineNum || 1;
        offsetY = lineNum * (fontSize || 12);
        group.addShape("text", {
          // 圆形文本
          attrs: {
            text,
            x: 0,
            y: r + refY + offsetY + 5,
            textAlign: "center",
            textBaseLine: "alphabetic",
            cursor: "pointer",
            fontSize,
            fill: "#fff",
            opacity: 0.85,
            fontWeight: 400,
            stroke: global.edge.labelCfg.style.stroke,
          },
          name: "text-shape",
          className: "text-shape",
        });
      }

      // tag for new node
      if (cfg.new) {
        group.addShape("circle", {
          attrs: {
            x: r - 3,
            y: -r + 3,
            r: 4,
            fill: "#6DD400",
            lineWidth: 0.5,
            stroke: "#FFFFFF",
          },
          name: "typeNode-tag-circle",
        });
      }

      return keyShape;
    },
    setState: (name, value, item) => {
      const group = item.get("group");
      if (name === "layoutEnd" && value) {
        const labelShape = group.find((e) => e.get("name") === "text-shape");
        if (labelShape) labelShape.set("visible", true);
      } else if (name === "hover") {
        if (item.hasState("focus")) {
          return;
        }
        const halo = group.find((e) => e.get("name") === "halo-shape");
        const keyShape = item.getKeyShape();
        const colorSet = item.getModel().colorSet || colorSets[0];
        if (value) {
          halo && halo.show();
          keyShape.attr("fill", colorSet.activeFill);
        } else {
          halo && halo.hide();
          keyShape.attr("fill", colorSet.mainFill);
        }
      } else if (name === "focus") {
        const stroke = group.find((e) => e.get("name") === "stroke-shape");
        const label = group.find((e) => e.get("name") === "text-shape");
        const keyShape = item.getKeyShape();
        const colorSet = item.getModel().colorSet || colorSets[0];
        if (value) {
          stroke && stroke.show();
          keyShape.attr("fill", colorSet.selectedFill);
          label && label.attr("fontWeight", 800);
        } else {
          stroke && stroke.hide();
          keyShape.attr("fill", colorSet.mainFill); // '#2B384E'
          label && label.attr("fontWeight", 400);
        }
      }
    },
    update: undefined,
  },
  "aggregated-node"
); // 这样可以继承 aggregated-node 的 setState

// Custom the quadratic edge for multiple edges between one node pair  一级连线
G6.registerEdge(
  "custom-quadratic",
  {
    setState: (name, value, item) => {
      const group = item.get("group");
      const model = item.getModel();
      if (name === "focus") {
        const back = group.find((ele) => ele.get("name") === "back-line");
        if (back) {
          back.stopAnimate();
          back.remove();
          back.destroy();
        }
        const keyShape = group.find((ele) => ele.get("name") === "edge-shape");
        const arrow = model.style.endArrow;
        if (value) {
          if (keyShape.cfg.animation) {
            keyShape.stopAnimate(true);
          }
          keyShape.attr({
            strokeOpacity: animateOpacity,
            opacity: animateOpacity,
            stroke: "#fff",
            endArrow: {
              ...arrow,
              stroke: "#fff",
              fill: "#fff",
            },
          });
          if (model.isReal) {
            const { lineWidth, path, endArrow, stroke } = keyShape.attr();
            const back = group.addShape("path", {
              attrs: {
                lineWidth,
                path,
                stroke,
                endArrow,
                opacity: animateBackOpacity,
              },
              name: "back-line",
            });
            back.toBack();
            const length = keyShape.getTotalLength();
            keyShape.animate(
              (ratio) => {
                // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
                const startLen = ratio * length;
                // Calculate the lineDash
                const cfg = {
                  lineDash: [startLen, length - startLen],
                };
                return cfg;
              },
              {
                repeat: true, // Whether executes the animation repeatly
                duration, // the duration for executing once
              }
            );
          } else {
            let index = 0;
            const lineDash = keyShape.attr("lineDash");
            const totalLength = lineDash[0] + lineDash[1];
            keyShape.animate(
              () => {
                index++;
                if (index > totalLength) {
                  index = 0;
                }
                const res = {
                  lineDash,
                  lineDashOffset: -index,
                };
                // returns the modified configurations here, lineDash and lineDashOffset here
                return res;
              },
              {
                repeat: true, // whether executes the animation repeatly
                duration, // the duration for executing once
              }
            );
          }
        } else {
          keyShape.stopAnimate();
          const stroke = "#acaeaf";
          const opacity = model.isReal ? realEdgeOpacity : virtualEdgeOpacity;
          keyShape.attr({
            stroke,
            strokeOpacity: opacity,
            opacity,
            endArrow: {
              ...arrow,
              stroke,
              fill: stroke,
            },
          });
        }
      }
    },
  },
  "quadratic"
);

// Custom the line edge for single edge between one node pair  二级连线
G6.registerEdge(
  "custom-line",
  {
    setState: (name, value, item) => {
      const group = item.get("group");
      const model = item.getModel();
      if (name === "focus") {
        const keyShape = group.find((ele) => ele.get("name") === "edge-shape");
        const back = group.find((ele) => ele.get("name") === "back-line");
        if (back) {
          back.stopAnimate();
          back.remove();
          back.destroy();
        }
        const arrow = model.style.endArrow;
        if (value) {
          if (keyShape.cfg.animation) {
            keyShape.stopAnimate(true);
          }
          keyShape.attr({
            strokeOpacity: animateOpacity,
            opacity: animateOpacity,
            stroke: "#fff",
            endArrow: {
              ...arrow,
              stroke: "#fff",
              fill: "#fff",
            },
          });
          if (model.isReal) {
            const { path, stroke, lineWidth } = keyShape.attr();
            const back = group.addShape("path", {
              attrs: {
                path,
                stroke,
                lineWidth,
                opacity: animateBackOpacity,
              },
              name: "back-line",
            });
            back.toBack();
            const length = keyShape.getTotalLength();
            keyShape.animate(
              (ratio) => {
                // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
                const startLen = ratio * length;
                // Calculate the lineDash
                const cfg = {
                  lineDash: [startLen, length - startLen],
                };
                return cfg;
              },
              {
                repeat: true, // Whether executes the animation repeatly
                duration, // the duration for executing once
              }
            );
          } else {
            const lineDash = keyShape.attr("lineDash");
            const totalLength = lineDash[0] + lineDash[1];
            let index = 0;
            keyShape.animate(
              () => {
                index++;
                if (index > totalLength) {
                  index = 0;
                }
                const res = {
                  lineDash,
                  lineDashOffset: -index,
                };
                // returns the modified configurations here, lineDash and lineDashOffset here
                return res;
              },
              {
                repeat: true, // whether executes the animation repeatly
                duration, // the duration for executing once
              }
            );
          }
        } else {
          keyShape.stopAnimate();
          const stroke = "#acaeaf";
          const opacity = model.isReal ? realEdgeOpacity : virtualEdgeOpacity;
          keyShape.attr({
            stroke,
            strokeOpacity: opacity,
            opacity: opacity,
            endArrow: {
              ...arrow,
              stroke,
              fill: stroke,
            },
          });
        }
      }
    },
  },
  "single-edge"
);

const descendCompare = (p) => {
  // 这是比较函数
  return function (m, n) {
    const a = m[p];
    const b = n[p];
    return b - a; // 降序
  };
};

const clearFocusItemState = (graph) => {
  if (!graph) return;
  clearFocusNodeState(graph);
  clearFocusEdgeState(graph);
};

// 清除图上所有节点的 focus 状态及相应样式
const clearFocusNodeState = (graph) => {
  const focusNodes = graph.findAllByState("node", "focus");
  focusNodes.forEach((fnode) => {
    graph.setItemState(fnode, "focus", false); // false
  });
};

// 清除图上所有边的 focus 状态及相应样式
const clearFocusEdgeState = (graph) => {
  const focusEdges = graph.findAllByState("edge", "focus");
  focusEdges.forEach((fedge) => {
    graph.setItemState(fedge, "focus", false);
  });
};

// 截断长文本。length 为文本截断后长度，elipsis 是后缀
const formatText = (text, length = 5, elipsis = "...") => {
  if (!text) return "";
  if (text.length > length) {
    return `${text.substr(0, length)}${elipsis}`;
  }
  return text;
};

const labelFormatter = (text, minLength = 10) => {
  if (text && text.split("").length > minLength)
    return `${text.substr(0, minLength)}...`;
  return text;
};

const isNodesHasChild = (sourceId) => {
  const isChild = rawData.edges.findIndex((ele) => {
    ele.target == sourceId;
  });
  // console.log('isNodesHasChild', sourceId, isChild);
  return isChild != -1;
};

const processNodesEdges = (
  //处理节点和边
  nodes,
  edges,
  width,
  height,
  largeGraphMode,
  edgeLabelVisible,
  isNewGraph = false
) => {
  if (!nodes || nodes.length === 0) return {};
  const currentNodeMap = {};
  let maxNodeCount = -Infinity;
  const paddingRatio = 0.3;
  const paddingLeft = paddingRatio * width;
  const paddingTop = paddingRatio * height;
  nodes.forEach((node) => {
    node.type = node.level === 0 ? "real-node" : "aggregated-node";
    node.isReal = node.level === 0 ? true : false;
    // node.label = `${node.id}`;
    node.labelLineNum = undefined;
    node.oriLabel = node.label;
    node.label = formatText(node.label, labelMaxLength, "...");

    /*
      获取度数的类型。设置为 'in' 将返回入度；
      'out' 将返回出度；'total' 将返回总度数；'all' 将返回一个含有三种度数的对象：{ inDegree, outDegree, degree}；
      若不指定，将返回总度数
    */
    node.degree = 0;
    node.inDegree = 0;
    node.outDegree = 0;
    if (currentNodeMap[node.id]) {
      console.warn("node exists already!", node.id);
      node.id = `${node.id}${Math.random()}`;
    }
    currentNodeMap[node.id] = node;
    if (node.count > maxNodeCount) maxNodeCount = node.count;
    const cachePosition = cachePositions ? cachePositions[node.id] : undefined;
    if (cachePosition) {
      node.x = cachePosition.x;
      node.y = cachePosition.y;
      node.new = false;
    } else {
      // node.new = isNewGraph ? false : true;
      node.new = isNodesHasChild(node.id) ? true : false;
      // console.log("inset node", node)
      if (manipulatePosition && !node.x && !node.y) {
        node.x =
          manipulatePosition.x + 30 * Math.cos(Math.random() * Math.PI * 2);
        node.y =
          manipulatePosition.y + 30 * Math.sin(Math.random() * Math.PI * 2);
      }
    }
    // console.log('processNodesEdges_node', node)
  });

  // console.log('processNodesEdges_nodes 1111111',nodes)

  let maxCount = -Infinity;
  let minCount = Infinity;
  // let maxCount = 0;
  edges.forEach((edge) => {
    // to avoid the dulplicated id to nodes
    if (!edge.id) edge.id = `edge-${uniqueId("processNodesEdges")}`;
    else if (edge.id.split("-")[0] !== "edge") edge.id = `edge-${edge.id}`;
    // TODO: delete the following line after the queried data is correct
    if (!currentNodeMap[edge.source] || !currentNodeMap[edge.target]) {
      console.warn(
        "edge source target does not exist",
        edge.source,
        edge.target,
        edge.id
      );
      return;
    }
    const sourceNode = currentNodeMap[edge.source];
    const targetNode = currentNodeMap[edge.target];

    if (!sourceNode || !targetNode)
      console.warn(
        "source or target is not defined!!!",
        edge,
        sourceNode,
        targetNode
      );

    // calculate the degree
    sourceNode.degree++;
    targetNode.degree++;
    sourceNode.outDegree++;
    targetNode.inDegree++;

    if (edge.count > maxCount) maxCount = edge.count;
    if (edge.count < minCount) minCount = edge.count;
  });

  nodes.sort(descendCompare(NODESIZEMAPPING)); // 排序
  const maxDegree = nodes[0].degree || 1;

  const descreteNodes = []; // 离散节点
  nodes.forEach((node, i) => {
    // assign the size mapping to the outDegree
    const countRatio = node.count / maxNodeCount;
    const isRealNode = node.level === 0;
    // nodeSize 节点大小（直径）。用于碰撞检测。
    node.size = isRealNode ? DEFAULTNODESIZE : DEFAULTAGGREGATEDNODESIZE;
    node.isReal = isRealNode;
    node.labelCfg = {
      // 配置标签文本
      // 文本相对于节点的位置
      position: "bottom",
      // 文本的偏移，position 为 'bottom' 时，文本的上方偏移量；position 为 'left' 时，文本的右方偏移量；
      offset: 5,
      style: {
        fill: global.node.labelCfg.style.fill,
        fontSize: 6 + countRatio * 6 || 12,
        stroke: global.node.labelCfg.style.stroke, // 文本描边颜色
        lineWidth: 3, // 文本描边粗细
      },
    };

    if (!node.degree) {
      descreteNodes.push(node);
    }
  });

  const countRange = maxCount - minCount;
  const minEdgeSize = 1;
  const maxEdgeSize = 7;
  const edgeSizeRange = maxEdgeSize - minEdgeSize;
  edges.forEach((edge) => {
    // set edges' style
    const targetNode = currentNodeMap[edge.target];

    const size =
      ((edge.count - minCount) / countRange) * edgeSizeRange + minEdgeSize || 1;
    edge.size = size;

    const arrowWidth = Math.max(size / 2 + 2, 3);
    const arrowLength = 10;
    const arrowBeging = targetNode.size + arrowLength;
    let arrowPath = `M ${arrowBeging},0 L ${
      arrowBeging + arrowLength
    },-${arrowWidth} L ${arrowBeging + arrowLength},${arrowWidth} Z`;
    let d = targetNode.size / 2 + arrowLength;
    if (edge.source === edge.target) {
      edge.type = "loop";
      arrowPath = undefined;
    }
    const sourceNode = currentNodeMap[edge.source];
    const isRealEdge = targetNode.isReal && sourceNode.isReal;
    edge.isReal = isRealEdge;
    const stroke = isRealEdge
      ? global.edge.style.realEdgeStroke
      : global.edge.style.stroke;
    const opacity = isRealEdge
      ? global.edge.style.realEdgeOpacity
      : global.edge.style.strokeOpacity;
    const dash = Math.max(size, 2);
    const lineDash = isRealEdge ? undefined : [dash, dash];
    edge.style = {
      stroke,
      strokeOpacity: opacity,
      cursor: "pointer",
      lineAppendWidth: Math.max(edge.size || 5, 5),
      fillOpacity: 1,
      lineDash,
      endArrow: arrowPath
        ? {
            path: arrowPath,
            d,
            fill: stroke,
            strokeOpacity: 0,
          }
        : false,
    };
    edge.labelCfg = {
      autoRotate: true,
      style: {
        stroke: global.edge.labelCfg.style.stroke,
        fill: global.edge.labelCfg.style.fill,
        lineWidth: 4,
        fontSize: 12,
        lineAppendWidth: 10,
        opacity: 1,
      },
    };
    if (!edge.oriLabel) edge.oriLabel = edge.label;
    if (largeGraphMode || !edgeLabelVisible) edge.label = "";
    else {
      console.log("edge", labelFormatter(edge.label, labelMaxLength));
      edge.label = labelFormatter(edge.label, labelMaxLength);
    }

    // arrange the other nodes around the hub
    const sourceDis = sourceNode.size / 2 + 20;
    const targetDis = targetNode.size / 2 + 20;
    if (sourceNode.x && !targetNode.x) {
      targetNode.x =
        sourceNode.x + sourceDis * Math.cos(Math.random() * Math.PI * 2);
    }
    if (sourceNode.y && !targetNode.y) {
      targetNode.y =
        sourceNode.y + sourceDis * Math.sin(Math.random() * Math.PI * 2);
    }
    if (targetNode.x && !sourceNode.x) {
      sourceNode.x =
        targetNode.x + targetDis * Math.cos(Math.random() * Math.PI * 2);
    }
    if (targetNode.y && !sourceNode.y) {
      sourceNode.y =
        targetNode.y + targetDis * Math.sin(Math.random() * Math.PI * 2);
    }

    if (!sourceNode.x && !sourceNode.y && manipulatePosition) {
      sourceNode.x =
        manipulatePosition.x + 30 * Math.cos(Math.random() * Math.PI * 2);
      sourceNode.y =
        manipulatePosition.y + 30 * Math.sin(Math.random() * Math.PI * 2);
    }
    if (!targetNode.x && !targetNode.y && manipulatePosition) {
      targetNode.x =
        manipulatePosition.x + 30 * Math.cos(Math.random() * Math.PI * 2);
      targetNode.y =
        manipulatePosition.y + 30 * Math.sin(Math.random() * Math.PI * 2);
    }
  });

  descreteNodeCenter = {
    x: width - paddingLeft,
    y: height - paddingTop,
  };
  descreteNodes.forEach((node) => {
    if (!node.x && !node.y) {
      node.x =
        descreteNodeCenter.x + 30 * Math.cos(Math.random() * Math.PI * 2);
      node.y =
        descreteNodeCenter.y + 30 * Math.sin(Math.random() * Math.PI * 2);
    }
  });

  // console.log('processNodesEdges_nodes 22222',nodes)

  // 处理平行边
  G6.Util.processParallelEdges(edges, 12.5, "custom-quadratic", "custom-line");
  return {
    maxDegree,
    edges,
  };
};

const getForceLayoutConfig = (graph, largeGraphMode, configSettings) => {
  let {
    linkDistance,
    edgeStrength,
    nodeStrength,
    nodeSpacing,
    preventOverlap,
    nodeSize,
    collideStrength,
    alpha,
    alphaDecay,
    alphaMin,
  } = configSettings || { preventOverlap: true };

  if (!linkDistance && linkDistance !== 0) linkDistance = 225;
  if (!edgeStrength && edgeStrength !== 0) edgeStrength = 50;
  if (!nodeStrength && nodeStrength !== 0) nodeStrength = 200;
  if (!nodeSpacing && nodeSpacing !== 0) nodeSpacing = 5;

  const config = {
    type: "gForce",
    minMovement: 0.01, // 当一次迭代的平均移动长度小于该值时停止迭代。数字越小，布局越收敛，所用时间将越长
    maxIteration: 5000, // 最大迭代次数。当迭代次数超过该值，但平均移动长度仍然没有达到 minMovement，也将强制停止迭代
    preventOverlap,
    damping: 0.99, // 阻尼系数，取值范围 [0, 1]。数字越大，速度降低得越慢
    linkDistance: (d) => {
      // 边长度
      let dist = linkDistance;
      const sourceNode = nodeMap[d.source] || aggregatedNodeMap[d.source];
      const targetNode = nodeMap[d.target] || aggregatedNodeMap[d.target];
      // 两端都是聚合点
      // if (sourceNode.level && targetNode.level) dist = linkDistance * 3;
      // 一端是聚合点，一端是真实节点
      // else if (sourceNode.level || targetNode.level) dist = linkDistance * 1.5;
      if (!sourceNode.level && !targetNode.level) dist = linkDistance * 0.3;
      return dist;
    },
    edgeStrength: (d) => {
      // 边的作用力（引力）大小
      const sourceNode = nodeMap[d.source] || aggregatedNodeMap[d.source];
      const targetNode = nodeMap[d.target] || aggregatedNodeMap[d.target];
      // 聚合节点之间的引力小
      if (sourceNode.level && targetNode.level) return edgeStrength / 2;
      // 聚合节点与真实节点之间引力大
      if (sourceNode.level || targetNode.level) return edgeStrength;
      return edgeStrength;
    },
    nodeStrength: (d) => {
      // 节点作用力，正数代表节点之间的斥力作用，负数代表节点之间的引力作用（注意与 'force' 相反）
      // 给离散点引力，让它们聚集
      if (d.degree === 0) return -10;
      // 聚合点的斥力大
      if (d.level) return nodeStrength * 2;
      return nodeStrength;
    },
    nodeSize: (d) => {
      // 节点大小（直径）。用于碰撞检测。
      if (!nodeSize && d.size) return d.size;
      return 50;
    },
    nodeSpacing: (d) => {
      // preventOverlap 为 true 时生效, 防止重叠时节点边缘间距的最小值。可以是回调函数, 为不同节点设置不同的最小间距
      if (d.degree === 0) return nodeSpacing * 2;
      if (d.level) return nodeSpacing;
      return nodeSpacing;
    },
    onLayoutEnd: () => {
      // 布局完成后的回调函数
      if (largeGraphMode) {
        graph.getEdges().forEach((edge) => {
          if (!edge.oriLabel) return;
          edge.update({
            label: labelFormatter(edge.oriLabel, labelMaxLength),
          });
        });
      }
    },
    tick: () => {
      // 每一次迭代的回调函数
      graph.refreshPositions();
    },
  };

  if (nodeSize) config["nodeSize"] = nodeSize;
  if (collideStrength) config["collideStrength"] = collideStrength;
  if (alpha) config["alpha"] = alpha;
  if (alphaDecay) config["alphaDecay"] = alphaDecay;
  if (alphaMin) config["alphaMin"] = alphaMin;

  return config;
};

const hideItems = (graph) => {
  hiddenItemIds.forEach((id) => {
    graph.hideItem(id);
  });
};

const showItems = (graph) => {
  graph.getNodes().forEach((node) => {
    if (!node.isVisible()) graph.showItem(node);
  });
  graph.getEdges().forEach((edge) => {
    if (!edge.isVisible()) edge.showItem(edge);
  });
  hiddenItemIds = [];
};

const handleRefreshGraph = (
  graph,
  graphData,
  width,
  height,
  largeGraphMode,
  edgeLabelVisible,
  isNewGraph
) => {
  if (!graphData || !graph) return;
  clearFocusItemState(graph);
  // reset the filtering
  graph.getNodes().forEach((node) => {
    if (!node.isVisible()) node.show();
  });
  graph.getEdges().forEach((edge) => {
    if (!edge.isVisible()) edge.show();
  });

  let nodes = [],
    edges = [];

  nodes = graphData.nodes;
  // console.log('processNodesEdges_into', nodes)
  const processRes = processNodesEdges(
    nodes,
    graphData.edges || [],
    width,
    height,
    largeGraphMode,
    edgeLabelVisible,
    isNewGraph
  );

  edges = processRes.edges;

  graph.changeData({ nodes, edges }, true);

  hideItems(graph);
  graph.getNodes().forEach((node) => {
    node.toFront();
  });

  // layout.instance.stop();
  // force 需要使用不同 id 的对象才能进行全新的布局，否则会使用原来的引用。因此复制一份节点和边作为 force 的布局数据
  layout.instance.init({
    // 初始化布局
    nodes: graphData.nodes,
    edges,
  });

  layout.instance.minMovement = 0.1;
  // layout.instance.getCenter = d => {
  // 	const cachePosition = cachePositions[d.id];
  // 	if (!cachePosition && (d.x || d.y)) return [d.x, d.y, 10];
  // 	else if (cachePosition) return [cachePosition.x, cachePosition.y, 10];
  // 	return [width / 2, height / 2, 10];
  // }

  // 每个节点质量的回调函数，若不指定，则默认使用度数作为节点质量。使用方法与 nodeSpacing 类似，每个回调函数返回一个数值作为该节点的质量
  layout.instance.getMass = (d) => {
    const cachePosition = cachePositions[d.id];
    if (cachePosition) return 5;
    return 1;
  };

  layout.instance.execute(); // 执行布局算法

  return { nodes, edges };
};

const getMixedGraph = (
  aggregatedData, //汇总数据
  originData, //来源数据
  nodeMap,
  aggregatedNodeMap, //汇总节点Map
  expandArray,
  collapseArray // 坍塌数组
) => {
  let nodes = [],
    edges = [];

  // console.log('getMixedGraph_aggregatedData', aggregatedData)
  // console.log('getMixedGraph_originData', originData)
  // console.log('getMixedGraph_nodeMap', nodeMap)
  // console.log('getMixedGraph_aggregatedNodeMap', aggregatedNodeMap)

  const expandMap = {},
    collapseMap = {};
  expandArray.forEach((expandModel) => {
    expandMap[expandModel.id] = true;
  });
  collapseArray.forEach((collapseModel) => {
    collapseMap[collapseModel.id] = true;
  });

  aggregatedData.clusters.forEach((cluster, i) => {
    if (expandMap[cluster.id]) {
      nodes = nodes.concat(cluster.nodes);
      aggregatedNodeMap[cluster.id].expanded = true;
    } else {
      nodes.push(aggregatedNodeMap[cluster.id]);
      aggregatedNodeMap[cluster.id].expanded = false;
    }
  });
  originData.edges.forEach((edge) => {
    const isSourceInExpandArray = expandMap[nodeMap[edge.source].clusterId];
    const isTargetInExpandArray = expandMap[nodeMap[edge.target].clusterId];
    if (isSourceInExpandArray && isTargetInExpandArray) {
      edges.push(edge);
    } else if (isSourceInExpandArray) {
      const targetClusterId = nodeMap[edge.target].clusterId;
      const vedge = {
        source: edge.source,
        target: targetClusterId,
        id: `edge-${uniqueId("getMixedGraph1")}`,
        label: "",
      };
      edges.push(vedge);
    } else if (isTargetInExpandArray) {
      const sourceClusterId = nodeMap[edge.source].clusterId;
      const vedge = {
        target: edge.target,
        source: sourceClusterId,
        id: `edge-${uniqueId("getMixedGraph2")}`,
        label: "",
      };
      edges.push(vedge);
    }
  });
  aggregatedData.clusterEdges.forEach((edge) => {
    if (expandMap[edge.source] || expandMap[edge.target]) return;
    else edges.push(edge);
  });
  // console.log('nodes', nodes)
  // console.log('edges', edges)
  return { nodes, edges };
};

const getNeighborMixedGraph = (
  //获取相邻节点数据
  centerNodeModel,
  step,
  originData,
  clusteredData, // 聚类算法数据
  currentData,
  nodeMap,
  aggregatedNodeMap,
  maxNeighborNumPerNode = 2 //最大相邻路径
) => {
  // console.log('centerNodeModel',centerNodeModel)
  // console.log('step',step)
  // console.log('originData',originData)
  // console.log('clusteredData',clusteredData)
  // console.log('currentData',currentData)
  // console.log('nodeMap',nodeMap)
  // console.log('aggregatedNodeMap',aggregatedNodeMap)
  // update the manipulate position for center gravity of the new nodes
  manipulatePosition = { x: centerNodeModel.x, y: centerNodeModel.y };

  // the neighborSubGraph does not include the centerNodeModel. the elements are all generated new nodes and edges
  const neighborSubGraph = generateNeighbors(
    centerNodeModel,
    step,
    maxNeighborNumPerNode
  );
  // update the origin data
  originData.nodes = originData.nodes.concat(neighborSubGraph.nodes);
  originData.edges = originData.edges.concat(neighborSubGraph.edges);
  // update the origin nodeMap
  neighborSubGraph.nodes.forEach((node) => {
    nodeMap[node.id] = node;
  });
  // update the clusteredData
  const clusterId = centerNodeModel.clusterId;
  clusteredData.clusters.forEach((cluster) => {
    if (cluster.id !== clusterId) return;
    cluster.nodes = cluster.nodes.concat(neighborSubGraph.nodes);
    cluster.sumTot += neighborSubGraph.edges.length;
  });
  // update the count
  aggregatedNodeMap[clusterId].count += neighborSubGraph.nodes.length;

  currentData.nodes = currentData.nodes.concat(neighborSubGraph.nodes);
  currentData.edges = currentData.edges.concat(neighborSubGraph.edges);
  return currentData;
};

const generateNeighbors = (
  centerNodeModel,
  step,
  maxNeighborNumPerNode = 5
) => {
  console.log("centerNodeModel", centerNodeModel);
  if (step <= 0) return undefined;
  let nodes = [],
    edges = [];
  const clusterId = centerNodeModel.clusterId;
  const centerId = centerNodeModel.id;
  const neighborNum = Math.ceil(Math.random() * maxNeighborNumPerNode);
  // console.log('neighborNum',neighborNum)
  for (let i = 0; i < neighborNum; i++) {
    const neighborNode = {
      id: uniqueId("generateNeighbors1"),
      clusterId,
      level: 0,
      colorSet: centerNodeModel.colorSet,
    };
    nodes.push(neighborNode);
    const dire = Math.random() > 0.5;
    const source = dire ? centerId : neighborNode.id;
    const target = dire ? neighborNode.id : centerId;
    const neighborEdge = {
      id: uniqueId("generateNeighbors2"),
      source,
      target,
      label: `${source}-${target}`,
    };
    edges.push(neighborEdge);
    const subNeighbors = generateNeighbors(
      neighborNode,
      step - 1,
      maxNeighborNumPerNode
    );
    if (subNeighbors) {
      nodes = nodes.concat(subNeighbors.nodes);
      edges = edges.concat(subNeighbors.edges);
    }
  }
  return { nodes, edges };
};

const getExtractNodeMixedGraph = (
  extractNodeData,
  originData,
  nodeMap,
  aggregatedNodeMap,
  currentUnproccessedData
) => {
  const extractNodeId = extractNodeData.id;
  // const extractNodeClusterId = extractNodeData.clusterId;
  // push to the current rendering data
  currentUnproccessedData.nodes.push(extractNodeData);
  // update the count of aggregatedNodeMap, when to revert?
  // aggregatedNodeMap[extractNodeClusterId].count --;

  // extract the related edges
  originData.edges.forEach((edge) => {
    if (edge.source === extractNodeId) {
      const targetClusterId = nodeMap[edge.target].clusterId;
      if (!aggregatedNodeMap[targetClusterId].expanded) {
        // did not expand, create an virtual edge fromt he extract node to the cluster
        currentUnproccessedData.edges.push({
          id: uniqueId("getExtractNodeMixedGraph1"),
          source: extractNodeId,
          target: targetClusterId,
        });
      } else {
        // if the cluster is already expanded, push the origin edge
        currentUnproccessedData.edges.push(edge);
      }
    } else if (edge.target === extractNodeId) {
      const sourceClusterId = nodeMap[edge.source].clusterId;
      if (!aggregatedNodeMap[sourceClusterId].expanded) {
        // did not expand, create an virtual edge fromt he extract node to the cluster
        currentUnproccessedData.edges.push({
          id: uniqueId("getExtractNodeMixedGraph2"),
          target: extractNodeId,
          source: sourceClusterId,
        });
      } else {
        // if the cluster is already expanded, push the origin edge
        currentUnproccessedData.edges.push(edge);
      }
    }
  });
  return currentUnproccessedData;
};

const examAncestors = (model, expandedArray, length, keepTags) => {
  for (let i = 0; i < length; i++) {
    const expandedNode = expandedArray[i];
    if (!keepTags[i] && model.parentId === expandedNode.id) {
      keepTags[i] = true; // 需要被保留
      examAncestors(expandedNode, expandedArray, length, keepTags);
      break;
    }
  }
};

const manageExpandCollapseArray = (
  nodeNumber,
  model,
  collapseArray,
  expandArray
) => {
  manipulatePosition = { x: model.x, y: model.y };

  // 维护 expandArray，若当前画布节点数高于上限，移出 expandedArray 中非 model 祖先的节点)
  if (nodeNumber > NODE_LIMIT) {
    // 若 keepTags[i] 为 true，则 expandedArray 的第 i 个节点需要被保留
    const keepTags = {};
    const expandLen = expandArray.length;
    // 检查 X 的所有祖先并标记 keepTags
    examAncestors(model, expandArray, expandLen, keepTags);
    // 寻找 expandedArray 中第一个 keepTags 不为 true 的点
    let shiftNodeIdx = -1;
    for (let i = 0; i < expandLen; i++) {
      if (!keepTags[i]) {
        shiftNodeIdx = i;
        break;
      }
    }
    // 如果有符合条件的节点，将其从 expandedArray 中移除
    if (shiftNodeIdx !== -1) {
      let foundNode = expandArray[shiftNodeIdx];
      if (foundNode.level === 2) {
        let foundLevel1 = false;
        // 找到 expandedArray 中 parentId = foundNode.id 且 level = 1 的第一个节点
        for (let i = 0; i < expandLen; i++) {
          const eNode = expandArray[i];
          if (eNode.parentId === foundNode.id && eNode.level === 1) {
            foundLevel1 = true;
            foundNode = eNode;
            expandArray.splice(i, 1);
            break;
          }
        }
        // 若未找到，则 foundNode 不变, 直接删去 foundNode
        if (!foundLevel1) expandArray.splice(shiftNodeIdx, 1);
      } else {
        // 直接删去 foundNode
        expandArray.splice(shiftNodeIdx, 1);
      }
      // const removedNode = expandedArray.splice(shiftNodeIdx, 1); // splice returns an array
      const idSplits = foundNode.id.split("-");
      let collapseNodeId;
      // 去掉最后一个后缀
      for (let i = 0; i < idSplits.length - 1; i++) {
        const str = idSplits[i];
        if (collapseNodeId) collapseNodeId = `${collapseNodeId}-${str}`;
        else collapseNodeId = str;
      }
      const collapseNode = {
        id: collapseNodeId,
        parentId: foundNode.id,
        level: foundNode.level - 1,
      };
      collapseArray.push(collapseNode);
    }
  }

  const currentNode = {
    id: model.id,
    level: model.level,
    parentId: model.parentId,
  };

  // 加入当前需要展开的节点
  expandArray.push(currentNode);

  graph.get("canvas").setCursor("default");
  return { expandArray, collapseArray };
};

const cacheNodePositions = (nodes) => {
  const positionMap = {};
  const nodeLength = nodes.length;
  for (let i = 0; i < nodeLength; i++) {
    const node = nodes[i].getModel();
    // console.log('node',node)
    positionMap[node.id] = {
      x: node.x,
      y: node.y,
      level: node.level,
      label: node.label,
    };
  }
  return positionMap;
};

const stopLayout = () => {
  layout.instance.stop();
};

const bindListener = (graph) => {
  graph.on("keydown", (evt) => {
    const code = evt.key;
    if (!code) {
      return;
    }
    if (code.toLowerCase() === "shift") {
      shiftKeydown = true;
    } else {
      shiftKeydown = false;
    }
  });
  graph.on("keyup", (evt) => {
    const code = evt.key;
    if (!code) {
      return;
    }
    if (code.toLowerCase() === "shift") {
      shiftKeydown = false;
    }
  });
  graph.on("node:mouseenter", (evt) => {
    const { item } = evt;
    const model = item.getModel();
    const currentLabel = model.label;
    model.oriFontSize = model.labelCfg.style.fontSize;
    item.update({
      label: model.oriLabel,
    });
    model.oriLabel = currentLabel;
    graph.setItemState(item, "hover", true);
    item.toFront();
  });

  graph.on("node:mouseleave", (evt) => {
    const { item } = evt;
    const model = item.getModel();
    const currentLabel = model.label;
    item.update({
      label: model.oriLabel,
    });
    model.oriLabel = currentLabel;
    graph.setItemState(item, "hover", false);
  });

  graph.on("edge:mouseenter", (evt) => {
    const { item } = evt;
    const model = item.getModel();
    const currentLabel = model.label;
    item.update({
      label: model.oriLabel,
    });
    model.oriLabel = currentLabel;
    item.toFront();
    item.getSource().toFront();
    item.getTarget().toFront();
  });

  graph.on("edge:mouseleave", (evt) => {
    const { item } = evt;
    const model = item.getModel();
    const currentLabel = model.label;
    item.update({
      label: model.oriLabel,
    });
    model.oriLabel = currentLabel;
  });
  // click node to show the detail drawer
  graph.on("node:click", (evt) => {
    stopLayout();
    if (!shiftKeydown) clearFocusItemState(graph);
    else clearFocusEdgeState(graph);
    const { item } = evt;

    // highlight the clicked node, it is down by click-select
    graph.setItemState(item, "focus", true);

    if (!shiftKeydown) {
      // 将相关边也高亮
      const relatedEdges = item.getEdges();
      relatedEdges.forEach((edge) => {
        graph.setItemState(edge, "focus", true);
      });
    }
  });

  // click edge to show the detail of integrated edge drawer
  graph.on("edge:click", (evt) => {
    stopLayout();
    if (!shiftKeydown) clearFocusItemState(graph);
    const { item } = evt;
    // highlight the clicked edge
    graph.setItemState(item, "focus", true);
  });

  // click canvas to cancel all the focus state
  graph.on("canvas:click", (evt) => {
    clearFocusItemState(graph);
    console.log(
      graph.getGroup(),
      graph.getGroup().getBBox(),
      graph.getGroup().getCanvasBBox()
    );
  });
};

export const getRevisedAttrAndName = (obj: object) => {
  console.log("修改过的属性和名称", obj);
};

const window_height = window.innerHeight;
const window_width = window.innerWidth;

const containerDomH = window_height - 120;
const containerDomW = window_width - 240;

export const init = (containerDom, data) => {
  rawData = data;
  containerDom.style.backgroundColor = "#2b2f33";
  CANVAS_WIDTH = containerDomW;
  CANVAS_HEIGHT = containerDomH;
  nodeMap = {};
  const clusteredData = louvain(data, false, "weight"); // 聚类算法数据

  const aggregatedData = { nodes: [], edges: [] };

  clusteredData.clusters.forEach((cluster, i) => {
    cluster.nodes.forEach((node) => {
      const addNodeObj = data["nodes"].find((ele) => ele.id == node.id);
      node.level = 0;
      node.label = node.id;
      node.type = "";
      node.colorSet = colorSets[i];
      node.attr = addNodeObj.attr || "";
      node.name = addNodeObj.name || addNodeObj.id + "_add";
      nodeMap[node.id] = node;
    });
    const cnode = {
      id: cluster.id,
      type: "aggregated-node",
      count: cluster.nodes.length,
      level: 1,
      label: cluster.id,
      colorSet: colorSets[i],
      idx: i,
      // attr:cluster.attr || '',  // 新增的属性字段
      // name:cluster.name || cluster.id  // 新增的名称字段
    };
    aggregatedNodeMap[cluster.id] = cnode;
    aggregatedData.nodes.push(cnode);
  });

  clusteredData.clusterEdges.forEach((clusterEdge) => {
    const cedge = {
      ...clusterEdge,
      size: Math.log(clusterEdge.count),
      label: "",
      id: `edge-${uniqueId("init1")}`,
    };
    if (cedge.source === cedge.target) {
      cedge.type = "loop";
      cedge.loopCfg = {
        dist: 20,
      };
    } else cedge.type = "line";
    aggregatedData.edges.push(cedge);
  });

  data.edges.forEach((edge) => {
    edge.label = `${edge.source}-${edge.target}`;
    edge.id = `edge-${uniqueId("init2")}`;
  });

  // console.log('data_init', data)
  currentUnproccessedData = aggregatedData;

  const { edges: processedEdges } = processNodesEdges(
    currentUnproccessedData.nodes,
    currentUnproccessedData.edges,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    largeGraphMode,
    true,
    true
  );

  const contextMenu = new G6.Menu({
    shouldBegin(evt) {
      if (evt.target && evt.target.isCanvas && evt.target.isCanvas())
        return true;
      if (evt.item) return true;
      return false;
    },

    getContent(evt) {
      const { item } = evt;
      if (evt.target && evt.target.isCanvas && evt.target.isCanvas()) {
        return `<ul>
            <li id='show'>显示所有隐藏元素</li>
            <li id='collapseAll'>聚合所有聚类</li>
        </ul>`;
      } else if (!item) return;
      const itemType = item.getType();
      const model = item.getModel();
      // console.log('model', model)
      if (itemType && model) {
        if (itemType === "node") {
          if (model.level !== 0) {
            return `<ul>
                <li id='expand'>展开该聚合点</li>
                <li id='hide'>隐藏该节点</li>
            </ul>`;
          } else if (model.type == "real-node" && model.new) {
            return `<ul>
                <li id='collapse'>聚合所属聚类</li>
                <li id='edit'>编辑该节点</li>
                <li id='neighbor-1'>扩展一度关系</li>
                <li id='hide'>隐藏该节点</li>
                <li id='delete'>删除该节点</li>
            </ul>`;
          } else {
            return `<ul>
                <li id='collapse'>聚合所属聚类</li>
                <li id='edit'>编辑该节点</li>
                <li id='hide'>隐藏该节点</li>
                <li id='delete'>删除该节点</li>
            </ul>`;
          }
        } else {
          return `<ul>
              <li id='hide'>隐藏该边</li>
          </ul>`;
        }
      }
    },
    handleMenuClick: (target, item) => {
      const model = item && item.getModel(); // item.getModel() 获取元素的数据模型
      const liIdStrs = target.id.split("-");
      let mixedGraphData;
      // console.log('liIdStrs[0]', liIdStrs[0])
      switch (liIdStrs[0]) {
        case "hide":
          graph.hideItem(item);
          hiddenItemIds.push(model.id);
          break;
        case "expand":
          const newArray = manageExpandCollapseArray(
            graph.getNodes().length,
            model,
            collapseArray,
            expandArray
          );
          expandArray = newArray.expandArray;
          collapseArray = newArray.collapseArray;
          mixedGraphData = getMixedGraph(
            clusteredData,
            data,
            nodeMap,
            aggregatedNodeMap,
            expandArray,
            collapseArray
          );
          // console.log('mixedGraphData', mixedGraphData)
          break;
        case "collapse":
          const aggregatedNode = aggregatedNodeMap[model.clusterId];
          manipulatePosition = { x: aggregatedNode.x, y: aggregatedNode.y };
          collapseArray.push(aggregatedNode);
          for (let i = 0; i < expandArray.length; i++) {
            if (expandArray[i].id === model.clusterId) {
              expandArray.splice(i, 1);
              break;
            }
          }
          mixedGraphData = getMixedGraph(
            clusteredData,
            data,
            nodeMap,
            aggregatedNodeMap,
            expandArray,
            collapseArray
          );
          break;
        case "collapseAll":
          expandArray = [];
          collapseArray = [];
          mixedGraphData = getMixedGraph(
            clusteredData,
            data,
            nodeMap,
            aggregatedNodeMap,
            expandArray,
            collapseArray
          );
          break;
        case "neighbor":
          const expandNeighborSteps = parseInt(liIdStrs[1]);
          mixedGraphData = getNeighborMixedGraph(
            model,
            expandNeighborSteps,
            data,
            clusteredData,
            currentUnproccessedData,
            nodeMap,
            aggregatedNodeMap,
            2
          );
          break;
        case "edit":
          // console.log("model_edit", model);
          const { attr, label, id } = model;
          store.commit("chartForm/setChartFormStatus", true);
          store.commit("chartForm/setChartFormData", { attr, label, id });
          break;
        case "delete":
          ElMessageBox({
            title: "删除",
            message: "是否删除当前节点",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            // ElMessage({
            //   type: "warning",
            //   message: "保存修改",
            // });
          });
          break;
        case "show":
          showItems(graph);
          break;
        default:
          break;
      }
      if (mixedGraphData) {
        cachePositions = cacheNodePositions(graph.getNodes());
        // console.log('cachePositions', cachePositions)
        currentUnproccessedData = mixedGraphData;
        // console.log('handleRefreshGraph_into')
        handleRefreshGraph(
          graph,
          currentUnproccessedData,
          CANVAS_WIDTH,
          CANVAS_HEIGHT,
          largeGraphMode,
          true,
          false
        );
      }
    },
    // offsetX and offsetY include the padding of the parent container
    // 需要加上父级容器的 padding-left 16 与自身偏移量 10
    offsetX: 16 + 10,
    // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
    offsetY: 0,
    // the types of items that allow the menu show up
    // 在哪些类型的元素上响应
    itemTypes: ["node", "edge", "canvas"],
  });

  const tooltip = new G6.Tooltip({
    className: "print_tooltip",
    offsetX: 20,
    offsetY: 20,
    // trigger: 'click',
    // 允许出现 tooltip 的 item 类型
    itemTypes: ["node"],
    shouldBegin(evt) {
      const { item } = evt;
      if (!item) return;
      const itemType = item.getType();
      const model = item.getModel();
      if (model.type == "real-node") return true;
      else return false;
    },
    getContent: (evt) => {
      const { item } = evt;
      if (!item) return;
      const itemType = item.getType();
      const model = item.getModel();
      const outUl = document.createElement("ul");
      if (
        itemType &&
        model &&
        itemType === "node" &&
        model.type == "real-node"
      ) {
        outUl.innerHTML = `
          <li>
            <p>标签名称：</p><p>${model.name}</p>
          </li>
          <li>
            <p>属性：</p><p>${model.attr}</p>
          </li>
          `;
        return outUl;
      } else {
        return "";
      }
    },
  });

  graph = new G6.Graph({
    container: containerDom,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    linkCenter: true,
    minZoom: 0.1,
    groupByTypes: false,
    enableStack: true,
    modes: {
      default: [
        {
          type: "drag-canvas",
          enableOptimize: true,
        },
        {
          type: "zoom-canvas",
          enableOptimize: true,
          optimizeZoom: 0.01,
        },
        "drag-node",
        "shortcuts-call",
      ],
      lassoSelect: [
        {
          type: "zoom-canvas",
          enableOptimize: true,
          optimizeZoom: 0.01,
        },
        {
          type: "lasso-select",
          selectedState: "focus",
          trigger: "drag",
        },
      ],
      fisheyeMode: [],
    },
    defaultNode: {
      type: "aggregated-node",
      size: DEFAULTNODESIZE,
    },
    plugins: [contextMenu, tooltip],
  });

  graph.get("canvas").set("localRefresh", false);

  const layoutConfig = getForceLayoutConfig(graph, largeGraphMode);
  layoutConfig.center = [CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2];
  layout.instance = new G6.Layout["gForce"](layoutConfig); // 单独使用布局
  layout.instance.init({
    // 初始化布局。
    nodes: currentUnproccessedData.nodes,
    edges: processedEdges,
  });
  layout.instance.execute(); // 执行布局算法

  bindListener(graph);
  graph.data({ nodes: aggregatedData.nodes, edges: processedEdges });
  graph.render();
  // });
};

if (typeof window !== "undefined")
  window.onresize = () => {
    if (!graph || graph.get("destroyed")) return;
    graph.changeSize(containerDomW, containerDomH);
  };

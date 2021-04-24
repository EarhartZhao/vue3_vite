<template>
  <div>
    <!-- <div ref="containerDom2"></div> -->
    <div ref="newContainerDom">123</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, nextTick, ref } from "vue";
import G6 from "@antv/g6";
export default defineComponent({
  name: "Menu",
  data() {
    return {};
  },
  // mounted() {
  //   /* eslint-disable */
  //   const that = this as any;
  //   console.log(this);
  //   this.$nextTick(() => {
  //     console.log("this.$refs", this.$refs);
  //     const containerDom:any = this.$refs("containerDom2");
  //     this.createChart(that, containerDom);
  //   });
  // },
  setup() {
    const newContainerDom : any= ref(null)
    onMounted(() => {
      // let graph = null;
      // const that = this as any;
      nextTick(function () {
        console.log('newContainerDom.value',newContainerDom.value)
        createChart(newContainerDom.value);
      });
    });
   
    const createChart = (containerDom:any): void => {
      fetch(
        "https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json"
      )
        .then((res) => res.json())
        .then((data) => {
          // const container = containerDom;
          const width = 1200;
          const height = 500;
          // const width = containerDom.scrollWidth;
          // const height = containerDom.scrollHeight || 500;
          const graph = new G6.TreeGraph({
            container: containerDom,
            width,
            height,
            linkCenter: true,
            modes: {
              default: [
                {
                  type: "collapse-expand",
                  onChange: function onChange(item, collapsed) {
                    const data = item.get("model");
                    data.collapsed = collapsed;
                    return true;
                  },
                },
                "drag-canvas",
                "zoom-canvas",
              ],
            },
            defaultNode: {
              size: 26,
            },
            layout: {
              type: "compactBox",
              direction: "RL",
              getId: function getId(d: any) {
                return d.id;
              },
              getHeight: () => {
                return 26;
              },
              getWidth: () => {
                return 26;
              },
              getVGap: () => {
                return 20;
              },
              getHGap: () => {
                return 30;
              },
              radial: true,
            },
          });

          graph.node(function (node) {
            return {
              label: node.id,
            };
          });

          graph.data(data);
          graph.render();
          graph.fitView();
        });
    };
    return { createChart, newContainerDom };
  },
});
</script>

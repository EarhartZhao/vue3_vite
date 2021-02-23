import { join } from 'path'

const pathResolve = (dir: string) => join(__dirname, dir + "/");

const options = [
  {
    key: "@",
    values: "src",
  },
  {
    key: "@assets",
    values: "src/assets",
  },
  {
    key: "@router",
    values: "src/router",
  },
  {
    key: "@store",
    values: "src/store",
  },
  {
    key: "@types",
    values: "src/types",
  },
  {
    key: "@utils",
    values: "src/assets/utils",
  },
  {
    key: "@comp",
    values: "src/components",
  },
  {
    key: "@icon",
    values: "src/assets/iconfont",
  },

  /* styles */
  {
    key: "@style",
    values: "src/assets/styles",
  },
  {
    key: "@styleV",
    values: "src/assets/styles/views",
  },
  {
    key: "@styleBase",
    values: "src/assets/styles/views/base",
  },
  {
    key: "@styleLayout",
    values: "src/assets/styles/views/layout",
  },
];
let aliasOptions = [];

options.forEach((item) => {
  let obj = {};
  obj["find"] = new RegExp(`${item.key}/`);
  obj["replacement"] = pathResolve(item.values);
  aliasOptions.push(obj);
});

export default aliasOptions;

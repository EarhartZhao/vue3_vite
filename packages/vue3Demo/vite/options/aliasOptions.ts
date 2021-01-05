import { join } from 'path'

const pathResolve = (dir: string) => join(__dirname, dir);

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

let obj = {};
options.forEach((item) => {
  obj[`/${item.key}/`] = pathResolve(item.values);
});

export const aliasOptions = obj;

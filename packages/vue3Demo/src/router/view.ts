export const views: any = {
  //  base router
  Login: "base/login/index.vue",
  Index: "layout/index",
  Error500: "base/errorPage/Error500",
  Error404: "base/errorPage/Error404",

  //  首页
  Home_Index: "main/home/index",

  //  扩展
  Expand_Table: "main/expand/table",
  Expand_Form: "main/expand/form",
  // :'',
};

export const viewsKey = Object.keys(views);

/*
  待解决问题，vite内使用import如何动态编译
*/

export const getComponent = (name: string): any => {
  if (!viewsKey.includes(name)) throw new Error("缺少该路由！");
  const view = "@/views/" + views[name];
  return () => import(view);
  // return () => import(`@/views/${views[name]}`);
  // return () => Promise.resolve(require(view).default);
};

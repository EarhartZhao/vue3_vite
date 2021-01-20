export const views: any = {
  //  base router
  Login: "base/login/index.vue",
  Index: "layout/index.vue",
  Error500: "base/errorPage/Error500",
  Error404: "base/errorPage/Error404",

  //  首页
  Home_Index: "main/index",

  //  扩展
  Expand_Table: "main/expand/table",
  Expand_Form: "main/expand/form",
  // :'',
};

export const viewsKey = Object.keys(views);

export const getComponent = (name: string): any => {
  if (!viewsKey.includes(name)) throw new Error("缺少该路由！");
  return () => import("/@/views/" + views[name]);
};

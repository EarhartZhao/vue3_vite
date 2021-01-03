export const baseRouters = [
  {
    path: "/",
    name: "Login",
    component: () => import("/@/views/base/login/index.vue"),
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("/@/views/layout/index.vue"),
  },
  {
    path: "/lifeCycle",
    name: "lifeCycle",
    component: () => import("/@/views/base/LifeCycle.vue"),
  },
];

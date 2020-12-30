export const baseRouters = [
  {
    path: "/",
    name: "Home",
    component: () => import("/@/views/Home.vue"),
  },
  {
    path: "/lifeCycle",
    name: "lifeCycle",
    component: () => import("/@/views/LifeCycle.vue"),
  },
];

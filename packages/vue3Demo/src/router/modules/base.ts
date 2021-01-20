export const Index = () => import("/@/views/layout/index.vue");
export const Login = () => import("/@/views/base/login/index.vue");
export const Error500 = () => import("/@/views/base/errorPage/Error500");
export const Error404 = () => import("/@/views/base/errorPage/Error404");
export const baseRouters = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/index",
    name: "Index",
    component: Index,
  },
  {
    path: "/500",
    name: "Error500",
    component: Error500,
  },
  {
    path: "/404",
    name: "Error404",
    component: Error404,
  },
];

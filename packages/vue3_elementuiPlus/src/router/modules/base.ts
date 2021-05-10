export const Index = () => import("@/views/layout/index.vue");
export const Login = () => import("@/views/base/login/index.vue");
export const LoginWrap = () => import("@/views/base/login/wrap.vue");
export const LoginForgot = () => import("@/views/base/login/forgot.vue");
export const Error500 = () => import("@/views/base/errorPage/Error500");
export const Error404 = () => import("@/views/base/errorPage/Error404");
export const baseRouters = [
  {
    path: "/loginwrap",
    name: "Login",
    component: Login,
    children: [
      {
        path: "/",
        component: LoginWrap,
      },
      {
        path: "/forgot",
        component: LoginForgot,
      },
    ],
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

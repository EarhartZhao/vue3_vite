import { getComponent } from '../view'
import { Index } from './base'

// const Home_Index = () => import("/@/views/main/index");
const Home_Index = getComponent("Home_Index");

const homeRouters = {
  path: "/home",
  name: "Home",
  component: Index,
  redirect: "noredirect",
  meta: {
    title: "首页",
    noCache: true,
    icon: "",
  },
  children: [
    {
      path: "Index",
      component: Home_Index,
      name: "Home_Index",
      meta: {
        title: "首页",
        noCache: true,
        icon: "",
      },
    },
  ],
};

export default homeRouters;

import { store } from '@store/index'

// import { getters } from '../types/store/router'
import router from './index'
import expandRouters from './modules/expand'
import homeRouters from './modules/home'

router.beforeEach(async (to: any, from: any, next: any) => {
  console.log("to", to);

  const whiteList = ["/", "/wrap", "/forgot", "/reset"];

  const token = store.getters["user/getToken"];

  const getRouters = store.getters["router/getRouters"];

  if (getRouters && getRouters.length > 0) {
  } else {
    // router.addRoute(homeRouters);
    let routerArr: Array<any> = [];
    routerArr.push(expandRouters, homeRouters);
    store.commit("router/setProducts", routerArr);
  }
  // console.log("has router:", to.fullPath, router.hasRoute(to.fullPath));
  // console.log("router", router.getRoutes());

  // if (whiteList.includes(to.path)) {
  //   // 白名单
  //   if (token) next("/index");
  // } else {
  //   if (!token) next("/");
  // }

  next();
});

/*
  模拟添加动态路由
  将动态获取的路由，添加到 vuex 内，在导航中使用动态获取的路由，从而实现动态权限路由
  待解决问题：1.vuex 保存动态路由信息后，同步添加到 vueRouter 中
            2.vueRouter 如何添加多条路由，目前 addRoute() 仅能添加一条路由
*/

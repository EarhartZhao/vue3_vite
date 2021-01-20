import { store, useStore } from '../store/index'
import { getters } from '../types/store/router'
import router from './index'
import expandRouters from './modules/expand'
import homeRouters from './modules/home'

router.beforeEach(async (to: any, from: any, next: any) => {
  // console.log("to", to);
  console.log("store", store);
  // console.log("store getters", store.getters["router/getRouters"]);
  const getRouters = store.getters["router/getRouters"];
  if (getRouters && getRouters.length > 0) {
    router.addRoute(getRouters);
  } else {
    router.addRoute(homeRouters);
    store.commit("router/setProducts", homeRouters);
  }
  // console.log("router", router.getRoutes());
  next();
});

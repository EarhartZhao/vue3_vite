import { store, useStore } from '../store/index'
import { getters } from '../types/store/router'
import router from './index'

router.beforeEach(async (to: any, from: any, next: any) => {
  // console.log("to", to);
  // console.log("store getters", store.getters["router/getRouters"]);
  const getRouters = store.getters["router/getRouters"];
  router.addRoute(getRouters);
  // console.log("router", router.getRoutes());
  next();
});

import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'

import { baseRouters } from './modules/base'
import expandRouters from './modules/expand'
import homeRouters from './modules/home'

let routes: Array<any> = [];
routes = routes.concat(baseRouters, homeRouters, expandRouters);

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

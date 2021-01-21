import { createRouter, createWebHistory } from 'vue-router'

import { baseRouters } from './modules/base'
import homeRouters from './modules/home'

let routes: any = [];
routes = routes.concat(baseRouters, homeRouters);

export default createRouter({
  history: createWebHistory(),
  routes,
});

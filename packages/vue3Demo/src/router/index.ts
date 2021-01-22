import { createRouter, createWebHistory } from 'vue-router'

import { baseRouters } from './modules/base'
import expandRouters from './modules/expand'
import homeRouters from './modules/home'

let routes: any = [];
routes = routes.concat(baseRouters, homeRouters, expandRouters);

export default createRouter({
  history: createWebHistory(),
  routes,
});

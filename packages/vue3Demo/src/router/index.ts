import { createRouter, createWebHistory } from 'vue-router'

import { baseRouters } from './base'

let routes: any = [];
routes = routes.concat(baseRouters);

export default createRouter({
  history: createWebHistory(),
  routes,
});

import { createRouter, createWebHistory } from 'vue-router'

import { baseRouters } from './base'

const routes: any = [];
routes.concat(baseRouters);

export default createRouter({
  history: createWebHistory(),
  routes,
});

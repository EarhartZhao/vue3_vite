import router from '@router/index'
import { store } from '@store/index'
import { Router } from 'vue-router'

interface Options {
  path?: string;
  query?: Record<string, any>;
}

class route {
  private router: Router;
  query: object;
  props: object;
  options: any;

  constructor(options: Options) {
    this.router = router;
    this.query = this.router.currentRoute.value.query;
    this.options = options;
  }

  routerPush() {
    if (!this.options.path) return;
    this.router.push({
      path: this.options.path,
      query: this.options.query || {},
    });
    store.commit("router/setCurrentRouter", this.options.path);
  }

  getQuery(): object {
    return this.query;
  }
}

/*
 eg:
  router({ path: "/index" }).routerPush();
  router({ path: "/index" }).getQuery();
*/

export default (options: Options = {}) => new route(options);

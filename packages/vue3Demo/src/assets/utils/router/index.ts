import router from '@router/index'
import { Router } from 'vue-router'

interface Options {
  path?: string;
  query?: Record<string, string>;
}

class route {
  private router: Router;
  query: object;
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
  }

  getQuery(): object {
    return this.query;
  }
}

export default (options: Options = {}) => new route(options);

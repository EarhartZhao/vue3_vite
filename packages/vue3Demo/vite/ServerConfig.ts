import { ServerConfig } from 'vite'

export const server_config: ServerConfig = {
  hostname: "localhost",
  port: 9527,
  open: false,
  /**
   * Configure hmr websocket connection.
   */
  // hmr?: HmrConfig | boolean
  /**
   * Configure dev server hostname.
   */
  // hostname?: string
  // port?: number
  // open?: boolean
  /**
   * Configure https.
   */
  // https?: boolean
  // httpsOptions?: ServerOptions
  /**
   * Configure custom proxy rules for the dev server. Uses
   * [`koa-proxies`](https://github.com/vagusX/koa-proxies) which in turn uses
   * [`http-proxy`](https://github.com/http-party/node-http-proxy). Each key can
   * be a path Full options
   * [here](https://github.com/http-party/node-http-proxy#options).
   *
   * Example `vite.config.js`:
   * ``` js
   * module.exports = {
   *   proxy: {
   *     // string shorthand
   *     '/foo': 'http://localhost:4567/foo',
   *     // with options
   *     '/api': {
   *       target: 'http://jsonplaceholder.typicode.com',
   *       changeOrigin: true,
   *       rewrite: path => path.replace(/^\/api/, '')
   *     }
   *   }
   * }
   * ```
   */
  // proxy?: Record<string, string | ProxiesOptions>
  /**
   * Configure CORS for the dev server.
   * Uses [@koa/cors](https://github.com/koajs/cors).
   * Set to `true` to allow all methods from any origin, or configure separately
   * using an object.
   */
  // cors?: CorsOptions | boolean
  /**
   * A plugin function that configures the dev server. Receives a server plugin
   * context object just like the internal server plugins. Can also be an array
   * of multiple server plugin functions.
   */
  // configureServer?: ServerPlugin | ServerPlugin[]
  /**
   * The watch option passed to `chokidar`.
   */
  // chokidarWatchOptions?: chokidarWatchOptions
};

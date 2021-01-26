import vueJsx from '@vitejs/plugin-vue-jsx'

import { aliasOptions } from './options/aliasOptions'

export default {
  plugins: [
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
  ],
  alias: aliasOptions,
  define: "",
  root: process.cwd(),
  base: "/",
  mode: "dev",
  css: {
    modules: {},
    postcss: [],
    preprocessorOptions: {
      scss: {},
    },
  },
  json: {
    namedExports: true,
    stringify: false,
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  assetsInclude: "",
  dedupe: [],
  logLevel: "info", //'info' | 'warn' | 'error' | 'silent'
  clearScreen: true,
};

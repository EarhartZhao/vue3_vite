import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import aliasOptions from './options/aliasOptions'

export default {
  plugins: [vueJsx(), vue()],
  resolve: {
    alias: aliasOptions,
  },

  root: process.cwd(),
  base: "/",
  mode: "dev",
  json: {
    namedExports: true,
    stringify: false,
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  assetsInclude: "",
  // dedupe: [],
  // logLevel: "info", //'info' | 'warn' | 'error' | 'silent'
  clearScreen: true,
};

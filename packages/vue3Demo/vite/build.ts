import bytenode from 'rollup-plugin-bytenode'

export default {
  target: "modules",
  polyfillDynamicImport: false,
  outDir: "dist",
  assetsDir: "assets",
  assetsInlineLimit: 4096,
  cssCodeSplit: true,
  sourcemap: true,
  rollupOptions: {
    output: {
      compact: true,
      dir: "dist",
      format: "amd",
    },
    // input: "src/main.ts",
    // output: [
    //   {
    //     dir: "dist",
    //     file: "dist/main.js",
    //     format: "cjs",
    //     inlineDynamicImports: true,
    //   },
    // ],
    // plugins: [bytenode()],
  },
  brotliSize: false,
  chunkSizeWarningLimit: 1200,
  commonjsOptions: {},
  manifest: false,
  // minify: "terser",
  terserOptions: {},
  cleanCssOptions: {},
  write: true,
  emptyOutDir: true,
};

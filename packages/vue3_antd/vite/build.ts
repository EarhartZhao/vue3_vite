import bytenode from 'rollup-plugin-bytenode'

export default {
  target: "modules",
  polyfillDynamicImport: false,
  outDir: "dist",
  assetsDir: "assets",
  assetsInlineLimit: 512,
  cssCodeSplit: true,
  sourcemap: false,
  rollupOptions: {
    output: {
      compact: true,
      dir: "dist",
      format: "esm",
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

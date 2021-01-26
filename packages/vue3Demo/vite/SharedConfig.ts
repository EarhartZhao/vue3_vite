// import { join } from 'path'
import { SharedConfig } from 'vite'

import { aliasOptions } from './options/aliasOptions'

export const share_config: SharedConfig = {
  root: process.cwd(),
  alias: aliasOptions,
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  /**
   * Project root directory. Can be an absolute path, or a path relative from
   * the location of the config file itself.
   * @default process.cwd()
   */
  // root?: string
  /**
   * Import alias. The entries can either be exact request -> request mappings
   * (exact, no wildcard syntax), or request path -> fs directory mappings.
   * When using directory mappings, the key **must start and end with a slash**.
   *
   * Example `vite.config.js`:
   * ``` js
   * module.exports = {
   *   alias: {
   *     // alias package names
   *     'react': '@pika/react',
   *     'react-dom': '@pika/react-dom'
   *
   *     // alias a path to a fs directory
   *     // the key must start and end with a slash
   *     '/@foo/': path.resolve(__dirname, 'some-special-dir')
   *   }
   * }
   * ```
   */
  // alias?: Record<string, string>
  /**
   * Function that tests a file path for inclusion as a static asset.
   */
  // assetsInclude?: (file: string) => boolean
  /**
   * Define global variable replacements.
   * Entries will be defined on `window` during dev and replaced during build.
   */
  // define?: Record<string, any>
  /**
   * Configure dep optimization behavior.
   *
   * Example `vite.config.js`:
   * ``` js
   * module.exports = {
   *   optimizeDeps: {
   *     exclude: ['dep-a', 'dep-b']
   *   }
   * }
   * ```
   */
  // optimizeDeps?: DepOptimizationOptions
  /**
   * Options to pass to `@vue/compiler-dom`
   *
   * https://github.com/vuejs/vue-next/blob/master/packages/compiler-core/src/options.ts
   */
  // vueCompilerOptions?: CompilerOptions
  /**
   * Configure what tags/attributes to trasnform into asset url imports,
   * or disable the transform altogether with `false`.
   */
  // vueTransformAssetUrls?: SFCTemplateCompileOptions['transformAssetUrls']
  /**
   * The options for template block preprocessor render.
   */
  // vueTemplatePreprocessOptions?: Record<
  //   string,
  //   SFCTemplateCompileOptions['preprocessOptions']
  // >
  /**
   * Transform functions for Vue custom blocks.
   *
   * Example `vue.config.js`:
   * ``` js
   * module.exports = {
   *   vueCustomBlockTransforms: {
   *     i18n: src => `export default Comp => { ... }`
   *   }
   * }
   * ```
   */
  // vueCustomBlockTransforms?: Record<string, CustomBlockTransform>
  /**
   * Environment mode
   */
  // mode?: string
  /**
   * CSS preprocess options
   */
  // cssPreprocessOptions?: CssPreprocessOptions
  /**
   * CSS modules options
   */
  // cssModuleOptions?: SFCAsyncStyleCompileOptions['modulesOptions']
  /**
   * Environment variables parsed from .env files
   * only ones starting with VITE_ are exposed on `import.meta.env`
   * @internal
   */
  // env?: DotenvParseOutput
};

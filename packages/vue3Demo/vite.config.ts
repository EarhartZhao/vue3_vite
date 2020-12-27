import path from 'path'

module.exports = {
  /**
   * 在生产中服务时的基本公共路径。
   * @default '/'
   */
  base: '/',
  /**
   * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
   * @default 'dist'
   */
  outDir: 'dist',
  port: 3000,
  // 是否自动在浏览器打开
  open: true,
  // 是否开启 https
  https: false,
  // 服务端渲染
  ssr: false,
  // 引入第三方的配置 Configure dep optimization behavior
  optimizeDeps: {
    include: ['lodash'],
    // exclude: ['dep-a', 'dep-b']
  },
  alias: {
    // alias package names
    // 'react': '@pika/react',
    // 'react-dom': '@pika/react-dom',
    // 键必须以斜线开始和结束
    '/@/': path.resolve(__dirname, './src'),
    // '/@components/': path.resolve(__dirname, './src/components')
  },
  /*
    proxy配置
    https://blog.csdn.net/hbiao68/article/details/108972775
  */
  proxy: {
    // 如果是 /lsbdb 打头，则访问地址如下
    // '/lsbdb': 'http://1.1.1.1:8087',
    // 如果是 /lsbdb 打头，则访问地址如下
    // '/lsbdb': {
    //   target: 'http://1.1.1.1:8087/',
    //   changeOrigin: true,
    //   // rewrite: path => path.replace(/^\/lsbdb/, '')
    // }
  },
  // 转换Vue自定义块的功能
  // vueCustomBlockTransforms: {
  //   i18n: src => `export default Comp => { ... }`
  // },

}

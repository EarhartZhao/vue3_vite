import 'ant-design-vue/dist/antd.less'
// import './assets/styles/export/index.scss' // 全局scss
// import './assets/styles/default/index.scss' // 默认scss

import './assets/styles/default/index.less' // 默认scss
import './router/permission' //路由守卫
import './components/index' //全局组件

import { app } from './app'

app.mount("#app");

import 'element-plus/lib/theme-chalk/index.css'
import './assets/styles/export/index.scss' // 全局scss
import './assets/styles/default/index.scss' // 默认scss
import './router/permission' //路由守卫
import './components/index' //全局组件

import ElementPlus from 'element-plus'
import Particles from 'particles.vue3'

import { app } from './app'

app.use(Particles).use(ElementPlus).mount("#app");

import 'ant-design-vue/dist/antd.css';
import '/@/assets/styles/export/index.scss' // 全局scss
import '/@/assets/styles/default/index.scss' // 默认scss
import './router/permission' //路由守卫
import '/@comp/index' //全局组件

import Antd from 'ant-design-vue';
import Particles from 'particles.vue3'

import { app } from './app'
app.config.productionTip = false;

app.use(Particles).use(Antd).mount("#app");

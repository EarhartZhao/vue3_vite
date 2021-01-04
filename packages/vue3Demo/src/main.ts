import 'element-plus/lib/theme-chalk/index.css'
import '/@/assets/styles/export/index.scss' // 全局scss
import '/@/assets/styles/default/index.scss' // 默认scss
import './router/permission' //路由守卫
import '/@comp/index' //组件

// axios.defaults.adapter = require('axios/lib/adapters/http');
// import axios from "axios";
import ElementPlus from 'element-plus'
import Particles from 'particles.vue3'

import { app } from './app'
import router from './router/'

app.use(Particles).use(ElementPlus).use(router).mount("#app");

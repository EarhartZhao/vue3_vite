import 'element-plus/lib/theme-chalk/index.css'
import '/@/assets/styles/export/index.scss' // 全局scss
import '/@/assets/styles/default/index.scss' // 默认scss
import './router/permission'

// import axios from "axios";
import ElementPlus from 'element-plus'
import Particles from 'particles.vue3'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router/'

// axios.defaults.adapter = require('axios/lib/adapters/http');

const app = createApp(App);
app.use(Particles).use(ElementPlus).use(router).mount("#app");

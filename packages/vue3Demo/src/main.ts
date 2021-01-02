import 'element-plus/lib/theme-chalk/index.css'
import '/@/assets/styles/index.scss' // 全局css
import './router/permission'

// import axios from "axios";
import ElementPlus from 'element-plus'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router/'

// axios.defaults.adapter = require('axios/lib/adapters/http');

const app = createApp(App);
app.use(ElementPlus).use(router).mount("#app");

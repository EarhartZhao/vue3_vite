import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
// import axios from 'axios';
// axios.defaults.adapter = require('axios/lib/adapters/http');

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')

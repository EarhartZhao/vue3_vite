import strong from '@utils/stronge'
// axios.defaults.adapter = require('axios/lib/adapters/http');
import {axios} from './assets/axios/index'
import { createApp } from 'vue'

// import App from './App.vue'
import App from './AppMain.vue'
import router from './router/'
import { key, store } from './store/index'

export const app = createApp(App).use(router).use(store, key);

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $router: router;
    $store: store;
    $strong: strong;
    $axios: axios;
  }
}

app.config.globalProperties.$router = router;
app.config.globalProperties.$store = store;
app.config.globalProperties.$strong = strong;
app.config.globalProperties.$axios = axios;

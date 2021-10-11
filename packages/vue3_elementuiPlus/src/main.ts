import 'element-plus/dist/index.css'
import './assets/styles/export/index.scss' // 全局scss
import './assets/styles/default/index.scss' // 默认scss
import './router/permission' //路由守卫
import './components/index' //全局组件
import 'dayjs/locale/zh-cn'

// import { createRequire } from 'module'
// const require = createRequire(import.meta.url);
// import './assets/mock/index';

// import { ElButton } from 'element-plus'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import Particles from 'particles.vue3'

// if (process.env.NODE_ENV === 'dev_mock') createRequire('./assets/mock/index')
if (process.env.NODE_ENV === 'dev') import('./assets/mock/index')

import { app } from './app'

app.use(Particles).use(ElementPlus, { size: "small", locale }).mount("#app");
// app.use(Particles).use(ElementPlus, { size: "small" }).mount("#app");
// app.config.globalProperties.$ELEMENT = { size: 'small' }
// app.use(Particles).use(ElButton).mount("#app");

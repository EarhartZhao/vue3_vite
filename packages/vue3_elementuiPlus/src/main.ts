import 'element-plus/dist/index.css'
import './assets/styles/export/index.scss' // 全局scss
import './assets/styles/default/index.scss' // 默认scss
import './router/permission' //路由守卫
import './components/index' //全局组件
import 'dayjs/locale/zh-cn'

// import { ElButton } from 'element-plus'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import Particles from 'particles.vue3'

import { app } from './app'

app.use(Particles).use(ElementPlus, { size: "small", locale }).mount("#app");
// app.use(Particles).use(ElementPlus, { size: "small" }).mount("#app");
// app.config.globalProperties.$ELEMENT = { size: 'small' }
// app.use(Particles).use(ElButton).mount("#app");

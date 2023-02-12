import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { reloadStore } from './store'
import { registerApp } from './global'
import 'normalize.css'
import './assets/css/index.less'
const app = createApp(App)
// 注册一些组件
app.use(registerApp)
app.use(store)
// reloadStores放在路由注册后面会有bug 会出现路由匹配不到正确页面的情况
reloadStore()
app.use(router)
app.mount('#app')

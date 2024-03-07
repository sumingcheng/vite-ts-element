import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router';
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import i18n from "@/locales";

// style
import '@/assets/less/normalize.less'
import 'element-plus/dist/index.css'

// mount
const app = createApp(App)

app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(i18n)
app.mount('#root')

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from '@/router'
import i18n from '@/locales'

// style
import '@/assets/less/normalize.less'
import 'element-plus/dist/index.css'

// mount
const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(i18n)
app.mount('#root')

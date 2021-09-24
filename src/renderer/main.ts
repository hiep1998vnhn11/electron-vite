import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import { errorHandler } from './error'
import store from './store'
import PerfectScrollbar from 'vue3-perfect-scrollbar'

import { i18n } from './i18n'

import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

const bootstrap = () => {
  const app = createApp(App)
  app.use(ElementPlus, { i18n: i18n.global.t })
  app.use(PerfectScrollbar)
  app.use(router)
  app.use(store)
  app.use(i18n)
  errorHandler(app)
  app.mount('#app')
}

bootstrap()

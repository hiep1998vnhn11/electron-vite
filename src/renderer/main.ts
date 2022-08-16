import { createApp } from 'vue'

import './styles/index.scss'
import './assets/scss/index.scss'
import App from './App.vue'
import router from './router'
import { errorHandler } from './error'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import { createPinia } from 'pinia'
import { defineAppComponent } from '@renderer/components/App'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import './utils/request'

const bootstrap = () => {
  const app = createApp(App)
  defineAppComponent(app)
  app.use(PerfectScrollbar)
  app.use(router)
  app.use(createPinia())
  errorHandler(app)
  app.mount('#app')
}

bootstrap()

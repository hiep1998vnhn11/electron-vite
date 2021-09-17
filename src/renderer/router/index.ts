import { createRouter, createWebHashHistory } from 'vue-router'
import routerMap from './constantRouterMap'
import setupPerformance from './middleware/permission'
const router = createRouter({
  history: createWebHashHistory(),
  routes: routerMap,
})

setupPerformance(router)

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import routerMap from './constantRouterMap'
import setupPerformance from './middleware/permission'
import workspaceMiddleware from './middleware/workspace'

const router = createRouter({
  history: createWebHashHistory(),
  routes: routerMap,
})

// setupPerformance(router)
workspaceMiddleware(router)
export default router

import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/:pathMatch(.*)*', component: () => import('@renderer/views/404.vue') },
  { path: '/', name: 'Landing', component: () => import('@renderer/components/LandingPage.vue') },
]

export default routes

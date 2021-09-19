import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/:pathMatch(.*)*', component: () => import('@renderer/views/404.vue') },
  { path: '/', name: 'Landing', component: () => import('@renderer/components/LandingPage.vue') },
  { path: '/test', name: 'Test', component: () => import('@renderer/pages/Test.vue') },
  { path: '/download', name: 'Download', component: () => import('@renderer/pages/Download.vue') },
  { path: '/edit', name: 'Edit', component: () => import('@renderer/pages/Edit.vue') },
  { path: '/message', name: 'Message', component: () => import('@renderer/pages/Message.vue') },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('@renderer/pages/Notifications.vue'),
  },
  { path: '/search', name: 'Search', component: () => import('@renderer/pages/Search.vue') },
  { path: '/setting', name: 'Setting', component: () => import('@renderer/pages/Setting.vue') },
  { path: '/share', name: 'Share', component: () => import('@renderer/pages/Share.vue') },
  { path: '/user', name: 'User', component: () => import('@renderer/pages/User.vue') },
]

export default routes

import { RouteRecordRaw } from 'vue-router'

const defaultLayout = () => import('@renderer/layouts/default.vue')
const signinLayout = () => import('@renderer/layouts/signin.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@renderer/views/404.vue'),
  },
  {
    path: '/',
    name: 'DefaultLayout',
    component: defaultLayout,
    meta: {
      workspace: true,
    },
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('@renderer/pages/index.vue'),
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@renderer/pages/profile.vue'),
      },
      {
        path: 'channel/:id',
        name: 'channel',
        component: () => import('@renderer/pages/channel.vue'),
      },
      {
        path: 'member/:id',
        name: 'member',
        component: () => import('@renderer/pages/member.vue'),
      },
    ],
  },

  {
    path: '/signin',
    name: 'SigninLayout',
    component: signinLayout,
    children: [
      {
        path: '',
        name: 'signin',
        component: () => import('@renderer/pages/signin.vue'),
        meta: {
          guest: true,
        },
      },
      {
        path: 'workspace',
        name: 'workspace',
        meta: {
          auth: true,
        },
        component: () => import('@renderer/pages/workspace.vue'),
      },
    ],
  },
]

export default routes

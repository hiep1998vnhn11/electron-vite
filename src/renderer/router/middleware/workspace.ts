import type { Router } from 'vue-router'

export default function workspaceMiddleware(router: Router) {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const workspaceStore = useWorkspaceStore()
    if (to.matched.some((record) => record.meta.guest)) {
      if (userStore.currentUser) {
        next('/')
      }
    }

    if (to.matched.some((record) => record.meta.auth)) {
      if (!userStore.currentUser) {
        next({
          path: '/signin',
          query: { redirect: to.fullPath },
        })
      }
    }
    if (to.matched.some((record) => record.meta.workspace)) {
      if (!workspaceStore.workspace) return next('/signin')
      workspaceStore.fetchChannel()
      workspaceStore.fetchMember()
    }

    return next()
  })
}

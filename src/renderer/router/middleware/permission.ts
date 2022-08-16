import Performance from '@renderer/utils/performance'
import type { Router } from 'vue-router'

export default function setupPerformance(router: Router) {
  router.beforeEach((to, from, next) => {
    const end = Performance.startExecute(
      `${from.path} => ${to.path} Xác định đinh tuyến thời gian`
    )
    next()
    setTimeout(() => {
      end()
    }, 0)
  })
}

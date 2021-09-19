import { useRouter } from 'vue-router'
import { isString } from '@renderer/utils/is'
import type { RouteLocationRaw } from 'vue-router'
import { PageEnum } from '@renderer/enums/pageEnum'
export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum }
function handleError(e: Error) {
  console.error(e)
}
export default function useGo() {
  const router = useRouter()
  const { push, replace } = router
  const go = (
    opt: PageEnum | RouteLocationRawEx | string | { name: string } = PageEnum.BASE_HOME,
    isReplace = false
  ) => {
    if (!opt) {
      return
    }
    if (isString(opt)) {
      isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError)
    } else {
      const o = opt as RouteLocationRaw
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError)
    }
  }
  return go
}

import { useDebounce } from '@vueuse/core'
import type { Ref, WatchOptions } from 'vue'
import { watch, ref } from 'vue'
export default function (
  refValue: Ref<any>,
  delay: number = 0,
  cb: (...arg) => any,
  options: WatchOptions = {
    immediate: true,
  }
) {
  const debounced = useDebounce(refValue, delay)
  const updated = ref(0)
  watch(
    () => debounced.value,
    () => cb(),
    options
  )
  const reset = () => (updated.value = 0)
  return [updated, reset]
}

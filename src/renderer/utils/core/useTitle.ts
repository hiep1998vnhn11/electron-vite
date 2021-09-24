import { isString } from '../is'
import type { MaybeRef } from '../types'
import { ref, watch } from 'vue'
import { ConfigurableDocument, defaultDocument } from '../_configure'
import { useMutationObserver } from './useMutationObserver'

export interface UseTitleOptions extends ConfigurableDocument {
  /**
   * Observe `document.title` changes using MutationObserve
   *
   * @default false
   */
  observe?: boolean
}

export function useTitle(
  newTitle: MaybeRef<string | null | undefined> = null,
  options: UseTitleOptions = {}
) {
  const { document = defaultDocument, observe = false } = options
  const title = ref(newTitle ?? document?.title ?? null)

  watch(
    title,
    (t, o) => {
      if (isString(t) && t !== o && document) document.title = t
    },
    { immediate: true }
  )

  if (observe && document) {
    useMutationObserver(
      document.head?.querySelector('title'),
      () => {
        if (document && document.title !== title.value) title.value = document.title
      },
      { childList: true }
    )
  }

  return title
}

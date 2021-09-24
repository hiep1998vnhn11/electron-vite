import { isString, MaybeRef } from '@vueuse/shared'
import { ref, watch, isRef } from 'vue'
import { ConfigurableDocument, defaultDocument } from '../_configure'

export interface FaviconOptions extends ConfigurableDocument {
  baseUrl?: string
  rel?: string
}

export function useFavicon(
  newIcon: MaybeRef<string | null | undefined> = null,
  options: FaviconOptions = {}
) {
  const { baseUrl = '', rel = 'icon', document = defaultDocument } = options

  const favicon = isRef(newIcon) ? newIcon : ref<string | null>(newIcon)

  const applyIcon = (icon: string) => {
    document?.head
      .querySelectorAll<HTMLLinkElement>(`link[rel*="${rel}"]`)
      .forEach((el) => (el.href = `${baseUrl}${icon}`))
  }

  watch(
    favicon,
    (i, o) => {
      if (isString(i) && i !== o) applyIcon(i)
    },
    { immediate: true }
  )

  return favicon
}

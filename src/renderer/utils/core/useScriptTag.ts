import { noop } from '../is'
import type { MaybeRef } from '../types'
import { ref, unref } from 'vue-demi'
import { ConfigurableDocument, defaultDocument } from '../_configure'
import { tryOnMounted, tryOnUnmounted } from '../vueHelper'

export interface UseScriptTagOptions extends ConfigurableDocument {
  /**
   * Load the script immediately
   *
   * @default true
   */
  immediate?: boolean

  /**
   * Add `async` attribute to the script tag
   *
   * @default true
   */
  async?: boolean

  /**
   * Script type
   *
   * @default 'text/javascript'
   */
  type?: string

  /**
   * Manual controls the timing of loading and unloading
   *
   * @default false
   */
  manual?: boolean

  crossOrigin?: 'anonymous' | 'use-credentials'
  referrerPolicy?:
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
  noModule?: boolean
  defer?: boolean
}

export function useScriptTag(
  src: MaybeRef<string>,
  onLoaded: (el: HTMLScriptElement) => void = noop,
  options: UseScriptTagOptions = {}
) {
  const {
    immediate = true,
    manual = false,
    type = 'text/javascript',
    async = true,
    crossOrigin,
    referrerPolicy,
    noModule,
    defer,
    document = defaultDocument,
  } = options
  const scriptTag = ref<HTMLScriptElement | null>(null)

  let _promise: Promise<HTMLScriptElement | boolean> | null = null

  const loadScript = (waitForScriptLoad: boolean): Promise<HTMLScriptElement | boolean> =>
    new Promise((resolve, reject) => {
      // Some little closure for resolving the Promise.
      const resolveWithElement = (el: HTMLScriptElement) => {
        scriptTag.value = el
        resolve(el)
        return el
      }

      // Check if document actually exists, otherwise resolve the Promise (SSR Support).
      if (!document) {
        resolve(false)
        return
      }

      // Local variable defining if the <script> tag should be appended or not.
      let shouldAppend = false

      let el = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement

      // Script tag not found, preparing the element for appending
      if (!el) {
        el = document.createElement('script')
        el.type = type
        el.async = async
        el.src = unref(src)

        // Optional attributes
        if (defer) el.defer = defer
        if (crossOrigin) el.crossOrigin = crossOrigin
        if (noModule) el.noModule = noModule
        if (referrerPolicy) el.referrerPolicy = referrerPolicy

        // Enables shouldAppend
        shouldAppend = true
      }
      // Script tag already exists, resolve the loading Promise with it.
      else if (el.hasAttribute('data-loaded')) {
        resolveWithElement(el)
      }

      // Event listeners
      el.addEventListener('error', (event) => reject(event))
      el.addEventListener('abort', (event) => reject(event))
      el.addEventListener('load', () => {
        el.setAttribute('data-loaded', 'true')

        onLoaded(el)
        resolveWithElement(el)
      })

      // Append the <script> tag to head.
      if (shouldAppend) el = document.head.appendChild(el)

      // If script load awaiting isn't needed, we can resolve the Promise.
      if (!waitForScriptLoad) resolveWithElement(el)
    })

  const load = (waitForScriptLoad = true): Promise<HTMLScriptElement | boolean> => {
    if (!_promise) _promise = loadScript(waitForScriptLoad)

    return _promise
  }

  const unload = () => {
    if (!document) return

    _promise = null

    if (scriptTag.value) {
      document.head.removeChild(scriptTag.value)
      scriptTag.value = null
    }
  }

  if (immediate && !manual) tryOnMounted(load)

  if (!manual) tryOnUnmounted(unload)

  return { scriptTag, load, unload }
}

export type UseScriptTagReturn = ReturnType<typeof useScriptTag>

import { tryOnScopeDispose } from '../vueHelper'
import { watch } from 'vue'
import { MaybeElementRef, unrefElement } from './unrefElement'
import { ConfigurableWindow, defaultWindow } from '../_configure'

export interface MutationObserverOptions extends MutationObserverInit, ConfigurableWindow {}

export function useMutationObserver(
  target: MaybeElementRef,
  callback: MutationCallback,
  options: MutationObserverOptions = {}
) {
  const { window = defaultWindow, ...mutationOptions } = options
  let observer: MutationObserver | undefined
  const isSupported = window && 'IntersectionObserver' in window

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  const stopWatch = watch(
    () => unrefElement(target),
    (el) => {
      cleanup()

      if (isSupported && window && el) {
        // @ts-expect-error missing type
        observer = new window.MutationObserver(callback)
        observer!.observe(el, mutationOptions)
      }
    },
    { immediate: true }
  )

  const stop = () => {
    cleanup()
    stopWatch()
  }

  tryOnScopeDispose(stop)

  return {
    isSupported,
    stop,
  }
}

export type UseMutationObserverReturn = ReturnType<typeof useMutationObserver>

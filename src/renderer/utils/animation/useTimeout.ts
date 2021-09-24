import { computed, ComputedRef } from 'vue'
import { useTimeoutFn, TimeoutFnOptions } from './useTimeoutFn'
import type { Stopable } from '../types'
import { noop } from '../is'

export interface TimeoutOptions<Controls extends boolean> extends TimeoutFnOptions {
  /**
   * Expose more controls
   *
   * @default false
   */
  controls?: Controls
}

export function useTimeout(interval?: number, options?: TimeoutOptions<false>): ComputedRef<boolean>
export function useTimeout(
  interval: number,
  options: TimeoutOptions<true>
): { ready: ComputedRef<boolean> } & Stopable
export function useTimeout(interval = 1000, options: TimeoutOptions<boolean> = {}) {
  const { controls: exposeControls = false } = options

  const controls = useTimeoutFn(noop, interval, options)

  const ready = computed(() => !controls.isPending.value)

  if (exposeControls) {
    return {
      ready,
      ...controls,
    }
  } else {
    return ready
  }
}

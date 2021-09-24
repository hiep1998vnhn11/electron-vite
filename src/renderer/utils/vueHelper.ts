import {
  getCurrentInstance,
  getCurrentScope,
  onUnmounted,
  onMounted,
  onBeforeMount,
  onBeforeUnmount,
  onScopeDispose,
} from 'vue'
import type { Fn } from './types'

export function tryOnUnmounted(fn: Fn) {
  if (getCurrentInstance()) onUnmounted(fn)
}

export function tryOnMounted(fn: Fn) {
  if (getCurrentInstance()) onMounted(fn)
}

export function tryOnBeforeMount(fn: Fn) {
  if (getCurrentInstance()) onBeforeMount(fn)
}

export function tryOnBeforeUnmount(fn: Fn) {
  if (getCurrentInstance()) onBeforeUnmount(fn)
}

export function tryOnScopeDispose(fn: Fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}

import type { Ref } from 'vue'
interface AnyObject {
  [key: string]: any
}

interface memoryInfo {
  jsHeapSizeLimit: number
  totalJSHeapSize: number
  usedJSHeapSize: number
}

interface Window {
  performance: {
    memory: memoryInfo
  }
  __lib: string
  __static: string
}

declare interface ImportMetaEnv {
  VITE_USE_MOCK: boolean
  VITE_USE_PWA: boolean
  VITE_PUBLIC_PATH: string
  VITE_GLOB_APP_TITLE: string
  VITE_GLOB_APP_SHORT_NAME: string
  VITE_USE_CDN: boolean
  VITE_DROP_CONSOLE: boolean
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  VITE_LEGACY: boolean
  VITE_USE_IMAGEMIN: boolean
  VITE_GENERATE_UI: string
  VITE_LOGIN_SAPO: string
  VITE_SYNC_LIMIT: string
}

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}

declare type RefType<T> = T | null

declare type LabelValueOptions = {
  label: string
  value: any
  [key: string]: string | number | boolean
}[]

declare type EmitType = (event: string, ...args: any[]) => void

declare type TargetContext = '_self' | '_blank'

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare type Nullable<T> = T | null

declare type MaybeRef<T> = T | Ref<T>
declare function tryOnScopeDispose(fn: Fn): boolean

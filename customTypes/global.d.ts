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

declare interface ViteEnv {
  VITE_PORT: number
  VITE_USE_MOCK: boolean
  VITE_USE_PWA: boolean
  VITE_PUBLIC_PATH: string
  VITE_PROXY: [string, string][]
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

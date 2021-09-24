import { getStorageShortName, isProdMode } from '../env'
import { createStorage as create, CreateStorageParams } from './storageCache'

const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7
export type Options = Partial<CreateStorageParams>

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    hasEncrypt: isProdMode(),
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  }
}

export const WebStorage = create(createOptions(sessionStorage))

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options))
}

export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}

export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}

export default WebStorage

import type { MaybeRef } from '../types'
import { createFilterWrapper, debounceFilter } from '../filters'
import type { FunctionArgs } from '../filters'

export function useDebounceFn<T extends FunctionArgs>(fn: T, ms: MaybeRef<number> = 200): T {
  return createFilterWrapper(debounceFilter(ms), fn)
}

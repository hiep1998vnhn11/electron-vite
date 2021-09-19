export const toBoolean = (value: any) => {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') return value === 'true'
  return !!value
}

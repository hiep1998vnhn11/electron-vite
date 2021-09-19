export const getItem = (key: string) => {
  try {
    const json = localStorage.getItem(key)
    return JSON.parse(json)
  } catch (err) {
    localStorage.removeItem(key)
    return null
  }
}

export const setItem = (key: string, value: any) => {
  try {
    const json = JSON.stringify(value)
    localStorage.setItem(key, json)
    return true
  } catch (err) {
    return false
  }
}

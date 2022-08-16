import { defineStore } from 'pinia'
import { login as loginApi, CurrentUser } from '@renderer/api/auth'
import router from '@renderer/router'

const getCurrentUser = (): CurrentUser | null => {
  try {
    const storage = window.localStorage.getItem('currentUser')
    return storage ? (JSON.parse(storage) as CurrentUser) : null
  } catch (error) {
    console.error(error)
    return null
  }
}
export const useUserStore = defineStore('user', () => {
  const currentUser = ref<CurrentUser | null>(getCurrentUser())
  const token = ref<string | null>(localStorage.getItem('access_token') || null)

  const login = async (params) => {
    try {
      if (!params.email || !params.password) return
      const response: {
        access_token: string
        refresh_token: string
        user: CurrentUser
        expires_in: number
      } = await loginApi(params)
      localStorage.setItem('access_token', response.access_token)
      localStorage.setItem('refresh_token', response.refresh_token)
      localStorage.setItem('currentUser', JSON.stringify(response.user))
      token.value = response.access_token
      currentUser.value = response.user
      router.push('/signin/workspace')
    } catch (error) {
      console.log(error)
    }
  }
  const logout = () => {
    localStorage.clear()
    token.value = null
    currentUser.value = null
    // router.push('/login')
    window.location.reload()
  }

  const setUser = (user: CurrentUser | null) => {
    currentUser.value = user
    // user
    //   ? localStorage.setItem('currentUser', JSON.stringify(user))
    //   : localStorage.removeItem('currentUser')
  }

  return {
    currentUser,
    login,
    logout,
    setUser,
    token,
  }
})

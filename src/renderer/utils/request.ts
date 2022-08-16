import axios from 'axios'

declare module 'axios' {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

const serves = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 5000,
})

serves.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

serves.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    if (err.message.includes('timeout')) {
    }
    if (err.message.includes('Network Error')) {
    }
    return Promise.reject(err)
  }
)

export default serves

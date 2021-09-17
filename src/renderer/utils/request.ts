import axios from 'axios'
import { ElMessage } from 'element-plus'
const serves = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
})

serves.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => Promise.reject(err)
)

serves.interceptors.response.use(
  (res) => {
    if (res.data.code === 50000) {
      ElMessage.error(res.data.data)
    }
    return res
  },
  (err) => {
    if (err.message.includes('timeout')) {
      console.log('错误回调', err)
      ElMessage.error('网络超时')
    }
    if (err.message.includes('Network Error')) {
      console.log('错误回调', err)
      ElMessage.error('服务端未启动，或网络连接错误')
    }
    return Promise.reject(err)
  }
)

export default serves

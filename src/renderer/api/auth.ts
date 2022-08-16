import request from '@renderer/utils/request'
export interface CurrentUser {
  _id: string
  email: string
  created_at: string
  updated_at: string
  name: string
  platform_code?: string
  avatar_url?: string
}
export function login(data: { email: string; password: string }) {
  return request({
    url: 'auth/login',
    method: 'post',
    data,
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token },
  })
}

export function uploadAvatar(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    url: 'auth/upload-avatar',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

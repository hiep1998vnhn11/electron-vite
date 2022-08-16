import request from '@renderer/utils/request'
export interface Channel {
  createdAt: string
  updatedAt: string
  members: string[]
  name: string
  type?: string
  avatar_url?: string
  workspace: string
  user: string
  is_private: boolean
  description: string
  _id: string
}

export interface CreateChannelParams {
  workspace: string
  name: string
  description?: string | null
  is_private: boolean
}
export function create(data: CreateChannelParams) {
  return request({
    url: 'channel',
    method: 'post',
    data,
  })
}

export function deleteChannel(id: string) {
  return request({
    url: `channel/${id}`,
    method: 'delete',
  })
}

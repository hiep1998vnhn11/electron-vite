import request from '@renderer/utils/request'
export interface CurrentUser {
  id: number
  email: string
  created_at: string
  updated_at: string
  name: string
  platform_code?: string
}
export function getList() {
  return request({
    url: 'workspace',
    method: 'get',
  })
}

export function getChannels(workspace: string) {
  return request({
    url: 'workspace/' + workspace + '/channels',
    method: 'get',
  })
}

export function getMembers(workspace: string) {
  return request({
    url: 'workspace/' + workspace + '/members',
    method: 'get',
  })
}

export function inviteMember(workspace: string, email: string) {
  return request({
    url: 'workspace/' + workspace + '/invite',
    method: 'post',
    data: { email },
  })
}
export function removeMember(workspace: string, user_id: string) {
  return request({
    url: 'workspace/' + workspace + '/removeMember',
    method: 'post',
    data: { user_id },
  })
}

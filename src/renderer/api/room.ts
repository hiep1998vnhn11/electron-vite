import request from '@renderer/utils/request'
export interface Room {
  createdAt: string
  updatedAt: string
  members: string[]
  name: string
  type?: string
  workspace: string
  user: string
  _id: string
}

export interface ShowRoomData {
  workspace_id: string
  user_id: string
}
export interface CreateMessageData {
  content?: string
  file?: File
  room_id: string
}

export interface Message {
  createdAt: Date
  updatedAt: Date
  user: {
    email: string
    full_name: string
    avatar_url: string
  }
  content: string
  room: string
  file?: {
    name: string
    size: number
    type: string
    ext: string
    path: string
    updatedAt: Date
  }
  _id: string
}

export function showRoom(params: ShowRoomData) {
  return request({
    url: 'room',
    method: 'get',
    params,
  })
}

export function createMessage(data: CreateMessageData) {
  if (data.file) {
    const formData = new FormData()
    formData.append('file', data.file)
    return request({
      url: 'room/' + data.room_id,
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
  return request({
    url: 'room/' + data.room_id,
    method: 'post',
    data: {
      content: data.content,
    },
  })
}

export function getMessages(roomId: string) {
  return request({
    url: `room/${roomId}`,
    method: 'get',
  })
}

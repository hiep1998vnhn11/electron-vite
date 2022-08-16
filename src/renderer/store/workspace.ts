import { defineStore } from 'pinia'
import {
  getChannels,
  getMembers,
  inviteMember as inviteMemberApi,
  removeMember as removeMemberApi,
} from '@renderer/api/workspace'
import {
  create as createChannelApi,
  Channel,
  deleteChannel as deleteChannelApi,
} from '@renderer/api/channel'
export interface Workspace {
  _id: string
  name: string
  slug: string
}
const getWorkspace = (): Workspace | null => {
  try {
    const storage = window.localStorage.getItem('workspace')
    return storage ? (JSON.parse(storage) as Workspace) : null
  } catch (error) {
    console.error(error)
    return null
  }
}
export const useWorkspaceStore = defineStore('workspace', () => {
  const workspace = ref(getWorkspace())
  const channels = ref<Channel[]>([])
  const members = ref<any[]>([])
  const loadingChannels = ref(false)
  const loadingMembers = ref(false)

  const fetchChannel = async (refresh = false) => {
    if (!unref(workspace)) return
    if (!refresh && unref(channels).length) return
    try {
      loadingChannels.value = true
      const response = await getChannels(unref(workspace)._id)
      if (response.success && response.data) {
        channels.value = response.data
      }
    } catch (error) {
      console.error(error)
    } finally {
      loadingChannels.value = false
    }
  }

  const fetchMember = async (refresh = false) => {
    if (!unref(workspace)) return
    if (!refresh && unref(members).length) return
    try {
      loadingMembers.value = true
      const response = await getMembers(unref(workspace)._id)
      if (response.success && response.data) {
        members.value = response.data
      }
    } catch (error) {
      console.error(error)
    } finally {
      loadingMembers.value = false
    }
  }

  const createChannel = async (data: {
    name: string
    description: string
    is_private: boolean
  }) => {
    if (!unref(workspace)) return
    try {
      const response = await createChannelApi({
        ...data,
        workspace: unref(workspace)._id,
      })
      if (response.success && response.data) {
        channels.value.push(response.data as Channel)
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
  const inviteMember = async (email: string) => {
    if (!unref(workspace)) return
    try {
      const response = await inviteMemberApi(unref(workspace)._id, email)
      if (response.success && response.data) {
        members.value.push(response.data)
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
  const deleteChannel = async (id: string) => {
    if (!unref(workspace)) return
    try {
      const response = await deleteChannelApi(id)
      if (response.success) {
        channels.value = channels.value.filter((channel) => channel._id !== id)
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const removeMember = async (id: string) => {
    if (!unref(workspace)) return
    try {
      const response = await removeMemberApi(unref(workspace)._id, id)
      if (response.success) {
        members.value = members.value.filter((channel) => channel._id !== id)
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const setWorkspace = (value: Workspace | null) => {
    workspace.value = value
    value
      ? localStorage.setItem('workspace', JSON.stringify(value))
      : localStorage.removeItem('workspace')
  }
  return {
    setWorkspace,
    workspace,
    fetchChannel,
    createChannel,
    channels,
    loadingChannels,
    deleteChannel,
    fetchMember,
    loadingMembers,
    members,
    inviteMember,
    removeMember,
  }
})

import { defineStore } from 'pinia'
import { io, Socket } from 'socket.io-client'

export const useSocket = defineStore('socket', () => {
  const userStore = useUserStore()
  const workspaceStore = useWorkspaceStore()
  const socket = ref<Socket | null>(null)
  watch(
    () => userStore.token,
    (token) => {
      if (token) {
        socket.value = io('http://localhost:3000', {
          auth: {
            token,
          },
        })
      } else if (socket) {
        socket.value.disconnect()
        socket.value = null
      }
    },
    {
      immediate: true,
    }
  )

  watch(
    () => workspaceStore.workspace,
    (workspace, oldWorkspace) => {
      if (oldWorkspace) {
        socket.value?.emit('leaveWorkspace', oldWorkspace._id)
      }
      if (workspace) {
        socket.value?.emit('workspace', workspace._id)
      }
    },
    { immediate: true }
  )
  return {
    socket,
  }
})

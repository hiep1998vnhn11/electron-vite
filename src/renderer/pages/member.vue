<script setup lang="ts">
import { showRoom, Room, createMessage, getMessages } from '@renderer/api/room'
import MessageInput from '@renderer/components/Message/MessageInput.vue'
import MessageRow from '@renderer/components/Message/MessageRow.vue'
import MessageContent from '@renderer/components/Message/MessageContent.vue'

const route = useRoute()
const router = useRouter()
const workspaceStore = useWorkspaceStore()
const userStore = useUserStore()
const socketStore = useSocket()
const workspace = computed(() => workspaceStore.workspace)
const member = computed(() => {
  const memberId = route.params.id
  if (userStore.currentUser._id === memberId) {
    return userStore.currentUser
  }
  return workspaceStore.members.find((channel) => channel._id === memberId)
})
const loading = ref(true)
const room = ref<Room | null>(null)
const content = ref('')
const messages = ref([])
const loadingMessage = ref(false)
const loadingFetchMessage = ref(true)

const fetchRoom = async (user_id: string) => {
  if (!unref(workspace)) return
  try {
    loading.value = true
    const response = await showRoom({
      workspace_id: unref(workspace)._id,
      user_id,
    })
    if (response.success && response.data) {
      room.value = response.data as Room
      fetchMessages()
    } else {
      room.value = null
    }
  } catch (error) {
    console.log(error)
    room.value = null
  } finally {
    loading.value = false
  }
}

const fetchMessages = async () => {
  if (!unref(room)) return
  try {
    loadingFetchMessage.value = true
    const response = await getMessages(unref(room)._id)
    if (response.success && response.data) {
      messages.value = [...response.data, ...unref(messages)]
    }
  } catch (error) {
    console.log(error)
  } finally {
    loadingFetchMessage.value = false
  }
}

const sendMessage = async () => {
  if (!unref(room) || !unref(content)) return
  try {
    loadingMessage.value = true
    const response = await createMessage({
      content: unref(content),
      room_id: unref(room)._id,
    })
    if (response.success && response.data) {
      socketStore.socket.emit('message', {
        ...response.data,
        to: unref(member)._id,
        room_id: unref(room)._id,
      })
      messages.value.unshift(response.data)
      content.value = ''
    }
  } catch (error) {
    console.log(error)
  } finally {
    loadingMessage.value = false
  }
}

watch(
  () => member.value,
  (value) => {
    if (!value) return
    messages.value = []
    fetchRoom(value._id)
  },
  {
    immediate: true,
  }
)
</script>
<template>
  <div class="room">
    <MessageContent :messages="messages" :room="room" />
    <MessageInput v-model="content" @send="sendMessage" />
  </div>
</template>
<style lang="scss" scoped>
.room {
  display: flex;
  flex-direction: column;
  height: 100%;
  &-content {
  }
}
</style>

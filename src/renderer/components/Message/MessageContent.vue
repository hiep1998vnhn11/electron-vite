<script setup lang="ts">
import MessageRow from './MessageRow.vue'
import type { Message, Room } from '@renderer/api/room'
import type { PropType } from 'vue'
const props = defineProps({
  messages: {
    type: Array as PropType<Message[]>,
    default: () => [],
  },
  room: {
    type: Object as PropType<Room | null>,
    default: null,
  },
})
const contentRef = ref<HTMLDivElement | null>(null)

const scrollToBottom = () => {
  if (!unref(contentRef)) return
  unref(contentRef).scrollTop = unref(contentRef).scrollHeight
}
watch(
  () => props.messages,
  async () => {
    await nextTick()
    scrollToBottom()
  },
  {
    immediate: true,
  }
)
</script>
<template>
  <div ref="contentRef" class="room-content">
    <MessageRow
      v-for="message in messages"
      :key="message._id"
      :message="message"
    />
  </div>
</template>
<style lang="scss" scoped>
.room-content {
  flex: 1;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
}
</style>

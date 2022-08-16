<script setup lang="ts">
import type { Message } from '@renderer/api/room'
import type { PropType } from 'vue'
import ShareIcon from '~icons/ion/share-social-outline'
import BookmarkIcon from '~icons/ion/bookmark-outline'
import EyeIcon from '~icons/ion/eye-outline'
import CheckmarkIcon from '~icons/ion/checkmark-outline'
import ChatboxIcon from '~icons/ion/chatbox-outline'
import HandIcon from '~icons/ion/hand-right-outline'
import MenuIcon from '~icons/ion/ellipsis-vertical-outline'

const props = defineProps({
  message: {
    type: Object as PropType<Message>,
    required: true,
  },
})
</script>
<template>
  <div class="message-row">
    <div class="message-row-avatar">
      <img :src="message.user.avatar_url" />
    </div>
    <div class="message-row-content">
      <div>
        {{ message.user.full_name || message.user.email }}
      </div>
      {{ message.content }}
    </div>
    <div class="message-row-toolbar">
      <button class="action">
        <CheckmarkIcon />
      </button>
      <button class="action">
        <EyeIcon />
      </button>
      <button class="action">
        <HandIcon />
      </button>

      <button class="action">
        <ShareIcon />
      </button>
      <button class="action">
        <ChatboxIcon />
      </button>
      <button class="action">
        <BookmarkIcon />
      </button>
      <button class="action">
        <MenuIcon />
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.message-row {
  display: flex;
  padding: 4px 16px;
  position: relative;
  gap: 8px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &-avatar {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    overflow: hidden;
    border: $border;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-content {
    flex: 1;
    border-radius: 6px;
    overflow: hidden;
  }

  &-toolbar {
    display: none;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 10px;
    height: 40px;
    border-radius: 6px;
    border: $border;
    top: -20px;
    z-index: 100;
    background: #fff;
    padding: 0 4px;
  }

  &:hover {
    .message-row-toolbar {
      display: flex;
    }
  }
}
</style>

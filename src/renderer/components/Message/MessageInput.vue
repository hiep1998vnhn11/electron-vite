<script setup lang="ts">
import CloseIcon from '~icons/ion/close-outline'
import AddIcon from '~icons/ion/add-outline'
import VideoIcon from '~icons/ion/videocam-outline'
import MicIcon from '~icons/ion/mic-outline'
import SendIcon from '~icons/ion/send-outline'
import CodeIcon from '~icons/ion/code-slash-outline'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:modelValue', 'send'])
const content = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})
const sendDisabled = computed(() => !content.value)
</script>
<template>
  <div class="message-input">
    <div class="message-input-container">
      <div class="message-input-toolbar">
        <button class="action">
          <CodeIcon />
        </button>
      </div>

      <input
        contenteditable
        class="message-input-input"
        placeholder="Something..."
        v-model="content"
        @keydown.enter="$emit('send', content)"
      />
      <div class="flex space-between">
        <div class="message-input-toolbar">
          <button class="action">
            <AddIcon />
          </button>
          <button class="action">
            <VideoIcon />
          </button>
          <button class="action">
            <MicIcon />
          </button>
          <button class="action">@</button>
          <button class="action">Aa</button>
        </div>
        <div class="message-input-toolbar">
          <button
            class="action"
            :disabled="sendDisabled"
            @click="$emit('send', content)"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.message-input {
  padding: 0 16px 16px 16px;
  &-container {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    min-height: 100px;
    max-height: 400px;
  }
  &-toolbar {
    height: 36px;
    display: flex;
    align-items: center;
    padding: 0 4px;
  }

  &-input {
    width: 100%;
    background: transparent;
    padding: 6px 12px;
    outline: none;
    border: none;
    resize: none;
    font-size: 14px;
    line-height: 1.42857143;
    color: #333;
  }
}
</style>

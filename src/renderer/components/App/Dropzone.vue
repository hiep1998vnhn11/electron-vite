<script lang="ts" setup>
const emit = defineEmits(['onChange'])
const inputRef = ref<HTMLInputElement>()

const onDropEventHandler = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()
  if (!event.dataTransfer) return
  const files = Array.from(event.dataTransfer.files)
  if (files[0]) emit('onChange', files[0])
}
const onDragOverEventHandler = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()
  ;(event.target as HTMLDivElement).classList.add('dragover')
}
const onDragLeaveEventHandler = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()
  ;(event.target as HTMLDivElement).classList.remove('dragover')
}
const onInputFileChangeHandler = () => {
  if (!inputRef.value?.files) return
  const files = Array.from(inputRef.value.files)
  if (files[0]) {
    emit('onChange', files[0])
    inputRef.value.value = ''
  }
}

const handleDropzoneClick = () => {
  inputRef.value?.click()
}
</script>

<template>
  <div
    class="dropzone"
    @click="handleDropzoneClick"
    @drop="onDropEventHandler"
    @dragover="onDragOverEventHandler"
    @dragleave="onDragLeaveEventHandler"
  >
    <slot />
    <input
      ref="inputRef"
      type="file"
      hidden
      @change="onInputFileChangeHandler"
    />
  </div>
</template>

<style lang="scss" scoped>
.dropzone {
  flex: 1;
  height: 100px;
  border: 1px dashed #888;
  border-radius: 5px;
  background-color: #fafafa;
  cursor: pointer;
  line-height: 100px;
  text-align: center;
  user-select: none;
  word-break: keep-all;
  overflow: hidden;
  &:hover {
    border-color: #00bcd4;
  }
  &.dragover {
    border-color: #00bcd4;
  }
}
</style>

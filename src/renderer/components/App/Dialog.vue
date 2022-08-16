<script setup lang="ts">
import CloseIcon from '~icons/ion/close-outline'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])

const closeDialog = () => {
  emit('update:modelValue', false)
}

const handleClickBackdrop = (event: Event) => {
  const target = event.target as HTMLElement
  if (target.closest('.app-dialog')) return
  closeDialog()
}

const dialogActive = ref(false)
const dialogRef = ref<HTMLDivElement | null>(null)
let timeoutRef = null as any

watch(
  () => props.modelValue,
  (value: boolean) => {
    if (value) {
      document.body.classList.add('dialog-open')
      dialogActive.value = true
      timeoutRef && clearTimeout(timeoutRef)
      requestAnimationFrame(() => {
        dialogRef.value?.classList.add('active')
      })
    } else {
      document.body.classList.remove('dialog-open')
      if (!dialogRef.value) return
      dialogRef.value.classList.remove('active')
      timeoutRef = setTimeout(() => {
        dialogActive.value = false
        timeoutRef = null
      }, 200)
    }
  },
  {
    immediate: true,
  }
)

useEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeDialog()
  }
})
</script>
<template>
  <div v-if="dialogActive" class="app-backdrop" @click="handleClickBackdrop">
    <div ref="dialogRef" class="app-dialog">
      <CloseIcon class="app-dialog-close" @click="closeDialog()" />
      <slot />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.app-dialog {
  border: $border;
  border-radius: 8px;
  min-height: 100px;
  min-width: 300px;
  background: #fff;
  position: absolute;
  z-index: 1050;
  top: calc(50% - 100px);
  left: 50%;
  transform: translate(-50%, -50%);
  transition: top 0.2s ease-in-out;
  &.active {
    top: 50%;
  }
  &-close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 22px;
    cursor: pointer;
  }
}
</style>

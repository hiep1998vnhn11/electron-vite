<template>
  <div>
    <div> Notifications {{ counter }} </div>
    <el-input ref="inputRef" v-model="input" clearable></el-input>
    <el-button @click="reset"></el-button>
  </div>
</template>
<script lang="ts">
  import { onMounted, ref, defineComponent, unref } from 'vue'
  import useDebounce from '@renderer/hooks/core/useDebouce'
  import { onStartTyping } from '@vueuse/core'
  export default defineComponent({
    name: 'Notifications',
    setup() {
      const input = ref('')
      const inputRef = ref(null)
      const fetch = () => {
        console.log(inputRef.value)
        console.log('fetch!')
      }
      const [counter, reset] = useDebounce(input, 250, fetch)
      onStartTyping(() => {
        console.log(inputRef.value.input)
        // inputRef.value.focus()
      })
      onMounted(() => {})
      return {
        input,
        counter,
        reset,
        inputRef,
      }
    },
  })
</script>
<style lang="scss" scoped></style>

<template>
  <div>
    <button @click="onClick">Button</button>
    <el-button ref="button" @click="onClick" autofocus circle> 12 </el-button>
    <el-button @click="onClickButton"> Click </el-button>
    Search
  </div>
</template>
<script lang="ts">
  import { onMounted, ref, defineComponent, unref, toRaw } from 'vue'

  export default defineComponent({
    name: 'Search',
    setup() {
      const button = ref<any>(null)
      const onClickButton = () => {
        console.log('onClickButton')
        console.log(button.value.autofocus)
        // console.log((button.value = { ...button.value, loading: true }))
      }
      const onClick = () => {
        console.log('onClick')
      }
      onMounted(() => {})
      return {
        button,
        onClickButton,
        onClick,
      }
    },
  })
</script>
<style lang="scss" scoped></style>

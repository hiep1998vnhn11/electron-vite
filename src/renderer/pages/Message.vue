<template>
  <div>
    Message
    <Loading />
  </div>
</template>
<script lang="ts">
  import { onMounted, ref, defineComponent } from 'vue'
  import Loading from '@renderer/components/Loading.vue'
  export default defineComponent({
    name: 'Message',
    components: {
      Loading,
    },
    setup() {
      onMounted(() => {})
      return {}
    },
  })
</script>
<style lang="scss" scoped></style>

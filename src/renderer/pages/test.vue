<template>
  <div class="test"> Test </div>
</template>
<script lang="ts">
  import { onMounted, ref, defineComponent } from 'vue'
  export default defineComponent({
    name: 'Test',
    setup() {
      onMounted(() => {})
      return {}
    },
  })
</script>
<style lang="scss" scoped></style>

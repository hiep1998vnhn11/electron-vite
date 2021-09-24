<template>
  <Dropdown position="bottom" :width="250" />
</template>
<script lang="ts">
  import { onMounted, ref, defineComponent } from 'vue'
  import { Dropdown } from '@renderer/components/Dropdown'
  export default defineComponent({
    name: 'Edit',
    components: {
      Dropdown,
    },
    setup() {
      onMounted(() => {})
      return {}
    },
  })
</script>
<style lang="scss" scoped></style>

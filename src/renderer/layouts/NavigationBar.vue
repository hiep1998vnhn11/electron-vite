<template>
  <div class="navigation-bar">
    <div class="navigation-bar__left">
      <div class="navigation-bar-test"> 123123 </div>
    </div>
    <div class="navigation-bar__right"> </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'NavigationBar',
    setup() {
      return {}
    },
  })
</script>
<style lang="scss" scoped>
  @import '@renderer/styles/variables.scss';
  .navigation-bar {
    position: fixed;
    height: $navigation-bar-height;
    background: red;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>

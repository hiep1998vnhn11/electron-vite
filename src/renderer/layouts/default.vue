<script setup lang="ts">
import StatusBar from '@renderer/container/StatusBar.vue'
import Sidebar from '@renderer/container/Sidebar.vue'
import AppBar from '@renderer/container/AppBar.vue'

useSocket()
</script>
<template>
  <div class="app">
    <StatusBar />
    <div class="content">
      <Sidebar />
      <div class="page-container">
        <AppBar />
        <router-view />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .content {
    display: flex;
    height: calc(100vh - 45px);
    .page-container {
      flex: 1;
      width: 100%;
      overflow: hidden;
      height: 100%;
      padding-top: $appbar-height;
      position: relative;
    }
  }
}
</style>

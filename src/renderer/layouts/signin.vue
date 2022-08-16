<script setup lang="ts"></script>
<template>
  <div class="app">
    <img class="logo" src="/logo.svg" />
    <router-view />
  </div>
</template>
<style lang="scss" scoped>
.app {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    width: 200px;
  }
}
</style>

<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <button class="app-button" :class="loading ? 'loading' : ''">
    <div class="loading" v-if="loading"></div>
    <slot v-else />
  </button>
</template>
<style lang="scss" scoped>
.app-button {
  transition: all 300ms ease-in-out;
  &.loading {
    pointer-events: none;
  }
  .loading {
    animation: spin 1s infinite linear;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border-top: 2px solid currentColor;
    margin: auto;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

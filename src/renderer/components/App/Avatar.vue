<script setup lang="ts">
defineProps({
  avatar: {
    type: String,
    default: '',
  },
  online: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    validator: (value: string) => ['small', 'medium', 'large'].includes(value),
    default: 'small',
  },
})
</script>
<template>
  <div class="avatar" :class="online ? 'online' : 'offline'">
    <img v-if="avatar" :src="avatar" />
    <div v-else class="avatar-placeholder"></div>
  </div>
</template>
<style lang="scss" scoped>
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }
  &-placeholder {
    height: 100%;
    width: 100%;
    background: red;
    border-radius: 6px;
  }
  &.small {
    width: 24px;
    height: 24px;
  }

  &.online::after {
    content: '';
    position: absolute;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    bottom: -2px;
    right: -2px;
    border: solid 1px rgba(0, 0, 0, 0.4);
    background: #00bcd4;
  }
  &.offline::after {
    content: '';
    position: absolute;
    background: #efefef;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    bottom: -2px;
    right: -2px;
    border: solid 1px rgba(0, 0, 0, 0.4);
  }
}
</style>

<template>
  <div class="dropdown">
    <div class="dropdown-item">
      <click-out-side @clickOutside="onClickOutSide">
        <div class="dropdown-item__select" @click="onClickOpen">
          <el-button> Toggle </el-button>
        </div>
        <div
          class="dropdown-item__content bottom"
          :class="{
            active,
          }"
          :style="{
            width,
          }"
        >
          <slot></slot>
        </div>
      </click-out-side>
    </div>
  </div>
</template>
<script lang="ts">
  import { dropdownItemProp } from './type'
  import { ref, defineComponent, computed } from 'vue'
  import ClickOutSide from '@renderer/components/ClickOutSide'
  export default defineComponent({
    name: 'Dropdown',
    props: dropdownItemProp,
    components: {
      ClickOutSide,
    },
    setup(props) {
      const { position, width } = props
      const active = ref<boolean>(false)
      const widthComputed = computed(() => (typeof width === 'number' ? width + 'px' : width))
      const classComputed = computed(() => ({}))
      const onClickOutSide = () => {
        active.value = false
      }
      const onClickOpen = () => {
        active.value = !active.value
      }
      return {
        position,
        width: widthComputed,
        onClickOutSide,
        onClickOpen,
        active,
      }
    },
  })
</script>
<style lang="scss" scoped>
  .dropdown {
    display: flex;
    .dropdown-item {
      position: relative;
      width: auto;
      display: block;
      &:hover {
        cursor: pointer;
      }
      &__select {
      }

      &__content {
        &.bottom {
          top: calc(100% + 1rem);
          left: 0;
        }
        &.left {
          right: calc(100% + 1rem);
          top: 0;
        }
        &.top {
          bottom: calc(100% + 1rem);
          left: 0;
        }
        &.right {
          left: calc(100% + 0.5rem);
          top: 1rem;
        }
        &.active {
          opacity: 1;
          transform: translateY(-10px);
        }
        position: absolute;
        opacity: 0;
        transform: translateY(-20px);
        transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
        border-radius: 0.5rem;
        padding: 0.75rem;
        background: white;
      }
    }
  }
</style>

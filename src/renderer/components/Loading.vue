<template>
  <div class="loading">
    <div class="loading__container">
      <div class="scene">
        <div class="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="text">Loading ...</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { onMounted, ref, defineComponent } from 'vue'
  export default defineComponent({
    name: 'Loading',
    setup() {
      onMounted(() => {})
      return {}
    },
  })
</script>
<style lang="scss" scoped>
  @keyframes breath {
    from {
      opacity: 0.05;
    }

    50% {
      opacity: 1;
    }

    to {
      opacity: 0.05;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(1turn);
    }
  }
  .dark {
    .loading {
      &__container {
        background: rgba(34, 34, 34, 1);
      }
    }
  }
  .loading {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9997;

    &__container {
      background-size: 163px;
      font: 14px/21px Monaco, sans-serif;
      color: #999;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      text-size-adjust: 100%;
      height: 200px;
      width: 100%;
      min-height: 100%;
      background: rgba(34, 34, 34, 0.1);
      margin: 0px;
      .scene {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        position: relative;
      }

      .loader {
        position: absolute;
        width: 15em;
        height: 15em;
        background: linear-gradient(-225deg, #ff3cac9e 0%, #562b7c9e 52%, #2b86c59e 100%);
        border-radius: 50%;
        animation: spin 0.5s linear infinite;
      }

      span {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background: inherit;
      }

      span:nth-child(1) {
        filter: blur(5px);
      }

      span:nth-child(2) {
        filter: blur(10px);
      }

      span:nth-child(3) {
        filter: blur(25px);
      }

      span:nth-child(4) {
        filter: blur(50px);
      }

      span::after {
        position: absolute;
        content: '';
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 10px;
        background: rgba(34, 34, 34, 1);
        border-radius: inherit;
      }

      .text {
        position: absolute;
        opacity: 0;
        animation: breath 3s ease-in-out infinite;
        user-select: none;
      }
    }
  }
</style>

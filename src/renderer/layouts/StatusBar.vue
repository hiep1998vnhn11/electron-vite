<template>
  <div class="status-bar">
    <div class="status-bar__container">
      {{ routeName }}
    </div>
    <div class="status-bar__right">
      <el-icon :color="!darkMode ? '#409EFC' : ''">
        <sunny />
      </el-icon>
      <el-switch :value="darkMode" @change="onChange" active-color="#13ce66"> </el-switch>
      <el-icon :color="darkMode ? '#409EFC' : ''">
        <moon />
      </el-icon>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'
  import { Sunny, Moon } from '@element-plus/icons'
  export default defineComponent({
    name: 'StatusBar',
    components: {
      Sunny,
      Moon,
    },
    setup() {
      const route = useRoute()
      const store = useStore()
      const routeName = computed(() => route.name)
      const darkMode = computed(() => store.state.darkMode)

      const onChange = () => store.commit('TOGGLE_DARK_MODE')
      return {
        routeName,
        darkMode,
        onChange,
      }
    },
  })
</script>
<style lang="scss" scoped>
  @import '@renderer/styles/variables.scss';

  .dark {
    .status-bar {
      color: #fff;
      background: #222;
    }
  }
  .status-bar {
    position: fixed;
    height: $status-bar-height;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: solid 1px $border-default;
    -webkit-app-region: drag;
    z-index: 9999;
    & * {
      -webkit-app-region: no-drag;
    }

    &__container {
      max-width: 1024px;
      font-size: 0.9rem;
      font-weight: 400;
    }
    &__right {
      position: absolute;
      right: 0;
      padding-right: 10px;
      display: flex;
      align-items: center;
      .el-switch {
        margin-left: 5px;
        margin-right: 5px;
      }
    }
  }
</style>

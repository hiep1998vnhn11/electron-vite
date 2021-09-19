<template>
  <ElConfigProvider :locale="i18nt">
    <div
      class="page-component__scroll el-scrollbar__wrap app-container"
      :class="{ dark: darkMode }"
    >
      <StatusBar />
      <TabBar />
      <ToolbarLeft />
      <SidebarLeft />
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <NavigationBar />
    </div>
  </ElConfigProvider>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { ElConfigProvider } from 'element-plus'
  import { i18n } from './i18n'
  // import BackToTop from '@renderer/scomponents/common/BackToTop.vue'
  import StatusBar from '@renderer/layouts/StatusBar.vue'
  import TabBar from '@renderer/layouts/TabBar.vue'
  import NavigationBar from '@renderer/layouts/NavigationBar.vue'
  import ToolbarLeft from '@renderer/layouts/ToolbarLeft.vue'
  import SidebarLeft from '@renderer/layouts/SidebarLeft.vue'
  import { useStore } from 'vuex'
  export default defineComponent({
    name: 'App',
    components: {
      ElConfigProvider,
      StatusBar,
      ToolbarLeft,
      SidebarLeft,
      NavigationBar,
      TabBar,
    },
    setup() {
      console.log(import.meta.env)
      const store = useStore()
      const i18nt = computed(() => i18n.global.messages[i18n.global.locale].el)
      const darkMode = computed(() => store.state.darkMode)
      return {
        i18nt,
        darkMode,
      }
    },
  })
</script>

<style></style>

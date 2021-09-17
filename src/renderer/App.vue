<template>
  <ElConfigProvider :locale="i18nt">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </ElConfigProvider>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { ElConfigProvider } from 'element-plus'
  import { i18n } from './i18n'
  export default defineComponent({
    name: 'App',
    components: {
      ElConfigProvider,
    },
    setup() {
      const i18nt = computed(() => i18n.global.messages[i18n.global.locale].el)
      return {
        i18nt,
      }
    },
  })
</script>

<style></style>

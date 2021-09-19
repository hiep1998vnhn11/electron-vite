<template>
  <div class="tab-bar">
    <div class="tab-bar-container">
      <el-tabs
        :value="routeName"
        type="card"
        closable
        @tab-remove="removeTab"
        tab-position="top"
        @tab-click="onChangeTab"
      >
        <el-tab-pane
          v-for="(item, index) in tabs"
          :key="index"
          :label="item.title"
          :name="index.toString()"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, ref, defineComponent, unref, toRaw } from 'vue'
  import type { Tab } from '@renderer/types/tab'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import useGo from '@renderer/hooks/useGo'
  export default defineComponent({
    setup() {
      const store = useStore()
      const route = useRoute()
      const go = useGo()
      const tabs = computed<Tab[]>(() => store.getters['tab/tabs'])
      const routeName = computed(() => route.name)
      const removeTab = (name: string) => {
        const index = Number(name)
        store.dispatch('tab/removeTab', index)
      }
      const onChangeTab = (value: any) => {
        const index = Number(value.paneName)
        const tab = toRaw(tabs.value[index])
        if (routeName.value == tab.name) return
        go({ name: tab.name })
      }
      return {
        removeTab,
        tabs,
        onChangeTab,
        routeName,
      }
    },
  })
</script>
<style lang="scss" scoped>
  @import '@renderer/styles/variables.scss';

  .tab-bar {
    position: fixed;
    height: $tab-bar-height;
    left: $toolbar-left-width;
    right: 0;
    top: $status-bar-height;
    display: flex;
    z-index: 9998;
  }
</style>

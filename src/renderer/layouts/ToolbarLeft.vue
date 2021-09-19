<template>
  <div class="toolbar-left">
    <ul class="toolbar-left__menu">
      <li
        class="toolbar-left__menu__item"
        :class="{
          active: routeName == 'Message',
        }"
      >
        <a class="toolbar-left__menu__item__link" @click="onGo('Message')">
          <ElIcon :size="20">
            <chat-round />
          </ElIcon>
          <div class="toolbar-left__menu__item__notion">
            {{ formatNotionCount(0) }}
          </div>
        </a>
      </li>
      <li
        class="toolbar-left__menu__item"
        :class="{
          active: routeName == 'Search',
        }"
      >
        <a class="toolbar-left__menu__item__link" @click="onGo('Search')">
          <ElIcon :size="20">
            <search />
          </ElIcon>
        </a>
      </li>
      <li
        class="toolbar-left__menu__item"
        :class="{
          active: routeName == 'Edit',
        }"
      >
        <a class="toolbar-left__menu__item__link" @click="onGo('Edit')">
          <ElIcon :size="20">
            <edit />
          </ElIcon>
        </a>
      </li>
      <li
        class="toolbar-left__menu__item"
        :class="{
          active: routeName == 'Notifications',
        }"
      >
        <a class="toolbar-left__menu__item__link" @click="onGo('Notifications')">
          <ElIcon :size="20">
            <bell />
          </ElIcon>
        </a>
      </li>
    </ul>

    <ul class="toolbar-left__menu">
      <li
        class="toolbar-left__menu__item"
        :class="{
          active: routeName == 'Download',
        }"
      >
        <a class="toolbar-left__menu__item__link" @click="onGo('Download')">
          <ElIcon :size="20">
            <download />
          </ElIcon>
        </a>
      </li>
      <li
        class="toolbar-left__menu__item"
        :class="{
          active: routeName == 'Share',
        }"
      >
        <a class="toolbar-left__menu__item__link" @click="onGo('Share')">
          <ElIcon :size="20">
            <share />
          </ElIcon>
        </a>
      </li>
      <li
        class="toolbar-left__menu__item"
        :class="{
          active: routeName == 'User',
        }"
      >
        <a class="toolbar-left__menu__item__link" @click="onGo('User')">
          <ElIcon :size="20">
            <avatar />
          </ElIcon>
        </a>
      </li>
      <li
        class="toolbar-left__menu__item"
        :class="{
          active: routeName == 'Setting',
        }"
      >
        <a class="toolbar-left__menu__item__link" @click="onGo('Setting')">
          <ElIcon :size="20">
            <setting />
          </ElIcon>
        </a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
  import { onMounted, ref, defineComponent, computed } from 'vue'
  import {
    Edit,
    Search,
    Share,
    Bell,
    ChatRound,
    Close,
    Connection,
    Download,
    Setting,
    Avatar,
  } from '@element-plus/icons'
  import { ElIcon } from 'element-plus'
  import { useRoute } from 'vue-router'
  import useGo from '@renderer/hooks/useGo'
  export default defineComponent({
    components: {
      Edit,
      Search,
      Share,
      Bell,
      ChatRound,
      Close,
      Connection,
      Download,
      Setting,
      ElIcon,
      Avatar,
    },
    setup() {
      const route = useRoute()
      const routeName = computed(() => route.name)
      const go = useGo()
      const onGo = (name: string) => {
        name ? go({ name }) : go()
      }
      const formatNotionCount = (count: number) => {
        if (count < 0) return '-'
        if (count > 100) return 99 + '+'
        return count
      }
      return {
        routeName,
        onGo,
        formatNotionCount,
      }
    },
  })
</script>
<style lang="scss" scoped>
  @import '@renderer/styles/variables.scss';
  .dark {
    .toolbar-left {
      color: #efefef;
      background: #222;
      &__menu__item {
        &:hover {
          background: #222;
          opacity: 1;
        }
        &.active {
          background: #222;
          opacity: 1;
        }
      }
    }
  }
  .toolbar-left {
    width: $toolbar-left-width;
    top: $status-bar-height;
    bottom: $navigation-bar-height;
    background: #efefef;
    position: fixed;
    z-index: 9999;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    &__menu {
      list-style-type: none;
      width: 100%;
      &__item {
        position: relative;
        box-sizing: border-box;
        transition: all 0.5s;
        height: 45px;
        transition: 0.3s;
        &:hover {
          cursor: pointer;
          opacity: 0.7;
          background: #fff;
          color: rgba(0, 0, 0, 0.7);
        }
        &__link {
          text-decoration: none;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
        }

        &.active {
          opacity: 0.7;
          background: #fff;
          color: rgba(0, 0, 0, 0.7);
          border-left: solid 3px #e467ba;
        }
        &__notion {
          background: #e467ba;
          padding-left: 4px;
          padding-right: 4px;
          border-radius: 6px;
          line-height: 16px;
          font-size: 12px;
          color: #fff;
          position: absolute;
          right: 5px;
          bottom: 5px;
        }
      }
    }
  }
</style>

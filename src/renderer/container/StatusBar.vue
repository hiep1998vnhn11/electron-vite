<script setup lang="ts">
import HelpIcon from '~icons/ion/help-circle-outline'
import ArrowBackIcon from '~icons/ion/arrow-back-outline'
import ArrowForwardIcon from '~icons/ion/arrow-forward-outline'
import TimeIcon from '~icons/ion/time-outline'
import SearchIcon from '~icons/ion/search-outline'

const { ipcRenderer, clipboard } = require('electron')

interface MenuItem {
  name: string
  to?: string
  key?: string
}

const userStore = useUserStore()
const workspaceStore = useWorkspaceStore()
const router = useRouter()
const barRef = ref<HTMLDivElement | null>(null)
const userDropdown = ref(false)
const currentUser = computed(() => userStore.currentUser)
const avatarUrl = computed(() =>
  currentUser.value?.avatar_url
    ? import.meta.env.VITE_STATIC_URL + currentUser.value.avatar_url
    : null
)

useEventListener('click', (event) => {
  const target = event.target as HTMLElement
  if (target.closest('.user-dropdown-wrapper')) return
  userDropdown.value = false
})

const dropdownItems: MenuItem[] = [
  {
    name: 'Profile',
    to: '/profile',
  },
  {
    name: 'Preferences',
    to: '/preferences',
  },
  {
    name: 'Download',
    key: 'download',
  },
  {
    name: 'Sign out',
    key: 'signout',
  },
]

const handleClickItem = (item: MenuItem) => {
  if (item.to) return router.push(item.to)
  if (item.key === 'signout') {
    //TODO: signout
    workspaceStore.setWorkspace(null)
    userStore.logout()
    return
  }
  if (item.key === 'download') {
    return
  }
}
</script>
<template>
  <div ref="barRef" class="status-bar">
    <div class="history">
      <ArrowBackIcon />
      <ArrowForwardIcon />
      <TimeIcon style="font-size: 20px" />
    </div>
    <div class="search">
      <div class="search-container">
        <SearchIcon />
        <div>Search</div>
      </div>
    </div>
    <div class="user">
      <HelpIcon style="font-size: 24px" />

      <div class="user-dropdown-wrapper">
        <app-avatar
          online
          :avatar="avatarUrl"
          @click="userDropdown = !userDropdown"
        />
        <transition name="slide-y">
          <div v-if="userDropdown" class="user-dropdown">
            <div class="user-dropdown-header">
              <app-avatar online :avatar="avatarUrl" />
              <div>{{ currentUser.full_name || currentUser.email }}</div>
              <div></div>
            </div>
            <div class="user-dropdown-menu">
              <div
                v-for="item in dropdownItems"
                :key="item.name"
                class="item"
                @click="handleClickItem(item)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.status-bar {
  height: $status-bar-height;
  background-color: #f5f5f5;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  // -webkit-user-select: none;
  // -webkit-app-region: drag;
  gap: 16px;
  .history {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .search {
    flex: 1;
    &-container {
      display: flex;
      gap: 8px;
      width: 100%;
      height: 32px;
      border: $border;
      border-radius: 6px;
      padding: 4px 12px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
  .user {
    display: flex;
    align-items: center;
    gap: 8px;
    &-dropdown-wrapper {
      position: relative;
      .user-dropdown {
        position: absolute;
        top: calc(100% + 4px);
        right: 0;
        background: #fff;
        border: $border;
        border-radius: 8px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        width: 300px;
        z-index: 9999;
        &-header {
          padding: 16px 16px 8px 16px;
          display: flex;
          gap: 8px;
        }
        &-menu {
          padding-bottom: 8px;
          .item {
            cursor: pointer;
            padding: 8px 16px;
            &:hover {
              background: #faf;
              color: #222;
            }
          }
        }
      }
    }
  }
}
</style>

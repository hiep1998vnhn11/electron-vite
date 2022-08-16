<script setup lang="ts">
import ChevronIcon from '~icons/ion/chevron-down-outline'
import CreateIcon from '~icons/ion/create-outline'
import AddIcon from '~icons/ion/add-outline'
import CaretForward from '~icons/ion/caret-forward-outline'
import EllipsisIcon from '~icons/ion/ellipsis-vertical-outline'
import CloseIcon from '~icons/ion/close-outline'

const workspaceStore = useWorkspaceStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const currentUser = computed(() => userStore.currentUser)
const channels = computed(() => workspaceStore.channels)
const members = computed(() => workspaceStore.members)
const loadingChannels = computed(() => workspaceStore.loadingChannels)
const loadingMembers = computed(() => workspaceStore.loadingMembers)

const activeChannel = ref(true)
const activeMember = ref(true)
const loadingChannel = ref(false)
const activeDialog = ref(false)
const dialogType = ref('')

const openDialog = (type: string) => {
  dialogType.value = type
  activeDialog.value = true
}
const channelState = reactive({
  name: '',
  description: '',
  is_private: false,
  email: '',
})

const isButtonDisable = computed(() => {
  if (dialogType.value === 'channel') return !channelState.name
  if (dialogType.value === 'member') return !channelState.email
  return false
})
const nameLeft = computed(() => {
  const name = channelState.name
  return 80 - name.length
})
const handleChangeName = (event: Event) => {
  const target = event.target as HTMLInputElement
  channelState.name = target.value.substring(0, 80)
  target.value = channelState.name
}

const handleCreateChannel = async () => {
  loadingChannel.value = true
  const result = await workspaceStore.createChannel(channelState)
  if (result) {
    channelState.name = ''
    channelState.description = ''
    channelState.is_private = false
    dialogType.value = ''
    activeDialog.value = false
  }
  loadingChannel.value = false
}
const handleInviteMember = async () => {
  loadingChannel.value = true
  const result = await workspaceStore.inviteMember(channelState.email)
  if (result) {
    channelState.email = ''
    activeDialog.value = false
    dialogType.value = ''
  }
  loadingChannel.value = false
}

const handleDeleteChannel = async (channelId: string) => {
  const result = await workspaceStore.deleteChannel(channelId)
  if (result && route.params.id === channelId) {
    router.push('/')
  }
}
const handleRemoveMember = async (channelId: string) => {
  const result = await workspaceStore.removeMember(channelId)
  if (result && route.params.id === channelId) {
    router.push('/')
  }
}
</script>
<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-header-name">
        1pd.io
        <ChevronIcon style="font-size: 12px" />
      </div>
      <div class="sidebar-header-create">
        <CreateIcon />
      </div>
    </div>

    <div class="sidebar-container">
      <div class="sidebar-channel-toggle">
        <button
          class="sidebar-channel-toggle-button"
          @click="activeChannel = !activeChannel"
        >
          <CaretForward class="icon" :class="activeChannel ? 'active' : ''" />
        </button>
        <div @click="activeChannel = !activeChannel" class="flex-1">
          Channels
        </div>
        <div class="sidebar-channel-toggle-action">
          <button class="sidebar-channel-toggle-button">
            <EllipsisIcon />
          </button>
          <button
            class="sidebar-channel-toggle-button"
            @click="activeDialog = true"
          >
            <AddIcon />
          </button>
        </div>
      </div>
      <div v-if="loadingChannels" class="sidebar-channel-loading skeleton-box">
        <div class="item" v-for="n in 4" :key="n"></div>
      </div>
      <ul v-else-if="activeChannel" class="sidebar-channel">
        <router-link
          v-for="channel in channels"
          :key="channel._id"
          :to="{
            name: 'channel',
            params: {
              id: channel._id,
            },
          }"
          custom
          v-slot="{ isExactActive, navigate }"
        >
          <li
            class="sidebar-channel-item"
            @click="navigate"
            :class="isExactActive ? 'active' : ''"
          >
            # {{ channel.name }}
            <CloseIcon class="icon" @click="handleDeleteChannel(channel._id)" />
          </li>
        </router-link>
        <li class="sidebar-channel-item flex" @click="openDialog('channel')">
          <AddIcon />
          Add channels
        </li>
      </ul>

      <div class="divider" />

      <div class="sidebar-channel-toggle">
        <button
          class="sidebar-channel-toggle-button"
          @click="activeMember = !activeMember"
        >
          <CaretForward class="icon" :class="activeMember ? 'active' : ''" />
        </button>
        <div @click="activeMember = !activeMember" class="flex-1">
          Direct messages
        </div>
        <div class="sidebar-channel-toggle-action">
          <button class="sidebar-channel-toggle-button">
            <EllipsisIcon />
          </button>
          <button
            class="sidebar-channel-toggle-button"
            @click="activeDialog = true"
          >
            <AddIcon />
          </button>
        </div>
      </div>
      <div v-if="loadingChannels" class="sidebar-channel-loading skeleton-box">
        <div class="item" v-for="n in 4" :key="n"></div>
      </div>
      <ul v-else-if="activeMember" class="sidebar-channel">
        <router-link
          :to="{
            name: 'member',
            params: {
              id: currentUser._id,
            },
          }"
          custom
          v-slot="{ isExactActive, navigate }"
        >
          <li
            class="sidebar-channel-item"
            @click="navigate"
            :class="isExactActive ? 'active' : ''"
          >
            {{ currentUser.full_name || currentUser.email }}
            <CloseIcon
              class="icon"
              @click="handleRemoveMember(currentUser._id)"
            />
          </li>
        </router-link>
        <router-link
          v-for="member in members"
          :key="member._id"
          :to="{
            name: 'member',
            params: {
              id: member._id,
            },
          }"
          custom
          v-slot="{ isExactActive, navigate }"
        >
          <li
            class="sidebar-channel-item"
            @click="navigate"
            :class="isExactActive ? 'active' : ''"
          >
            {{ member.full_name || member.email }}
            <CloseIcon class="icon" @click="handleRemoveMember(member._id)" />
          </li>
        </router-link>
        <li class="sidebar-channel-item flex" @click="openDialog('member')">
          <AddIcon />
          Add teammates
        </li>
      </ul>
    </div>

    <app-dialog v-model="activeDialog">
      <div v-if="dialogType === 'channel'" class="create-channel">
        <div class="create-channel-header">Create a channel</div>
        <div>
          Channels are where your team communicates. They’re best when organized
          around a topic — #marketing, for example.
        </div>
        <div>
          <label for="channel-name"> Name </label>
          <div class="channel-name">
            <div class="channel-name-left">#</div>
            <input
              :value="channelState.name"
              @input="handleChangeName"
              id="channel-name"
              class="input large"
              placeholder="e.g. Plan"
            />
            <div class="channel-name-right">
              {{ nameLeft }}
            </div>
          </div>
        </div>
        <div>
          <label for="channel-description"> Description (optional) </label>
          <input
            v-model="channelState.description"
            id="channel-description"
            class="input large"
          />
          <p>What’s this channel about?</p>
        </div>
        <div>
          <div>Make private</div>
          <div>
            <div>
              When a channel is set to private, it can only be viewed or joined
              by invitation
            </div>
            <div>
              <input type="checkbox" />
            </div>
          </div>
        </div>
        <div class="create-channel-footer">
          <app-button
            class="create-channel-button"
            :disabled="isButtonDisable"
            :loading="loadingChannel"
            @click="handleCreateChannel()"
          >
            Create
          </app-button>
        </div>
      </div>

      <div v-else-if="dialogType === 'member'" class="create-channel">
        <div class="create-channel-header">
          Invite people to {{ workspaceStore.workspace.name }}
        </div>
        <div>
          <label for="to-member"> To: </label>
          <input
            v-model="channelState.email"
            id="to-member"
            class="input large"
            placeholder="name@gmail.com"
          />
        </div>
        <br />
        <div class="create-channel-footer">
          <app-button
            class="create-channel-button"
            :disabled="isButtonDisable"
            :loading="loadingChannel"
            @click="handleInviteMember()"
          >
            Send
          </app-button>
        </div>
      </div>
    </app-dialog>
  </div>
</template>
<style lang="scss" scoped>
.sidebar {
  width: $sidebar-width;
  height: 100%;
  border-right: $border;
  &-header {
    height: $appbar-height;
    border-bottom: $border;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    cursor: pointer;
    &-name {
      user-select: none;
      display: flex;
      align-items: center;
      font-weight: bold;
      gap: 2px;
    }
    &-create {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 50%;
      border: $border;
      user-select: none;
    }
  }
  &-container {
    height: calc(100vh - 200px);
    overflow: auto;
  }

  &-channel-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 0.5rem;
    user-select: none;
    &-action {
      display: flex;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }
    &:hover {
      .sidebar-channel-toggle-action {
        opacity: 1;
      }
    }

    &-button {
      font-size: 12px;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background: #f5f5f5;
      }
      .icon {
        transition: transform 0.2s ease-in-out;
        &.active {
          transform: rotate(90deg);
        }
      }
    }
  }
  &-channel-loading {
    .item {
      margin-bottom: 4px;
      height: 32px;
    }
  }

  &-channel {
    display: flex;
    flex-direction: column;

    &-item {
      user-select: none;
      align-items: center;
      padding: 0.5rem;
      cursor: pointer;
      gap: 8px;
      position: relative;
      word-wrap: none;
      word-break: keep-all;
      height: 36px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: $sidebar-width;
      flex-wrap: nowrap;

      .icon {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        opacity: 0;
        transition: all 0.2s ease-in-out;
        font-size: 20px;
      }
      &:hover {
        background-color: #f5f5f5;
        padding-right: 36px;
        .icon {
          opacity: 1;
        }
      }
      &.active {
        background-color: #f5f5f5;
        .icon {
          opacity: 0;
        }
      }
    }
  }
}

.create-channel {
  width: 450px;
  padding: 16px;

  &-footer {
    display: flex;
    justify-content: flex-end;
  }
  &-button {
    width: 90px;
    height: 40px;
    border-radius: 6px;
    background-color: #4caf50;
    color: #fff;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background-color: #43a047;
    }
    &:disabled {
      background-color: #ccc;
    }
  }

  .channel-name {
    position: relative;
    &-left,
    &-right {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    &-left {
      left: 10px;
    }
    &-right {
      right: 10px;
    }
    input {
      padding-left: 30px;
      padding-right: 30px;
      padding-top: 16px;
    }
  }
}
</style>

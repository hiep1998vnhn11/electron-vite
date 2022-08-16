<script setup lang="ts">
import { getList } from '@renderer/api/workspace'

const workspaceStore = useWorkspaceStore()
const router = useRouter()
const state = reactive({
  workspaces: [] as any[],
  loading: true,
  error: false,
})
const fetchListworkspace = async () => {
  try {
    state.loading = true
    state.workspaces = []
    const response = await getList()
    state.workspaces = response.data
  } catch (error) {
    state.error = true
  } finally {
    state.loading = false
  }
}
onMounted(() => {
  fetchListworkspace()
})

const handleSelectworkspace = (workspace) => {
  workspaceStore.setWorkspace(workspace)
  router.push('/')
}
</script>
<template>
  <div>
    <div v-for="workspace in state.workspaces" :key="workspace._id">
      <button @click="handleSelectworkspace(workspace)">
        {{ workspace.name }}
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const workspaceStore = useWorkspaceStore()
const channel = computed(() => {
  const channelId = route.params.id
  return workspaceStore.channels.find((channel) => channel._id === channelId)
})

watch(
  () => channel.value,
  (value) => {
    console.log(value)
    if (!value) return router.push('/')
  },
  {
    immediate: true,
  }
)
</script>
<template>
  <div>{{ route.params.id }}</div>
</template>
<style lang="scss" scoped></style>

<script setup lang="ts">
import { uploadAvatar } from '@renderer/api/auth'

const userStore = useUserStore()
const file = ref<File | null>(null)
const loading = ref(false)
const imageUrl = ref<string | null>(null)
const handleFileChange = (value: File) => {
  if (!value.type.startsWith('image/')) return
  file.value = value
  const reader = new FileReader()
  reader.readAsDataURL(value)
  reader.onload = () => {
    imageUrl.value = reader.result as string
  }
}

const handleUploadAvatar = async () => {
  if (!file.value) return
  try {
    loading.value = true
    const response = await uploadAvatar(file.value)
    if (response.success && response.user) {
      userStore.setUser(response.user)
      file.value = null
      imageUrl.value = null
    }
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="profile">
    Your profile

    <app-dropzone @on-change="handleFileChange">
      <div v-if="imageUrl">
        <img :src="imageUrl" width="100" height="100" />
      </div>
      <div v-else>Drop or click here</div>
    </app-dropzone>
    <app-button
      @click="handleUploadAvatar()"
      class="btn btn-large"
      :loading="loading"
    >
      Lưu ảnh
    </app-button>
  </div>
</template>
<style lang="scss" scoped>
.profile {
  padding: 16px;
}
</style>

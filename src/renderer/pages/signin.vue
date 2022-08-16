<script setup lang="ts">
const userStore = useUserStore()
const state = reactive({
  email: '',
  password: '',
})
</script>
<template>
  <div class="signin">
    <div>
      <input class="input large" placeholder="email" v-model="state.email" />
      <input
        class="input large"
        placeholder="password"
        v-model="state.password"
        type="password"
      />
    </div>

    <div>
      <button class="button large block" @click="userStore.login(state)">
        Sign in
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.signin {
  width: 500px;
  padding: 20px;
}
</style>

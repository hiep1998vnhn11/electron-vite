import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const panelActive = ref(false)
  const togglePanel = () => (panelActive.value = !panelActive.value)
  return { panelActive, togglePanel }
})

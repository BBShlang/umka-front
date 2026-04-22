import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isProfileOpen: false
  }),

  actions: {
    openProfile() {
      this.isProfileOpen = true
    },
    closeProfile() {
      this.isProfileOpen = false
    }
  }
})
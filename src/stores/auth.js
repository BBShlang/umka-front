import { defineStore } from 'pinia'
import { authApi } from '../api/authApi'
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  clearTokens
} from '../utils/token'
import { extractUserFromToken } from '../utils/jwt'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoading: false,
    initialized: false
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.user && getAccessToken())
  },

  actions: {
    async initAuth() {
      const token = getAccessToken()

      if (!token) {
        this.user = null
        this.initialized = true
        return
      }

      this.user = extractUserFromToken(token)
      try {
        const me = await authApi.me()
        this.user = {
          ...this.user,
          email: me.email || this.user?.email || '',
          fullName: me.name || this.user?.fullName || ''
        }
      } catch (e) {
        if (e.status === 401 || e.status === 403) {
          clearTokens()
          this.user = null
        }
      }
      this.initialized = true
    },

    async register(payload) {
      this.isLoading = true
      try {
        await authApi.register({
          email: payload.email,
          password: payload.password,
          name: payload.name
        })
      } finally {
        this.isLoading = false
      }
    },

    async confirmRegistration(code) {
      this.isLoading = true
      try {
        await authApi.confirmRegistration(code)
      } finally {
        this.isLoading = false
      }
    },

    async login(email, password) {
      this.isLoading = true
      try {
        const response = await authApi.login({ email, password })

        if (response.token) {
          setAccessToken(response.token)
        }

        if (response.refreshToken) {
          setRefreshToken(response.refreshToken)
        }

        this.user = extractUserFromToken(response.token)
        try {
          const me = await authApi.me()
          this.user = {
            ...this.user,
            email: me.email || this.user?.email || '',
            fullName: me.name || this.user?.fullName || ''
          }
        } catch (e) {
          if (e.status === 401 || e.status === 403) {
            clearTokens()
            this.user = null
            throw e
          }
        }
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      clearTokens()
      this.user = null
    }
  }
})

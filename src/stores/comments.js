import { defineStore } from 'pinia'
import { commentApi } from '../api/commentApi'

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    commentsByPost: {},
    isLoading: false
  }),

  getters: {
    getByEvent: (state) => (eventId) => state.commentsByPost[eventId] || [],
    getByPost: (state) => (postId) => state.commentsByPost[postId] || []
  },

  actions: {
    async addComment(payload) {
      this.isLoading = true
      try {
        await commentApi.create(payload.eventId, {
          comment_text: payload.text
        })

        if (!this.commentsByPost[payload.eventId]) {
          this.commentsByPost[payload.eventId] = []
        }

        this.commentsByPost[payload.eventId].unshift({
          id: crypto.randomUUID(),
          authorName: payload.authorName,
          text: payload.text,
          createdAt: new Date().toLocaleString('ru-RU')
        })
      } finally {
        this.isLoading = false
      }
    }
  }
})
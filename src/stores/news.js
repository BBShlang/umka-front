import { defineStore } from 'pinia'
import { postApi } from '../api/postApi'

export const useNewsStore = defineStore('news', {
  state: () => ({
    items: [],
    isLoading: false
  }),

  actions: {
    async addNews(payload) {
      this.isLoading = true
      try {
        const created = await postApi.create({
          user_id: null,
          title: payload.title,
          text: payload.text,
          images: payload.images || []
        })

        this.items.unshift({
          id: created?.id ?? crypto.randomUUID(),
          title: created?.title ?? payload.title,
          text: created?.text ?? payload.text,
          image: payload.image || '',
          images: created?.images ?? payload.images ?? [],
          comments: created?.comments ?? [],
          createdAt: new Date().toISOString().slice(0, 10)
        })
      } finally {
        this.isLoading = false
      }
    }
  }
})
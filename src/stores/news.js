import { defineStore } from 'pinia'
import { postApi } from '../api/postApi'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

function imageUrl(image) {
  return image?.id ? `${API_BASE_URL}/image/${image.id}` : ''
}

function normalizePost(post, index = 0) {
  const id = post?.id ?? post?.postId ?? null
  const images = Array.isArray(post?.images) ? post.images : []

  return {
    id: id ?? `post-without-id-${index}`,
    backendId: id,
    user_id: post?.user_id ?? post?.users?.id ?? null,
    title: post?.title ?? '',
    text: post?.text ?? '',
    image: imageUrl(images[0]),
    images,
    comments: Array.isArray(post?.comments) ? post.comments : [],
    createdAt: post?.createdAt ?? ''
  }
}

export const useNewsStore = defineStore('news', {
  state: () => ({
    items: [],
    isLoading: false,
    error: ''
  }),

  actions: {
    async fetchNews() {
      this.isLoading = true
      this.error = ''
      try {
        const posts = await postApi.getAll()
        this.items = Array.isArray(posts) ? posts.map(normalizePost) : []
      } catch (e) {
        this.error = e.message || 'Не удалось загрузить новости'
      } finally {
        this.isLoading = false
      }
    },

    async addNews(payload) {
      this.isLoading = true
      this.error = ''
      try {
        const created = await postApi.create({
          user_id: payload.user_id ?? null,
          title: payload.title,
          text: payload.text,
          files: payload.files || []
        })

        this.items.unshift(normalizePost({
          ...created,
          title: created?.title ?? payload.title,
          text: created?.text ?? payload.text
        }))
      } finally {
        this.isLoading = false
      }
    },

    async updateNewsTitle(postId, newTitle) {
      await postApi.updateTitle(postId, newTitle)
      const item = this.items.find((post) => post.backendId === postId)
      if (item) item.title = newTitle
    },

    async updateNewsText(postId, newText) {
      await postApi.updateText(postId, newText)
      const item = this.items.find((post) => post.backendId === postId)
      if (item) item.text = newText
    },

    async deleteNews(postId) {
      const item = this.items.find((post) => post.id === postId || post.backendId === postId)
      if (!item?.backendId) {
        this.error = 'Бэк не вернул id новости, поэтому удалить её на сервере нельзя'
        return
      }

      this.error = ''
      try {
        await postApi.delete(item.backendId)
        this.items = this.items.filter((post) => post.backendId !== item.backendId)
      } catch (e) {
        this.error = e.message || 'Не удалось удалить новость'
      }
    }
  }
})

import { defineStore } from 'pinia'
import { commentApi } from '../api/commentApi'

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    commentsByPost: {},
    isLoading: false,
    error: ''
  }),

  getters: {
    getByPost: (state) => (postId) => state.commentsByPost[postId] || []
  },

  actions: {
    async fetchComments(postId) {
      if (!postId) return
      this.isLoading = true
      this.error = ''
      try {
        const comments = await commentApi.getAllByPost(postId)
        this.commentsByPost[postId] = Array.isArray(comments)
          ? comments.map((comment, index) => ({
              id: comment.id ?? `comment-without-id-${postId}-${index}`,
              backendId: comment.id ?? null,
              authorName: comment.name,
              text: comment.comment_text,
              createdAt: comment.createdAt ?? ''
            }))
          : []
      } finally {
        this.isLoading = false
      }
    },

    async addComment(payload) {
      const postId = payload.postId
      const shouldSync = Number.isFinite(Number(postId))
      this.isLoading = true
      this.error = ''
      try {
        if (shouldSync) {
          await commentApi.create(postId, {
            comment_text: payload.text
          })
        }

        if (!this.commentsByPost[postId]) {
          this.commentsByPost[postId] = []
        }

        this.commentsByPost[postId].unshift({
          id: crypto.randomUUID(),
          authorName: payload.authorName,
          text: payload.text,
          createdAt: new Date().toLocaleString('ru-RU')
        })
      } finally {
        this.isLoading = false
      }
    },

    async deleteComment(commentId, postId) {
      const comments = this.commentsByPost[postId] || []
      const comment = comments.find((item) => item.id === commentId || item.backendId === commentId)

      if (!comment?.backendId) {
        this.error = 'Бэк не вернул id комментария, поэтому удалить его на сервере нельзя'
        return
      }

      this.error = ''
      await commentApi.delete(comment.backendId)
      this.commentsByPost[postId] = comments.filter((item) => item.id !== commentId && item.backendId !== commentId)
    }
  }
})

import { http } from './http'

export const commentApi = {
  create(postId, payload) {
    return http.post(`/api/comment/create/${postId}`, payload)
  },

  getAllByPost(postId) {
    return http.get(`/api/comment/get-All-Comments-in-post/${postId}`)
  },

  delete(commentId) {
    return http.delete(`/api/comment/delete-comment/${commentId}`)
  }
}

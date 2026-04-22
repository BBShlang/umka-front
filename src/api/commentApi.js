import { http } from './http'

export const commentApi = {
  create(postId, payload) {
    // backend: POST /api/comment/create/{postId}
    // body: { comment_text }
    return http.post(`/api/comment/create/${postId}`, payload)
  }
}
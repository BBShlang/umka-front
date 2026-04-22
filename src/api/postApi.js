import { http } from './http'

export const postApi = {
  create(payload) {
    // backend: POST /api/post/creatPost
    // body: { user_id, title, text, images }
    return http.post('/api/post/creatPost', payload)
  }
}
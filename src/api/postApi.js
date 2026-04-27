import { http } from './http'

function buildPostFormData(payload) {
  const formData = new FormData()
  const createPostDto = {
    user_id: payload.user_id ?? null,
    title: payload.title,
    text: payload.text
  }

  formData.append(
    'createPostDto',
    new Blob([JSON.stringify(createPostDto)], { type: 'application/json' })
  )

  for (const file of payload.files || []) {
    formData.append('files', file)
  }

  return formData
}

export const postApi = {
  getAll() {
    return http.get('/api/post/all')
  },

  create(payload) {
    return http.postForm('/api/post/creatPost', buildPostFormData(payload))
  },

  updateTitle(postId, newTitle) {
    return http.putQuery(`/api/post/update-title-post/${postId}?newTitle=${encodeURIComponent(newTitle)}`)
  },

  updateText(postId, newText) {
    return http.putQuery(`/api/post/update-text-post/${postId}?newText=${encodeURIComponent(newText)}`)
  },

  delete(postId) {
    return http.delete(`/api/post/delete/${postId}`)
  }
}

import { http } from './http'

export const authApi = {
  register(payload) {
    return http.post('/api/users/registration', payload)
  },

  confirmRegistration(code) {
    return http.postQuery(`/api/users/confirm-registration?code=${encodeURIComponent(code)}`)
  },

  login(payload) {
    return http.post('/api/singIn/auth', payload)
  }
}
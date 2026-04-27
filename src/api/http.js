import { getAccessToken } from '../utils/token'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

async function request(path, options = {}) {
  const token = getAccessToken()
  const headers = new Headers(options.headers || {})

  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  })

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const data = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    throw new ApiError(
      typeof data === 'object' && data?.message
        ? data.message
        : typeof data === 'string' && data
          ? data
          : 'Ошибка запроса',
      {
        status: response.status,
        data
      }
    )
  }

  return data
}

export const http = {
  get(path) {
    return request(path, { method: 'GET' })
  },

  post(path, body) {
    return request(path, {
      method: 'POST',
      body: JSON.stringify(body)
    })
  },

  postQuery(path) {
    return request(path, { method: 'POST' })
  },

  postForm(path, formData) {
    return request(path, {
      method: 'POST',
      body: formData
    })
  },

  put(path, body) {
    return request(path, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
  },

  putQuery(path) {
    return request(path, { method: 'PUT' })
  },

  patch(path, body) {
    return request(path, {
      method: 'PATCH',
      body: JSON.stringify(body)
    })
  },

  delete(path) {
    return request(path, { method: 'DELETE' })
  }
}

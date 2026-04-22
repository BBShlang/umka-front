const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  })

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const data = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    throw new Error(
      typeof data === 'object' && data?.message
        ? data.message
        : typeof data === 'string' && data
          ? data
          : 'Ошибка запроса'
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

  put(path, body) {
    return request(path, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
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
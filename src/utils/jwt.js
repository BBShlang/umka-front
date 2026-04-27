export function parseJwt(token) {
  try {
    const payload = token.split('.')[1]
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
    return decoded
  } catch {
    return null
  }
}

export function extractUserFromToken(token) {
  const payload = parseJwt(token)
  if (!payload) return null

  const roles =
    payload.roles ||
    payload.authorities ||
    payload.role ||
    []

  const normalizedRoles = Array.isArray(roles)
    ? roles
    : typeof roles === 'string'
      ? [roles]
      : []

  const isAdmin = normalizedRoles.some((role) =>
    String(role).toUpperCase().includes('ADMIN')
  )

  return {
    id: payload.userId || payload.id || null,
    email: payload.sub || payload.email || '',
    fullName: payload.sub || payload.email || '',
    role: isAdmin ? 'Админ' : 'Пользователь',
    roles: normalizedRoles,
    raw: payload
  }
}

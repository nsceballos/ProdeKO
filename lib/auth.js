import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production'
const COOKIE_NAME = 'token'

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}

export function getUser(req) {
  try {
    const cookieHeader = req.headers.cookie || ''
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map((c) => {
        const [key, ...vals] = c.trim().split('=')
        return [key.trim(), decodeURIComponent(vals.join('='))]
      })
    )

    const token = cookies[COOKIE_NAME]
    if (!token) return null

    return verifyToken(token)
  } catch {
    return null
  }
}

export function setCookieHeader(token) {
  const maxAge = 7 * 24 * 60 * 60 // 7 days in seconds
  return `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax`
}

export function clearCookieHeader() {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`
}

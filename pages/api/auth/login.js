import bcrypt from 'bcryptjs'
import { findRow } from '../../../lib/sheets'
import { signToken, setCookieHeader } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' })
  }

  try {
    // Find user by email (column index 1 = email)
    const result = await findRow('users', 1, email.toLowerCase().trim())

    if (!result) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' })
    }

    const { row: user } = result

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password_hash)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' })
    }

    // Sign JWT
    const token = signToken({
      id: user.id,
      email: user.email,
      name: user.name,
    })

    // Set HTTP-only cookie
    res.setHeader('Set-Cookie', setCookieHeader(token))

    return res.status(200).json({
      user: { email: user.email, name: user.name },
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

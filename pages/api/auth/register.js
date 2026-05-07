import bcrypt from 'bcryptjs'
import { findRow, appendRow } from '../../../lib/sheets'
import { signToken, setCookieHeader } from '../../../lib/auth'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { email, name, password } = req.body

  if (!email || !name || !password) {
    return res.status(400).json({ error: 'Nombre, email y contraseña son requeridos' })
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' })
  }

  const cleanEmail = email.toLowerCase().trim()
  const cleanName = name.trim()

  try {
    // Check if email already exists
    const existing = await findRow('users', 1, cleanEmail)
    if (existing) {
      return res.status(409).json({ error: 'Este email ya está registrado' })
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 12)

    // Generate ID
    const id = generateId()

    // Append row: id | email | name | password_hash | created_at
    await appendRow('users', [
      id,
      cleanEmail,
      cleanName,
      password_hash,
      new Date().toISOString(),
    ])

    // Sign JWT
    const token = signToken({ id, email: cleanEmail, name: cleanName })

    // Set HTTP-only cookie
    res.setHeader('Set-Cookie', setCookieHeader(token))

    return res.status(201).json({
      user: { email: cleanEmail, name: cleanName },
    })
  } catch (error) {
    console.error('Register error:', error)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}

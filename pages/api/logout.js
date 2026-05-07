import { clearCookieHeader } from '../../lib/auth'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  res.setHeader('Set-Cookie', clearCookieHeader())
  return res.status(200).json({ message: 'Sesión cerrada' })
}

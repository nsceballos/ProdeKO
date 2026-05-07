import { getUser } from '../../lib/auth'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const user = getUser(req)

  if (!user) {
    return res.status(401).json({ error: 'No autenticado' })
  }

  return res.status(200).json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  })
}

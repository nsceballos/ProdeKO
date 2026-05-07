import { getUser } from '../../lib/auth'
import { getSheet } from '../../lib/sheets'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const user = getUser(req)
  if (!user) {
    return res.status(401).json({ error: 'No autenticado' })
  }

  try {
    // Get all data in parallel
    const [users, predictions, results] = await Promise.all([
      getSheet('users'),
      getSheet('predictions'),
      getSheet('results'),
    ])

    // Build a map of match results: match_id -> result ('home'|'draw'|'away')
    const resultsMap = {}
    for (const result of results) {
      if (result.match_id && result.result) {
        resultsMap[result.match_id] = result.result
      }
    }

    // Calculate points per user
    const pointsMap = {}

    for (const prediction of predictions) {
      const { user_email, match_id, prediction: pred } = prediction
      if (!user_email || !match_id || !pred) continue

      const matchResult = resultsMap[match_id]
      if (!matchResult) continue // No result yet, skip

      if (!pointsMap[user_email]) {
        pointsMap[user_email] = { points: 0, correct: 0, total: 0 }
      }

      pointsMap[user_email].total++
      if (matchResult === pred) {
        pointsMap[user_email].points += 3
        pointsMap[user_email].correct++
      }
    }

    // Build ranking from users
    const ranking = users.map((u) => ({
      email: u.email,
      name: u.name,
      points: pointsMap[u.email]?.points || 0,
      correct: pointsMap[u.email]?.correct || 0,
      total: pointsMap[u.email]?.total || 0,
    }))

    // Sort by points descending, then by name
    ranking.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points
      return a.name.localeCompare(b.name)
    })

    // Add position
    ranking.forEach((entry, index) => {
      entry.position = index + 1
    })

    return res.status(200).json({ ranking })
  } catch (error) {
    console.error('Ranking error:', error)
    return res.status(500).json({ error: 'Error al obtener el ranking' })
  }
}

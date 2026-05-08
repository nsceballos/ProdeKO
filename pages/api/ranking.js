import { getUser } from '../../lib/auth'
import { getSheet } from '../../lib/sheets'
import { MATCHES } from '../../data/worldcup2026'
import { getResults } from '../../lib/openfootball'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const user = getUser(req)
  if (!user) {
    return res.status(401).json({ error: 'No autenticado' })
  }

  try {
    // Obtener usuarios, predicciones y resultados en paralelo
    // Los resultados vienen de openfootball (automáticos, sin carga manual)
    const [users, predictions, resultsArr] = await Promise.all([
      getSheet('users'),
      getSheet('predictions'),
      getResults(MATCHES),
    ])

    // Construir mapa: matchId → resultado ('home'|'draw'|'away')
    const resultsMap = {}
    for (const r of resultsArr) {
      resultsMap[r.matchId] = r.result
    }

    // Calculate points per user
    const pointsMap = {}

    for (const prediction of predictions) {
      const { user_email, match_id, prediction: pred } = prediction
      if (!user_email || !match_id || !pred) continue

      const matchResult = resultsMap[match_id]
      if (!matchResult) continue // Partido no jugado todavía

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

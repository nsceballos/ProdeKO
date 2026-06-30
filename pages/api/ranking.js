import { getUser } from '../../lib/auth'
import { getSheet } from '../../lib/sheets'
import { MATCHES } from '../../data/worldcup2026'
import { getResults } from '../../lib/openfootball'
import { parseResult } from '../../lib/result'

function scorePrediction(pred, result) {
  const p = parseResult(pred)
  const r = parseResult(result)
  if (!p || !r) return 0
  // Los penales no otorgan puntos: se compara solo el resultado de los 90'/alargue.
  if (p.home === r.home && p.away === r.away) return 3
  const predOutcome = p.home > p.away ? 1 : p.home < p.away ? -1 : 0
  const realOutcome = r.home > r.away ? 1 : r.home < r.away ? -1 : 0
  return predOutcome === realOutcome ? 1 : 0
}

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
    const [users, predictions, resultsArr, manualOverrides] = await Promise.all([
      getSheet('users'),
      getSheet('predictions'),
      getResults(MATCHES),
      getSheet('results').catch(() => []),
    ])

    // Construir mapa: matchId → resultado en formato 'N-N' (ej: '2-1')
    // Los overrides manuales tienen prioridad sobre openfootball
    const resultsMap = {}
    for (const r of resultsArr) {
      resultsMap[r.matchId] = r.result
    }
    for (const r of manualOverrides) {
      if (r.match_id && r.result) resultsMap[r.match_id] = r.result
    }

    // Calculate points per user
    const pointsMap = {}

    for (const prediction of predictions) {
      const { user_email, match_id, prediction: pred } = prediction
      if (!user_email || !match_id || !pred) continue

      const matchResult = resultsMap[match_id]
      if (!matchResult) continue

      if (!pointsMap[user_email]) {
        pointsMap[user_email] = { points: 0, exact: 0, correct: 0, total: 0 }
      }

      pointsMap[user_email].total++
      const pts = scorePrediction(pred, matchResult)
      pointsMap[user_email].points += pts
      if (pts === 3) { pointsMap[user_email].exact++; pointsMap[user_email].correct++ }
      else if (pts === 1) { pointsMap[user_email].correct++ }
    }

    // Build ranking from users
    const ranking = users.map((u) => ({
      email: u.email,
      name: u.name,
      points: pointsMap[u.email]?.points || 0,
      exact: pointsMap[u.email]?.exact || 0,
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

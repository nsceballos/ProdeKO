import { getUser } from '../../lib/auth'
import { getSheet } from '../../lib/sheets'
import { MATCHES } from '../../data/worldcup2026'
import { getResults } from '../../lib/openfootball'

function scorePrediction(pred, result) {
  if (!pred || !result) return 0
  const [ph, pa] = pred.split('-').map(Number)
  const [rh, ra] = result.split('-').map(Number)
  if (isNaN(ph) || isNaN(pa) || isNaN(rh) || isNaN(ra)) return 0
  if (ph === rh && pa === ra) return 3
  const predOutcome = ph > pa ? 1 : ph < pa ? -1 : 0
  const realOutcome = rh > ra ? 1 : rh < ra ? -1 : 0
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

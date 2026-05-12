import { getUser } from '../../lib/auth'
import { getSheet } from '../../lib/sheets'
import { MATCHES } from '../../data/worldcup2026'
import { getResults } from '../../lib/openfootball'
import { resolveBracket } from '../../lib/bracket'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método no permitido' })

  const user = getUser(req)
  if (!user) return res.status(401).json({ error: 'No autenticado' })

  try {
    const [autoResults, manualOverrides, allPredictions] = await Promise.all([
      getResults(MATCHES).catch(() => []),
      getSheet('results').catch(() => []),
      getSheet('predictions').catch(() => []),
    ])

    const userPredictions = allPredictions.filter((p) => p.user_email === user.email)

    // Priority: manual override > user's own predictions > openfootball
    const resultsMap = {}
    for (const r of autoResults) resultsMap[r.matchId] = r.result
    for (const p of userPredictions) {
      if (p.match_id && p.prediction) resultsMap[p.match_id] = p.prediction
    }
    for (const r of manualOverrides) {
      if (r.match_id && r.result) resultsMap[r.match_id] = r.result
    }

    const bracket = resolveBracket(resultsMap)

    // Debug: show group standings and prediction count (remove after fixing)
    const { calculateGroupStandings } = await import('../../lib/standings.js')
    const standings = calculateGroupStandings(resultsMap)
    const debug = {
      userPredictionCount: userPredictions.length,
      resultsMapKeys: Object.keys(resultsMap).filter(k => k.startsWith('I') || k.startsWith('J')),
      standingsI: standings['I']?.map(t => ({ code: t.code, played: t.played, pts: t.pts })),
      standingsJ: standings['J']?.map(t => ({ code: t.code, played: t.played, pts: t.pts })),
    }

    return res.status(200).json({ bracket, debug })
  } catch (error) {
    console.error('Bracket error:', error)
    return res.status(500).json({ error: 'Error al calcular el bracket' })
  }
}

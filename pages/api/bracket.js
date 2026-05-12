import { getUser } from '../../lib/auth'
import { getSheet } from '../../lib/sheets'
import { MATCHES } from '../../data/worldcup2026'
import { getResults } from '../../lib/openfootball'
import { resolveBracket } from '../../lib/bracket'
import { calculateGroupStandings } from '../../lib/standings'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método no permitido' })

  res.setHeader('Cache-Control', 'no-store')

  const user = getUser(req)
  if (!user) return res.status(401).json({ error: 'No autenticado' })

  try {
    let autoResults = [], manualOverrides = [], allPredictions = []
    let errors = []

    try { autoResults = await getResults(MATCHES) } catch (e) { errors.push('openfootball: ' + e.message) }
    try { manualOverrides = await getSheet('results') } catch (e) { errors.push('results sheet: ' + e.message) }
    try { allPredictions = await getSheet('predictions') } catch (e) { errors.push('predictions sheet: ' + e.message) }

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

    const standings = calculateGroupStandings(resultsMap)
    const bracket = resolveBracket(resultsMap)

    const debug = {
      errors,
      userEmail: user.email,
      totalPredictions: allPredictions.length,
      userPredictionCount: userPredictions.length,
      resultsMapSize: Object.keys(resultsMap).length,
      sampleKeys: Object.keys(resultsMap).slice(0, 5),
      standingsI: standings['I']?.map((t) => ({ code: t.code, played: t.played, pts: t.pts })),
      standingsJ: standings['J']?.map((t) => ({ code: t.code, played: t.played, pts: t.pts })),
    }

    return res.status(200).json({ bracket, debug })
  } catch (error) {
    console.error('Bracket error:', error)
    return res.status(500).json({ error: 'Error al calcular el bracket', detail: error.message })
  }
}


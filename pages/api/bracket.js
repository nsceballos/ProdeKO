import { getUser } from '../../lib/auth'
import { getSheet } from '../../lib/sheets'
import { MATCHES } from '../../data/worldcup2026'
import { getResults } from '../../lib/openfootball'
import { resolveBracket } from '../../lib/bracket'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método no permitido' })

  res.setHeader('Cache-Control', 'no-store')

  const user = getUser(req)
  if (!user) return res.status(401).json({ error: 'No autenticado' })

  try {
    const [autoResults, manualOverrides] = await Promise.all([
      getResults(MATCHES).catch(() => []),
      getSheet('results').catch(() => []),
    ])

    // Priority: admin override > openfootball
    const resultsMap = {}
    for (const r of autoResults) resultsMap[r.matchId] = r.result
    for (const r of manualOverrides) {
      if (r.match_id && r.result) resultsMap[r.match_id] = r.result
    }

    const bracket = resolveBracket(resultsMap)
    return res.status(200).json({ bracket })
  } catch (error) {
    console.error('Bracket error:', error)
    return res.status(500).json({ error: 'Error al calcular el bracket' })
  }
}



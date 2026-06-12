import { getUser } from '../../lib/auth'
import { getSheet } from '../../lib/sheets'
import { MATCHES } from '../../data/worldcup2026'
import { getResults } from '../../lib/openfootball'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método no permitido' })

  const user = getUser(req)
  if (!user) return res.status(401).json({ error: 'No autenticado' })

  try {
    const [resultsArr, manualOverrides] = await Promise.all([
      getResults(MATCHES),
      getSheet('results').catch(() => []),
    ])

    const results = {}
    for (const r of resultsArr) results[r.matchId] = r.result
    for (const r of manualOverrides) {
      if (r.match_id && r.result) results[r.match_id] = r.result
    }

    return res.status(200).json({ results })
  } catch (error) {
    console.error('Results error:', error)
    return res.status(500).json({ error: 'Error al obtener resultados' })
  }
}

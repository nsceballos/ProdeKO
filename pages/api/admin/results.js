import { getUser } from '../../../lib/auth'
import { isAdmin } from '../../../lib/admin'
import { getAllRows, appendRow, updateRow, getSheet } from '../../../lib/sheets'
import { MATCHES } from '../../../data/worldcup2026'
import { getResults } from '../../../lib/openfootball'

export default async function handler(req, res) {
  const user = getUser(req)
  if (!user) return res.status(401).json({ error: 'No autenticado' })
  if (!isAdmin(user)) return res.status(403).json({ error: 'Acceso denegado' })

  if (req.method === 'GET') {
    try {
      const [overridesRaw, autoResults] = await Promise.all([
        getSheet('results').catch(() => []),
        getResults(MATCHES).catch(() => []),
      ])

      const overrides = {}
      for (const r of overridesRaw) {
        if (r.match_id && r.result) overrides[r.match_id] = r.result
      }

      const auto = {}
      for (const r of autoResults) {
        auto[r.matchId] = r.result
      }

      return res.status(200).json({ overrides, auto })
    } catch (error) {
      console.error('Admin GET results error:', error)
      return res.status(500).json({ error: 'Error al obtener resultados' })
    }
  }

  if (req.method === 'POST') {
    const { matchId, result } = req.body

    if (!matchId) return res.status(400).json({ error: 'matchId requerido' })

    const match = MATCHES.find((m) => m.id === matchId)
    if (!match) return res.status(404).json({ error: 'Partido no encontrado' })

    const validResults = ['home', 'draw', 'away', '']
    if (!validResults.includes(result ?? '')) {
      return res.status(400).json({ error: 'result debe ser home, draw, away o vacío para borrar' })
    }

    try {
      const allRows = await getAllRows('results')
      const headers = allRows[0] || []
      const matchColIdx = headers.indexOf('match_id')

      let existingRowIndex = null
      for (let i = 1; i < allRows.length; i++) {
        if (allRows[i][matchColIdx] === matchId) {
          existingRowIndex = i + 1
          break
        }
      }

      const now = new Date().toISOString()

      if (existingRowIndex) {
        await updateRow('results', existingRowIndex, [matchId, result || '', now, user.email])
      } else if (result) {
        await appendRow('results', [matchId, result, now, user.email])
      }

      return res.status(200).json({ success: true })
    } catch (error) {
      console.error('Admin POST results error:', error)
      return res.status(500).json({ error: 'Error al guardar resultado' })
    }
  }

  return res.status(405).json({ error: 'Método no permitido' })
}

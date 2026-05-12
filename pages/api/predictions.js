import { getUser } from '../../lib/auth'
import { getSheet, findRow, appendRow, updateRow, getAllRows } from '../../lib/sheets'
import { MATCHES } from '../../data/worldcup2026'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}

export default async function handler(req, res) {
  const user = getUser(req)
  if (!user) {
    return res.status(401).json({ error: 'No autenticado' })
  }

  if (req.method === 'GET') {
    try {
      const allPredictions = await getSheet('predictions')
      const userPredictions = allPredictions.filter(
        (p) => p.user_email === user.email
      )
      return res.status(200).json({ predictions: userPredictions })
    } catch (error) {
      console.error('Get predictions error:', error)
      return res.status(500).json({ error: 'Error al obtener predicciones' })
    }
  }

  if (req.method === 'POST') {
    const { matchId, prediction } = req.body

    if (!matchId || !prediction) {
      return res.status(400).json({ error: 'matchId y prediction son requeridos' })
    }

    if (!/^\d{1,2}-\d{1,2}$/.test(prediction)) {
      return res.status(400).json({ error: 'prediction debe ser formato N-N (ej: 2-1)' })
    }

    // Find the match and check if it has started
    const match = MATCHES.find((m) => m.id === matchId)
    if (!match) {
      return res.status(404).json({ error: 'Partido no encontrado' })
    }

    const matchDatetime = new Date(match.datetime)
    if (new Date() >= matchDatetime) {
      return res.status(403).json({ error: 'El partido ya comenzó, no se pueden modificar predicciones' })
    }

    try {
      // Check if prediction already exists for this user + match
      const allRows = await getAllRows('predictions')
      const headers = allRows[0] || []
      const emailColIdx = headers.indexOf('user_email')
      const matchColIdx = headers.indexOf('match_id')

      let existingRowIndex = null
      for (let i = 1; i < allRows.length; i++) {
        const row = allRows[i]
        if (row[emailColIdx] === user.email && row[matchColIdx] === matchId) {
          existingRowIndex = i + 1 // 1-based (row 1 = header)
          break
        }
      }

      const now = new Date().toISOString()

      if (existingRowIndex) {
        // Update existing prediction
        // Get existing id
        const idColIdx = headers.indexOf('id')
        const existingRow = allRows[existingRowIndex - 1]
        const existingId = existingRow[idColIdx] || generateId()

        await updateRow('predictions', existingRowIndex, [
          existingId,
          user.email,
          matchId,
          prediction,
          now,
        ])
      } else {
        // Create new prediction: id | user_email | match_id | prediction | updated_at
        await appendRow('predictions', [
          generateId(),
          user.email,
          matchId,
          prediction,
          now,
        ])
      }

      return res.status(200).json({ success: true })
    } catch (error) {
      console.error('Save prediction error:', error)
      return res.status(500).json({ error: 'Error al guardar predicción' })
    }
  }

  return res.status(405).json({ error: 'Método no permitido' })
}

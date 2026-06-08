import { MATCHES } from '../data/worldcup2026'
import { calculateGroupStandings, rankThirdPlacedTeams } from './standings'
import { THIRD_PLACE_TABLE } from '../data/thirdPlaceTable'

// Given a resultsMap { matchId: "N-N" }, returns resolved teams for each knockout match.
// { matchId: { home: 'ARG', away: 'MEX' } }
export function resolveBracket(resultsMap) {
  const standings = calculateGroupStandings(resultsMap)
  // Asignación oficial de mejores terceros: { 'A': 'MEX', 'E': 'BRA', ... }
  // (winner de grupo → código del tercero que lo enfrenta). Vacío hasta que terminen los 12 grupos.
  const thirdAssignment = computeThirdAssignment(standings)
  const resolved = {}

  // Iterative resolution: R32 → R16 → QF → SF → TP/Final
  for (const match of MATCHES) {
    if (match.phase === 'group') continue

    let home = resolveTeam(match.home, standings, resultsMap, resolved)
    let away = resolveTeam(match.away, standings, resultsMap, resolved)

    // Slot de mejor tercero: el rival es '1° Grupo X'; asignamos según la tabla oficial FIFA.
    if (/^3° mejor/.test(match.away)) {
      const w = match.home.match(/^1° Grupo ([A-L])$/)
      if (w) away = thirdAssignment[w[1]] ?? null
    }
    if (/^3° mejor/.test(match.home)) {
      const w = match.away.match(/^1° Grupo ([A-L])$/)
      if (w) home = thirdAssignment[w[1]] ?? null
    }

    if (home || away) {
      resolved[match.id] = {
        home: home || match.home,
        away: away || match.away,
      }
    }
  }

  return resolved
}

// Aplica la tabla oficial FIFA (Anexo C) para asignar los 8 mejores terceros.
// Devuelve { winnerGroupLetter: thirdTeamCode } o {} si los 12 grupos no terminaron
// o la combinación no existe en la tabla.
function computeThirdAssignment(standings) {
  const groups = Object.values(standings)
  if (groups.length !== 12 || !groups.every((s) => s.every((t) => t.played === 3))) return {}

  const best8 = rankThirdPlacedTeams(standings).slice(0, 8)
  if (best8.length !== 8) return {}

  const key = best8.map((t) => t.group).sort().join('')
  const assignment = THIRD_PLACE_TABLE[key]
  if (!assignment) return {}

  // assignment = string de 8 chars en orden de ganadores THIRD_PLACE_WINNERS
  const WINNERS = ['A', 'B', 'D', 'E', 'G', 'I', 'K', 'L']
  const result = {}
  WINNERS.forEach((w, i) => {
    const thirdGroup = assignment[i]
    const code = standings[thirdGroup]?.[2]?.code
    if (code) result[w] = code
  })
  return result
}

function resolveTeam(placeholder, standings, resultsMap, resolved) {
  // '1° Grupo X'
  const m1 = placeholder.match(/^1° Grupo ([A-L])$/)
  if (m1) {
    const s = standings[m1[1]]
    return s?.every((t) => t.played === 3) ? s[0]?.code ?? null : null
  }

  // '2° Grupo X'
  const m2 = placeholder.match(/^2° Grupo ([A-L])$/)
  if (m2) {
    const s = standings[m2[1]]
    return s?.every((t) => t.played === 3) ? s[1]?.code ?? null : null
  }

  // Los slots '3° mejor (...)' se resuelven en resolveBracket con la tabla oficial FIFA.

  // 'Gan. M74' — ganador del partido FIFA número 74
  const mGan = placeholder.match(/^Gan\. M(\d+)$/)
  if (mGan) {
    const id = idByNum(Number(mGan[1]))
    return id ? getWinner(id, resolved, resultsMap) : null
  }

  // 'Per. M101' — perdedor del partido FIFA número 101 (para el tercer puesto)
  const mPer = placeholder.match(/^Per\. M(\d+)$/)
  if (mPer) {
    const id = idByNum(Number(mPer[1]))
    return id ? getLoser(id, resolved, resultsMap) : null
  }

  return null
}

// Mapa número de partido FIFA → id interno (R32-1, R16-1, ...)
const NUM_TO_ID = {}
for (const m of MATCHES) {
  if (m.num != null) NUM_TO_ID[m.num] = m.id
}

function idByNum(num) {
  return NUM_TO_ID[num] ?? null
}

function getActualTeams(matchId, resolved) {
  const match = MATCHES.find((m) => m.id === matchId)
  if (!match) return null
  return {
    home: resolved[matchId]?.home || match.home,
    away: resolved[matchId]?.away || match.away,
  }
}

function getWinner(matchId, resolved, resultsMap) {
  const result = resultsMap[matchId]
  if (!result || !result.includes('-')) return null
  const teams = getActualTeams(matchId, resolved)
  if (!teams) return null
  const [hs, as] = result.split('-').map(Number)
  if (isNaN(hs) || isNaN(as) || hs === as) return null
  return hs > as ? teams.home : teams.away
}

function getLoser(matchId, resolved, resultsMap) {
  const result = resultsMap[matchId]
  if (!result || !result.includes('-')) return null
  const teams = getActualTeams(matchId, resolved)
  if (!teams) return null
  const [hs, as] = result.split('-').map(Number)
  if (isNaN(hs) || isNaN(as) || hs === as) return null
  return hs > as ? teams.away : teams.home
}

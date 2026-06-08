import { MATCHES } from '../data/worldcup2026'
import { calculateGroupStandings } from './standings'

// Given a resultsMap { matchId: "N-N" }, returns resolved teams for each knockout match.
// { matchId: { home: 'ARG', away: 'MEX' } }
export function resolveBracket(resultsMap) {
  const standings = calculateGroupStandings(resultsMap)
  const resolved = {}

  // Iterative resolution: R32 → R16 → QF → SF → TP/Final
  for (const match of MATCHES) {
    if (match.phase === 'group') continue

    const home = resolveTeam(match.home, standings, resultsMap, resolved)
    const away = resolveTeam(match.away, standings, resultsMap, resolved)

    if (home || away) {
      resolved[match.id] = {
        home: home || match.home,
        away: away || match.away,
      }
    }
  }

  return resolved
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

  // '3° mejor (A/B/C/D/F)' — mejor tercero entre los grupos candidatos
  const m3 = placeholder.match(/^3° mejor \(([A-L/]+)\)$/)
  if (m3) {
    const groupCodes = m3[1].split('/')
    for (const g of groupCodes) {
      if (!standings[g]?.every((t) => t.played === 3)) return null
    }
    const candidates = groupCodes.map((g) => standings[g]?.[2]).filter(Boolean)
    if (candidates.length === 0) return null
    candidates.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts
      if (b.gd !== a.gd) return b.gd - a.gd
      return b.gf - a.gf
    })
    return candidates[0].code ?? null
  }

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

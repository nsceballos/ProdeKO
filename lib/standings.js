import { MATCHES, GROUPS } from '../data/worldcup2026'

// Returns { A: [{code, pts, gf, ga, gd, played, won, drawn, lost}, ...sorted], ... }
export function calculateGroupStandings(resultsMap) {
  const groups = {}

  for (const [group, teams] of Object.entries(GROUPS)) {
    groups[group] = {}
    for (const team of teams) {
      groups[group][team] = { pts: 0, gf: 0, ga: 0, gd: 0, played: 0, won: 0, drawn: 0, lost: 0 }
    }
  }

  for (const match of MATCHES) {
    if (match.phase !== 'group') continue
    const result = resultsMap[match.id]
    if (!result || !result.includes('-')) continue

    const [hsStr, asStr] = result.split('-')
    const hs = parseInt(hsStr)
    const as = parseInt(asStr)
    if (isNaN(hs) || isNaN(as)) continue

    const g = groups[match.group]
    if (!g?.[match.home] || !g?.[match.away]) continue

    g[match.home].played++
    g[match.away].played++
    g[match.home].gf += hs
    g[match.home].ga += as
    g[match.away].gf += as
    g[match.away].ga += hs
    g[match.home].gd = g[match.home].gf - g[match.home].ga
    g[match.away].gd = g[match.away].gf - g[match.away].ga

    if (hs > as) {
      g[match.home].pts += 3; g[match.home].won++; g[match.away].lost++
    } else if (hs === as) {
      g[match.home].pts += 1; g[match.away].pts += 1
      g[match.home].drawn++; g[match.away].drawn++
    } else {
      g[match.away].pts += 3; g[match.away].won++; g[match.home].lost++
    }
  }

  const standings = {}
  for (const [group, teams] of Object.entries(groups)) {
    standings[group] = Object.entries(teams)
      .map(([code, stats]) => ({ code, ...stats }))
      .sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts
        if (b.gd !== a.gd) return b.gd - a.gd
        if (b.gf !== a.gf) return b.gf - a.gf
        return a.code.localeCompare(b.code)
      })
  }

  return standings
}

export function isGroupComplete(group, resultsMap) {
  return MATCHES
    .filter((m) => m.phase === 'group' && m.group === group)
    .every((m) => !!resultsMap[m.id])
}

// Ranking de los 12 terceros de cada grupo, ordenado según criterios FIFA
// (puntos → diferencia de gol → goles a favor → letra de grupo como desempate final).
// Devuelve [{ group, code, pts, gd, gf, played }, ...] de mejor a peor.
export function rankThirdPlacedTeams(standings) {
  const thirds = []
  for (const [group, table] of Object.entries(standings)) {
    const t = table[2]
    if (t) thirds.push({ group, ...t })
  }
  thirds.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts
    if (b.gd !== a.gd) return b.gd - a.gd
    if (b.gf !== a.gf) return b.gf - a.gf
    return a.group.localeCompare(b.group)
  })
  return thirds
}

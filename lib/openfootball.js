// Fuente: https://github.com/openfootball/worldcup.json
// JSON público, sin API key, actualizado por la comunidad con resultados en tiempo real

const DATA_URL = 'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json'

// Mapeo de nombres de openfootball (en inglés) a nuestros códigos internos
const TEAM_NAME_MAP = {
  'Mexico':                          'MEX',
  'South Africa':                    'RSA',
  'Korea Republic':                  'KOR',
  'South Korea':                     'KOR',
  'Czech Republic':                  'CZE',
  'Czechia':                         'CZE',
  'Canada':                          'CAN',
  'Bosnia-Herzegovina':              'BIH',
  'Bosnia and Herzegovina':          'BIH',
  'Bosnia & Herzegovina':            'BIH',
  'Switzerland':                     'SUI',
  'Qatar':                           'QAT',
  'Brazil':                          'BRA',
  'Morocco':                         'MAR',
  'Scotland':                        'SCO',
  'Haiti':                           'HAI',
  'United States':                   'USA',
  'USA':                             'USA',
  'United States of America':        'USA',
  'Paraguay':                        'PAR',
  'Australia':                       'AUS',
  'Turkey':                          'TUR',
  'Türkiye':                         'TUR',
  'Germany':                         'GER',
  'Curaçao':                         'CUR',
  'Curacao':                         'CUR',
  'Ecuador':                         'ECU',
  "Côte d'Ivoire":                   'CIV',
  'Ivory Coast':                     'CIV',
  'Netherlands':                     'NED',
  'Japan':                           'JPN',
  'Tunisia':                         'TUN',
  'Sweden':                          'SWE',
  'Belgium':                         'BEL',
  'Iran':                            'IRN',
  'Egypt':                           'EGY',
  'New Zealand':                     'NZL',
  'Spain':                           'ESP',
  'Uruguay':                         'URU',
  'Saudi Arabia':                    'KSA',
  'Cape Verde':                      'CPV',
  'France':                          'FRA',
  'Senegal':                         'SEN',
  'Norway':                          'NOR',
  'Iraq':                            'IRQ',
  'Argentina':                       'ARG',
  'Austria':                         'AUT',
  'Algeria':                         'ALG',
  'Jordan':                          'JOR',
  'Portugal':                        'POR',
  'Colombia':                        'COL',
  'Uzbekistan':                      'UZB',
  'DR Congo':                        'COD',
  'Congo DR':                        'COD',
  'Democratic Republic of Congo':    'COD',
  'Congo, DR':                       'COD',
  'England':                         'ENG',
  'Croatia':                         'CRO',
  'Panama':                          'PAN',
  'Ghana':                           'GHA',
}

export function mapTeamName(name) {
  return TEAM_NAME_MAP[name] || name
}

export async function fetchOpenfootball() {
  const res = await fetch(DATA_URL, {
    headers: { 'User-Agent': 'ProdeKO/1.0' },
  })
  if (!res.ok) throw new Error(`openfootball fetch error: ${res.status}`)
  return res.json()
}

/**
 * Obtiene los resultados de partidos ya jugados en formato "score_local-score_visitante".
 * Retorna: [{ matchId, result: 'N-N' }]
 */
export async function getResults(matches) {
  const data = await fetchOpenfootball()
  const ofMatches = data.matches || []
  const results = []

  for (const om of ofMatches) {
    const s1 = om.score1 ?? (om.score && om.score.ft ? om.score.ft[0] : null)
    const s2 = om.score2 ?? (om.score && om.score.ft ? om.score.ft[1] : null)
    if (s1 == null || s2 == null) continue

    const code1 = mapTeamName(om.team1)
    const code2 = mapTeamName(om.team2)

    const match = matches.find(m =>
      (m.home === code1 && m.away === code2) ||
      (m.home === code2 && m.away === code1)
    )
    if (!match) continue

    // Result from the perspective of match.home
    const result = match.home === code1 ? `${s1}-${s2}` : `${s2}-${s1}`
    results.push({ matchId: match.id, result })
  }

  return results
}

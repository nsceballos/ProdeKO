// FIFA World Cup 2026 - Complete Match Data
// 48 teams, 12 groups, 104 total matches

export const TEAMS = {
  MEX: { name: 'México', flag: '🇲🇽', code: 'mx' },
  NZL: { name: 'Nueva Zelanda', flag: '🇳🇿', code: 'nz' },
  SRB: { name: 'Serbia', flag: '🇷🇸', code: 'rs' },
  EGY: { name: 'Egipto', flag: '🇪🇬', code: 'eg' },
  CAN: { name: 'Canadá', flag: '🇨🇦', code: 'ca' },
  KOR: { name: 'Corea del Sur', flag: '🇰🇷', code: 'kr' },
  SUI: { name: 'Suiza', flag: '🇨🇭', code: 'ch' },
  CIV: { name: 'Costa de Marfil', flag: '🇨🇮', code: 'ci' },
  USA: { name: 'Estados Unidos', flag: '🇺🇸', code: 'us' },
  AUS: { name: 'Australia', flag: '🇦🇺', code: 'au' },
  PAN: { name: 'Panamá', flag: '🇵🇦', code: 'pa' },
  MAR: { name: 'Marruecos', flag: '🇲🇦', code: 'ma' },
  ARG: { name: 'Argentina', flag: '🇦🇷', code: 'ar' },
  CHI: { name: 'Chile', flag: '🇨🇱', code: 'cl' },
  JPN: { name: 'Japón', flag: '🇯🇵', code: 'jp' },
  SEN: { name: 'Senegal', flag: '🇸🇳', code: 'sn' },
  BRA: { name: 'Brasil', flag: '🇧🇷', code: 'br' },
  COL: { name: 'Colombia', flag: '🇨🇴', code: 'co' },
  GER: { name: 'Alemania', flag: '🇩🇪', code: 'de' },
  GHA: { name: 'Ghana', flag: '🇬🇭', code: 'gh' },
  HON: { name: 'Honduras', flag: '🇭🇳', code: 'hn' },
  URU: { name: 'Uruguay', flag: '🇺🇾', code: 'uy' },
  ESP: { name: 'España', flag: '🇪🇸', code: 'es' },
  KSA: { name: 'Arabia Saudita', flag: '🇸🇦', code: 'sa' },
  ECU: { name: 'Ecuador', flag: '🇪🇨', code: 'ec' },
  NED: { name: 'Países Bajos', flag: '🇳🇱', code: 'nl' },
  CRO: { name: 'Croacia', flag: '🇭🇷', code: 'hr' },
  NGR: { name: 'Nigeria', flag: '🇳🇬', code: 'ng' },
  ENG: { name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', code: 'gb-eng' },
  POR: { name: 'Portugal', flag: '🇵🇹', code: 'pt' },
  IRN: { name: 'Irán', flag: '🇮🇷', code: 'ir' },
  TUN: { name: 'Túnez', flag: '🇹🇳', code: 'tn' },
  ITA: { name: 'Italia', flag: '🇮🇹', code: 'it' },
  DEN: { name: 'Dinamarca', flag: '🇩🇰', code: 'dk' },
  JOR: { name: 'Jordania', flag: '🇯🇴', code: 'jo' },
  COD: { name: 'Congo DR', flag: '🇨🇩', code: 'cd' },
  BEL: { name: 'Bélgica', flag: '🇧🇪', code: 'be' },
  POL: { name: 'Polonia', flag: '🇵🇱', code: 'pl' },
  UZB: { name: 'Uzbekistán', flag: '🇺🇿', code: 'uz' },
  RSA: { name: 'Sudáfrica', flag: '🇿🇦', code: 'za' },
  TUR: { name: 'Turquía', flag: '🇹🇷', code: 'tr' },
  SCO: { name: 'Escocia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', code: 'gb-sct' },
  IRQ: { name: 'Irak', flag: '🇮🇶', code: 'iq' },
  CMR: { name: 'Camerún', flag: '🇨🇲', code: 'cm' },
  UKR: { name: 'Ucrania', flag: '🇺🇦', code: 'ua' },
  SVK: { name: 'Eslovaquia', flag: '🇸🇰', code: 'sk' },
  VEN: { name: 'Venezuela', flag: '🇻🇪', code: 've' },
  TTO: { name: 'Trinidad y Tobago', flag: '🇹🇹', code: 'tt' },
  FRA: { name: 'Francia', flag: '🇫🇷', code: 'fr' },
}

export const GROUPS = {
  A: ['MEX', 'NZL', 'SRB', 'EGY'],
  B: ['CAN', 'KOR', 'SUI', 'CIV'],
  C: ['USA', 'AUS', 'PAN', 'MAR'],
  D: ['ARG', 'CHI', 'JPN', 'SEN'],
  E: ['BRA', 'COL', 'GER', 'GHA'],
  F: ['HON', 'URU', 'ESP', 'KSA'],
  G: ['ECU', 'NED', 'CRO', 'NGR'],
  H: ['ENG', 'POR', 'IRN', 'TUN'],
  I: ['ITA', 'DEN', 'JOR', 'COD'],
  J: ['BEL', 'POL', 'UZB', 'RSA'],
  K: ['TUR', 'SCO', 'IRQ', 'CMR'],
  L: ['UKR', 'SVK', 'VEN', 'TTO'],
}

// Venues for the 2026 World Cup
const VENUES = [
  'SoFi Stadium, Los Ángeles',
  'AT&T Stadium, Dallas',
  'MetLife Stadium, Nueva York',
  'Levi\'s Stadium, San Francisco',
  'Arrowhead Stadium, Kansas City',
  'Hard Rock Stadium, Miami',
  'Gillette Stadium, Boston',
  'Lincoln Financial Field, Filadelfia',
  'Lumen Field, Seattle',
  'Mercedes-Benz Stadium, Atlanta',
  'Estadio Azteca, Ciudad de México',
  'Estadio BBVA, Monterrey',
  'Estadio Akron, Guadalajara',
  'BC Place, Vancouver',
  'BMO Field, Toronto',
]

// Group start dates (MD1 start dates) - UTC dates
// Groups start June 11, each consecutive day up to June 22 (12 groups, 12 days)
const GROUP_MD1_DATES = {
  A: '2026-06-11',
  B: '2026-06-12',
  C: '2026-06-13',
  D: '2026-06-14',
  E: '2026-06-15',
  F: '2026-06-16',
  G: '2026-06-17',
  H: '2026-06-18',
  I: '2026-06-19',
  J: '2026-06-20',
  K: '2026-06-21',
  L: '2026-06-22',
}

// Venue assignment per group (rotating through venues)
const GROUP_VENUES = {
  A: [VENUES[10], VENUES[0]],  // Mexico + USA venue
  B: [VENUES[13], VENUES[1]],  // Canada + USA venue
  C: [VENUES[2], VENUES[3]],
  D: [VENUES[4], VENUES[5]],
  E: [VENUES[6], VENUES[7]],
  F: [VENUES[11], VENUES[8]],  // Mexico venue + USA
  G: [VENUES[9], VENUES[0]],
  H: [VENUES[1], VENUES[2]],
  I: [VENUES[3], VENUES[4]],
  J: [VENUES[14], VENUES[5]],  // Canada + USA
  K: [VENUES[12], VENUES[6]],  // Mexico + USA
  L: [VENUES[7], VENUES[8]],
}

function addDays(dateStr, days) {
  const date = new Date(dateStr + 'T00:00:00Z')
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().split('T')[0]
}

function buildDatetime(dateStr, hourUTC) {
  return `${dateStr}T${String(hourUTC).padStart(2, '0')}:00:00.000Z`
}

// Generate group stage matches
// MD1: teams[0] vs teams[1] at 18:00 UTC, teams[2] vs teams[3] at 21:00 UTC
// MD2: teams[0] vs teams[2] at 18:00 UTC, teams[1] vs teams[3] at 21:00 UTC
// MD3: teams[0] vs teams[3] at 01:00 UTC next day, teams[1] vs teams[2] at 01:00 UTC next day
// (MD3 simultaneous final matches at 20:00 Colombia time = 01:00 UTC next day)

function generateGroupMatches(groupCode, teams, md1DateStr, venues) {
  const matches = []

  // MD1
  const md1Date = md1DateStr
  const md2Date = addDays(md1DateStr, 6)
  const md3Date = addDays(md1DateStr, 12)

  // MD1 Match 1: teams[0] vs teams[1]
  matches.push({
    id: `${groupCode}1-${teams[0]}-${teams[1]}`,
    group: groupCode,
    phase: 'group',
    matchday: 1,
    home: teams[0],
    away: teams[1],
    datetime: buildDatetime(md1Date, 18),
    venue: venues[0],
  })

  // MD1 Match 2: teams[2] vs teams[3]
  matches.push({
    id: `${groupCode}1-${teams[2]}-${teams[3]}`,
    group: groupCode,
    phase: 'group',
    matchday: 1,
    home: teams[2],
    away: teams[3],
    datetime: buildDatetime(md1Date, 21),
    venue: venues[1],
  })

  // MD2 Match 1: teams[0] vs teams[2]
  matches.push({
    id: `${groupCode}2-${teams[0]}-${teams[2]}`,
    group: groupCode,
    phase: 'group',
    matchday: 2,
    home: teams[0],
    away: teams[2],
    datetime: buildDatetime(md2Date, 18),
    venue: venues[0],
  })

  // MD2 Match 2: teams[1] vs teams[3]
  matches.push({
    id: `${groupCode}2-${teams[1]}-${teams[3]}`,
    group: groupCode,
    phase: 'group',
    matchday: 2,
    home: teams[1],
    away: teams[3],
    datetime: buildDatetime(md2Date, 21),
    venue: venues[1],
  })

  // MD3 (simultaneous) - both at 01:00 UTC of next day after md3Date
  const md3NextDay = addDays(md3Date, 1)

  // MD3 Match 1: teams[0] vs teams[3]
  matches.push({
    id: `${groupCode}3-${teams[0]}-${teams[3]}`,
    group: groupCode,
    phase: 'group',
    matchday: 3,
    home: teams[0],
    away: teams[3],
    datetime: buildDatetime(md3NextDay, 1),
    venue: venues[0],
  })

  // MD3 Match 2: teams[1] vs teams[2]
  matches.push({
    id: `${groupCode}3-${teams[1]}-${teams[2]}`,
    group: groupCode,
    phase: 'group',
    matchday: 3,
    home: teams[1],
    away: teams[2],
    datetime: buildDatetime(md3NextDay, 1),
    venue: venues[1],
  })

  return matches
}

// Generate all group stage matches
const groupMatches = []
for (const [groupCode, teams] of Object.entries(GROUPS)) {
  const md1Date = GROUP_MD1_DATES[groupCode]
  const venues = GROUP_VENUES[groupCode]
  groupMatches.push(...generateGroupMatches(groupCode, teams, md1Date, venues))
}

// Knockout stage placeholder matches
// Round of 32 (16 matches) - starts July 4, 2026
const KNOCKOUT_MATCHES = [
  // Round of 32 - 16 matches
  { id: 'R32-1', phase: 'round32', matchday: null, home: '1A', away: '2B', datetime: '2026-07-04T18:00:00.000Z', venue: VENUES[0], group: null },
  { id: 'R32-2', phase: 'round32', matchday: null, home: '1B', away: '2A', datetime: '2026-07-04T21:00:00.000Z', venue: VENUES[1], group: null },
  { id: 'R32-3', phase: 'round32', matchday: null, home: '1C', away: '2D', datetime: '2026-07-05T18:00:00.000Z', venue: VENUES[2], group: null },
  { id: 'R32-4', phase: 'round32', matchday: null, home: '1D', away: '2C', datetime: '2026-07-05T21:00:00.000Z', venue: VENUES[3], group: null },
  { id: 'R32-5', phase: 'round32', matchday: null, home: '1E', away: '2F', datetime: '2026-07-06T18:00:00.000Z', venue: VENUES[4], group: null },
  { id: 'R32-6', phase: 'round32', matchday: null, home: '1F', away: '2E', datetime: '2026-07-06T21:00:00.000Z', venue: VENUES[5], group: null },
  { id: 'R32-7', phase: 'round32', matchday: null, home: '1G', away: '2H', datetime: '2026-07-07T18:00:00.000Z', venue: VENUES[6], group: null },
  { id: 'R32-8', phase: 'round32', matchday: null, home: '1H', away: '2G', datetime: '2026-07-07T21:00:00.000Z', venue: VENUES[7], group: null },
  { id: 'R32-9', phase: 'round32', matchday: null, home: '1I', away: '2J', datetime: '2026-07-08T18:00:00.000Z', venue: VENUES[8], group: null },
  { id: 'R32-10', phase: 'round32', matchday: null, home: '1J', away: '2I', datetime: '2026-07-08T21:00:00.000Z', venue: VENUES[9], group: null },
  { id: 'R32-11', phase: 'round32', matchday: null, home: '1K', away: '2L', datetime: '2026-07-09T18:00:00.000Z', venue: VENUES[10], group: null },
  { id: 'R32-12', phase: 'round32', matchday: null, home: '1L', away: '2K', datetime: '2026-07-09T21:00:00.000Z', venue: VENUES[11], group: null },
  { id: 'R32-13', phase: 'round32', matchday: null, home: '3A/B/C', away: '3D/E/F', datetime: '2026-07-10T18:00:00.000Z', venue: VENUES[12], group: null },
  { id: 'R32-14', phase: 'round32', matchday: null, home: '3G/H/I', away: '3J/K/L', datetime: '2026-07-10T21:00:00.000Z', venue: VENUES[13], group: null },
  { id: 'R32-15', phase: 'round32', matchday: null, home: '3A/B/F', away: '3C/D/E', datetime: '2026-07-11T18:00:00.000Z', venue: VENUES[14], group: null },
  { id: 'R32-16', phase: 'round32', matchday: null, home: '3G/I/K', away: '3H/J/L', datetime: '2026-07-11T21:00:00.000Z', venue: VENUES[0], group: null },

  // Round of 16 - 8 matches
  { id: 'R16-1', phase: 'round16', matchday: null, home: 'Gan. R32-1', away: 'Gan. R32-2', datetime: '2026-07-14T18:00:00.000Z', venue: VENUES[2], group: null },
  { id: 'R16-2', phase: 'round16', matchday: null, home: 'Gan. R32-3', away: 'Gan. R32-4', datetime: '2026-07-14T21:00:00.000Z', venue: VENUES[3], group: null },
  { id: 'R16-3', phase: 'round16', matchday: null, home: 'Gan. R32-5', away: 'Gan. R32-6', datetime: '2026-07-15T18:00:00.000Z', venue: VENUES[4], group: null },
  { id: 'R16-4', phase: 'round16', matchday: null, home: 'Gan. R32-7', away: 'Gan. R32-8', datetime: '2026-07-15T21:00:00.000Z', venue: VENUES[5], group: null },
  { id: 'R16-5', phase: 'round16', matchday: null, home: 'Gan. R32-9', away: 'Gan. R32-10', datetime: '2026-07-16T18:00:00.000Z', venue: VENUES[6], group: null },
  { id: 'R16-6', phase: 'round16', matchday: null, home: 'Gan. R32-11', away: 'Gan. R32-12', datetime: '2026-07-16T21:00:00.000Z', venue: VENUES[7], group: null },
  { id: 'R16-7', phase: 'round16', matchday: null, home: 'Gan. R32-13', away: 'Gan. R32-14', datetime: '2026-07-17T18:00:00.000Z', venue: VENUES[8], group: null },
  { id: 'R16-8', phase: 'round16', matchday: null, home: 'Gan. R32-15', away: 'Gan. R32-16', datetime: '2026-07-17T21:00:00.000Z', venue: VENUES[9], group: null },

  // Quarter Finals - 4 matches
  { id: 'QF-1', phase: 'quarterfinal', matchday: null, home: 'Gan. R16-1', away: 'Gan. R16-2', datetime: '2026-07-21T18:00:00.000Z', venue: VENUES[0], group: null },
  { id: 'QF-2', phase: 'quarterfinal', matchday: null, home: 'Gan. R16-3', away: 'Gan. R16-4', datetime: '2026-07-21T21:00:00.000Z', venue: VENUES[1], group: null },
  { id: 'QF-3', phase: 'quarterfinal', matchday: null, home: 'Gan. R16-5', away: 'Gan. R16-6', datetime: '2026-07-22T18:00:00.000Z', venue: VENUES[2], group: null },
  { id: 'QF-4', phase: 'quarterfinal', matchday: null, home: 'Gan. R16-7', away: 'Gan. R16-8', datetime: '2026-07-22T21:00:00.000Z', venue: VENUES[3], group: null },

  // Semi Finals - 2 matches
  { id: 'SF-1', phase: 'semifinal', matchday: null, home: 'Gan. QF-1', away: 'Gan. QF-2', datetime: '2026-07-25T21:00:00.000Z', venue: VENUES[1], group: null },
  { id: 'SF-2', phase: 'semifinal', matchday: null, home: 'Gan. QF-3', away: 'Gan. QF-4', datetime: '2026-07-26T21:00:00.000Z', venue: VENUES[2], group: null },

  // Third Place
  { id: 'TP-1', phase: 'third_place', matchday: null, home: 'Per. SF-1', away: 'Per. SF-2', datetime: '2026-07-29T18:00:00.000Z', venue: VENUES[3], group: null },

  // Final
  { id: 'FINAL', phase: 'final', matchday: null, home: 'Gan. SF-1', away: 'Gan. SF-2', datetime: '2026-07-29T21:00:00.000Z', venue: 'MetLife Stadium, Nueva York', group: null },
]

export const MATCHES = [...groupMatches, ...KNOCKOUT_MATCHES]

export const PHASE_LABELS = {
  group: 'Fase de Grupos',
  round32: 'Ronda de 32',
  round16: 'Octavos de Final',
  quarterfinal: 'Cuartos de Final',
  semifinal: 'Semifinales',
  third_place: 'Tercer Puesto',
  final: 'Final',
}

export const GROUP_LABELS = {
  A: 'Grupo A',
  B: 'Grupo B',
  C: 'Grupo C',
  D: 'Grupo D',
  E: 'Grupo E',
  F: 'Grupo F',
  G: 'Grupo G',
  H: 'Grupo H',
  I: 'Grupo I',
  J: 'Grupo J',
  K: 'Grupo K',
  L: 'Grupo L',
}

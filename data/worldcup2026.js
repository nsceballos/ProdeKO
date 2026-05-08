// FIFA World Cup 2026 - Datos Oficiales
// Sorteo realizado el 5 de diciembre de 2025 en Washington D.C.
// 48 selecciones, 12 grupos, 104 partidos en total

export const TEAMS = {
  // Grupo A
  MEX: { name: 'México',          flag: '🇲🇽', code: 'mx' },
  RSA: { name: 'Sudáfrica',       flag: '🇿🇦', code: 'za' },
  KOR: { name: 'Corea del Sur',   flag: '🇰🇷', code: 'kr' },
  CZE: { name: 'Chequia',         flag: '🇨🇿', code: 'cz' },
  // Grupo B
  CAN: { name: 'Canadá',          flag: '🇨🇦', code: 'ca' },
  BIH: { name: 'Bosnia-Herz.',    flag: '🇧🇦', code: 'ba' },
  SUI: { name: 'Suiza',           flag: '🇨🇭', code: 'ch' },
  QAT: { name: 'Catar',           flag: '🇶🇦', code: 'qa' },
  // Grupo C
  BRA: { name: 'Brasil',          flag: '🇧🇷', code: 'br' },
  MAR: { name: 'Marruecos',       flag: '🇲🇦', code: 'ma' },
  SCO: { name: 'Escocia',         flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', code: 'gb-sct' },
  HAI: { name: 'Haití',           flag: '🇭🇹', code: 'ht' },
  // Grupo D
  USA: { name: 'Estados Unidos',  flag: '🇺🇸', code: 'us' },
  PAR: { name: 'Paraguay',        flag: '🇵🇾', code: 'py' },
  AUS: { name: 'Australia',       flag: '🇦🇺', code: 'au' },
  TUR: { name: 'Turquía',         flag: '🇹🇷', code: 'tr' },
  // Grupo E
  GER: { name: 'Alemania',        flag: '🇩🇪', code: 'de' },
  CUR: { name: 'Curazao',         flag: '🇨🇼', code: 'cw' },
  ECU: { name: 'Ecuador',         flag: '🇪🇨', code: 'ec' },
  CIV: { name: 'Costa de Marfil', flag: '🇨🇮', code: 'ci' },
  // Grupo F
  NED: { name: 'Países Bajos',    flag: '🇳🇱', code: 'nl' },
  JPN: { name: 'Japón',           flag: '🇯🇵', code: 'jp' },
  TUN: { name: 'Túnez',           flag: '🇹🇳', code: 'tn' },
  SWE: { name: 'Suecia',          flag: '🇸🇪', code: 'se' },
  // Grupo G
  BEL: { name: 'Bélgica',         flag: '🇧🇪', code: 'be' },
  IRN: { name: 'Irán',            flag: '🇮🇷', code: 'ir' },
  EGY: { name: 'Egipto',          flag: '🇪🇬', code: 'eg' },
  NZL: { name: 'Nueva Zelanda',   flag: '🇳🇿', code: 'nz' },
  // Grupo H
  ESP: { name: 'España',          flag: '🇪🇸', code: 'es' },
  URU: { name: 'Uruguay',         flag: '🇺🇾', code: 'uy' },
  KSA: { name: 'Arabia Saudita',  flag: '🇸🇦', code: 'sa' },
  CPV: { name: 'Cabo Verde',      flag: '🇨🇻', code: 'cv' },
  // Grupo I
  FRA: { name: 'Francia',         flag: '🇫🇷', code: 'fr' },
  SEN: { name: 'Senegal',         flag: '🇸🇳', code: 'sn' },
  NOR: { name: 'Noruega',         flag: '🇳🇴', code: 'no' },
  IRQ: { name: 'Irak',            flag: '🇮🇶', code: 'iq' },
  // Grupo J
  ARG: { name: 'Argentina',       flag: '🇦🇷', code: 'ar' },
  AUT: { name: 'Austria',         flag: '🇦🇹', code: 'at' },
  ALG: { name: 'Argelia',         flag: '🇩🇿', code: 'dz' },
  JOR: { name: 'Jordania',        flag: '🇯🇴', code: 'jo' },
  // Grupo K
  POR: { name: 'Portugal',        flag: '🇵🇹', code: 'pt' },
  COL: { name: 'Colombia',        flag: '🇨🇴', code: 'co' },
  UZB: { name: 'Uzbekistán',      flag: '🇺🇿', code: 'uz' },
  COD: { name: 'Congo DR',        flag: '🇨🇩', code: 'cd' },
  // Grupo L
  ENG: { name: 'Inglaterra',      flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', code: 'gb-eng' },
  CRO: { name: 'Croacia',         flag: '🇭🇷', code: 'hr' },
  PAN: { name: 'Panamá',          flag: '🇵🇦', code: 'pa' },
  GHA: { name: 'Ghana',           flag: '🇬🇭', code: 'gh' },
}

// Grupos oficiales (sorteo 5-dic-2025)
// Orden interno define fixtures: [0]vs[1] y [2]vs[3] en MD1
export const GROUPS = {
  A: ['MEX', 'RSA', 'KOR', 'CZE'], // MEX vs RSA (inauguración), KOR vs CZE
  B: ['CAN', 'BIH', 'SUI', 'QAT'], // CAN vs BIH, SUI vs QAT
  C: ['BRA', 'MAR', 'SCO', 'HAI'], // BRA vs MAR, SCO vs HAI
  D: ['USA', 'PAR', 'AUS', 'TUR'], // USA vs PAR, AUS vs TUR
  E: ['GER', 'CUR', 'ECU', 'CIV'], // GER vs CUR, ECU vs CIV
  F: ['NED', 'JPN', 'TUN', 'SWE'], // NED vs JPN, TUN vs SWE
  G: ['BEL', 'IRN', 'EGY', 'NZL'], // BEL vs IRN, EGY vs NZL
  H: ['ESP', 'URU', 'KSA', 'CPV'], // ESP vs URU, KSA vs CPV
  I: ['FRA', 'SEN', 'NOR', 'IRQ'], // FRA vs SEN, NOR vs IRQ
  J: ['ARG', 'AUT', 'ALG', 'JOR'], // ARG vs AUT, ALG vs JOR
  K: ['POR', 'COL', 'UZB', 'COD'], // POR vs COL, UZB vs COD
  L: ['ENG', 'CRO', 'PAN', 'GHA'], // ENG vs CRO, PAN vs GHA
}

// Sedes oficiales FIFA World Cup 2026
const VENUES = {
  // México
  AZTECA:     'Estadio Azteca, Ciudad de México',
  AKRON:      'Estadio Akron, Guadalajara',
  BBVA:       'Estadio BBVA, Monterrey',
  // Canadá
  TORONTO:    'BMO Field, Toronto',
  VANCOUVER:  'BC Place, Vancouver',
  // Estados Unidos
  METLIFE:    'MetLife Stadium, Nueva York/New Jersey',
  ATT:        'AT&T Stadium, Dallas',
  SOFI:       'SoFi Stadium, Los Ángeles',
  LEVIS:      'Levi\'s Stadium, San Francisco',
  ARROWHEAD:  'Arrowhead Stadium, Kansas City',
  NRG:        'NRG Stadium, Houston',
  HARDROCK:   'Hard Rock Stadium, Miami',
  GILLETTE:   'Gillette Stadium, Boston',
  LINCOLN:    'Lincoln Financial Field, Filadelfia',
  LUMEN:      'Lumen Field, Seattle',
  MERCEDES:   'Mercedes-Benz Stadium, Atlanta',
}

// Calendario de cada grupo:
// md1.date  = fecha jornada 1
// md1.times = [hora UTC partido 1, hora UTC partido 2] — simultáneos en J3
// Inauguración: MEX vs RSA, 11 Jun, 18:00 UTC (13:00 CDMX / 13:00 CO)
// Fuentes confirmadas: CAN-BIH y USA-PAR el 12 jun, BRA-MAR el 13 jun,
//                      GER-CUR el 14 jun, ENG-CRO el 17 jun
const GROUP_SCHEDULE = {
  A: {
    md1: { date: '2026-06-11', times: [18, 21] },
    md2: { date: '2026-06-16', times: [18, 21] },
    md3: { date: '2026-06-21', times: [20, 20] }, // simultáneo
    venues: [VENUES.AZTECA, VENUES.AKRON],
  },
  B: {
    md1: { date: '2026-06-12', times: [19, 22] }, // CAN-BIH 15:00 ET = 19:00 UTC
    md2: { date: '2026-06-17', times: [19, 22] },
    md3: { date: '2026-06-22', times: [20, 20] },
    venues: [VENUES.TORONTO, VENUES.ARROWHEAD],
  },
  C: {
    md1: { date: '2026-06-13', times: [14, 22] }, // BRA-MAR 18:00 ET = 22:00 UTC
    md2: { date: '2026-06-18', times: [14, 22] },
    md3: { date: '2026-06-23', times: [20, 20] },
    venues: [VENUES.METLIFE, VENUES.LUMEN],
  },
  D: {
    md1: { date: '2026-06-12', times: [14, 23] }, // USA-PAR ~19:00/23:00 UTC
    md2: { date: '2026-06-17', times: [14, 23] },
    md3: { date: '2026-06-22', times: [23, 23] },
    venues: [VENUES.SOFI, VENUES.HARDROCK],
  },
  E: {
    md1: { date: '2026-06-14', times: [17, 20] }, // GER-CUR 12:00 CDT Houston = 17:00 UTC
    md2: { date: '2026-06-19', times: [17, 20] },
    md3: { date: '2026-06-24', times: [20, 20] },
    venues: [VENUES.NRG, VENUES.ATT],
  },
  F: {
    md1: { date: '2026-06-14', times: [14, 23] },
    md2: { date: '2026-06-19', times: [14, 23] },
    md3: { date: '2026-06-24', times: [23, 23] },
    venues: [VENUES.ATT, VENUES.BBVA],
  },
  G: {
    md1: { date: '2026-06-15', times: [14, 17] },
    md2: { date: '2026-06-20', times: [14, 17] },
    md3: { date: '2026-06-25', times: [20, 20] },
    venues: [VENUES.LINCOLN, VENUES.MERCEDES],
  },
  H: {
    md1: { date: '2026-06-13', times: [19, 23] },
    md2: { date: '2026-06-18', times: [19, 23] },
    md3: { date: '2026-06-23', times: [23, 23] },
    venues: [VENUES.GILLETTE, VENUES.LEVIS],
  },
  I: {
    md1: { date: '2026-06-15', times: [20, 23] },
    md2: { date: '2026-06-20', times: [20, 23] },
    md3: { date: '2026-06-25', times: [23, 23] },
    venues: [VENUES.HARDROCK, VENUES.MERCEDES],
  },
  J: {
    md1: { date: '2026-06-16', times: [14, 17] },
    md2: { date: '2026-06-21', times: [14, 17] },
    md3: { date: '2026-06-26', times: [20, 20] },
    venues: [VENUES.METLIFE, VENUES.VANCOUVER],
  },
  K: {
    md1: { date: '2026-06-16', times: [20, 23] },
    md2: { date: '2026-06-21', times: [20, 23] },
    md3: { date: '2026-06-26', times: [23, 23] },
    venues: [VENUES.SOFI, VENUES.LUMEN],
  },
  L: {
    md1: { date: '2026-06-17', times: [20, 23] }, // ENG-CRO 15:00 CDT Dallas = 20:00 UTC
    md2: { date: '2026-06-22', times: [20, 23] },
    md3: { date: '2026-06-27', times: [20, 20] },
    venues: [VENUES.ATT, VENUES.ARROWHEAD],
  },
}

function buildDatetime(dateStr, hourUTC) {
  return `${dateStr}T${String(hourUTC).padStart(2, '0')}:00:00.000Z`
}

function generateGroupMatches(groupCode, teams, schedule) {
  const matches = []
  const { md1, md2, md3, venues } = schedule

  // Jornada 1: teams[0] vs teams[1], teams[2] vs teams[3]
  matches.push({
    id: `${groupCode}1-${teams[0]}-${teams[1]}`,
    group: groupCode, phase: 'group', matchday: 1,
    home: teams[0], away: teams[1],
    datetime: buildDatetime(md1.date, md1.times[0]),
    venue: venues[0],
  })
  matches.push({
    id: `${groupCode}1-${teams[2]}-${teams[3]}`,
    group: groupCode, phase: 'group', matchday: 1,
    home: teams[2], away: teams[3],
    datetime: buildDatetime(md1.date, md1.times[1]),
    venue: venues[1],
  })

  // Jornada 2: teams[0] vs teams[2], teams[1] vs teams[3]
  matches.push({
    id: `${groupCode}2-${teams[0]}-${teams[2]}`,
    group: groupCode, phase: 'group', matchday: 2,
    home: teams[0], away: teams[2],
    datetime: buildDatetime(md2.date, md2.times[0]),
    venue: venues[1],
  })
  matches.push({
    id: `${groupCode}2-${teams[1]}-${teams[3]}`,
    group: groupCode, phase: 'group', matchday: 2,
    home: teams[1], away: teams[3],
    datetime: buildDatetime(md2.date, md2.times[1]),
    venue: venues[0],
  })

  // Jornada 3 (simultáneos): teams[0] vs teams[3], teams[1] vs teams[2]
  matches.push({
    id: `${groupCode}3-${teams[0]}-${teams[3]}`,
    group: groupCode, phase: 'group', matchday: 3,
    home: teams[0], away: teams[3],
    datetime: buildDatetime(md3.date, md3.times[0]),
    venue: venues[0],
  })
  matches.push({
    id: `${groupCode}3-${teams[1]}-${teams[2]}`,
    group: groupCode, phase: 'group', matchday: 3,
    home: teams[1], away: teams[2],
    datetime: buildDatetime(md3.date, md3.times[1]),
    venue: venues[1],
  })

  return matches
}

// Generar los 72 partidos de fase de grupos
const groupMatches = []
for (const [groupCode, teams] of Object.entries(GROUPS)) {
  groupMatches.push(...generateGroupMatches(groupCode, teams, GROUP_SCHEDULE[groupCode]))
}

// Fase eliminatoria — empieza el 4 de julio 2026
const KNOCKOUT_MATCHES = [
  // Ronda de 32 (16 partidos)
  { id: 'R32-1',  phase: 'round32',       matchday: null, home: '1° Grupo A', away: '2° Grupo B', datetime: '2026-07-04T18:00:00.000Z', venue: VENUES.SOFI,      group: null },
  { id: 'R32-2',  phase: 'round32',       matchday: null, home: '1° Grupo B', away: '2° Grupo A', datetime: '2026-07-04T22:00:00.000Z', venue: VENUES.METLIFE,   group: null },
  { id: 'R32-3',  phase: 'round32',       matchday: null, home: '1° Grupo C', away: '2° Grupo D', datetime: '2026-07-05T18:00:00.000Z', venue: VENUES.ATT,       group: null },
  { id: 'R32-4',  phase: 'round32',       matchday: null, home: '1° Grupo D', away: '2° Grupo C', datetime: '2026-07-05T22:00:00.000Z', venue: VENUES.NRG,       group: null },
  { id: 'R32-5',  phase: 'round32',       matchday: null, home: '1° Grupo E', away: '2° Grupo F', datetime: '2026-07-06T18:00:00.000Z', venue: VENUES.ARROWHEAD, group: null },
  { id: 'R32-6',  phase: 'round32',       matchday: null, home: '1° Grupo F', away: '2° Grupo E', datetime: '2026-07-06T22:00:00.000Z', venue: VENUES.GILLETTE,  group: null },
  { id: 'R32-7',  phase: 'round32',       matchday: null, home: '1° Grupo G', away: '2° Grupo H', datetime: '2026-07-07T18:00:00.000Z', venue: VENUES.LEVIS,     group: null },
  { id: 'R32-8',  phase: 'round32',       matchday: null, home: '1° Grupo H', away: '2° Grupo G', datetime: '2026-07-07T22:00:00.000Z', venue: VENUES.HARDROCK,  group: null },
  { id: 'R32-9',  phase: 'round32',       matchday: null, home: '1° Grupo I', away: '2° Grupo J', datetime: '2026-07-08T18:00:00.000Z', venue: VENUES.LUMEN,     group: null },
  { id: 'R32-10', phase: 'round32',       matchday: null, home: '1° Grupo J', away: '2° Grupo I', datetime: '2026-07-08T22:00:00.000Z', venue: VENUES.LINCOLN,   group: null },
  { id: 'R32-11', phase: 'round32',       matchday: null, home: '1° Grupo K', away: '2° Grupo L', datetime: '2026-07-09T18:00:00.000Z', venue: VENUES.AZTECA,    group: null },
  { id: 'R32-12', phase: 'round32',       matchday: null, home: '1° Grupo L', away: '2° Grupo K', datetime: '2026-07-09T22:00:00.000Z', venue: VENUES.BBVA,      group: null },
  { id: 'R32-13', phase: 'round32',       matchday: null, home: '3° mejor (A/B/C)', away: '3° mejor (D/E/F)', datetime: '2026-07-10T18:00:00.000Z', venue: VENUES.TORONTO,   group: null },
  { id: 'R32-14', phase: 'round32',       matchday: null, home: '3° mejor (G/H/I)', away: '3° mejor (J/K/L)', datetime: '2026-07-10T22:00:00.000Z', venue: VENUES.VANCOUVER, group: null },
  { id: 'R32-15', phase: 'round32',       matchday: null, home: '3° mejor (A/B/F)', away: '3° mejor (C/D/E)', datetime: '2026-07-11T18:00:00.000Z', venue: VENUES.MERCEDES,  group: null },
  { id: 'R32-16', phase: 'round32',       matchday: null, home: '3° mejor (G/I/K)', away: '3° mejor (H/J/L)', datetime: '2026-07-11T22:00:00.000Z', venue: VENUES.AKRON,     group: null },

  // Octavos de Final (8 partidos)
  { id: 'R16-1',  phase: 'round16',       matchday: null, home: 'Gan. R32-1',  away: 'Gan. R32-2',  datetime: '2026-07-14T18:00:00.000Z', venue: VENUES.METLIFE,   group: null },
  { id: 'R16-2',  phase: 'round16',       matchday: null, home: 'Gan. R32-3',  away: 'Gan. R32-4',  datetime: '2026-07-14T22:00:00.000Z', venue: VENUES.ATT,       group: null },
  { id: 'R16-3',  phase: 'round16',       matchday: null, home: 'Gan. R32-5',  away: 'Gan. R32-6',  datetime: '2026-07-15T18:00:00.000Z', venue: VENUES.SOFI,      group: null },
  { id: 'R16-4',  phase: 'round16',       matchday: null, home: 'Gan. R32-7',  away: 'Gan. R32-8',  datetime: '2026-07-15T22:00:00.000Z', venue: VENUES.NRG,       group: null },
  { id: 'R16-5',  phase: 'round16',       matchday: null, home: 'Gan. R32-9',  away: 'Gan. R32-10', datetime: '2026-07-16T18:00:00.000Z', venue: VENUES.ARROWHEAD, group: null },
  { id: 'R16-6',  phase: 'round16',       matchday: null, home: 'Gan. R32-11', away: 'Gan. R32-12', datetime: '2026-07-16T22:00:00.000Z', venue: VENUES.AZTECA,    group: null },
  { id: 'R16-7',  phase: 'round16',       matchday: null, home: 'Gan. R32-13', away: 'Gan. R32-14', datetime: '2026-07-17T18:00:00.000Z', venue: VENUES.LEVIS,     group: null },
  { id: 'R16-8',  phase: 'round16',       matchday: null, home: 'Gan. R32-15', away: 'Gan. R32-16', datetime: '2026-07-17T22:00:00.000Z', venue: VENUES.LUMEN,     group: null },

  // Cuartos de Final (4 partidos)
  { id: 'QF-1',   phase: 'quarterfinal',  matchday: null, home: 'Gan. R16-1',  away: 'Gan. R16-2',  datetime: '2026-07-21T18:00:00.000Z', venue: VENUES.METLIFE,   group: null },
  { id: 'QF-2',   phase: 'quarterfinal',  matchday: null, home: 'Gan. R16-3',  away: 'Gan. R16-4',  datetime: '2026-07-21T22:00:00.000Z', venue: VENUES.ATT,       group: null },
  { id: 'QF-3',   phase: 'quarterfinal',  matchday: null, home: 'Gan. R16-5',  away: 'Gan. R16-6',  datetime: '2026-07-22T18:00:00.000Z', venue: VENUES.SOFI,      group: null },
  { id: 'QF-4',   phase: 'quarterfinal',  matchday: null, home: 'Gan. R16-7',  away: 'Gan. R16-8',  datetime: '2026-07-22T22:00:00.000Z', venue: VENUES.AZTECA,    group: null },

  // Semifinales (2 partidos)
  { id: 'SF-1',   phase: 'semifinal',     matchday: null, home: 'Gan. QF-1',   away: 'Gan. QF-2',   datetime: '2026-07-25T22:00:00.000Z', venue: VENUES.ATT,       group: null },
  { id: 'SF-2',   phase: 'semifinal',     matchday: null, home: 'Gan. QF-3',   away: 'Gan. QF-4',   datetime: '2026-07-26T22:00:00.000Z', venue: VENUES.METLIFE,   group: null },

  // Tercer Puesto
  { id: 'TP-1',   phase: 'third_place',   matchday: null, home: 'Per. SF-1',   away: 'Per. SF-2',   datetime: '2026-07-29T19:00:00.000Z', venue: VENUES.SOFI,      group: null },

  // Final — MetLife Stadium, 19 de julio 2026
  { id: 'FINAL',  phase: 'final',         matchday: null, home: 'Gan. SF-1',   away: 'Gan. SF-2',   datetime: '2026-07-19T21:00:00.000Z', venue: VENUES.METLIFE,   group: null },
]

export const MATCHES = [...groupMatches, ...KNOCKOUT_MATCHES]

// Timezone local de cada sede — para mostrar el horario donde se juega el partido
export const VENUE_TIMEZONES = {
  'Estadio Azteca, Ciudad de México':      { tz: 'America/Mexico_City',  label: 'CDT' },
  'Estadio Akron, Guadalajara':            { tz: 'America/Mexico_City',  label: 'CDT' },
  'Estadio BBVA, Monterrey':              { tz: 'America/Monterrey',    label: 'CDT' },
  'BMO Field, Toronto':                    { tz: 'America/Toronto',      label: 'EDT' },
  'BC Place, Vancouver':                   { tz: 'America/Vancouver',    label: 'PDT' },
  'MetLife Stadium, Nueva York/New Jersey':{ tz: 'America/New_York',     label: 'EDT' },
  'AT&T Stadium, Dallas':                  { tz: 'America/Chicago',      label: 'CDT' },
  'SoFi Stadium, Los Ángeles':             { tz: 'America/Los_Angeles',  label: 'PDT' },
  "Levi's Stadium, San Francisco":         { tz: 'America/Los_Angeles',  label: 'PDT' },
  'Arrowhead Stadium, Kansas City':        { tz: 'America/Chicago',      label: 'CDT' },
  'NRG Stadium, Houston':                  { tz: 'America/Chicago',      label: 'CDT' },
  'Hard Rock Stadium, Miami':              { tz: 'America/New_York',     label: 'EDT' },
  'Gillette Stadium, Boston':              { tz: 'America/New_York',     label: 'EDT' },
  'Lincoln Financial Field, Filadelfia':   { tz: 'America/New_York',     label: 'EDT' },
  'Lumen Field, Seattle':                  { tz: 'America/Los_Angeles',  label: 'PDT' },
  'Mercedes-Benz Stadium, Atlanta':        { tz: 'America/New_York',     label: 'EDT' },
}

export const PHASE_LABELS = {
  group:        'Fase de Grupos',
  round32:      'Ronda de 32',
  round16:      'Octavos de Final',
  quarterfinal: 'Cuartos de Final',
  semifinal:    'Semifinales',
  third_place:  'Tercer Puesto',
  final:        'Final',
}

export const GROUP_LABELS = {
  A: 'Grupo A', B: 'Grupo B', C: 'Grupo C', D: 'Grupo D',
  E: 'Grupo E', F: 'Grupo F', G: 'Grupo G', H: 'Grupo H',
  I: 'Grupo I', J: 'Grupo J', K: 'Grupo K', L: 'Grupo L',
}

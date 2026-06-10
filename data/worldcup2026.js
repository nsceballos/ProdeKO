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

// Calendario oficial de fase de grupos (72 partidos).
// Cada partido define local (home), visitante (away), sede y horario de inicio en UTC.
// Fuente: calendario oficial FIFA World Cup 2026 (hora local de cada sede convertida a UTC).
// Nota: las sedes mexicanas (CDMX, Guadalajara, Monterrey) permanecen en CST (UTC-6)
//       todo el torneo — México abolió el horario de verano en 2023.
const groupMatches = [
  // ── Grupo A ──────────────────────────────────────────────────────────
  { id: 'A1-MEX-RSA', group: 'A', phase: 'group', matchday: 1, home: 'MEX', away: 'RSA', datetime: '2026-06-11T19:00:00.000Z', venue: VENUES.AZTECA },
  { id: 'A1-KOR-CZE', group: 'A', phase: 'group', matchday: 1, home: 'KOR', away: 'CZE', datetime: '2026-06-12T02:00:00.000Z', venue: VENUES.AKRON },
  { id: 'A2-CZE-RSA', group: 'A', phase: 'group', matchday: 2, home: 'CZE', away: 'RSA', datetime: '2026-06-18T16:00:00.000Z', venue: VENUES.MERCEDES },
  { id: 'A2-MEX-KOR', group: 'A', phase: 'group', matchday: 2, home: 'MEX', away: 'KOR', datetime: '2026-06-19T01:00:00.000Z', venue: VENUES.AKRON },
  { id: 'A3-CZE-MEX', group: 'A', phase: 'group', matchday: 3, home: 'CZE', away: 'MEX', datetime: '2026-06-25T01:00:00.000Z', venue: VENUES.AZTECA },
  { id: 'A3-RSA-KOR', group: 'A', phase: 'group', matchday: 3, home: 'RSA', away: 'KOR', datetime: '2026-06-25T01:00:00.000Z', venue: VENUES.BBVA },
  // ── Grupo B ──────────────────────────────────────────────────────────
  { id: 'B1-CAN-BIH', group: 'B', phase: 'group', matchday: 1, home: 'CAN', away: 'BIH', datetime: '2026-06-12T19:00:00.000Z', venue: VENUES.TORONTO },
  { id: 'B1-QAT-SUI', group: 'B', phase: 'group', matchday: 1, home: 'QAT', away: 'SUI', datetime: '2026-06-13T19:00:00.000Z', venue: VENUES.LEVIS },
  { id: 'B2-SUI-BIH', group: 'B', phase: 'group', matchday: 2, home: 'SUI', away: 'BIH', datetime: '2026-06-18T19:00:00.000Z', venue: VENUES.SOFI },
  { id: 'B2-CAN-QAT', group: 'B', phase: 'group', matchday: 2, home: 'CAN', away: 'QAT', datetime: '2026-06-18T22:00:00.000Z', venue: VENUES.VANCOUVER },
  { id: 'B3-SUI-CAN', group: 'B', phase: 'group', matchday: 3, home: 'SUI', away: 'CAN', datetime: '2026-06-24T19:00:00.000Z', venue: VENUES.VANCOUVER },
  { id: 'B3-BIH-QAT', group: 'B', phase: 'group', matchday: 3, home: 'BIH', away: 'QAT', datetime: '2026-06-24T19:00:00.000Z', venue: VENUES.LUMEN },
  // ── Grupo C ──────────────────────────────────────────────────────────
  { id: 'C1-BRA-MAR', group: 'C', phase: 'group', matchday: 1, home: 'BRA', away: 'MAR', datetime: '2026-06-13T22:00:00.000Z', venue: VENUES.METLIFE },
  { id: 'C1-HAI-SCO', group: 'C', phase: 'group', matchday: 1, home: 'HAI', away: 'SCO', datetime: '2026-06-14T01:00:00.000Z', venue: VENUES.GILLETTE },
  { id: 'C2-SCO-MAR', group: 'C', phase: 'group', matchday: 2, home: 'SCO', away: 'MAR', datetime: '2026-06-19T22:00:00.000Z', venue: VENUES.GILLETTE },
  { id: 'C2-BRA-HAI', group: 'C', phase: 'group', matchday: 2, home: 'BRA', away: 'HAI', datetime: '2026-06-20T00:30:00.000Z', venue: VENUES.LINCOLN },
  { id: 'C3-SCO-BRA', group: 'C', phase: 'group', matchday: 3, home: 'SCO', away: 'BRA', datetime: '2026-06-24T22:00:00.000Z', venue: VENUES.HARDROCK },
  { id: 'C3-MAR-HAI', group: 'C', phase: 'group', matchday: 3, home: 'MAR', away: 'HAI', datetime: '2026-06-24T22:00:00.000Z', venue: VENUES.MERCEDES },
  // ── Grupo D ──────────────────────────────────────────────────────────
  { id: 'D1-USA-PAR', group: 'D', phase: 'group', matchday: 1, home: 'USA', away: 'PAR', datetime: '2026-06-13T01:00:00.000Z', venue: VENUES.SOFI },
  { id: 'D1-AUS-TUR', group: 'D', phase: 'group', matchday: 1, home: 'AUS', away: 'TUR', datetime: '2026-06-14T04:00:00.000Z', venue: VENUES.VANCOUVER },
  { id: 'D2-USA-AUS', group: 'D', phase: 'group', matchday: 2, home: 'USA', away: 'AUS', datetime: '2026-06-19T19:00:00.000Z', venue: VENUES.LUMEN },
  { id: 'D2-TUR-PAR', group: 'D', phase: 'group', matchday: 2, home: 'TUR', away: 'PAR', datetime: '2026-06-20T03:00:00.000Z', venue: VENUES.LEVIS },
  { id: 'D3-TUR-USA', group: 'D', phase: 'group', matchday: 3, home: 'TUR', away: 'USA', datetime: '2026-06-26T02:00:00.000Z', venue: VENUES.SOFI },
  { id: 'D3-PAR-AUS', group: 'D', phase: 'group', matchday: 3, home: 'PAR', away: 'AUS', datetime: '2026-06-26T02:00:00.000Z', venue: VENUES.LEVIS },
  // ── Grupo E ──────────────────────────────────────────────────────────
  { id: 'E1-GER-CUR', group: 'E', phase: 'group', matchday: 1, home: 'GER', away: 'CUR', datetime: '2026-06-14T17:00:00.000Z', venue: VENUES.NRG },
  { id: 'E1-CIV-ECU', group: 'E', phase: 'group', matchday: 1, home: 'CIV', away: 'ECU', datetime: '2026-06-14T23:00:00.000Z', venue: VENUES.LINCOLN },
  { id: 'E2-GER-CIV', group: 'E', phase: 'group', matchday: 2, home: 'GER', away: 'CIV', datetime: '2026-06-20T20:00:00.000Z', venue: VENUES.TORONTO },
  { id: 'E2-ECU-CUR', group: 'E', phase: 'group', matchday: 2, home: 'ECU', away: 'CUR', datetime: '2026-06-21T00:00:00.000Z', venue: VENUES.ARROWHEAD },
  { id: 'E3-CUR-CIV', group: 'E', phase: 'group', matchday: 3, home: 'CUR', away: 'CIV', datetime: '2026-06-25T20:00:00.000Z', venue: VENUES.LINCOLN },
  { id: 'E3-ECU-GER', group: 'E', phase: 'group', matchday: 3, home: 'ECU', away: 'GER', datetime: '2026-06-25T20:00:00.000Z', venue: VENUES.METLIFE },
  // ── Grupo F ──────────────────────────────────────────────────────────
  { id: 'F1-NED-JPN', group: 'F', phase: 'group', matchday: 1, home: 'NED', away: 'JPN', datetime: '2026-06-14T20:00:00.000Z', venue: VENUES.ATT },
  { id: 'F1-SWE-TUN', group: 'F', phase: 'group', matchday: 1, home: 'SWE', away: 'TUN', datetime: '2026-06-15T02:00:00.000Z', venue: VENUES.BBVA },
  { id: 'F2-NED-SWE', group: 'F', phase: 'group', matchday: 2, home: 'NED', away: 'SWE', datetime: '2026-06-20T17:00:00.000Z', venue: VENUES.NRG },
  { id: 'F2-TUN-JPN', group: 'F', phase: 'group', matchday: 2, home: 'TUN', away: 'JPN', datetime: '2026-06-21T04:00:00.000Z', venue: VENUES.BBVA },
  { id: 'F3-JPN-SWE', group: 'F', phase: 'group', matchday: 3, home: 'JPN', away: 'SWE', datetime: '2026-06-25T23:00:00.000Z', venue: VENUES.ATT },
  { id: 'F3-TUN-NED', group: 'F', phase: 'group', matchday: 3, home: 'TUN', away: 'NED', datetime: '2026-06-25T23:00:00.000Z', venue: VENUES.ARROWHEAD },
  // ── Grupo G ──────────────────────────────────────────────────────────
  { id: 'G1-BEL-EGY', group: 'G', phase: 'group', matchday: 1, home: 'BEL', away: 'EGY', datetime: '2026-06-15T19:00:00.000Z', venue: VENUES.LUMEN },
  { id: 'G1-IRN-NZL', group: 'G', phase: 'group', matchday: 1, home: 'IRN', away: 'NZL', datetime: '2026-06-16T01:00:00.000Z', venue: VENUES.SOFI },
  { id: 'G2-BEL-IRN', group: 'G', phase: 'group', matchday: 2, home: 'BEL', away: 'IRN', datetime: '2026-06-21T19:00:00.000Z', venue: VENUES.SOFI },
  { id: 'G2-NZL-EGY', group: 'G', phase: 'group', matchday: 2, home: 'NZL', away: 'EGY', datetime: '2026-06-22T01:00:00.000Z', venue: VENUES.VANCOUVER },
  { id: 'G3-EGY-IRN', group: 'G', phase: 'group', matchday: 3, home: 'EGY', away: 'IRN', datetime: '2026-06-27T03:00:00.000Z', venue: VENUES.LUMEN },
  { id: 'G3-NZL-BEL', group: 'G', phase: 'group', matchday: 3, home: 'NZL', away: 'BEL', datetime: '2026-06-27T03:00:00.000Z', venue: VENUES.VANCOUVER },
  // ── Grupo H ──────────────────────────────────────────────────────────
  { id: 'H1-ESP-CPV', group: 'H', phase: 'group', matchday: 1, home: 'ESP', away: 'CPV', datetime: '2026-06-15T16:00:00.000Z', venue: VENUES.MERCEDES },
  { id: 'H1-KSA-URU', group: 'H', phase: 'group', matchday: 1, home: 'KSA', away: 'URU', datetime: '2026-06-15T22:00:00.000Z', venue: VENUES.HARDROCK },
  { id: 'H2-ESP-KSA', group: 'H', phase: 'group', matchday: 2, home: 'ESP', away: 'KSA', datetime: '2026-06-21T16:00:00.000Z', venue: VENUES.MERCEDES },
  { id: 'H2-URU-CPV', group: 'H', phase: 'group', matchday: 2, home: 'URU', away: 'CPV', datetime: '2026-06-21T22:00:00.000Z', venue: VENUES.HARDROCK },
  { id: 'H3-CPV-KSA', group: 'H', phase: 'group', matchday: 3, home: 'CPV', away: 'KSA', datetime: '2026-06-27T00:00:00.000Z', venue: VENUES.NRG },
  { id: 'H3-URU-ESP', group: 'H', phase: 'group', matchday: 3, home: 'URU', away: 'ESP', datetime: '2026-06-27T00:00:00.000Z', venue: VENUES.AKRON },
  // ── Grupo I ──────────────────────────────────────────────────────────
  { id: 'I1-FRA-SEN', group: 'I', phase: 'group', matchday: 1, home: 'FRA', away: 'SEN', datetime: '2026-06-16T19:00:00.000Z', venue: VENUES.METLIFE },
  { id: 'I1-IRQ-NOR', group: 'I', phase: 'group', matchday: 1, home: 'IRQ', away: 'NOR', datetime: '2026-06-16T22:00:00.000Z', venue: VENUES.GILLETTE },
  { id: 'I2-FRA-IRQ', group: 'I', phase: 'group', matchday: 2, home: 'FRA', away: 'IRQ', datetime: '2026-06-22T21:00:00.000Z', venue: VENUES.LINCOLN },
  { id: 'I2-NOR-SEN', group: 'I', phase: 'group', matchday: 2, home: 'NOR', away: 'SEN', datetime: '2026-06-23T00:00:00.000Z', venue: VENUES.METLIFE },
  { id: 'I3-NOR-FRA', group: 'I', phase: 'group', matchday: 3, home: 'NOR', away: 'FRA', datetime: '2026-06-26T19:00:00.000Z', venue: VENUES.GILLETTE },
  { id: 'I3-SEN-IRQ', group: 'I', phase: 'group', matchday: 3, home: 'SEN', away: 'IRQ', datetime: '2026-06-26T19:00:00.000Z', venue: VENUES.TORONTO },
  // ── Grupo J ──────────────────────────────────────────────────────────
  { id: 'J1-ARG-ALG', group: 'J', phase: 'group', matchday: 1, home: 'ARG', away: 'ALG', datetime: '2026-06-17T01:00:00.000Z', venue: VENUES.ARROWHEAD },
  { id: 'J1-AUT-JOR', group: 'J', phase: 'group', matchday: 1, home: 'AUT', away: 'JOR', datetime: '2026-06-17T04:00:00.000Z', venue: VENUES.LEVIS },
  { id: 'J2-ARG-AUT', group: 'J', phase: 'group', matchday: 2, home: 'ARG', away: 'AUT', datetime: '2026-06-22T17:00:00.000Z', venue: VENUES.ATT },
  { id: 'J2-JOR-ALG', group: 'J', phase: 'group', matchday: 2, home: 'JOR', away: 'ALG', datetime: '2026-06-23T03:00:00.000Z', venue: VENUES.LEVIS },
  { id: 'J3-ALG-AUT', group: 'J', phase: 'group', matchday: 3, home: 'ALG', away: 'AUT', datetime: '2026-06-28T02:00:00.000Z', venue: VENUES.ARROWHEAD },
  { id: 'J3-JOR-ARG', group: 'J', phase: 'group', matchday: 3, home: 'JOR', away: 'ARG', datetime: '2026-06-28T02:00:00.000Z', venue: VENUES.ATT },
  // ── Grupo K ──────────────────────────────────────────────────────────
  { id: 'K1-POR-COD', group: 'K', phase: 'group', matchday: 1, home: 'POR', away: 'COD', datetime: '2026-06-17T17:00:00.000Z', venue: VENUES.NRG },
  { id: 'K1-UZB-COL', group: 'K', phase: 'group', matchday: 1, home: 'UZB', away: 'COL', datetime: '2026-06-18T02:00:00.000Z', venue: VENUES.AZTECA },
  { id: 'K2-POR-UZB', group: 'K', phase: 'group', matchday: 2, home: 'POR', away: 'UZB', datetime: '2026-06-23T17:00:00.000Z', venue: VENUES.NRG },
  { id: 'K2-COL-COD', group: 'K', phase: 'group', matchday: 2, home: 'COL', away: 'COD', datetime: '2026-06-24T02:00:00.000Z', venue: VENUES.AKRON },
  { id: 'K3-COL-POR', group: 'K', phase: 'group', matchday: 3, home: 'COL', away: 'POR', datetime: '2026-06-27T23:30:00.000Z', venue: VENUES.HARDROCK },
  { id: 'K3-COD-UZB', group: 'K', phase: 'group', matchday: 3, home: 'COD', away: 'UZB', datetime: '2026-06-27T23:30:00.000Z', venue: VENUES.MERCEDES },
  // ── Grupo L ──────────────────────────────────────────────────────────
  { id: 'L1-ENG-CRO', group: 'L', phase: 'group', matchday: 1, home: 'ENG', away: 'CRO', datetime: '2026-06-17T20:00:00.000Z', venue: VENUES.ATT },
  { id: 'L1-GHA-PAN', group: 'L', phase: 'group', matchday: 1, home: 'GHA', away: 'PAN', datetime: '2026-06-17T23:00:00.000Z', venue: VENUES.TORONTO },
  { id: 'L2-ENG-GHA', group: 'L', phase: 'group', matchday: 2, home: 'ENG', away: 'GHA', datetime: '2026-06-23T20:00:00.000Z', venue: VENUES.GILLETTE },
  { id: 'L2-PAN-CRO', group: 'L', phase: 'group', matchday: 2, home: 'PAN', away: 'CRO', datetime: '2026-06-23T23:00:00.000Z', venue: VENUES.TORONTO },
  { id: 'L3-PAN-ENG', group: 'L', phase: 'group', matchday: 3, home: 'PAN', away: 'ENG', datetime: '2026-06-27T21:00:00.000Z', venue: VENUES.METLIFE },
  { id: 'L3-CRO-GHA', group: 'L', phase: 'group', matchday: 3, home: 'CRO', away: 'GHA', datetime: '2026-06-27T21:00:00.000Z', venue: VENUES.LINCOLN },
]

// Fase eliminatoria — empieza el 28 de junio 2026
// Fuente: Wikipedia / FIFA oficial. 'num' = número oficial de partido FIFA (73-104),
// que es la nomenclatura usada en los placeholders (ej: 'Gan. M74' = ganador del partido 74).
// El 'id' interno (R32-1, R16-1, ...) se mantiene como clave estable de predicciones/resultados.
const KNOCKOUT_MATCHES = [
  // ── Ronda de 32 ─────────────────────────────────────────────────────
  // Jun 28
  { id: 'R32-1',  num: 73, phase: 'round32', matchday: null, home: '2° Grupo A', away: '2° Grupo B',          datetime: '2026-06-28T19:00:00.000Z', venue: VENUES.SOFI,      group: null },
  // Jun 29
  { id: 'R32-2',  num: 76, phase: 'round32', matchday: null, home: '1° Grupo C', away: '2° Grupo F',          datetime: '2026-06-29T17:00:00.000Z', venue: VENUES.NRG,       group: null },
  { id: 'R32-3',  num: 74, phase: 'round32', matchday: null, home: '1° Grupo E', away: '3° mejor (A/B/C/D/F)', datetime: '2026-06-29T20:30:00.000Z', venue: VENUES.GILLETTE,  group: null },
  { id: 'R32-4',  num: 75, phase: 'round32', matchday: null, home: '1° Grupo F', away: '2° Grupo C',          datetime: '2026-06-30T01:00:00.000Z', venue: VENUES.BBVA,      group: null },
  // Jun 30
  { id: 'R32-5',  num: 78, phase: 'round32', matchday: null, home: '2° Grupo E', away: '2° Grupo I',          datetime: '2026-06-30T17:00:00.000Z', venue: VENUES.ATT,       group: null },
  { id: 'R32-6',  num: 77, phase: 'round32', matchday: null, home: '1° Grupo I', away: '3° mejor (C/D/F/G/H)', datetime: '2026-06-30T21:00:00.000Z', venue: VENUES.METLIFE,   group: null },
  { id: 'R32-7',  num: 79, phase: 'round32', matchday: null, home: '1° Grupo A', away: '3° mejor (C/E/F/H/I)', datetime: '2026-07-01T01:00:00.000Z', venue: VENUES.AZTECA,    group: null },
  // Jul 1
  { id: 'R32-8',  num: 80, phase: 'round32', matchday: null, home: '1° Grupo L', away: '3° mejor (E/H/I/J/K)', datetime: '2026-07-01T16:00:00.000Z', venue: VENUES.MERCEDES,  group: null },
  { id: 'R32-9',  num: 82, phase: 'round32', matchday: null, home: '1° Grupo G', away: '3° mejor (A/E/H/I/J)', datetime: '2026-07-01T20:00:00.000Z', venue: VENUES.LUMEN,     group: null },
  { id: 'R32-10', num: 81, phase: 'round32', matchday: null, home: '1° Grupo D', away: '3° mejor (B/E/F/I/J)', datetime: '2026-07-02T00:00:00.000Z', venue: VENUES.LEVIS,     group: null },
  // Jul 2
  { id: 'R32-11', num: 84, phase: 'round32', matchday: null, home: '1° Grupo H', away: '2° Grupo J',          datetime: '2026-07-02T19:00:00.000Z', venue: VENUES.SOFI,      group: null },
  { id: 'R32-12', num: 83, phase: 'round32', matchday: null, home: '2° Grupo K', away: '2° Grupo L',          datetime: '2026-07-02T23:00:00.000Z', venue: VENUES.TORONTO,   group: null },
  // Jul 3
  { id: 'R32-13', num: 85, phase: 'round32', matchday: null, home: '1° Grupo B', away: '3° mejor (E/F/G/I/J)', datetime: '2026-07-03T03:00:00.000Z', venue: VENUES.VANCOUVER, group: null },
  { id: 'R32-14', num: 88, phase: 'round32', matchday: null, home: '2° Grupo D', away: '2° Grupo G',          datetime: '2026-07-03T18:00:00.000Z', venue: VENUES.ATT,       group: null },
  { id: 'R32-15', num: 86, phase: 'round32', matchday: null, home: '1° Grupo J', away: '2° Grupo H',          datetime: '2026-07-03T22:00:00.000Z', venue: VENUES.HARDROCK,  group: null },
  // Jul 4
  { id: 'R32-16', num: 87, phase: 'round32', matchday: null, home: '1° Grupo K', away: '3° mejor (D/E/I/J/L)', datetime: '2026-07-04T01:30:00.000Z', venue: VENUES.ARROWHEAD, group: null },

  // ── Octavos de Final ─────────────────────────────────────────────────
  // Jul 4
  { id: 'R16-1',  num: 90, phase: 'round16', matchday: null, home: 'Gan. M73',  away: 'Gan. M75',  datetime: '2026-07-04T17:00:00.000Z', venue: VENUES.NRG,       group: null },
  { id: 'R16-2',  num: 89, phase: 'round16', matchday: null, home: 'Gan. M74',  away: 'Gan. M77',  datetime: '2026-07-04T21:00:00.000Z', venue: VENUES.LINCOLN,   group: null },
  // Jul 5
  { id: 'R16-3',  num: 91, phase: 'round16', matchday: null, home: 'Gan. M76',  away: 'Gan. M78',  datetime: '2026-07-05T20:00:00.000Z', venue: VENUES.METLIFE,   group: null },
  { id: 'R16-4',  num: 92, phase: 'round16', matchday: null, home: 'Gan. M79',  away: 'Gan. M80',  datetime: '2026-07-06T00:00:00.000Z', venue: VENUES.AZTECA,    group: null },
  // Jul 6
  { id: 'R16-5',  num: 93, phase: 'round16', matchday: null, home: 'Gan. M83',  away: 'Gan. M84',  datetime: '2026-07-06T19:00:00.000Z', venue: VENUES.ATT,       group: null },
  { id: 'R16-6',  num: 94, phase: 'round16', matchday: null, home: 'Gan. M81',  away: 'Gan. M82',  datetime: '2026-07-07T00:00:00.000Z', venue: VENUES.LUMEN,     group: null },
  // Jul 7
  { id: 'R16-7',  num: 95, phase: 'round16', matchday: null, home: 'Gan. M86',  away: 'Gan. M88',  datetime: '2026-07-07T16:00:00.000Z', venue: VENUES.MERCEDES,  group: null },
  { id: 'R16-8',  num: 96, phase: 'round16', matchday: null, home: 'Gan. M85',  away: 'Gan. M87',  datetime: '2026-07-07T20:00:00.000Z', venue: VENUES.VANCOUVER, group: null },

  // ── Cuartos de Final ─────────────────────────────────────────────────
  { id: 'QF-1',   num: 97,  phase: 'quarterfinal', matchday: null, home: 'Gan. M89', away: 'Gan. M90', datetime: '2026-07-09T20:00:00.000Z', venue: VENUES.GILLETTE,  group: null },
  { id: 'QF-2',   num: 98,  phase: 'quarterfinal', matchday: null, home: 'Gan. M93', away: 'Gan. M94', datetime: '2026-07-10T19:00:00.000Z', venue: VENUES.SOFI,      group: null },
  { id: 'QF-3',   num: 99,  phase: 'quarterfinal', matchday: null, home: 'Gan. M91', away: 'Gan. M92', datetime: '2026-07-11T21:00:00.000Z', venue: VENUES.HARDROCK,  group: null },
  { id: 'QF-4',   num: 100, phase: 'quarterfinal', matchday: null, home: 'Gan. M95', away: 'Gan. M96', datetime: '2026-07-12T01:00:00.000Z', venue: VENUES.ARROWHEAD, group: null },

  // ── Semifinales ──────────────────────────────────────────────────────
  { id: 'SF-1',   num: 101, phase: 'semifinal',    matchday: null, home: 'Gan. M97',  away: 'Gan. M98',  datetime: '2026-07-14T19:00:00.000Z', venue: VENUES.ATT,       group: null },
  { id: 'SF-2',   num: 102, phase: 'semifinal',    matchday: null, home: 'Gan. M99',  away: 'Gan. M100', datetime: '2026-07-15T19:00:00.000Z', venue: VENUES.MERCEDES,  group: null },

  // ── Tercer Puesto ────────────────────────────────────────────────────
  { id: 'TP-1',   num: 103, phase: 'third_place',  matchday: null, home: 'Per. M101', away: 'Per. M102', datetime: '2026-07-18T21:00:00.000Z', venue: VENUES.HARDROCK,  group: null },

  // ── Final ────────────────────────────────────────────────────────────
  { id: 'FINAL',  num: 104, phase: 'final',        matchday: null, home: 'Gan. M101', away: 'Gan. M102', datetime: '2026-07-19T19:00:00.000Z', venue: VENUES.METLIFE,   group: null },
]

export const MATCHES = [...groupMatches, ...KNOCKOUT_MATCHES]

// Timezone local de cada sede — para mostrar el horario donde se juega el partido
export const VENUE_TIMEZONES = {
  'Estadio Azteca, Ciudad de México':      { tz: 'America/Mexico_City',  label: 'CST' },
  'Estadio Akron, Guadalajara':            { tz: 'America/Mexico_City',  label: 'CST' },
  'Estadio BBVA, Monterrey':              { tz: 'America/Monterrey',    label: 'CST' },
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

// Las predicciones se pueden cargar/modificar hasta este margen (en minutos)
// antes del inicio del partido. Pasado ese momento, quedan bloqueadas.
export const PREDICTION_LOCK_MINUTES = 30

// Momento límite (Date) para predecir un partido: inicio menos el margen de bloqueo.
export function getPredictionDeadline(datetimeStr) {
  return new Date(new Date(datetimeStr).getTime() - PREDICTION_LOCK_MINUTES * 60 * 1000)
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

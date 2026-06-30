// Parseo unificado de resultados almacenados.
//
// Formatos válidos:
//   "2-1"          → resultado normal (90'/alargue)
//   "1-1 (P 4-3)"  → empate en eliminatoria definido por penales. El 4-3 está en
//                    la perspectiva del local. El resultado de los 90'/alargue
//                    sigue siendo 1-1 (es lo que se puntúa); los penales solo
//                    definen quién avanza a la siguiente ronda.
//
// Devuelve { home, away, pen } donde pen es { home, away } o null,
// o null si el string no es un resultado válido.
const RESULT_RE = /^(\d{1,2})-(\d{1,2})(?:\s*\(P\s*(\d{1,2})-(\d{1,2})\))?$/

export function parseResult(result) {
  if (typeof result !== 'string') return null
  const m = result.trim().match(RESULT_RE)
  if (!m) return null
  const home = Number(m[1])
  const away = Number(m[2])
  if (Number.isNaN(home) || Number.isNaN(away)) return null
  const pen =
    m[3] != null && m[4] != null
      ? { home: Number(m[3]), away: Number(m[4]) }
      : null
  return { home, away, pen }
}

// Lado ganador del partido ('home' | 'away'), considerando los penales cuando
// los 90'/alargue terminaron empatados. Devuelve null si no hay un ganador
// definido (sin resultado, o empate sin definición por penales).
export function resultWinnerSide(result) {
  const r = parseResult(result)
  if (!r) return null
  if (r.home > r.away) return 'home'
  if (r.home < r.away) return 'away'
  if (r.pen && r.pen.home !== r.pen.away) {
    return r.pen.home > r.pen.away ? 'home' : 'away'
  }
  return null
}

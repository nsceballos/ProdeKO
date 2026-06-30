import { useState, useEffect, useRef } from 'react'
import { TEAMS, PHASE_LABELS, VENUE_TIMEZONES, getPredictionDeadline } from '../data/worldcup2026'
import { parseResult } from '../lib/result'

function formatDatetime(datetimeStr, venue) {
  const date = new Date(datetimeStr)
  const venueInfo = VENUE_TIMEZONES[venue]
  const tz = venueInfo ? venueInfo.tz : 'America/New_York'
  const label = venueInfo ? venueInfo.label : ''
  const formatted = date.toLocaleString('es-CO', {
    weekday: 'short', day: 'numeric', month: 'short',
    hour: '2-digit', minute: '2-digit', timeZone: tz,
  })
  return label ? `${formatted} ${label}` : formatted
}

// La predicción queda bloqueada 30 min antes del inicio (ver PREDICTION_LOCK_MINUTES).
function isPredictionLocked(datetimeStr) {
  return new Date() >= getPredictionDeadline(datetimeStr)
}

function getTeamInfo(teamCode) {
  return TEAMS[teamCode] || { name: teamCode, flag: '🏳️', code: '' }
}

function parseScore(prediction) {
  if (!prediction || !prediction.includes('-')) return { h: '', a: '' }
  const [h, a] = prediction.split('-')
  return { h: h ?? '', a: a ?? '' }
}

function outcomeLabel(pred) {
  if (!pred || !pred.includes('-')) return null
  const [h, a] = pred.split('-').map(Number)
  if (isNaN(h) || isNaN(a)) return null
  if (h > a) return 'local'
  if (h < a) return 'visitante'
  return 'empate'
}

export default function MatchCard({ match, prediction, result, onPredict, saving }) {
  const [started, setStarted] = useState(() => isPredictionLocked(match.datetime))
  const { h: initH, a: initA } = parseScore(prediction)
  const parsedResult = parseResult(result)
  const [homeGoals, setHomeGoals] = useState(initH)
  const [awayGoals, setAwayGoals] = useState(initA)
  const debounceRef = useRef(null)

  // Real-time lock 30 min antes del inicio
  useEffect(() => {
    if (started) return
    const ms = getPredictionDeadline(match.datetime) - Date.now()
    if (ms <= 0) { setStarted(true); return }
    if (ms > 2147483647) return
    const timer = setTimeout(() => setStarted(true), ms)
    return () => clearTimeout(timer)
  }, [match.datetime, started])

  // Sync inputs when prediction prop changes (e.g., loaded from API)
  useEffect(() => {
    const { h, a } = parseScore(prediction)
    setHomeGoals(h)
    setAwayGoals(a)
  }, [prediction])

  function handleScoreChange(side, value) {
    const num = value.replace(/[^0-9]/g, '').slice(0, 2)
    const newH = side === 'home' ? num : homeGoals
    const newA = side === 'away' ? num : awayGoals
    if (side === 'home') setHomeGoals(num)
    else setAwayGoals(num)

    if (newH !== '' && newA !== '') {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        onPredict(match.id, `${newH}-${newA}`)
      }, 400)
    }
  }

  const homeTeam = getTeamInfo(match.home)
  const awayTeam = getTeamInfo(match.away)
  const phaseLabel = match.phase === 'group'
    ? `Grupo ${match.group} · J${match.matchday}`
    : PHASE_LABELS[match.phase] || match.phase

  const hasPrediction = homeGoals !== '' && awayGoals !== ''

  return (
    <div className={`bg-white rounded-2xl shadow-sm border ${started ? 'border-gray-100' : 'border-gray-100 hover:border-red-100'} transition-colors overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <span className="text-xs font-semibold text-gray-500 bg-gray-100 rounded-full px-2.5 py-0.5">
          {phaseLabel}
        </span>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <ClockMiniIcon />
          {formatDatetime(match.datetime, match.venue)}
        </span>
      </div>

      <div className="px-4 pb-2">
        <span className="text-xs text-gray-400">{match.venue}</span>
      </div>

      {/* Teams + Score */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2">
          {/* Home */}
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <FlagDisplay team={homeTeam} />
            <span className="font-bold text-gray-900 text-sm truncate">{homeTeam.name}</span>
          </div>

          {/* Score inputs or result */}
          <div className="shrink-0 flex items-center gap-2">
            {started ? (
              parsedResult ? (
                <div className="flex flex-col items-center gap-0.5">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-xl">
                    <span className="text-lg font-black text-green-700">{parsedResult.home}</span>
                    <span className="text-green-400 font-bold">-</span>
                    <span className="text-lg font-black text-green-700">{parsedResult.away}</span>
                  </div>
                  {parsedResult.pen ? (
                    <span className="text-[9px] font-semibold text-green-600 uppercase tracking-wide">
                      Penales {parsedResult.pen.home}-{parsedResult.pen.away}
                    </span>
                  ) : (
                    <span className="text-[9px] font-semibold text-green-500 uppercase tracking-wide">Resultado</span>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl">
                  <span className="text-lg font-black text-gray-400">–</span>
                  <span className="text-gray-300 font-bold">-</span>
                  <span className="text-lg font-black text-gray-400">–</span>
                </div>
              )
            ) : (
              <div className="flex items-center gap-2">
                <ScoreStepper
                  value={homeGoals}
                  onChange={(v) => handleScoreChange('home', v)}
                  disabled={saving}
                />
                <span className="text-gray-400 font-bold text-lg">-</span>
                <ScoreStepper
                  value={awayGoals}
                  onChange={(v) => handleScoreChange('away', v)}
                  disabled={saving}
                />
              </div>
            )}
          </div>

          {/* Away */}
          <div className="flex-1 flex items-center justify-end gap-2 min-w-0">
            <span className="font-bold text-gray-900 text-sm truncate text-right">{awayTeam.name}</span>
            <FlagDisplay team={awayTeam} />
          </div>
        </div>

        {/* Prediction summary row */}
        <div className="mt-2 flex items-center justify-end gap-2 min-h-[20px]">
          {started && hasPrediction && (
            <span className="text-xs font-bold text-coke-red bg-red-50 px-2 py-0.5 rounded-full">
              Tu predicción: {homeGoals}-{awayGoals}
            </span>
          )}
          {!started && hasPrediction && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              {saving ? <span className="animate-pulse">Guardando...</span> : <><CheckIcon /><span>Guardado</span></>}
            </span>
          )}
          {!started && !hasPrediction && (
            <span className="text-xs text-gray-300">Ingresá tu resultado</span>
          )}
        </div>
      </div>
    </div>
  )
}

function ScoreStepper({ value, onChange, disabled }) {
  const num = parseInt(value)
  return (
    <div className="flex flex-col items-center gap-0.5">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(String(Math.min(99, (isNaN(num) ? 0 : num) + 1)))}
        className="w-6 h-5 rounded bg-gray-100 hover:bg-gray-200 text-gray-500 text-xs font-bold leading-none disabled:opacity-40 flex items-center justify-center"
      >▲</button>
      <input
        type="number"
        min="0"
        max="99"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, '').slice(0, 2))}
        className="w-10 h-10 text-center text-xl font-black text-gray-900 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-coke-red disabled:bg-gray-50 disabled:text-gray-400"
      />
      <button
        type="button"
        disabled={disabled || isNaN(num) || num <= 0}
        onClick={() => onChange(String(Math.max(0, num - 1)))}
        className="w-6 h-5 rounded bg-gray-100 hover:bg-gray-200 text-gray-500 text-xs font-bold leading-none disabled:opacity-40 flex items-center justify-center"
      >▼</button>
    </div>
  )
}

function FlagDisplay({ team }) {
  if (!team.code) return <span className="text-xl shrink-0">🏳️</span>
  return (
    <img
      src={`https://flagcdn.com/w40/${team.code}.png`}
      alt={team.name}
      title={team.name}
      width={28}
      height={20}
      className="shrink-0 rounded-sm object-cover shadow-sm"
    />
  )
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ClockMiniIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

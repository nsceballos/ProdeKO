import { useState, useEffect } from 'react'
import { TEAMS, PHASE_LABELS, VENUE_TIMEZONES } from '../data/worldcup2026'

// Muestra el horario local de la sede donde se juega el partido
function formatDatetime(datetimeStr, venue) {
  const date = new Date(datetimeStr)
  const venueInfo = VENUE_TIMEZONES[venue]
  const tz = venueInfo ? venueInfo.tz : 'America/New_York'
  const label = venueInfo ? venueInfo.label : ''

  const formatted = date.toLocaleString('es-CO', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: tz,
  })

  return label ? `${formatted} ${label}` : formatted
}

function isMatchStarted(datetimeStr) {
  return new Date() >= new Date(datetimeStr)
}

function getTeamInfo(teamCode) {
  const team = TEAMS[teamCode]
  if (team) return team
  // For knockout TBD teams, return a display object
  return { name: teamCode, flag: '🏳️', code: '' }
}

export default function MatchCard({ match, prediction, onPredict, saving }) {
  const [started, setStarted] = useState(() => isMatchStarted(match.datetime))

  useEffect(() => {
    if (started) return
    const ms = new Date(match.datetime) - Date.now()
    if (ms <= 0) { setStarted(true); return }
    const timer = setTimeout(() => setStarted(true), ms)
    return () => clearTimeout(timer)
  }, [match.datetime, started])

  const homeTeam = getTeamInfo(match.home)
  const awayTeam = getTeamInfo(match.away)

  const isGroup = match.phase === 'group'
  const phaseLabel = isGroup
    ? `Grupo ${match.group} · J${match.matchday}`
    : PHASE_LABELS[match.phase] || match.phase

  function handlePredict(pred) {
    if (started || saving) return
    onPredict(match.id, pred)
  }

  return (
    <div className={`bg-white rounded-2xl shadow-sm border ${started ? 'border-gray-100' : 'border-gray-100 hover:border-red-100'} transition-colors overflow-hidden`}>
      {/* Header row */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <span className="text-xs font-semibold text-gray-500 bg-gray-100 rounded-full px-2.5 py-0.5">
          {phaseLabel}
        </span>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <ClockMiniIcon />
          {formatDatetime(match.datetime, match.venue)}
        </span>
      </div>

      {/* Venue */}
      <div className="px-4 pb-2">
        <span className="text-xs text-gray-400">{match.venue}</span>
      </div>

      {/* Teams */}
      <div className="px-4 pb-3 flex items-center gap-3">
        {/* Home team */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <FlagDisplay team={homeTeam} />
          <span className="font-bold text-gray-900 text-sm truncate">{homeTeam.name}</span>
        </div>

        {/* VS */}
        <div className="flex flex-col items-center shrink-0">
          <span className="text-gray-400 font-bold text-xs">VS</span>
        </div>

        {/* Away team */}
        <div className="flex-1 flex items-center justify-end gap-2 min-w-0">
          <span className="font-bold text-gray-900 text-sm truncate text-right">{awayTeam.name}</span>
          <FlagDisplay team={awayTeam} />
        </div>
      </div>

      {/* Status / Prediction buttons */}
      {started ? (
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
            <span className="text-xs text-gray-500 font-medium">
              {started ? 'Partido en curso o finalizado' : ''}
            </span>
            {prediction && (
              <PredictionBadge prediction={prediction} homeTeam={homeTeam} awayTeam={awayTeam} />
            )}
          </div>
        </div>
      ) : (
        <div className="px-3 pb-4">
          <div className="grid grid-cols-3 gap-2">
            <PredictButton
              active={prediction === 'home'}
              disabled={started || saving}
              onClick={() => handlePredict('home')}
              label={homeTeam.name}
              shortLabel={homeTeam.name.split(' ')[0]}
            />
            <PredictButton
              active={prediction === 'draw'}
              disabled={started || saving}
              onClick={() => handlePredict('draw')}
              label="Empate"
              shortLabel="Empate"
            />
            <PredictButton
              active={prediction === 'away'}
              disabled={started || saving}
              onClick={() => handlePredict('away')}
              label={awayTeam.name}
              shortLabel={awayTeam.name.split(' ')[0]}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function FlagDisplay({ team }) {
  if (!team.code) {
    return <span className="text-xl shrink-0" title={team.name}>🏳️</span>
  }
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

function PredictButton({ active, disabled, onClick, label, shortLabel }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex flex-col items-center justify-center py-2 px-1 rounded-xl border-2 text-xs font-semibold transition-all
        ${active
          ? 'bg-coke-red border-coke-red text-white shadow-sm'
          : 'bg-white border-gray-200 text-gray-600 hover:border-coke-red hover:text-coke-red'
        }
        ${disabled ? 'cursor-default opacity-80' : 'cursor-pointer'}
      `}
    >
      {active && (
        <span className="mb-0.5">
          <CheckIcon />
        </span>
      )}
      <span className="truncate w-full text-center leading-tight">
        {shortLabel}
      </span>
    </button>
  )
}

function PredictionBadge({ prediction, homeTeam, awayTeam }) {
  const labels = {
    home: homeTeam.name,
    draw: 'Empate',
    away: awayTeam.name,
  }
  return (
    <span className="text-xs font-bold text-coke-red bg-red-50 px-2 py-0.5 rounded-full">
      Predicción: {labels[prediction] || prediction}
    </span>
  )
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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

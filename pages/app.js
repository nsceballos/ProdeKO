import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../components/Header'
import MatchCard from '../components/MatchCard'
import { MATCHES, PHASE_LABELS, GROUPS } from '../data/worldcup2026'

const GROUP_FILTERS = ['Todos', ...Object.keys(GROUPS).map((g) => `Grupo ${g}`)]

const PHASE_ORDER = ['group', 'round32', 'round16', 'quarterfinal', 'semifinal', 'third_place', 'final']

const GROUP_PHASE_MATCHES = MATCHES.filter((m) => m.phase === 'group')
const KNOCKOUT_PHASE_MATCHES = MATCHES.filter((m) => m.phase !== 'group')

export default function AppPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('groups')
  const [groupFilter, setGroupFilter] = useState('Todos')
  const [predictions, setPredictions] = useState({})
  const [savingMatch, setSavingMatch] = useState(null)
  const [ranking, setRanking] = useState([])
  const [rankingLoading, setRankingLoading] = useState(false)
  const [saveError, setSaveError] = useState('')

  // Auth check on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/me')
        if (!res.ok) {
          router.push('/')
          return
        }
        const data = await res.json()
        setUser(data.user)
      } catch {
        router.push('/')
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router])

  // Load predictions after auth
  useEffect(() => {
    if (!user) return
    async function loadPredictions() {
      try {
        const res = await fetch('/api/predictions')
        if (!res.ok) return
        const data = await res.json()
        const map = {}
        for (const p of data.predictions || []) {
          map[p.match_id] = p.prediction
        }
        setPredictions(map)
      } catch {
        // non-fatal
      }
    }
    loadPredictions()
  }, [user])

  // Load ranking when switching to ranking tab
  useEffect(() => {
    if (activeTab !== 'ranking' || !user) return
    async function loadRanking() {
      setRankingLoading(true)
      try {
        const res = await fetch('/api/ranking')
        if (!res.ok) return
        const data = await res.json()
        setRanking(data.ranking || [])
      } catch {
        // non-fatal
      } finally {
        setRankingLoading(false)
      }
    }
    loadRanking()
  }, [activeTab, user])

  const handlePredict = useCallback(
    async (matchId, prediction) => {
      setSavingMatch(matchId)
      setSaveError('')
      const prev = predictions[matchId]

      // Optimistic update
      setPredictions((p) => ({ ...p, [matchId]: prediction }))

      try {
        const res = await fetch('/api/predictions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ matchId, prediction }),
        })
        if (!res.ok) {
          const data = await res.json()
          setSaveError(data.error || 'Error al guardar')
          // Rollback
          setPredictions((p) => ({ ...p, [matchId]: prev }))
        }
      } catch {
        setSaveError('Error de conexión')
        setPredictions((p) => ({ ...p, [matchId]: prev }))
      } finally {
        setSavingMatch(null)
      }
    },
    [predictions]
  )

  // Group stage: filter by group
  const filteredGroupMatches = GROUP_PHASE_MATCHES.filter((m) => {
    if (groupFilter === 'Todos') return true
    const groupLetter = groupFilter.replace('Grupo ', '')
    return m.group === groupLetter
  }).sort((a, b) => new Date(a.datetime) - new Date(b.datetime))

  const groupMatchesByMatchday = {}
  for (const match of filteredGroupMatches) {
    const key = `${match.group}-${match.matchday}`
    if (!groupMatchesByMatchday[key]) groupMatchesByMatchday[key] = { group: match.group, matchday: match.matchday, matches: [] }
    groupMatchesByMatchday[key].matches.push(match)
  }
  const sortedGroupKeys = Object.keys(groupMatchesByMatchday).sort()

  // Knockout: sort by phase order
  const knockoutByPhase = {}
  for (const match of KNOCKOUT_PHASE_MATCHES) {
    if (!knockoutByPhase[match.phase]) knockoutByPhase[match.phase] = []
    knockoutByPhase[match.phase].push(match)
  }
  const sortedKnockoutPhases = Object.keys(knockoutByPhase).sort(
    (a, b) => PHASE_ORDER.indexOf(a) - PHASE_ORDER.indexOf(b)
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-coke-red border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm font-medium">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Prode Mundial 2026</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header user={user} />

        {/* Tab navigation */}
        <div className="bg-white border-b border-gray-200 sticky top-[57px] sm:top-[60px] z-40">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex overflow-x-auto">
              <TabButton active={activeTab === 'groups'} onClick={() => setActiveTab('groups')}>
                Fase de Grupos
              </TabButton>
              <TabButton active={activeTab === 'knockouts'} onClick={() => setActiveTab('knockouts')}>
                Eliminatorias
              </TabButton>
              <TabButton active={activeTab === 'ranking'} onClick={() => setActiveTab('ranking')}>
                Ranking
              </TabButton>
            </div>
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-4 py-6">
          {saveError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex justify-between items-center">
              <span>{saveError}</span>
              <button onClick={() => setSaveError('')} className="text-red-500 hover:text-red-700 font-bold ml-2">✕</button>
            </div>
          )}

          {activeTab === 'groups' && (
            <GroupStageTab
              groupFilter={groupFilter}
              setGroupFilter={setGroupFilter}
              groupMatchesByMatchday={groupMatchesByMatchday}
              sortedGroupKeys={sortedGroupKeys}
              predictions={predictions}
              savingMatch={savingMatch}
              handlePredict={handlePredict}
            />
          )}

          {activeTab === 'knockouts' && (
            <KnockoutsTab
              knockoutByPhase={knockoutByPhase}
              sortedKnockoutPhases={sortedKnockoutPhases}
              predictions={predictions}
              savingMatch={savingMatch}
              handlePredict={handlePredict}
            />
          )}

          {activeTab === 'ranking' && (
            <RankingTab
              ranking={ranking}
              loading={rankingLoading}
              currentUserEmail={user?.email}
            />
          )}
        </main>

        <footer className="max-w-4xl mx-auto px-4 py-6 text-center">
          <p className="text-gray-400 text-xs">
            Desarrollado por el equipo de Strategy Arg &amp; UY
          </p>
        </footer>
      </div>
    </>
  )
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3.5 text-sm font-semibold border-b-2 transition-colors ${
        active
          ? 'border-coke-red text-coke-red'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
    >
      {children}
    </button>
  )
}

function GroupStageTab({
  groupFilter,
  setGroupFilter,
  groupMatchesByMatchday,
  sortedGroupKeys,
  predictions,
  savingMatch,
  handlePredict,
}) {
  return (
    <div>
      {/* Scrollable group filter bar */}
      <div className="mb-5">
        <div className="flex gap-2 overflow-x-auto pills-scroll pb-2 -mx-4 px-4">
          {GROUP_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setGroupFilter(filter)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                groupFilter === filter
                  ? 'bg-coke-red border-coke-red text-white shadow-sm'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {sortedGroupKeys.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <span className="text-4xl block mb-3">⚽</span>
          <p className="font-medium">No hay partidos para mostrar</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedGroupKeys.map((key) => {
            const { group, matchday, matches } = groupMatchesByMatchday[key]
            return (
              <div key={key}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                  Grupo {group} — Jornada {matchday}
                </p>
                <div className="space-y-3">
                  {matches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      prediction={predictions[match.id]}
                      onPredict={handlePredict}
                      saving={savingMatch === match.id}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function KnockoutsTab({ knockoutByPhase, sortedKnockoutPhases, predictions, savingMatch, handlePredict }) {
  if (sortedKnockoutPhases.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <span className="text-4xl block mb-3">🏆</span>
        <p className="font-medium">Las eliminatorias comenzarán cuando termine la fase de grupos</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {sortedKnockoutPhases.map((phase) => (
        <div key={phase}>
          <h2 className="text-base font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-yellow-400 rounded-full inline-block" />
            {PHASE_LABELS[phase] || phase}
          </h2>
          <div className="space-y-3">
            {knockoutByPhase[phase].map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                prediction={predictions[match.id]}
                onPredict={handlePredict}
                saving={savingMatch === match.id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function RankingTab({ ranking, loading, currentUserEmail }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-4 border-coke-red border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (ranking.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <span className="text-4xl block mb-3">🏆</span>
        <p className="font-medium">El ranking estará disponible cuando haya resultados</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <TrophySmallIcon />
        Tabla de Posiciones
      </h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-12 px-4 py-2.5 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="col-span-1">#</div>
          <div className="col-span-7">Jugador</div>
          <div className="col-span-2 text-center">Aciertos</div>
          <div className="col-span-2 text-right">Puntos</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-50">
          {ranking.map((entry, index) => {
            const isMe = entry.email === currentUserEmail
            const isTop3 = entry.position <= 3

            return (
              <div
                key={entry.email}
                className={`grid grid-cols-12 px-4 py-3.5 items-center ${
                  isMe ? 'bg-red-50' : 'hover:bg-gray-50'
                }`}
              >
                {/* Position */}
                <div className="col-span-1">
                  {isTop3 ? (
                    <span className="text-base">
                      {entry.position === 1 ? '🥇' : entry.position === 2 ? '🥈' : '🥉'}
                    </span>
                  ) : (
                    <span className="text-sm font-bold text-gray-400">{entry.position}</span>
                  )}
                </div>

                {/* Name */}
                <div className="col-span-7 flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-coke-red flex items-center justify-center text-white text-xs font-black shrink-0">
                    {entry.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold truncate ${isMe ? 'text-coke-red' : 'text-gray-900'}`}>
                      {entry.name}
                    </p>
                    {isMe && (
                      <span className="text-xs font-bold text-coke-red bg-red-100 rounded-full px-1.5 py-0.5">
                        Vos
                      </span>
                    )}
                  </div>
                </div>

                {/* Correct predictions */}
                <div className="col-span-2 text-center">
                  <span className="text-sm text-gray-500">
                    {entry.correct}/{entry.total || 0}
                  </span>
                </div>

                {/* Points */}
                <div className="col-span-2 text-right">
                  <span className={`text-base font-black ${entry.points > 0 ? 'text-coke-red' : 'text-gray-400'}`}>
                    {entry.points}
                    <span className="text-xs font-medium ml-0.5">pts</span>
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        Puntaje: 3 puntos por predicción correcta
      </p>
    </div>
  )
}

function TrophySmallIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E32226" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
    </svg>
  )
}

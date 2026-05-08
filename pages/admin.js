import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { MATCHES, TEAMS, PHASE_LABELS } from '../data/worldcup2026'

const RESULT_LABELS = { home: 'Local', draw: 'Empate', away: 'Visitante', '': 'Sin resultado' }
const RESULT_COLORS = {
  home: 'bg-blue-100 text-blue-700 border-blue-300',
  draw: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  away: 'bg-green-100 text-green-700 border-green-300',
  '': 'bg-gray-100 text-gray-500 border-gray-200',
}

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [overrides, setOverrides] = useState({})
  const [auto, setAuto] = useState({})
  const [saving, setSaving] = useState(null)
  const [message, setMessage] = useState('')
  const [phaseFilter, setPhaseFilter] = useState('group')

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch('/api/me')
        if (!res.ok) { router.push('/'); return }
        const data = await res.json()
        if (!data.user.isAdmin) { router.push('/app'); return }
        setUser(data.user)
        loadResults()
      } catch {
        router.push('/')
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [router])

  async function loadResults() {
    try {
      const res = await fetch('/api/admin/results')
      if (!res.ok) return
      const data = await res.json()
      setOverrides(data.overrides || {})
      setAuto(data.auto || {})
    } catch {}
  }

  async function setResult(matchId, result) {
    setSaving(matchId)
    setMessage('')
    try {
      const res = await fetch('/api/admin/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId, result }),
      })
      if (!res.ok) {
        const data = await res.json()
        setMessage('Error: ' + (data.error || 'desconocido'))
        return
      }
      setOverrides((prev) => {
        const next = { ...prev }
        if (result) next[matchId] = result
        else delete next[matchId]
        return next
      })
      setMessage('Guardado correctamente')
      setTimeout(() => setMessage(''), 3000)
    } catch {
      setMessage('Error de conexión')
    } finally {
      setSaving(null)
    }
  }

  const phases = [...new Set(MATCHES.map((m) => m.phase))]
  const filteredMatches = MATCHES.filter((m) => m.phase === phaseFilter)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-coke-red border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Admin | Prode Mundial 2026</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-coke-red text-white px-4 py-4 flex items-center justify-between shadow">
          <div>
            <h1 className="text-lg font-black">Panel de Administración</h1>
            <p className="text-white/70 text-xs">Resultados manuales — tienen prioridad sobre OpenFootball</p>
          </div>
          <button
            onClick={() => router.push('/app')}
            className="text-white/80 hover:text-white text-sm font-semibold border border-white/30 rounded-lg px-3 py-1.5"
          >
            ← Volver
          </button>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {message && (
            <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${message.startsWith('Error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
              {message}
            </div>
          )}

          {/* Phase filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
            {phases.map((phase) => (
              <button
                key={phase}
                onClick={() => setPhaseFilter(phase)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  phaseFilter === phase
                    ? 'bg-coke-red border-coke-red text-white'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {PHASE_LABELS[phase] || phase}
              </button>
            ))}
          </div>

          {/* Match list */}
          <div className="space-y-3">
            {filteredMatches.map((match) => {
              const home = TEAMS[match.home] || { name: match.home, flag: '🏳️' }
              const away = TEAMS[match.away] || { name: match.away, flag: '🏳️' }
              const override = overrides[match.id] || ''
              const autoResult = auto[match.id] || ''
              const effective = override || autoResult

              return (
                <div key={match.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      {match.group ? `Grupo ${match.group} · J${match.matchday}` : PHASE_LABELS[match.phase]}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(match.datetime).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 flex items-center gap-2">
                      {home.code
                        ? <img src={`https://flagcdn.com/w40/${home.code}.png`} alt={home.name} width={24} height={17} className="rounded-sm" />
                        : <span>{home.flag}</span>
                      }
                      <span className="font-bold text-sm text-gray-900">{home.name}</span>
                    </div>
                    <span className="text-gray-400 font-bold text-xs">VS</span>
                    <div className="flex-1 flex items-center justify-end gap-2">
                      <span className="font-bold text-sm text-gray-900">{away.name}</span>
                      {away.code
                        ? <img src={`https://flagcdn.com/w40/${away.code}.png`} alt={away.name} width={24} height={17} className="rounded-sm" />
                        : <span>{away.flag}</span>
                      }
                    </div>
                  </div>

                  {/* Status row */}
                  <div className="flex items-center gap-2 mb-3 text-xs">
                    <span className="text-gray-400">OpenFootball:</span>
                    <span className={`px-2 py-0.5 rounded-full border font-semibold ${RESULT_COLORS[autoResult]}`}>
                      {autoResult ? RESULT_LABELS[autoResult] : 'Sin datos'}
                    </span>
                    {override && (
                      <>
                        <span className="text-gray-400 ml-2">Override manual:</span>
                        <span className={`px-2 py-0.5 rounded-full border font-semibold ${RESULT_COLORS[override]}`}>
                          {RESULT_LABELS[override]}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Result buttons */}
                  <div className="flex gap-2 flex-wrap">
                    {['home', 'draw', 'away'].map((opt) => (
                      <button
                        key={opt}
                        disabled={saving === match.id}
                        onClick={() => setResult(match.id, override === opt ? '' : opt)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold border-2 transition-all disabled:opacity-50 ${
                          effective === opt && override === opt
                            ? 'bg-coke-red border-coke-red text-white'
                            : effective === opt
                            ? 'bg-gray-100 border-gray-300 text-gray-600'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-coke-red hover:text-coke-red'
                        }`}
                      >
                        {opt === 'home' ? home.name.split(' ')[0] : opt === 'away' ? away.name.split(' ')[0] : 'Empate'}
                        {effective === opt && override === opt && ' ✓'}
                      </button>
                    ))}
                    {override && (
                      <button
                        disabled={saving === match.id}
                        onClick={() => setResult(match.id, '')}
                        className="px-4 py-2 rounded-xl text-xs font-semibold border-2 border-red-200 text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
                      >
                        Borrar override
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

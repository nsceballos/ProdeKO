import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { MATCHES, TEAMS, PHASE_LABELS } from '../data/worldcup2026'
import { parseResult } from '../lib/result'

// "1-1 (P 4-3)" para mostrar en los badges de resultado.
function resultLabel(parsed) {
  if (!parsed) return ''
  const base = `${parsed.home}-${parsed.away}`
  return parsed.pen ? `${base} (P ${parsed.pen.home}-${parsed.pen.away})` : base
}

const PHASE_ORDER = ['group', 'round32', 'round16', 'quarterfinal', 'semifinal', 'third_place', 'final']

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [overrides, setOverrides] = useState({})
  const [auto, setAuto] = useState({})
  const [bracket, setBracket] = useState({})
  const [phaseFilter, setPhaseFilter] = useState('group')
  const [message, setMessage] = useState({ text: '', ok: true })
  const [saving, setSaving] = useState(null)

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch('/api/me')
        if (!res.ok) { router.push('/'); return }
        const data = await res.json()
        if (!data.user.isAdmin) { router.push('/app'); return }
        setUser(data.user)
        await loadAll()
      } catch {
        router.push('/')
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [router])

  async function loadAll() {
    const [adminRes, bracketRes] = await Promise.all([
      fetch('/api/admin/results').catch(() => null),
      fetch('/api/bracket').catch(() => null),
    ])
    if (adminRes?.ok) {
      const d = await adminRes.json()
      setOverrides(d.overrides || {})
      setAuto(d.auto || {})
    }
    if (bracketRes?.ok) {
      const d = await bracketRes.json()
      setBracket(d.bracket || {})
    }
  }

  async function saveResult(matchId, result) {
    setSaving(matchId)
    setMessage({ text: '', ok: true })
    try {
      const res = await fetch('/api/admin/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId, result }),
      })
      if (!res.ok) {
        const d = await res.json()
        setMessage({ text: 'Error: ' + (d.error || 'desconocido'), ok: false })
        return
      }
      setOverrides((prev) => {
        const next = { ...prev }
        if (result) next[matchId] = result
        else delete next[matchId]
        return next
      })
      await fetch('/api/bracket').then(r => r.json()).then(d => setBracket(d.bracket || {})).catch(() => {})
      setMessage({ text: 'Guardado', ok: true })
      setTimeout(() => setMessage({ text: '', ok: true }), 2500)
    } catch {
      setMessage({ text: 'Error de conexión', ok: false })
    } finally {
      setSaving(null)
    }
  }

  const phases = [...new Set(MATCHES.map((m) => m.phase))].sort(
    (a, b) => PHASE_ORDER.indexOf(a) - PHASE_ORDER.indexOf(b)
  )
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
        <div className="bg-coke-red text-white px-4 py-4 flex items-center justify-between shadow">
          <div>
            <h1 className="text-lg font-black">Panel de Administración</h1>
            <p className="text-white/70 text-xs">Resultados manuales (prioridad sobre OpenFootball)</p>
          </div>
          <button onClick={() => router.push('/app')} className="text-white/80 hover:text-white text-sm font-semibold border border-white/30 rounded-lg px-3 py-1.5">
            ← Volver
          </button>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {message.text && (
            <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${message.ok ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {message.text}
            </div>
          )}

          <div className="text-xs text-gray-500 mb-4 p-3 bg-blue-50 border border-blue-100 rounded-xl">
            <strong>Puntaje:</strong> resultado exacto = 3 pts · resultado correcto (G/E/P) = 1 pt
          </div>

          {/* Phase tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
            {phases.map((phase) => (
              <button key={phase} onClick={() => setPhaseFilter(phase)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${phaseFilter === phase ? 'bg-coke-red border-coke-red text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                {PHASE_LABELS[phase] || phase}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredMatches.map((match) => {
              const resolvedHome = bracket[match.id]?.home || match.home
              const resolvedAway = bracket[match.id]?.away || match.away
              const home = TEAMS[resolvedHome] || { name: resolvedHome, code: '' }
              const away = TEAMS[resolvedAway] || { name: resolvedAway, code: '' }
              const override = parseResult(overrides[match.id] || '')
              const autoParsed = parseResult(auto[match.id] || '')

              return (
                <MatchResultEditor
                  key={match.id}
                  match={match}
                  home={home}
                  away={away}
                  override={override}
                  autoParsed={autoParsed}
                  saving={saving === match.id}
                  onSave={(result) => saveResult(match.id, result)}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

function MatchResultEditor({ match, home, away, override, autoParsed, saving, onSave }) {
  const isKnockout = match.phase !== 'group'
  const toStr = (n) => (n == null ? '' : String(n))

  const [h, setH] = useState(toStr(override?.home))
  const [a, setA] = useState(toStr(override?.away))
  const [ph, setPh] = useState(toStr(override?.pen?.home))
  const [pa, setPa] = useState(toStr(override?.pen?.away))

  useEffect(() => {
    setH(toStr(override?.home))
    setA(toStr(override?.away))
    setPh(toStr(override?.pen?.home))
    setPa(toStr(override?.pen?.away))
  }, [override])

  const hasOverride = override != null
  const filled = h !== '' && a !== ''
  const isDraw = filled && Number(h) === Number(a)
  // Un empate en eliminatoria se define por penales.
  const needsPens = isKnockout && isDraw
  const pensFilled = ph !== '' && pa !== ''
  const pensTied = pensFilled && Number(ph) === Number(pa)

  function buildResult() {
    if (!filled) return ''
    if (needsPens && pensFilled) return `${h}-${a} (P ${ph}-${pa})`
    return `${h}-${a}`
  }

  const saveDisabled = saving || !filled || (needsPens && (!pensFilled || pensTied))

  function clear() {
    setH(''); setA(''); setPh(''); setPa('')
    onSave('')
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          {match.group ? `Grupo ${match.group} · J${match.matchday}` : PHASE_LABELS[match.phase]}
        </span>
        <div className="flex items-center gap-2">
          {autoParsed && (
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              OpenFootball: {resultLabel(autoParsed)}
            </span>
          )}
          {hasOverride && (
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              Override: {resultLabel(override)}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 flex items-center gap-2">
          {home.code ? <img src={`https://flagcdn.com/w40/${home.code}.png`} alt={home.name} width={24} height={17} className="rounded-sm" /> : null}
          <span className="font-bold text-sm text-gray-900 truncate">{home.name}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <ScoreInput value={h} onChange={setH} disabled={saving} />
          <span className="text-gray-400 font-bold text-lg">-</span>
          <ScoreInput value={a} onChange={setA} disabled={saving} />
        </div>

        <div className="flex-1 flex items-center justify-end gap-2">
          <span className="font-bold text-sm text-gray-900 truncate text-right">{away.name}</span>
          {away.code ? <img src={`https://flagcdn.com/w40/${away.code}.png`} alt={away.name} width={24} height={17} className="rounded-sm" /> : null}
        </div>
      </div>

      {needsPens && (
        <div className="mb-4 pt-3 border-t border-dashed border-gray-200">
          <p className="text-[11px] font-semibold text-gray-500 text-center mb-2">
            Empate · definición por penales
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-gray-500 truncate max-w-[90px] text-right">{home.name}</span>
            <ScoreInput value={ph} onChange={setPh} disabled={saving} />
            <span className="text-gray-400 font-bold text-lg">-</span>
            <ScoreInput value={pa} onChange={setPa} disabled={saving} />
            <span className="text-xs text-gray-500 truncate max-w-[90px]">{away.name}</span>
          </div>
          {pensTied && (
            <p className="text-[11px] text-red-500 text-center mt-2">Los penales no pueden terminar empatados</p>
          )}
        </div>
      )}

      <div className="flex gap-2">
        <button
          disabled={saveDisabled}
          onClick={() => onSave(buildResult())}
          className="flex-1 py-2 bg-coke-red text-white text-xs font-bold rounded-xl disabled:opacity-40 hover:bg-red-700 transition-colors"
        >
          {saving ? 'Guardando...' : 'Guardar resultado'}
        </button>
        {hasOverride && (
          <button
            disabled={saving}
            onClick={clear}
            className="px-4 py-2 border-2 border-red-200 text-red-500 text-xs font-bold rounded-xl hover:bg-red-50 disabled:opacity-40 transition-colors"
          >
            Borrar
          </button>
        )}
      </div>
    </div>
  )
}

function ScoreInput({ value, onChange, disabled }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(String(Math.min(99, (parseInt(value) || 0) + 1)))}
        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm flex items-center justify-center disabled:opacity-40"
      >+</button>
      <input
        type="number"
        min="0"
        max="99"
        value={value}
        disabled={disabled}
        onChange={(e) => {
          const v = e.target.value.replace(/[^0-9]/g, '').slice(0, 2)
          onChange(v)
        }}
        className="w-10 h-10 text-center text-xl font-black text-gray-900 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-coke-red"
      />
      <button
        type="button"
        disabled={disabled || value === '' || parseInt(value) <= 0}
        onClick={() => onChange(String(Math.max(0, (parseInt(value) || 0) - 1)))}
        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm flex items-center justify-center disabled:opacity-40"
      >-</button>
    </div>
  )
}

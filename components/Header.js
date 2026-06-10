import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// World Cup 2026 start: June 11, 2026 — México vs Sudáfrica, 1:00 PM CST (19:00 UTC)
const WC_START = new Date('2026-06-11T19:00:00.000Z')

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    function calculate() {
      const now = new Date()
      const diff = targetDate - now

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, started: true })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds, started: false })
    }

    calculate()
    const interval = setInterval(calculate, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

export default function Header({ user }) {
  const router = useRouter()
  const countdown = useCountdown(WC_START)
  const [loggingOut, setLoggingOut] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await fetch('/api/logout', { method: 'POST' })
      router.push('/')
    } catch {
      router.push('/')
    }
  }

  return (
    <header className="bg-coke-red shadow-lg sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo oficial */}
        <div className="flex items-center gap-3">
          <img
            src="/coca-cola-fifa-logo.png"
            alt="Coca-Cola FIFA 26 Official Partner"
            className="h-9 sm:h-11 w-auto object-contain"
          />
        </div>

        {/* Center/Right: Countdown + user */}
        <div className="flex items-center gap-3">
          {countdown && !countdown.started && (
            <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-lg px-3 py-1.5">
              <ClockIcon />
              <span className="text-white text-xs font-bold whitespace-nowrap">
                FALTAN{' '}
                <span className="text-yellow-300">{countdown.days}d</span>{' '}
                <span className="text-yellow-300">{countdown.hours}h</span>{' '}
                <span className="text-yellow-300">{countdown.minutes}m</span>
              </span>
            </div>
          )}
          {countdown && countdown.started && (
            <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-lg px-3 py-1.5">
              <span className="text-yellow-300 text-xs font-bold animate-pulse">
                EN VIVO ⚡
              </span>
            </div>
          )}

          {user && (
            <div className="flex items-center gap-2">
              {user.isAdmin && (
                <button
                  onClick={() => router.push('/admin')}
                  className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors"
                  title="Panel de administración"
                >
                  Admin
                </button>
              )}
              <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2.5 py-1.5">
                <UserIcon />
                <span className="text-white text-xs font-semibold max-w-[80px] truncate hidden sm:block">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="bg-white/10 hover:bg-white/20 rounded-lg p-1.5 transition-colors disabled:opacity-50"
                title="Cerrar sesión"
              >
                <LogoutIcon />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile countdown bar */}
      {countdown && !countdown.started && (
        <div className="sm:hidden bg-coke-dark px-4 py-1.5 flex justify-center">
          <span className="text-white text-xs font-bold">
            FALTAN{' '}
            <span className="text-yellow-300">{countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s</span>
            {' '}para el Mundial
          </span>
        </div>
      )}
    </header>
  )
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

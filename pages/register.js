import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Error al registrarse')
        return
      }

      router.push('/app')
    } catch (err) {
      setError('Error de conexión. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Registrarse | Prode Mundial 2026</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-coke-red flex flex-col items-center justify-center px-4 py-8">
        {/* Top decoration */}
        <div className="w-full max-w-sm mb-6 text-center">
          <div className="flex justify-center mb-3">
            <TrophyIcon />
          </div>
          <h1 className="text-white text-3xl font-black italic tracking-tight uppercase">
            Prode Mundial 2026
          </h1>
          <p className="text-white/80 text-sm mt-1 font-medium">
            Creá tu cuenta y empezá a predecir
          </p>
        </div>

        {/* Register card */}
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-gray-900 text-xl font-bold mb-6">Crear cuenta</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coke-red focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coke-red focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coke-red focus:border-transparent text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-coke-red hover:bg-coke-dark text-white font-bold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
            >
              {loading ? 'Registrando...' : 'Crear cuenta gratis'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            ¿Ya tenés cuenta?{' '}
            <Link href="/" className="text-coke-red font-semibold hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </div>

        {/* Bottom logos */}
        <div className="mt-8 flex items-center gap-4 text-white/60 text-xs font-medium">
          <span className="italic font-black text-white/80">Coca-Cola</span>
          <span>•</span>
          <span className="font-bold text-white/80">FIFA 26</span>
          <span>•</span>
          <span className="font-bold text-white/80">POWERADE</span>
        </div>

        <p className="mt-4 text-white/50 text-xs text-center">
          Desarrollado por el equipo de Strategy Arg &amp; UY
        </p>
      </div>
    </>
  )
}

function TrophyIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="32" fill="rgba(255,255,255,0.15)" />
      <path
        d="M20 12h24v2c0 10-4.5 18-12 20.5C24.5 32 20 24 20 14v-2z"
        fill="white"
        opacity="0.9"
      />
      <path
        d="M14 12h6v4c0 2 .3 4 .8 6H14V12z"
        fill="white"
        opacity="0.7"
      />
      <path
        d="M50 12h-6v4c0 2-.3 4-.8 6H50V12z"
        fill="white"
        opacity="0.7"
      />
      <path
        d="M28 34.5l-2 5h12l-2-5"
        fill="white"
        opacity="0.9"
      />
      <rect x="24" y="39" width="16" height="3" rx="1.5" fill="white" opacity="0.9" />
      <rect x="21" y="42" width="22" height="3" rx="1.5" fill="white" opacity="0.9" />
      <circle cx="32" cy="22" r="4" fill="rgba(227,34,38,0.6)" />
    </svg>
  )
}

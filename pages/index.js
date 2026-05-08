import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Error al iniciar sesión')
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
        <title>Prode Mundial 2026</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-coke-red flex flex-col items-center justify-center px-4 py-8">
        {/* Top decoration */}
        <div className="w-full max-w-sm mb-6 text-center">
          <div className="flex justify-center mb-5">
            <img
              src="/coca-cola-fifa-logo.png"
              alt="Coca-Cola FIFA 26 Official Partner"
              className="w-72 sm:w-80 object-contain drop-shadow-xl"
            />
          </div>
          <h1 className="text-white text-3xl font-black italic tracking-tight uppercase">
            Prode Mundial 2026
          </h1>
          <p className="text-white/80 text-sm mt-1 font-medium">
            La fiebre por la copa vuelve a empezar
          </p>
        </div>

        {/* Login card */}
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-gray-900 text-xl font-bold mb-6">Iniciar sesión</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coke-red focus:border-transparent text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-coke-red hover:bg-coke-dark text-white font-bold rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
            >
              {loading ? 'Ingresando...' : 'Entrar al Prode'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            ¿No tenés cuenta?{' '}
            <Link href="/register" className="text-coke-red font-semibold hover:underline">
              Registrate gratis
            </Link>
          </p>
        </div>

        <p className="mt-8 text-white/50 text-xs text-center">
          Desarrollado por el equipo de Strategy Arg &amp; UY
        </p>

      </div>
    </>
  )
}

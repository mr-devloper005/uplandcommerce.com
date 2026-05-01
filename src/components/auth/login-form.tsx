'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

type Props = {
  actionClassName: string
  mutedClassName: string
}

export function LoginForm({ actionClassName, mutedClassName }: Props) {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !password) {
      setError('Enter your email and password.')
      return
    }
    try {
      await login(email.trim(), password)
      router.push('/')
      router.refresh()
    } catch {
      setError('Something went wrong. Try again.')
    }
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <input
        name="email"
        autoComplete="email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
        className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm"
        placeholder="Email address"
      />
      <input
        name="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm"
        placeholder="Password"
      />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <button
        type="submit"
        disabled={isLoading}
        className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition-opacity disabled:opacity-60 ${actionClassName}`}
      >
        {isLoading ? 'Signing in…' : 'Sign in'}
      </button>
      <p className={`text-xs leading-relaxed ${mutedClassName}`}>
        Your session is saved on this device so you stay signed in after you close the tab.
      </p>
    </form>
  )
}

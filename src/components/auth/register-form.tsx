'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

type Props = {
  actionClassName: string
  mutedClassName: string
}

export function RegisterForm({ actionClassName, mutedClassName }: Props) {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!name.trim() || !email.trim() || !password) {
      setError('Fill in name, email, and password.')
      return
    }
    try {
      await signup(name.trim(), email.trim(), password)
      router.push('/')
      router.refresh()
    } catch {
      setError('Something went wrong. Try again.')
    }
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <input
        name="name"
        autoComplete="name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
        className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm"
        placeholder="Full name"
      />
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
        autoComplete="new-password"
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
        {isLoading ? 'Creating account…' : 'Create account'}
      </button>
      <p className={`text-xs leading-relaxed ${mutedClassName}`}>
        Signing up saves your profile on this device the same way as sign-in, until you log out.
      </p>
    </form>
  )
}

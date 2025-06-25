// src/features/auth/lib/useRegister.ts

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useRegister = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const register = async (email: string, password: string, nickname: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('https://dependable-vitality-production.up.railway.app/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, nickname }),
      })

      if (!response.ok) {
        const err = await response.json()
        const message = err.message || 'unknown_error'
        throw new Error(message
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '_')
          .replace(/^_+|_+$/g, '')
        )
      }

      navigate('/auth/login')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { register, loading, error }
}
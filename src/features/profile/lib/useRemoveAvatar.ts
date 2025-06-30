// src/features/profile/lib/useRemoveAvatar.ts

import { useState } from 'react'

export const useRemoveAvatar = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const removeAvatar = async (userId: number) => {
    const token = localStorage.getItem('token')
    if (!token) {
      setError('unauthorized')
      return
    }

    const random = Math.floor(Math.random() * 100000)
    const defaultAvatar = `https://ui-avatars.com/api/?name=tapma.az&background=random&color=fff&size=256&bold=true&key=${random}`

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://dependable-vitality-production.up.railway.app/users/${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ avatarUrl: defaultAvatar }),
        }
      )

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.message || 'remove_failed')
      }
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { removeAvatar, loading, error }
}
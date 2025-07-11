// src/features/ad/lib/useDeleteAd.ts

import { useState } from 'react'

export const useDeleteAd = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteAd = async (adId: number): Promise<boolean> => {
    const token = localStorage.getItem('token')
    if (!token) return false

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`https://dependable-vitality-production.up.railway.app/ads/${adId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'unknown_error')
      }

      return true
    } catch (err) {
      setError((err as Error).message)
      return false
    } finally {
      setLoading(false)
    }
  }

  return { deleteAd, loading, error }
}
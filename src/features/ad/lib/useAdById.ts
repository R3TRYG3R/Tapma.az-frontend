// src/features/ad/lib/useAdById.ts

import { useEffect, useState } from 'react'

export const useAdById = (adId: number) => {
  const [ad, setAd] = useState<{
    user: any
    id: number
    title: string
    description: string
    imageUrl?: string
  } | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAd = async () => {
      setLoading(true)
      try {
        const res = await fetch(`https://dependable-vitality-production.up.railway.app/ads/${adId}`)
        if (!res.ok) throw new Error('failed')
        const data = await res.json()
        setAd(data)
      } catch {
        setError('auth.unknown_error')
      } finally {
        setLoading(false)
      }
    }

    if (adId) fetchAd()
  }, [adId])

  return { ad, loading, error }
}
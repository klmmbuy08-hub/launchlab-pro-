'use client'

import { useState, useEffect } from 'react'
import type { BusinessProfile } from '@/lib/types'

export function useBusiness() {
  const [profile, setProfile] = useState<BusinessProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/business/profile')
      const data = await response.json()

      if (data.success) {
        setProfile(data.data)
      } else {
        setError(data.error)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const saveProfile = async (data: Partial<BusinessProfile>) => {
    try {
      setLoading(true)
      const response = await fetch('/api/business/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setProfile(result.data)
        return { success: true }
      } else {
        setError(result.error)
        return { success: false, error: result.error }
      }
    } catch (err: any) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  return {
    profile,
    loading,
    error,
    saveProfile,
    refetch: fetchProfile,
  }
}

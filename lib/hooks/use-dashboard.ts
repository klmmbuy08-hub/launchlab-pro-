'use client'

import { useState, useEffect } from 'react'
import type { DashboardData } from '@/lib/types'

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboard()
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchDashboard, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const fetchDashboard = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/dashboard')
      
      if (!response.ok) {
        if (response.status === 401) {
          setError('Session expired. Redirecting to login...')
          setTimeout(() => {
            window.location.href = '/login'
          }, 2000)
        } else {
          setError(`Server error: ${response.status}`)
        }
        return
      }

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        setError('Invalid response format')
        return
      }

      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    error,
    refetch: fetchDashboard,
  }
}

'use client'

import { useState, useEffect } from 'react'
import { AgentDebate, DebateDecision } from '@/lib/types/agent-debate'

export function useDebates(launchId: string) {
  const [debates, setDebates] = useState<AgentDebate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar debates
  const loadDebates = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/launches/${launchId}/debates`)
      if (!response.ok) throw new Error('Error al cargar debates')
        
      const data = await response.json()

      if (data.success) {
        setDebates(data.debates)
      } else {
        throw new Error(data.error || 'Error loading debates')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Resolver debate
  const resolveDebate = async (decision: DebateDecision) => {
    try {
      const response = await fetch(`/api/debates/${decision.debate_id}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(decision),
      })

      if (!response.ok) {
        throw new Error('Error resolving debate')
      }

      // Recargar debates
      await loadDebates()

      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  // Cargar al montar
  useEffect(() => {
    if (launchId) {
      loadDebates()
    }
  }, [launchId])

  const pendingDebates = debates.filter((d) => !d.resolved_at)
  const resolvedDebates = debates.filter((d) => d.resolved_at)

  return {
    debates,
    pendingDebates,
    resolvedDebates,
    isLoading,
    error,
    loadDebates,
    resolveDebate,
  }
}

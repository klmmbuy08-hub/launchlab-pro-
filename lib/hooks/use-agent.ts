'use client'

import { useState } from 'react'

export function useAgent(agentType: 'ceo' | 'cmo' | 'sales') {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  const execute = async (params: any) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(`/api/agents/${agentType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Agent execution failed')
      }

      setResult(data.data)
      return data.data

    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    execute,
    loading,
    error,
    result,
  }
}

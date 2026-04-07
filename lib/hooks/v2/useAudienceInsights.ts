import { useCallback, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { AudienceInsights } from '@/lib/types/v2'

export function useAudienceInsights() {
  const [insights, setInsights] = useState<AudienceInsights | null>(null)
  const [insightsHistory, setInsightsHistory] = useState<AudienceInsights[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  // Obtener insights más recientes de una cuenta
  const fetchLatestInsights = useCallback(async (accountId: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: err } = await supabase
        .from('audience_insights')
        .select('*')
        .eq('account_id', accountId)
        .order('snapshot_date', { ascending: false })
        .limit(1)
        .single()

      if (err && err.code !== 'PGRST116') throw err
      setInsights(data || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching insights')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  // Obtener historial de insights
  const fetchInsightsHistory = useCallback(async (accountId: string, limit = 30) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: err } = await supabase
        .from('audience_insights')
        .select('*')
        .eq('account_id', accountId)
        .order('snapshot_date', { ascending: false })
        .limit(limit)

      if (err) throw err
      setInsightsHistory(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching history')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  // Crear nuevo snapshot de insights
  const createInsights = useCallback(async (insightsData: Omit<AudienceInsights, 'id' | 'created_at'>) => {
    try {
      const { data, error: err } = await supabase
        .from('audience_insights')
        .insert([insightsData])
        .select()
        .single()

      if (err) throw err
      setInsights(data)
      return data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error creating insights'
      setError(msg)
      throw err
    }
  }, [supabase])

  // Calcular crecimiento de seguidores
  const calculateFollowerGrowth = useCallback((current: AudienceInsights, previous: AudienceInsights | null) => {
    if (!previous) return null
    return {
      absolute: current.total_followers - previous.total_followers,
      percentage: ((current.total_followers - previous.total_followers) / previous.total_followers) * 100
    }
  }, [])

  return {
    insights,
    insightsHistory,
    loading,
    error,
    fetchLatestInsights,
    fetchInsightsHistory,
    createInsights,
    calculateFollowerGrowth
  }
}
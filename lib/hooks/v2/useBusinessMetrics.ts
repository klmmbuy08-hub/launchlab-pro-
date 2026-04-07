import { useCallback, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { BusinessMetrics } from '@/lib/types/v2'

export function useBusinessMetrics() {
  const [metrics, setMetrics] = useState<BusinessMetrics | null>(null)
  const [metricsHistory, setMetricsHistory] = useState<BusinessMetrics[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  // Obtener métricas del día
  const fetchTodayMetrics = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const today = new Date().toISOString().split('T')[0]
      const { data, error: err } = await supabase
        .from('business_metrics')
        .select('*')
        .eq('date', today)
        .single()

      if (err && err.code !== 'PGRST116') throw err // PGRST116 = no rows
      setMetrics(data || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching metrics')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  // Obtener métricas por rango de fechas
  const fetchMetricsByDateRange = useCallback(async (startDate: string, endDate: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: err } = await supabase
        .from('business_metrics')
        .select('*')
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true })

      if (err) throw err
      setMetricsHistory(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching metrics')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  // Crear o actualizar métricas del día
  const upsertMetrics = useCallback(async (metricsData: Omit<BusinessMetrics, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error: err } = await supabase
        .from('business_metrics')
        .upsert([metricsData], { onConflict: 'user_id,date' })
        .select()
        .single()

      if (err) throw err
      setMetrics(data)
      return data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error upserting metrics'
      setError(msg)
      throw err
    }
  }, [supabase])

  // Calcular totales agregados
  const calculateAggregates = useCallback((data: BusinessMetrics[]) => {
    return {
      totalRevenue: data.reduce((sum, m) => sum + m.cash_collected, 0),
      totalLeads: data.reduce((sum, m) => sum + m.total_leads, 0),
      avgConversionRate: data.reduce((sum, m) => sum + m.conversion_rate, 0) / data.length,
      totalConverted: data.reduce((sum, m) => sum + m.converted, 0),
      avgLTV: data.reduce((sum, m) => sum + m.avg_ltv, 0) / data.length
    }
  }, [])

  return {
    metrics,
    metricsHistory,
    loading,
    error,
    fetchTodayMetrics,
    fetchMetricsByDateRange,
    upsertMetrics,
    calculateAggregates
  }
}
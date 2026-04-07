import { useCallback, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { AdCampaign } from '@/lib/types/v2'

export function useAdCampaigns() {
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([])
  const [activeCampaigns, setActiveCampaigns] = useState<AdCampaign[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  // Obtener todas las campañas
  const fetchCampaigns = useCallback(async (status?: string) => {
    setLoading(true)
    setError(null)
    try {
      let query = supabase
        .from('ad_campaigns')
        .select('*')
        .order('created_at', { ascending: false })

      if (status) {
        query = query.eq('status', status)
      }

      const { data, error: err } = await query

      if (err) throw err
      setCampaigns(data || [])

      // Filtrar activas
      setActiveCampaigns((data || []).filter(c => c.status === 'active'))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching campaigns')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  // Crear campaña
  const createCampaign = useCallback(async (campaignData: Omit<AdCampaign, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error: err } = await supabase
        .from('ad_campaigns')
        .insert([campaignData])
        .select()
        .single()

      if (err) throw err
      setCampaigns(prev => [data, ...prev])
      return data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error creating campaign'
      setError(msg)
      throw err
    }
  }, [supabase])

  // Actualizar campaña
  const updateCampaign = useCallback(async (id: string, updates: Partial<AdCampaign>) => {
    try {
      const { data, error: err } = await supabase
        .from('ad_campaigns')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (err) throw err
      setCampaigns(prev => prev.map(c => c.id === id ? data : c))
      if (updates.status === 'active') {
        setActiveCampaigns(prev => [...prev.filter(c => c.id !== id), data])
      } else if (updates.status !== 'active') {
        setActiveCampaigns(prev => prev.filter(c => c.id !== id))
      }
      return data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error updating campaign'
      setError(msg)
      throw err
    }
  }, [supabase])

  // Pausar campaña
  const pauseCampaign = useCallback(async (id: string) => {
    return updateCampaign(id, { status: 'paused' })
  }, [updateCampaign])

  // Activar campaña
  const activateCampaign = useCallback(async (id: string) => {
    return updateCampaign(id, { status: 'active' })
  }, [updateCampaign])

  // Eliminar campaña
  const deleteCampaign = useCallback(async (id: string) => {
    try {
      const { error: err } = await supabase
        .from('ad_campaigns')
        .delete()
        .eq('id', id)

      if (err) throw err
      setCampaigns(prev => prev.filter(c => c.id !== id))
      setActiveCampaigns(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error deleting campaign'
      setError(msg)
      throw err
    }
  }, [supabase])

  // Calcular ROAS agregado
  const calculateAggregateROAS = useCallback((data: AdCampaign[]) => {
    const totalSpent = data.reduce((sum, c) => sum + c.spent, 0)
    const totalRevenue = data.reduce((sum, c) => sum + (c.roas * c.spent), 0)
    return totalSpent > 0 ? totalRevenue / totalSpent : 0
  }, [])

  // Calcular CPA promedio
  const calculateAverageCPA = useCallback((data: AdCampaign[]) => {
    const validCPAs = data.filter(c => c.cpa > 0)
    if (validCPAs.length === 0) return 0
    return validCPAs.reduce((sum, c) => sum + c.cpa, 0) / validCPAs.length
  }, [])

  return {
    campaigns,
    activeCampaigns,
    loading,
    error,
    fetchCampaigns,
    createCampaign,
    updateCampaign,
    pauseCampaign,
    activateCampaign,
    deleteCampaign,
    calculateAggregateROAS,
    calculateAverageCPA
  }
}
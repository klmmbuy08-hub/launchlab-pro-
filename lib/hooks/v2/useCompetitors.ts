import { useCallback, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Competitor } from '@/lib/types/v2'

export function useCompetitors() {
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  // Obtener todos los competidores
  const fetchCompetitors = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: err } = await supabase
        .from('competitors')
        .select('*')
        .eq('is_active', true)
        .order('updated_at', { ascending: false })

      if (err) throw err
      setCompetitors(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching competitors')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  // Obtener competidores por plataforma
  const fetchCompetitorsByPlatform = useCallback(async (platform: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: err } = await supabase
        .from('competitors')
        .select('*')
        .eq('platform', platform)
        .eq('is_active', true)
        .order('updated_at', { ascending: false })

      if (err) throw err
      setCompetitors(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching competitors')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  // Agregar competidor
  const addCompetitor = useCallback(async (competitorData: Omit<Competitor, 'id' | 'added_at' | 'updated_at'>) => {
    try {
      const { data, error: err } = await supabase
        .from('competitors')
        .insert([competitorData])
        .select()
        .single()

      if (err) throw err
      setCompetitors(prev => [data, ...prev])
      return data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error adding competitor'
      setError(msg)
      throw err
    }
  }, [supabase])

  // Actualizar competidor
  const updateCompetitor = useCallback(async (id: string, updates: Partial<Competitor>) => {
    try {
      const { data, error: err } = await supabase
        .from('competitors')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (err) throw err
      setCompetitors(prev => prev.map(c => c.id === id ? data : c))
      return data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error updating competitor'
      setError(msg)
      throw err
    }
  }, [supabase])

  // Remover competidor
  const removeCompetitor = useCallback(async (id: string) => {
    try {
      const { error: err } = await supabase
        .from('competitors')
        .delete()
        .eq('id', id)

      if (err) throw err
      setCompetitors(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error removing competitor'
      setError(msg)
      throw err
    }
  }, [supabase])

  return {
    competitors,
    loading,
    error,
    fetchCompetitors,
    fetchCompetitorsByPlatform,
    addCompetitor,
    updateCompetitor,
    removeCompetitor
  }
}
import { useCallback, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ContentAnalysis } from '@/lib/types/v2'

export function useContentAnalysis() {
  const [content, setContent] = useState<ContentAnalysis[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  // Obtener contenido de una cuenta
  const fetchContentByAccount = useCallback(async (accountId: string, limit = 50) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: err } = await supabase
        .from('content_analysis')
        .select('*')
        .eq('account_id', accountId)
        .order('published_at', { ascending: false })
        .limit(limit)

      if (err) throw err
      setContent(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching content')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  // Obtener contenido por rango de fechas
  const fetchContentByDateRange = useCallback(async (accountId: string, startDate: string, endDate: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: err } = await supabase
        .from('content_analysis')
        .select('*')
        .eq('account_id', accountId)
        .gte('published_at', startDate)
        .lte('published_at', endDate)
        .order('published_at', { ascending: false })

      if (err) throw err
      setContent(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching content')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  // Crear análisis de contenido
  const addContent = useCallback(async (contentData: Omit<ContentAnalysis, 'id' | 'analyzed_at' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error: err } = await supabase
        .from('content_analysis')
        .insert([contentData])
        .select()
        .single()

      if (err) throw err
      setContent(prev => [data, ...prev])
      return data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error adding content'
      setError(msg)
      throw err
    }
  }, [supabase])

  // Actualizar análisis
  const updateContent = useCallback(async (id: string, updates: Partial<ContentAnalysis>) => {
    try {
      const { data, error: err } = await supabase
        .from('content_analysis')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (err) throw err
      setContent(prev => prev.map(c => c.id === id ? data : c))
      return data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error updating content'
      setError(msg)
      throw err
    }
  }, [supabase])

  // Obtener top contenido por engagement
  const fetchTopContent = useCallback(async (accountId: string, limit = 10) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: err } = await supabase
        .from('content_analysis')
        .select('*')
        .eq('account_id', accountId)
        .order('engagement_rate', { ascending: false })
        .limit(limit)

      if (err) throw err
      return data || []
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching top content')
      return []
    } finally {
      setLoading(false)
    }
  }, [supabase])

  return {
    content,
    loading,
    error,
    fetchContentByAccount,
    fetchContentByDateRange,
    addContent,
    updateContent,
    fetchTopContent
  }
}
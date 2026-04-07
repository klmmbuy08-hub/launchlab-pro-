import { useCallback, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ContentCalendarEntry } from '@/lib/types/v2'

export function useContentCalendar() {
  const [entries, setEntries] = useState<ContentCalendarEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  // Obtener entradas del calendario por rango de fechas
  const fetchCalendarEntries = useCallback(async (accountId: string, startDate: string, endDate: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: err } = await supabase
        .from('content_calendar')
        .select('*')
        .eq('account_id', accountId)
        .gte('scheduled_date', startDate)
        .lte('scheduled_date', endDate)
        .order('scheduled_date', { ascending: true })

      if (err) throw err
      setEntries(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching calendar')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  // Obtener entradas del mes actual
  const fetchCurrentMonthEntries = useCallback(async (accountId: string) => {
    const now = new Date()
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]
    return fetchCalendarEntries(accountId, startDate, endDate)
  }, [fetchCalendarEntries])

  // Crear entrada del calendario
  const addCalendarEntry = useCallback(async (entryData: Omit<ContentCalendarEntry, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error: err } = await supabase
        .from('content_calendar')
        .insert([entryData])
        .select()
        .single()

      if (err) throw err
      setEntries(prev => [...prev, data].sort((a, b) =>
        new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime()
      ))
      return data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error adding entry'
      setError(msg)
      throw err
    }
  }, [supabase])

  // Actualizar entrada
  const updateCalendarEntry = useCallback(async (id: string, updates: Partial<ContentCalendarEntry>) => {
    try {
      const { data, error: err } = await supabase
        .from('content_calendar')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (err) throw err
      setEntries(prev => prev.map(e => e.id === id ? data : e))
      return data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error updating entry'
      setError(msg)
      throw err
    }
  }, [supabase])

  // Eliminar entrada
  const deleteCalendarEntry = useCallback(async (id: string) => {
    try {
      const { error: err } = await supabase
        .from('content_calendar')
        .delete()
        .eq('id', id)

      if (err) throw err
      setEntries(prev => prev.filter(e => e.id !== id))
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error deleting entry'
      setError(msg)
      throw err
    }
  }, [supabase])

  // Cambiar estado a aprobado
  const approveEntry = useCallback(async (id: string) => {
    return updateCalendarEntry(id, { status: 'approved' })
  }, [updateCalendarEntry])

  // Cambiar estado a publicado
  const publishEntry = useCallback(async (id: string, publishedContentId: string) => {
    return updateCalendarEntry(id, {
      status: 'published',
      published_content_id: publishedContentId
    })
  }, [updateCalendarEntry])

  // Obtener entradas pendientes de aprobación
  const getPendingApprovals = useCallback(() => {
    return entries.filter(e => e.status === 'planned')
  }, [entries])

  // Obtener entradas por estado
  const getEntriesByStatus = useCallback((status: 'planned' | 'approved' | 'published' | 'cancelled') => {
    return entries.filter(e => e.status === status)
  }, [entries])

  return {
    entries,
    loading,
    error,
    fetchCalendarEntries,
    fetchCurrentMonthEntries,
    addCalendarEntry,
    updateCalendarEntry,
    deleteCalendarEntry,
    approveEntry,
    publishEntry,
    getPendingApprovals,
    getEntriesByStatus
  }
}
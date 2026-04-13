import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed'
  source: string
  value: number
  created_at: string
}

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const { data, error: err } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (err) throw err
      setLeads(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching leads')
    } finally {
      setLoading(false)
    }
  }

  const addLead = async (lead: Omit<Lead, 'id' | 'created_at'>) => {
    try {
      const { data, error: err } = await supabase
        .from('leads')
        .insert([lead])
        .select()

      if (err) throw err
      if (data) setLeads([data[0], ...leads])
      return data?.[0]
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding lead')
    }
  }

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      const { data, error: err } = await supabase
        .from('leads')
        .update(updates)
        .eq('id', id)
        .select()

      if (err) throw err
      if (data) {
        setLeads(leads.map(l => l.id === id ? data[0] : l))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating lead')
    }
  }

  return { leads, loading, error, fetchLeads, addLead, updateLead }
}

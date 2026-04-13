import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export interface Workflow {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'draft'
  platform: 'n8n' | 'make' | 'zapier'
  trigger: string
  executions: number
  last_run: string | null
  success_rate: number
  created_at: string
}

export function useWorkflows() {
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchWorkflows()
  }, [])

  const fetchWorkflows = async () => {
    try {
      setLoading(true)
      const { data, error: err } = await supabase
        .from('workflows')
        .select('*')
        .order('created_at', { ascending: false })

      if (err) throw err
      setWorkflows(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching workflows')
    } finally {
      setLoading(false)
    }
  }

  const updateWorkflowStatus = async (id: string, status: 'active' | 'paused') => {
    try {
      const { data, error: err } = await supabase
        .from('workflows')
        .update({ status })
        .eq('id', id)
        .select()

      if (err) throw err
      if (data) {
        setWorkflows(workflows.map(w => w.id === id ? data[0] : w))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating workflow')
    }
  }

  return { workflows, loading, error, fetchWorkflows, updateWorkflowStatus }
}

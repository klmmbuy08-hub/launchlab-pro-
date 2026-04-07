import { useCallback, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Account } from '@/lib/types/v2'

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  // Obtener todas las cuentas del usuario
  const fetchAccounts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: err } = await supabase
        .from('accounts')
        .select('*')
        .order('connected_at', { ascending: false })

      if (err) throw err
      setAccounts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching accounts')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  // Conectar nueva cuenta
  const addAccount = useCallback(async (account: Omit<Account, 'id' | 'connected_at' | 'updated_at'>) => {
    try {
      const { data, error: err } = await supabase
        .from('accounts')
        .insert([account])
        .select()
        .single()

      if (err) throw err
      setAccounts(prev => [data, ...prev])
      return data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error adding account'
      setError(msg)
      throw err
    }
  }, [supabase])

  // Actualizar cuenta
  const updateAccount = useCallback(async (id: string, updates: Partial<Account>) => {
    try {
      const { data, error: err } = await supabase
        .from('accounts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (err) throw err
      setAccounts(prev => prev.map(a => a.id === id ? data : a))
      return data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error updating account'
      setError(msg)
      throw err
    }
  }, [supabase])

  // Desconectar cuenta
  const removeAccount = useCallback(async (id: string) => {
    try {
      const { error: err } = await supabase
        .from('accounts')
        .delete()
        .eq('id', id)

      if (err) throw err
      setAccounts(prev => prev.filter(a => a.id !== id))
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error removing account'
      setError(msg)
      throw err
    }
  }, [supabase])

  return {
    accounts,
    loading,
    error,
    fetchAccounts,
    addAccount,
    updateAccount,
    removeAccount
  }
}
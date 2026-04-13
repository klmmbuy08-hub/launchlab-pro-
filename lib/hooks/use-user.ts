'use client'

import { useAuth } from '@/lib/contexts/auth-context'
import type { User } from '@/lib/types'

export function useUser() {
  const { user, loading, updateProfile } = useAuth()

  return {
    user,
    loading,
    isAuthenticated: !!user,
    updateProfile,
  }
}

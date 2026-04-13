'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { supabase as supabaseClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { User } from '@/lib/types'

interface AuthContextType {
  user: User | null
  supabaseUser: SupabaseUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = supabaseClient

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupabaseUser(session?.user ?? null)
      if (session?.user) {
        fetchUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseUser(session?.user ?? null)
      if (session?.user) {
        fetchUserProfile(session.user.id)
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

      if (error) {
        console.error('Error fetching profile:', error)
        setLoading(false)
        return
      }

      if (data) {
        setUser({
          id: data.id,
          email: data.email,
          fullName: data.full_name,
          avatarUrl: data.avatar_url,
          onboardingCompleted: data.onboarding_completed,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        })
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push('/dashboard')
    } catch (error: any) {
      throw new Error(error.message || 'Error signing in')
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('User creation failed')

      const { error: profileError } = await supabase.from('users').insert({
        id: authData.user.id,
        email,
        full_name: fullName,
        onboarding_completed: false,
      })

      if (profileError) throw profileError

      router.push('/onboarding')
    } catch (error: any) {
      throw new Error(error.message || 'Error signing up')
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      setUser(null)
      setSupabaseUser(null)
      router.push('/auth/login')
    } catch (error: any) {
      throw new Error(error.message || 'Error signing out')
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: data.fullName,
          avatar_url: data.avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (error) throw error

      setUser({ ...user, ...data })
    } catch (error: any) {
      throw new Error(error.message || 'Error updating profile')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        supabaseUser,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

'use client'

import { createContext, useContext, ReactNode } from 'react'

const AuthContext = createContext({
  user: null,
  loading: false,
  signOut: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={{ user: null, loading: false, signOut: () => {} }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

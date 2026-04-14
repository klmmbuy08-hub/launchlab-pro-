'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

const AuthContext = createContext({
  user: { id: 'guest', email: 'guest@example.com' },
  loading: false,
  signOut: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{
      user: { id: 'guest', email: 'guest@example.com' },
      loading,
      signOut: () => {}
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    return { user: { id: 'guest', email: 'guest@example.com' }, loading: false, signOut: () => {} }
  }
  return context
}

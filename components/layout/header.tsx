'use client'

import { Bell, Search, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/hooks/use-auth'

export function Header() {
  const { signOut } = useAuth()

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-neutral-900 border-b border-neutral-800">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full h-10 pl-10 pr-4 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
        <Button
         
          size="sm"
          onClick={signOut}
          className="ml-2"
        >
          Cerrar Sesión
        </Button>
      </div>
    </header>
  )
}

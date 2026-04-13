'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/contexts/auth-context'
import { getInitials } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  Calendar,
  Target,
  Sparkles,
  Megaphone,
  BarChart3,
  Settings,
  LogOut,
  Zap,
  Plug,
  Contact,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Audiencia', href: '/audience', icon: Users },
  { name: 'Contenido', href: '/content', icon: FileText },
  { name: 'Leads', href: '/leads', icon: Contact },
  { name: 'Workflows', href: '/workflows', icon: Zap },
  { name: 'Negocio', href: '/business', icon: DollarSign },
  { name: 'Calendario', href: '/calendar', icon: Calendar },
  { name: 'Competencia', href: '/competitors', icon: Target },
  { name: 'Historias IA', href: '/stories', icon: Sparkles },
  { name: 'Anuncios', href: '/ads', icon: Megaphone },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Integraciones', href: '/integrations', icon: Plug },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  return (
    <div className="flex flex-col w-64 bg-neutral-900 border-r border-neutral-800 h-screen">
      <div className="flex items-center h-16 px-6 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">LAUNCHOS</span>
        </div>
      </div>

      <div className="px-4 pt-4 pb-2">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Centro de Mando
        </span>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-2 border-t border-neutral-800">
        <Link
          href="/settings"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            pathname === '/settings'
              ? 'bg-blue-600 text-white'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          )}
        >
          <Settings className="w-5 h-5" />
          <span>Configuración</span>
        </Link>
      </div>

      <div className="p-4 border-t border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full text-sm font-bold text-white">
            {user ? getInitials(user.fullName || user.email) : 'DU'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.fullName || 'Usuario Demo'}
            </p>
            <p className="text-xs text-blue-400 font-medium">
              OPERADOR PRO
            </p>
          </div>
          <button
            onClick={signOut}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

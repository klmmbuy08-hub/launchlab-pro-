'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Rocket,
  Bot,
  Sparkles,
  Settings,
  ChevronLeft,
  ChevronRight,
  Target,
  Book,
  DollarSign,
  Palette,
  Phone,
  Video,
  Briefcase,
} from 'lucide-react'
import { Terminal } from 'lucide-react'

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Lanzamientos',
      href: '/launches',
      icon: Rocket,
      badge: '2',
    },
    {
      name: 'Agentes',
      icon: Bot,
      children: [
        { name: 'CEO', href: '/agents/ceo', icon: Target },
        { name: 'CMO', href: '/agents/cmo', icon: Book },
        { name: 'Sales', href: '/agents/sales', icon: DollarSign },
        { name: 'Designer', href: '/agents/designer', icon: Palette },
        { name: 'Voice', href: '/agents/voice', icon: Phone },
        { name: 'CDO', href: '/agents/cdo', icon: Video },
        { name: 'COO', href: '/agents/coo', icon: Briefcase },
      ],
    },
    {
      name: 'Generaciones',
      href: '/generations',
      icon: Sparkles,
    },
    {
      name: 'Configuración',
      href: '/settings',
      icon: Settings,
    },
  ]

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-neutral-900 border-r border-neutral-800 transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-800">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-neutral-950" />
            </div>
            <span className="font-heading font-bold text-lg text-neutral-100">
              LaunchOS
            </span>
          </Link>
        )}
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-neutral-100 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1">
        {navigation.map((item) => (
          <NavItem
            key={item.name}
            item={item}
            collapsed={collapsed}
            pathname={pathname}
          />
        ))}
      </nav>
    </aside>
  )
}

function NavItem({ item, collapsed, pathname }: any) {
  const [expanded, setExpanded] = useState(false)
  const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all',
            isActive
              ? 'bg-primary-500/10 text-primary-500'
              : 'text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100'
          )}
        >
          <item.icon size={20} />
          {!collapsed && (
            <>
              <span className="flex-1 text-left text-sm font-medium">
                {item.name}
              </span>
              <ChevronRight
                size={16}
                className={cn(
                  'transition-transform',
                  expanded && 'rotate-90'
                )}
              />
            </>
          )}
        </button>

        {expanded && !collapsed && (
          <div className="ml-8 mt-1 space-y-1">
            {item.children.map((child: any) => (
              <Link
                key={child.name}
                href={child.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors',
                  pathname === child.href
                    ? 'bg-primary-500/10 text-primary-500'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100'
                )}
              >
                <child.icon size={16} />
                <span>{child.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg transition-all',
        isActive
          ? 'bg-primary-500/10 text-primary-500'
          : 'text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100'
      )}
    >
      <item.icon size={20} />
      {!collapsed && (
        <>
          <span className="flex-1 text-sm font-medium">{item.name}</span>
          {item.badge && (
            <span className="px-2 py-0.5 rounded-full bg-primary-500 text-neutral-950 text-xs font-semibold">
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  )
}

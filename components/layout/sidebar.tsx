'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  Calendar,
  Target,
  TrendingUp,
  Megaphone,
  Settings,
  LogOut,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Audience', href: '/audience', icon: Users },
  { name: 'Content', href: '/content', icon: FileText },
  { name: 'Business', href: '/business', icon: DollarSign },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Competitors', href: '/competitors', icon: Target },
  { name: 'Stories & Angles', href: '/stories', icon: TrendingUp },
  { name: 'AI Ads Manager', href: '/ads', icon: Megaphone },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-neutral-950 border-r border-neutral-800 h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          LaunchOS
        </h1>
        <p className="text-xs text-neutral-500 mt-1">Business Intelligence</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-neutral-800 space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 transition-all"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
        <button
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-neutral-400 hover:text-red-400 hover:bg-neutral-900 transition-all w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  )
}

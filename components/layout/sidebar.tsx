'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  Calendar,
  Target,
  Megaphone,
  BarChart3,
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Audience', href: '/audience', icon: Users },
  { name: 'Content', href: '/content', icon: FileText },
  { name: 'Stories & Angles', href: '/stories', icon: Sparkles },
  { name: 'Business', href: '/business', icon: DollarSign },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Competitors', href: '/competitors', icon: Target },
  { name: 'Ads Manager', href: '/ads', icon: Megaphone },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-[#0A0A0A] border-r border-[#27272A] font-sans">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-[#27272A]">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <span className="text-black font-bold text-xl leading-none -mt-0.5 tracking-tighter">L</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Launch<span className="text-[#A1A1AA]">OS</span>
          </h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto hidden-scrollbar">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href // Strict equal check to avoid highlighting multiple items

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center px-3 py-2.5 text-sm font-semibold rounded-lg transition-all',
                isActive
                  ? 'bg-[#141414] text-white shadow-sm border border-[#27272A]'
                  : 'text-[#A1A1AA] hover:text-white hover:bg-[#141414]/50 border border-transparent'
              )}
            >
              <Icon className={cn(
                'mr-3 h-[18px] w-[18px] flex-shrink-0 transition-colors',
                isActive ? 'text-[#3B82F6]' : 'text-[#71717A] group-hover:text-[#A1A1AA]'
              )} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-[#27272A] p-4 space-y-1.5 bg-[#0A0A0A]">
        <Link
          href="/settings"
          className="group flex items-center px-3 py-2.5 text-sm font-semibold text-[#A1A1AA] hover:text-white hover:bg-[#141414]/50 rounded-lg transition-all border border-transparent"
        >
          <Settings className="mr-3 h-[18px] w-[18px] flex-shrink-0 text-[#71717A] group-hover:text-[#A1A1AA] transition-colors" />
          Settings
        </Link>
        <button
          className="group w-full flex items-center px-3 py-2.5 text-sm font-semibold text-[#A1A1AA] hover:text-white hover:bg-[#141414]/50 rounded-lg transition-all border border-transparent"
        >
          <LogOut className="mr-3 h-[18px] w-[18px] flex-shrink-0 text-[#71717A] group-hover:text-[#A1A1AA] transition-colors" />
          Logout
        </button>
      </div>
    </div>
  )
}

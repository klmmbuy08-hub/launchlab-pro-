'use client'

import { BarChart3 } from 'lucide-react'

interface QuickStatsProps {
  stats: {
    total_followers: number
    follower_growth: number
    avg_engagement: number
    content_this_week: number
    active_campaigns: number
    total_ad_spend: number
  }
}

export function QuickStats({ stats }: QuickStatsProps) {
  const statItems = [
    { label: 'Total Followers', value: stats.total_followers.toLocaleString(), change: `+${stats.follower_growth.toFixed(1)}%` },
    { label: 'Avg Engagement', value: `${stats.avg_engagement.toFixed(1)}%`, change: null },
    { label: 'Content This Week', value: stats.content_this_week.toString(), change: null },
    { label: 'Active Campaigns', value: stats.active_campaigns.toString(), change: null },
    { label: 'Ad Spend Today', value: `$${stats.total_ad_spend.toFixed(2)}`, change: null },
  ]

  return (
    <div className="bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 border-b border-[#27272A] bg-[#0A0A0A] flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-[#3B82F6]" />
        <h3 className="text-sm font-semibold text-white">Quick Stats</h3>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-[#27272A]">
          {statItems.map((stat, idx) => (
            <div key={idx} className={`${idx !== 0 && idx !== 1 && 'pt-4 lg:pt-0'} lg:px-4 text-center first:pl-0 last:pr-0`}>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] mb-1.5">{stat.label}</p>
              <p className="text-xl font-bold text-[#E5E7EB]">{stat.value}</p>
              {stat.change && (
                <p className="text-[10px] font-bold text-[#10B981] mt-1">{stat.change} <span className="font-normal text-[#A1A1AA]">vs last mo</span></p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

'use client'

import { PieChart, Activity } from 'lucide-react'

interface ContentBreakdownProps {
  data: {
    by_type: { type: string; count: number; percentage: number }[]
    by_category: { category: string; count: number; percentage: number }[]
  }
}

export function ContentBreakdown({ data }: ContentBreakdownProps) {
  const typeColors: Record<string, string> = {
    reel: 'from-[#8B5CF6] to-[#A78BFA]',
    carousel: 'from-[#10B981] to-[#34D399]',
    post: 'from-[#3B82F6] to-[#60A5FA]',
    story: 'from-[#F59E0B] to-[#FBBF24]',
  }

  const categoryColors: Record<string, string> = {
    educational: 'from-[#3B82F6] to-[#60A5FA]',
    promotional: 'from-[#F43F5E] to-[#FB7185]',
    transformation: 'from-[#10B981] to-[#34D399]',
    engagement: 'from-[#8B5CF6] to-[#A78BFA]',
    behind_the_scenes: 'from-[#F59E0B] to-[#FBBF24]',
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* By Type */}
      <div className="bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#27272A] bg-gradient-to-b from-white/[0.02] to-transparent">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[#3B82F6]" />
            Content by Type
          </h3>
        </div>
        
        <div className="p-6 space-y-4">
          {data.by_type.map((item) => (
            <div key={item.type}>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#A1A1AA] uppercase tracking-wider font-semibold">{item.type}</span>
                <span className="font-semibold text-white">
                  {item.count} <span className="text-[#71717A] font-normal">({item.percentage}%)</span>
                </span>
              </div>
              <div className="h-1.5 bg-[#27272A] rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full bg-gradient-to-r ${typeColors[item.type] || 'from-[#4B5563] to-[#6B7280]'}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* By Category */}
      <div className="bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#27272A] bg-gradient-to-b from-white/[0.02] to-transparent">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#10B981]" />
            Content by Category
          </h3>
        </div>
        
        <div className="p-6 space-y-4">
          {data.by_category.map((item) => (
            <div key={item.category}>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#A1A1AA] uppercase tracking-wider font-semibold">{item.category.replace('_', ' ')}</span>
                <span className="font-semibold text-white">
                  {item.count} <span className="text-[#71717A] font-normal">({item.percentage}%)</span>
                </span>
              </div>
              <div className="h-1.5 bg-[#27272A] rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full bg-gradient-to-r ${categoryColors[item.category] || 'from-[#4B5563] to-[#6B7280]'}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

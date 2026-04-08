'use client'

import { TrendingUp, DollarSign } from 'lucide-react'

interface TopContentWidgetProps {
  content: {
    id: string
    type: string
    topic: string
    engagement_rate: number
    revenue: number
  }[]
}

export function TopContentWidget({ content }: TopContentWidgetProps) {
  const typeIcons: Record<string, string> = {
    reel: '🎬',
    carousel: '📸',
    post: '📄',
    story: '📱',
  }

  return (
    <div className="bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-[#27272A] bg-[#0A0A0A]">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#8B5CF6]" />
          Top Content Today
        </h3>
      </div>
      <div className="p-5">
        <div className="space-y-3">
          {content.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-xl bg-[#0A0A0A] border border-[#27272A] hover:border-[#3F3F46] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-[#141414] border border-[#27272A] flex items-center justify-center flex-shrink-0 text-lg group-hover:scale-105 transition-transform">
                  {typeIcons[item.type] || '📄'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate mb-1.5">{item.topic}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#71717A]">
                      {item.engagement_rate.toFixed(1)}% <span className="font-normal text-[#4B5563]">ENG</span>
                    </span>
                    <div className="w-1 h-1 rounded-full bg-[#3F3F46]" />
                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-[#10B981]">
                      <DollarSign className="w-3 h-3 text-[#10B981]" />
                      ${item.revenue}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

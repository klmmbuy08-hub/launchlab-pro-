'use client'

import { Badge } from '@/components/ui/badge'
import { TrendingUp, DollarSign } from 'lucide-react'

interface StoryPatternsViewProps {
  patterns: {
    narrative_type: string
    avg_engagement: number
    avg_revenue: number
    frequency: number
    examples: string[]
  }[]
  insights: string[]
}

export function StoryPatternsView({ patterns, insights }: StoryPatternsViewProps) {
  return (
    <div className="space-y-6">
      {/* Insights */}
      <div className="bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden shadow-sm relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-30" />
        <div className="p-6">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-lg">📊</span> Key Insights:
          </h3>
          <ul className="space-y-3">
            {insights.map((insight, idx) => (
              <li key={idx} className="text-sm text-[#E5E7EB] flex items-start gap-3">
                <span className="text-[#3B82F6] mt-0.5 font-bold">•</span>
                <span className="leading-relaxed">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Patterns */}
      <div className="space-y-4">
        {patterns.map((pattern, idx) => {
          const rank = idx + 1
          const isTop = rank <= 3

          return (
            <div 
              key={pattern.narrative_type}
              className={`rounded-xl overflow-hidden shadow-sm ${
                isTop 
                  ? 'bg-[#141414] border border-[#10B981]/20' 
                  : 'bg-[#141414] border border-[#27272A]'
              }`}
            >
              <div className={`p-5 border-b ${isTop ? 'border-[#10B981]/10 bg-[#10B981]/5' : 'border-[#27272A] bg-gradient-to-b from-white/[0.02] to-transparent'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-md text-xs font-bold ${
                      rank === 1 ? 'bg-[#F59E0B] text-black shadow-[0_0_10px_rgba(245,158,11,0.3)]' :
                      rank === 2 ? 'bg-[#9CA3AF] text-black shadow-[0_0_10px_rgba(156,163,175,0.3)]' :
                      rank === 3 ? 'bg-[#D97706] text-white shadow-[0_0_10px_rgba(217,119,6,0.3)]' :
                      'bg-[#1F2937] text-[#A1A1AA] border border-[#374151]'
                    }`}>
                      #{rank}
                    </div>
                    <h3 className="text-base font-semibold text-white tracking-tight">{pattern.narrative_type}</h3>
                  </div>
                  <Badge variant="outline" className={isTop ? 'border-[#10B981]/30 text-[#10B981] bg-[#10B981]/10 text-[10px] uppercase font-bold tracking-widest' : 'border-[#3F3F46] text-[#A1A1AA] bg-[#1F1F1F] text-[10px] uppercase font-bold tracking-widest'}>
                    {pattern.frequency} posts
                  </Badge>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Metrics */}
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex items-center gap-4 bg-[#0A0A0A] border border-[#27272A] rounded-lg p-4 flex-1">
                    <div className="p-2.5 rounded-md bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                      <TrendingUp className="w-4 h-4 text-[#8B5CF6]" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] mb-1">Avg Engage</p>
                      <p className="text-xl font-bold text-white">{pattern.avg_engagement.toFixed(1)}%</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-[#0A0A0A] border border-[#27272A] rounded-lg p-4 flex-1">
                    <div className="p-2.5 rounded-md bg-[#10B981]/10 border border-[#10B981]/20">
                      <DollarSign className="w-4 h-4 text-[#10B981]" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] mb-1">Avg Revenue</p>
                      <p className="text-xl font-bold text-white">${pattern.avg_revenue.toFixed(0)}</p>
                    </div>
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] mb-3">Examples:</p>
                  <div className="space-y-2.5">
                    {pattern.examples.map((example, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-[#0A0A0A] border border-[#27272A]">
                        <p className="text-sm text-[#E5E7EB] leading-snug">{example}...</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

'use client'

import { TrendingUp, BarChart2 } from 'lucide-react'

interface CampaignPerformanceChartProps {
  data: {
    date: string
    spend: number
    conversions: number
    roas: number
  }[]
}

export function CampaignPerformanceChart({ data }: CampaignPerformanceChartProps) {
  const maxSpend = Math.max(...data.map(d => d.spend))
  const maxConversions = Math.max(...data.map(d => d.conversions))

  return (
    <div className="bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-[#27272A] bg-gradient-to-b from-white/[0.02] to-transparent">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-[#3B82F6]" />
          Performance Trend (Last 7 Days)
        </h3>
      </div>
      <div className="p-6">
        {/* Simple bar chart representing data visually */}
        <div className="space-y-4">
          {data.map((item, idx) => (
            <div key={idx}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1.5 gap-2 sm:gap-0">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#71717A]">
                  {new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#E5E7EB] font-medium min-w-[70px] text-right">
                    ${item.spend.toFixed(0)} <span className="text-[#4B5563] ml-1">Spnt</span>
                  </span>
                  <span className="text-xs text-[#10B981] font-medium min-w-[60px] text-right">
                    {item.conversions} <span className="text-[#4B5563] ml-1">Cnv</span>
                  </span>
                  <span className="text-xs text-[#F59E0B] font-medium min-w-[60px] text-right">
                    {item.roas.toFixed(1)}x <span className="text-[#4B5563] ml-1">Roas</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-1 h-3">
                <div
                  className="bg-[#3B82F6] rounded-sm opacity-80 hover:opacity-100 transition-opacity cursor-crosshair"
                  style={{ width: `${Math.max((item.spend / maxSpend) * 100, 2)}%` }}
                  title={`Spend: $${item.spend.toFixed(2)}`}
                />
                <div
                  className="bg-[#10B981] rounded-sm opacity-80 hover:opacity-100 transition-opacity cursor-crosshair"
                  style={{ width: `${Math.max((item.conversions / maxConversions) * 100, 2)}%` }}
                  title={`Conversions: ${item.conversions}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-6 mt-6 pt-5 border-t border-[#27272A]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#3B82F6] rounded-sm opacity-80" />
            <span className="text-[9px] uppercase font-bold tracking-widest text-[#71717A]">Spend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#10B981] rounded-sm opacity-80" />
            <span className="text-[9px] uppercase font-bold tracking-widest text-[#71717A]">Conversions</span>
          </div>
        </div>
      </div>
    </div>
  )
}

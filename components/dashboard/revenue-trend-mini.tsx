'use client'

import { TrendingUp } from 'lucide-react'

interface RevenueTrendMiniProps {
  data: {
    date: string
    revenue: number
    leads: number
  }[]
}

export function RevenueTrendMini({ data }: RevenueTrendMiniProps) {
  const maxRevenue = Math.max(...data.map(d => d.revenue))
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0)
  const totalLeads = data.reduce((sum, d) => sum + d.leads, 0)

  return (
    <div className="bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-[#27272A] bg-[#0A0A0A] flex items-center justify-between">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
          7-Day Revenue Trend
        </h3>
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-md border border-[#10B981]/20">
          ${totalRevenue.toFixed(0)} total
        </span>
      </div>
      <div className="p-6">
        {/* Mini chart */}
        <div className="flex items-end gap-1.5 h-32 mb-6">
          {data.map((item, idx) => {
            const height = Math.max((item.revenue / maxRevenue) * 100, 5) // ensure at least 5% height

            return (
              <div key={idx} className="flex-1 flex flex-col justify-end group relative h-full">
                <div
                  className="bg-gradient-to-t from-[#3B82F6] to-[#8B5CF6] rounded-sm opacity-80 group-hover:opacity-100 transition-all cursor-pointer w-full"
                  style={{ height: `${height}%` }}
                />
                {/* Tooltip */}
                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 hidden sm:block">
                  <div className="bg-[#0A0A0A] border border-[#27272A] rounded-lg p-2 text-xs shadow-xl whitespace-nowrap min-w-[100px]">
                    <p className="text-white font-bold mb-1">${item.revenue.toFixed(0)} <span className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] ml-1 font-normal">REV</span></p>
                    <p className="text-[#10B981] font-semibold">{item.leads} <span className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] ml-1 font-normal">LEADS</span></p>
                  </div>
                  {/* Arrow for Tooltip */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0A0A0A] border-b border-r border-[#27272A] transform rotate-45" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-5 border-t border-[#27272A]">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] mb-1">Avg per Day</p>
            <p className="text-2xl font-bold text-white tracking-tight">
              ${(totalRevenue / data.length).toFixed(0)}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] mb-1">Total Leads (7d)</p>
            <p className="text-2xl font-bold text-white tracking-tight">{totalLeads}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

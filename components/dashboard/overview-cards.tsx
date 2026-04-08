'use client'

import { 
  DollarSign, 
  Users, 
  Target, 
  TrendingUp,
  Calendar
} from 'lucide-react'

interface OverviewCardsProps {
  data: {
    revenue_today: number
    revenue_month: number
    revenue_growth: number
    leads_today: number
    leads_month: number
    conversions_today: number
    on_track_to_goal: boolean
    days_remaining: number
  }
}

export function OverviewCards({ data }: OverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Revenue Today */}
      <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl p-5 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="flex items-start justify-between mb-4 relative">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#10B981] mb-1">Revenue Today</p>
            <h3 className="text-3xl font-bold text-white tracking-tight">
              ${data.revenue_today.toLocaleString()}
            </h3>
            <p className="text-xs text-[#E5E7EB] mt-1 font-medium z-10">
              ${data.revenue_month.toLocaleString()} <span className="text-[#A1A1AA] font-normal">this month</span>
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-[#10B981]/20 border border-[#10B981]/30 relative z-10">
            <DollarSign className="w-5 h-5 text-[#10B981]" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#10B981]/20">
          <div className={`flex items-center gap-1 text-xs font-bold ${
            data.revenue_growth >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
          }`}>
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{data.revenue_growth.toFixed(1)}%</span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#71717A]">vs last month</span>
        </div>
      </div>

      {/* Leads Today */}
      <div className="bg-[#141414] border border-[#27272A] rounded-xl p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] mb-1">Leads Today</p>
            <h3 className="text-3xl font-bold text-white tracking-tight">{data.leads_today}</h3>
            <p className="text-xs text-[#E5E7EB] mt-1 font-medium">
              {data.leads_month} <span className="text-[#A1A1AA] font-normal">this month</span>
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20">
            <Users className="w-5 h-5 text-[#3B82F6]" />
          </div>
        </div>
      </div>

      {/* Conversions Today */}
      <div className="bg-[#141414] border border-[#27272A] rounded-xl p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] mb-1">Conversions Today</p>
            <h3 className="text-3xl font-bold text-white tracking-tight">{data.conversions_today}</h3>
            <p className="text-xs text-[#A1A1AA] mt-1">New sales closed</p>
          </div>
          <div className="p-2.5 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
            <Target className="w-5 h-5 text-[#8B5CF6]" />
          </div>
        </div>
      </div>

      {/* Goal Progress */}
      <div className={`rounded-xl p-5 shadow-sm border ${
        data.on_track_to_goal 
          ? 'bg-[#141414] border-[#10B981]/30' 
          : 'bg-[#F59E0B]/10 border-[#F59E0B]/30'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className={`text-[10px] uppercase font-bold tracking-widest mb-1 ${
              data.on_track_to_goal ? 'text-[#10B981]' : 'text-[#F59E0B]'
            }`}>
              {data.on_track_to_goal ? 'On Track!' : 'Behind Target'}
            </p>
            <h3 className="text-3xl font-bold text-white tracking-tight">{data.days_remaining}</h3>
            <p className="text-xs text-[#A1A1AA] mt-1">Days remaining</p>
          </div>
          <div className={`p-2.5 rounded-lg border ${
            data.on_track_to_goal ? 'bg-[#10B981]/10 border-[#10B981]/20' : 'bg-[#F59E0B]/20 border-[#F59E0B]/30'
          }`}>
            <Calendar className={`w-5 h-5 ${
              data.on_track_to_goal ? 'text-[#10B981]' : 'text-[#F59E0B]'
            }`} />
          </div>
        </div>
        <p className={`text-xs font-medium pt-4 mt-4 border-t ${
          data.on_track_to_goal ? 'text-[#10B981] border-[#10B981]/20' : 'text-[#F59E0B] border-[#F59E0B]/20'
        }`}>
          {data.on_track_to_goal 
            ? '✓ Projected to hit monthly goal' 
            : '⚠️ Need to increase daily avg'
          }
        </p>
      </div>
    </div>
  )
}

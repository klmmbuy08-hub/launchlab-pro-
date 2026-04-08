'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  MousePointerClick,
  Play,
  Pause,
  MoreVertical
} from 'lucide-react'

interface CampaignCardProps {
  campaign: {
    id: string
    name: string
    status: 'ACTIVE' | 'PAUSED' | 'DELETED'
    objective: string
    daily_budget: number
    spent: number
    impressions: number
    clicks: number
    ctr: number
    cpa: number
    roas: number
  }
  onClick: () => void
  onTogglePause: () => void
}

const statusColors = {
  ACTIVE: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
  PAUSED: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
  DELETED: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20',
}

export function CampaignCard({ campaign, onClick, onTogglePause }: CampaignCardProps) {
  const budgetUsed = (campaign.spent / campaign.daily_budget) * 100

  return (
    <div 
      className="bg-[#141414] border border-[#27272A] hover:border-[#3F3F46] rounded-xl overflow-hidden transition-all cursor-pointer shadow-sm group"
      onClick={onClick}
    >
      <div className="p-5 border-b border-[#27272A] flex items-start justify-between bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1.5">
            <h3 className="font-semibold text-white truncate max-w-[200px] sm:max-w-xs">{campaign.name}</h3>
            <Badge variant="outline" className={`${statusColors[campaign.status]} text-[9px] uppercase font-bold tracking-widest`}>
              {campaign.status}
            </Badge>
          </div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] mt-1">{campaign.objective.replace('_', ' ')}</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className="w-8 h-8 rounded-md text-[#71717A] hover:text-white hover:bg-[#27272A] opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation()
            onTogglePause()
          }}
        >
          {campaign.status === 'ACTIVE' ? (
            <Pause className="w-4 h-4 text-[#10B981]" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div className="p-5 space-y-5">
        {/* Budget Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#71717A]">Budget</span>
            <span className="text-xs text-white font-medium">
              ${campaign.spent.toFixed(2)} <span className="text-[#71717A] font-normal">/ ${campaign.daily_budget.toFixed(2)}</span>
            </span>
          </div>
          <div className="h-1.5 bg-[#27272A] rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full transition-all ${
                budgetUsed >= 100 ? 'bg-[#EF4444]' : budgetUsed >= 80 ? 'bg-[#F59E0B]' : 'bg-[#3B82F6]'
              }`}
              style={{ width: `${Math.min(100, budgetUsed)}%` }}
            />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-[#0A0A0A] border border-[#27272A]">
            <div className="flex items-center gap-2 mb-1.5">
              <Users className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#71717A]">Impr</span>
            </div>
            <p className="text-sm font-semibold text-white">
              {campaign.impressions >= 1000 
                ? `${(campaign.impressions / 1000).toFixed(1)}K`
                : campaign.impressions
              }
            </p>
          </div>

          <div className="p-3 rounded-lg bg-[#0A0A0A] border border-[#27272A]">
            <div className="flex items-center gap-2 mb-1.5">
              <MousePointerClick className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#71717A]">CTR</span>
            </div>
            <p className="text-sm font-semibold text-white">{campaign.ctr.toFixed(2)}%</p>
          </div>

          <div className="p-3 rounded-lg bg-[#0A0A0A] border border-[#27272A]">
            <div className="flex items-center gap-2 mb-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#71717A]">CPA</span>
            </div>
            <p className="text-sm font-semibold text-white">${campaign.cpa.toFixed(2)}</p>
          </div>

          <div className="p-3 rounded-lg bg-[#0A0A0A] border border-[#27272A]">
            <div className="flex items-center gap-2 mb-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#71717A]">ROAS</span>
            </div>
            <p className={`text-sm font-semibold ${
              campaign.roas >= 3 ? 'text-[#10B981]' : 
              campaign.roas >= 2 ? 'text-[#F59E0B]' : 'text-[#EF4444]'
            }`}>
              {campaign.roas.toFixed(2)}x
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

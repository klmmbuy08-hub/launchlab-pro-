'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  TrendingUp, 
  ExternalLink, 
  MoreVertical,
  Target 
} from 'lucide-react'

interface CompetitorCardProps {
  competitor: {
    id: string
    username: string
    platform: string
    followers: number
    engagement_rate: number
    posting_frequency: number
    last_analyzed: string
  }
  onClick: () => void
}

export function CompetitorCard({ competitor, onClick }: CompetitorCardProps) {
  return (
    <Card 
      className="bg-[#141414] border-[#27272A] hover:border-[#3F3F46] transition-all cursor-pointer shadow-sm group"
      onClick={onClick}
    >
      <div className="p-5 border-b border-[#27272A] flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[#0A0A0A] border border-[#27272A] flex items-center justify-center text-white font-bold text-lg shadow-inner">
            {competitor.username[0].toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-white tracking-tight">@{competitor.username}</h3>
            <p className="text-[10px] uppercase tracking-widest text-[#71717A] mt-0.5">{competitor.platform}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="w-8 h-8 opacity-0 group-hover:opacity-100 text-[#71717A] hover:text-white transition-opacity">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-[#4B5563] mb-1.5">
              <Users className="w-3.5 h-3.5" />
            </div>
            <p className="text-base font-bold text-white">
              {competitor.followers >= 1000 
                ? `${(competitor.followers / 1000).toFixed(1)}K`
                : competitor.followers
              }
            </p>
            <p className="text-[10px] uppercase font-semibold text-[#71717A] mt-0.5 tracking-wider">Followers</p>
          </div>

          <div className="text-center px-2 border-x border-[#27272A]">
            <div className="flex items-center justify-center gap-1 text-[#4B5563] mb-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <p className="text-base font-bold text-white">{competitor.engagement_rate}%</p>
            <p className="text-[10px] uppercase font-semibold text-[#71717A] mt-0.5 tracking-wider">Engage</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-[#4B5563] mb-1.5">
              <Target className="w-3.5 h-3.5" />
            </div>
            <p className="text-base font-bold text-white">{competitor.posting_frequency}/wk</p>
            <p className="text-[10px] uppercase font-semibold text-[#71717A] mt-0.5 tracking-wider">Posts</p>
          </div>
        </div>
      </CardContent>
      <div className="px-5 py-3 border-t border-[#27272A] bg-[#0A0A0A]/50 flex items-center justify-between">
        <span className="text-[10px] font-medium text-[#71717A]">
          UPDATED {new Date(competitor.last_analyzed).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
        </span>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-[#71717A] hover:bg-[#27272A] hover:text-white transition-colors">
          <ExternalLink className="w-3 h-3" />
        </Button>
      </div>
    </Card>
  )
}

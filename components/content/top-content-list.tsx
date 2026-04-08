'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, TrendingUp, DollarSign, Users, Play, Image as ImageIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface ContentItem {
  id: string
  type: 'post' | 'reel' | 'story' | 'carousel'
  caption: string
  thumbnail_url?: string
  engagement_rate: number
  revenue_attributed: number
  leads_generated: number
  published_at: string
  permalink: string
}

interface TopContentListProps {
  content: ContentItem[]
  title: string
  emptyMessage?: string
}

const typeColors = {
  post: 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20',
  reel: 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20',
  story: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
  carousel: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
}

const TypeIcon = ({ type, className }: { type: string, className?: string }) => {
  if (type === 'reel' || type === 'story') return <Play className={className} />
  return <ImageIcon className={className} />
}

export function TopContentList({ content, title, emptyMessage }: TopContentListProps) {
  if (content.length === 0) {
    return (
      <div className="bg-[#141414] border border-[#27272A] rounded-xl p-12 text-center shadow-sm">
        <p className="text-[#A1A1AA] text-sm">{emptyMessage || 'No content found'}</p>
      </div>
    )
  }

  return (
    <div className="bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-[#27272A] bg-gradient-to-b from-white/[0.02] to-transparent">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{title}</h3>
      </div>
      
      <div className="divide-y divide-[#27272A]">
        {content.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="flex flex-col sm:flex-row sm:items-center p-6 hover:bg-[#1A1A1A] transition-colors group"
          >
            {/* Thumbnail */}
            <div className="flex items-center gap-4 sm:w-[45%] mb-5 sm:mb-0 shrink-0 pr-4">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-lg bg-[#0A0A0A] border border-[#27272A] flex items-center justify-center overflow-hidden relative shadow-sm">
                  {item.thumbnail_url ? (
                    <img src={item.thumbnail_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <TypeIcon type={item.type} className="w-6 h-6 text-[#4B5563]" />
                  )}
                </div>
                <div className="absolute -top-2.5 -left-2.5 w-6 h-6 rounded-md bg-[#1F2937] border border-[#374151] flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                  {idx + 1}
                </div>
              </div>
              <div className="flex flex-col gap-1.5 min-w-0">
                <p className="text-sm font-medium text-white truncate group-hover:text-[#3B82F6] transition-colors duration-200">
                  {item.caption}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={`${typeColors[item.type as keyof typeof typeColors]} text-[9px] uppercase font-bold tracking-widest h-5 px-1.5 border`}>
                    {item.type}
                  </Badge>
                  <span className="text-xs text-[#71717A] font-medium">
                    {new Date(item.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex-1 grid grid-cols-3 gap-2 sm:gap-4 sm:px-4">
              <div className="flex flex-col justify-center">
                <p className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold mb-1">Engage</p>
                <p className="text-sm text-white font-medium flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  {item.engagement_rate}%
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold mb-1">Revenue</p>
                <p className="text-sm text-[#10B981] font-medium flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#10B981]" />
                  ${item.revenue_attributed.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[10px] text-[#71717A] uppercase tracking-wider font-semibold mb-1">Leads</p>
                <p className="text-sm text-white font-medium flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#3B82F6]" />
                  {item.leads_generated}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="shrink-0 sm:pl-4 sm:ml-auto items-center hidden sm:flex">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 rounded-md text-[#71717A] hover:text-white hover:bg-[#27272A] transition-colors"
                onClick={() => window.open(item.permalink, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

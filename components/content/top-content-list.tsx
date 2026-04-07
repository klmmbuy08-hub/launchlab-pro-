'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, TrendingUp, DollarSign, Users } from 'lucide-react'

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

const contentTypeColors = {
  post: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  reel: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  story: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  carousel: 'bg-green-500/10 text-green-400 border-green-500/30',
}

export function TopContentList({ content, title, emptyMessage }: TopContentListProps) {
  if (content.length === 0) {
    return (
      <Card className="bg-neutral-900/50 border-neutral-800">
        <CardContent className="p-12 text-center">
          <p className="text-neutral-500">{emptyMessage || 'No content yet'}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {content.map((item, idx) => (
            <div
              key={item.id}
              className="flex items-start gap-5 p-5 rounded-xl bg-neutral-800/40 hover:bg-neutral-800/80 transition-all cursor-pointer group border border-transparent hover:border-neutral-700/50"
            >
              {/* Thumbnail */}
              <div className="relative">
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden">
                  {item.thumbnail_url ? (
                    <img src={item.thumbnail_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">
                      {item.type === 'reel' ? '🎬' : item.type === 'carousel' ? '📸' : '📄'}
                    </span>
                  )}
                </div>
                <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white">
                  #{idx + 1}
                </div>
              </div>

              {/* Content Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-medium text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {item.caption}
                  </p>
                  <Badge variant="secondary" className={contentTypeColors[item.type]}>
                    {item.type}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-xs text-neutral-400">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-purple-400" />
                    {item.engagement_rate}% engagement
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-green-400" />
                    ${item.revenue_attributed.toLocaleString()} revenue
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-blue-400" />
                    {item.leads_generated} leads
                  </span>
                </div>

                <p className="text-xs text-neutral-500 mt-2">
                  {new Date(item.published_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>

              {/* Actions */}
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => window.open(item.permalink, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4 border-neutral-700">
          View All Content
        </Button>
      </CardContent>
    </Card>
  )
}

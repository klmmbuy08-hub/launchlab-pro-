'use client'

import { Video, Layers, ImageIcon, Sparkles } from 'lucide-react'
import { ContentCalendarEntry } from '@/lib/types/v2'

interface PostCardProps {
  post: ContentCalendarEntry
}

export function PostCard({ post }: PostCardProps) {
  const colors: Record<string, string> = {
    reel: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    carousel: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    post: 'bg-green-500/10 border-green-500/20 text-green-400',
    story: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
  }

  const icons: Record<string, any> = {
    reel: Video,
    carousel: Layers,
    post: ImageIcon,
    story: Sparkles,
  }

  const Icon = icons[post.content_type] || ImageIcon

  return (
    <div 
      className={`p-1.5 rounded border text-[10px] truncate flex items-center gap-1.5 transition-all hover:scale-[1.02] cursor-pointer ${colors[post.content_type] || 'bg-neutral-800 border-neutral-700 text-neutral-400'}`}
    >
      <Icon className="w-3 h-3 flex-shrink-0" />
      <span className="truncate">{post.topic || 'No Title'}</span>
      {post.ai_generated && <Sparkles className="w-2.5 h-2.5 ml-auto text-purple-400 flex-shrink-0" />}
    </div>
  )
}

'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Target, Lightbulb, Copy, Check, Sparkles, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface CalendarEntry {
  date: string
  content_type: string
  topic: string
  caption_hook: string
  content_category: string
  cta: string
  best_time_to_post: string
  reasoning: string
  estimated_engagement: number
}

interface EntryDetailModalProps {
  entry: CalendarEntry | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onGenerateFullContent?: (entry: CalendarEntry) => void
}

const contentTypeColors: Record<string, string> = {
  reel: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  carousel: 'bg-green-500/20 text-green-300 border-green-500/30',
  post: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  story: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
}

export function EntryDetailModal({
  entry,
  open,
  onOpenChange,
  onGenerateFullContent,
}: EntryDetailModalProps) {
  const [copied, setCopied] = useState(false)

  if (!entry) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(entry.caption_hook)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-neutral-900 border-neutral-700">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`px-3 py-1 rounded text-xs font-bold border ${contentTypeColors[entry.content_type]}`}
            >
              {entry.content_type}
            </span>
            <span className="px-3 py-1 rounded text-xs font-bold border border-neutral-700 text-neutral-400 capitalize">
              {entry.content_category}
            </span>
          </div>
          <DialogTitle className="text-2xl">{entry.topic}</DialogTitle>
          <DialogDescription>
            Scheduled for{' '}
            {new Date(entry.date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hook */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-neutral-300">Caption Hook</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="border-neutral-700"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <Card className="bg-neutral-800/50 border-neutral-700">
              <CardContent className="p-4">
                <p className="text-white">{entry.caption_hook}</p>
              </CardContent>
            </Card>
          </div>

          {/* Meta info */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-neutral-800/50 border-neutral-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-neutral-400 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-medium">Best Time to Post</span>
                </div>
                <p className="text-lg font-semibold text-white">{entry.best_time_to_post}</p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800/50 border-neutral-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-neutral-400 mb-2">
                  <Target className="w-4 h-4" />
                  <span className="text-xs font-medium">Est. Engagement</span>
                </div>
                <p className="text-lg font-semibold text-white">
                  {entry.estimated_engagement.toFixed(1)}%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-300 mb-2">Call to Action</h4>
            <Card className="bg-green-500/10 border-green-500/30">
              <CardContent className="p-4">
                <p className="text-green-300">{entry.cta}</p>
              </CardContent>
            </Card>
          </div>

          {/* Reasoning */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              <h4 className="text-sm font-semibold text-neutral-300">Why This Content?</h4>
            </div>
            <Card className="bg-yellow-500/10 border-yellow-500/30">
              <CardContent className="p-4">
                <p className="text-sm text-yellow-200">{entry.reasoning}</p>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={() => onGenerateFullContent && onGenerateFullContent(entry)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Full Content
            </Button>
            <Button variant="outline" className="border-neutral-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              Schedule in Meta
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

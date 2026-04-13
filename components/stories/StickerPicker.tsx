'use client'

import React from 'react'
import { StickerType } from '@/lib/types/stories'
import { Button } from '@/components/ui/button'
import { 
  MessageCircle, 
  HelpCircle, 
  BarChart2, 
  Clock 
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface StickerPickerProps {
  selectedType?: StickerType
  onSelect: (type: StickerType) => void
}

export function StickerPicker({ selectedType, onSelect }: StickerPickerProps) {
  const stickers: { type: StickerType; icon: any; label: string }[] = [
    { type: 'poll', icon: BarChart2, label: 'Poll' },
    { type: 'question', icon: MessageCircle, label: 'Question' },
    { type: 'quiz', icon: HelpCircle, label: 'Quiz' },
    { type: 'countdown', icon: Clock, label: 'Countdown' },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {stickers.map((s) => (
        <button
          key={s.type}
          onClick={() => onSelect(s.type)}
          className={cn(
            "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
            selectedType === s.type 
              ? "bg-pink-600/10 border-pink-500 text-pink-500" 
              : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white"
          )}
        >
          <s.icon className="w-6 h-6 mb-2" />
          <span className="text-xs font-bold">{s.label}</span>
        </button>
      ))}
    </div>
  )
}

'use client'

import React from 'react'
import { StoryTemplate } from '@/lib/types/stories'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StoryTemplateCardProps {
  template: StoryTemplate
  isSelected: boolean
  onClick: () => void
}

export function StoryTemplateCard({ template, isSelected, onClick }: StoryTemplateCardProps) {
  return (
    <Card 
      onClick={onClick}
      className={cn(
        "cursor-pointer group relative overflow-hidden h-40 transition-all duration-300 border-2",
        isSelected ? "border-pink-500 ring-2 ring-pink-500/20" : "border-neutral-800 hover:border-neutral-700 bg-neutral-900"
      )}
    >
      <div 
        className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity"
        style={{ background: template.preview }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h4 className="text-white font-bold text-sm tracking-tight">{template.name}</h4>
        <p className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest">{template.category}</p>
      </div>
    </Card>
  )
}

'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Calendar, Zap, TrendingUp } from 'lucide-react'

interface SeriesGeneratorProps {
  onGenerate: (type: string) => void
  loading?: boolean
}

export function SeriesGenerator({ onGenerate, loading }: SeriesGeneratorProps) {
  const series = [
    { id: '7day', name: '7-Day Challenge', icon: Calendar, desc: 'High momentum series' },
    { id: 'authority', name: 'Authority Builder', icon: TrendingUp, desc: 'Position yourself as expert' },
    { id: 'launch', name: 'Waitlist Launch', icon: Zap, desc: 'Generate hype for product' },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-pink-500" />
        Series Generator
      </h3>
      <div className="grid gap-3">
        {series.map((s) => (
          <button
            key={s.id}
            onClick={() => onGenerate(s.id)}
            disabled={loading}
            className="group flex items-start gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-pink-500/50 hover:bg-neutral-800/50 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-pink-600 transition-colors">
              <s.icon className="w-5 h-5 text-neutral-400 group-hover:text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-0.5">{s.name}</p>
              <p className="text-[10px] text-neutral-500">{s.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Target, Search } from 'lucide-react'
import { motion } from 'framer-motion'

interface AIRecommendationsProps {
  recommendations: {
    title: string
    description: string
    priority: 'high' | 'medium' | 'low'
    action?: string
  }[]
}

const priorityConfig = {
  high: {
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    icon: Zap,
    label: 'High Priority'
  },
  medium: {
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    icon: Target,
    label: 'Medium Priority'
  },
  low: {
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    icon: Search,
    label: 'Observation'
  },
}

export function AIRecommendations({ recommendations }: AIRecommendationsProps) {
  return (
    <div className="bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-[#27272A] bg-gradient-to-b from-white/[0.02] to-transparent">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#8B5CF6]" />
          Strategy Recommendations
        </h2>
        <p className="text-sm text-[#A1A1AA] mt-1">AI-driven actions based on your top-performing audience signals.</p>
      </div>

      <div className="divide-y divide-[#27272A]">
        {recommendations.map((rec, idx) => {
          const config = priorityConfig[rec.priority]
          const Icon = config.icon

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 flex flex-col md:flex-row gap-6 md:items-center hover:bg-[#1F1F1F]/50 transition-colors group"
            >
              <div className="flex-1 space-y-1.5 pl-2 border-l-2" style={{ borderLeftColor: config.color.replace('text-', '') }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1 rounded-md ${config.bg} ${config.border} border`}>
                    <Icon className={`w-3 h-3 ${config.color}`} />
                  </div>
                  <span className={`text-[10px] font-bold ${config.color} uppercase tracking-wider`}>{config.label}</span>
                </div>
                <h4 className="text-sm font-semibold text-white">{rec.title}</h4>
                <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-3xl">
                  {rec.description}
                </p>
              </div>

              {rec.action && (
                <Button 
                  variant="outline" 
                  className="shrink-0 bg-[#0A0A0A] border-[#27272A] text-[#E5E7EB] hover:bg-[#1A1A1A] hover:border-[#3F3F46] transition-all h-9 px-4 text-xs font-medium"
                >
                  {rec.action}
                  <ArrowRight className="w-3.5 h-3.5 ml-2 text-[#A1A1AA] group-hover:translate-x-0.5 transition-transform" />
                </Button>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { Lightbulb, ArrowRight, Zap, Target, Search } from 'lucide-react'
import { motion } from 'framer-motion'

interface AIRecommendationsProps {
  recommendations: {
    title: string
    description: string
    priority: 'high' | 'medium' | 'low'
    action?: string
  }[]
}

const priorityStyles = {
  high: 'from-rose-500/10 to-red-500/5 text-rose-400 border-rose-500/20 hover:border-rose-500/40',
  medium: 'from-amber-500/10 to-orange-500/5 text-amber-400 border-amber-500/20 hover:border-amber-500/40',
  low: 'from-blue-500/10 to-cyan-500/5 text-blue-400 border-blue-500/20 hover:border-blue-500/40',
}

const priorityIcons = {
  high: Zap,
  medium: Target,
  low: Search,
}

export function AIRecommendations({ recommendations }: AIRecommendationsProps) {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/[0.05] p-8 backdrop-blur-xl">
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
            <Lightbulb className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">AI Strategy Recommendations</h2>
            <p className="text-neutral-400 mt-1">Based on your top-performing content and audience behavior</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {recommendations.map((rec, idx) => {
          const Icon = priorityIcons[rec.priority]
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`flex flex-col h-full p-6 rounded-2xl bg-gradient-to-br ${priorityStyles[rec.priority]} border transition-colors group relative overflow-hidden`}
            >
              <div className="mb-4 bg-white/[0.05] w-12 h-12 rounded-full flex items-center justify-center border border-white/[0.05] shadow-inner">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2 leading-tight">{rec.title}</h4>
              <p className="text-sm text-neutral-300 opacity-80 flex-grow leading-relaxed mb-6">
                {rec.description}
              </p>
              
              {rec.action && (
                <Button 
                  variant="outline" 
                  className="w-full mt-auto bg-white/[0.05] border-white/[0.1] text-white hover:bg-white/[0.1] backdrop-blur-sm group-hover:border-white/[0.2] transition-colors shadow-sm"
                >
                  {rec.action}
                  <ArrowRight className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Button>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

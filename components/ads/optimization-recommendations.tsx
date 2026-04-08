'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Zap, CheckCircle2, ArrowRight } from 'lucide-react'

interface OptimizationRecommendationsProps {
  recommendations: {
    type: string
    priority: 'critical' | 'high' | 'medium' | 'low'
    title: string
    reason: string
    action: string
    expected_impact: string
    auto_executable: boolean
  }[]
  onExecute: (index: number) => void
}

const priorityConfig = {
  critical: {
    icon: AlertTriangle,
    container: 'border-[#EF4444]/30 bg-[#EF4444]/5',
    badge: 'bg-[#EF4444]/20 text-[#EF4444] border hover:bg-[#EF4444]/20 border-[#EF4444]/30',
    textColor: 'text-[#EF4444]',
  },
  high: {
    icon: Zap,
    container: 'border-[#F97316]/30 bg-[#F97316]/5',
    badge: 'bg-[#F97316]/20 text-[#F97316] border hover:bg-[#F97316]/20 border-[#F97316]/30',
    textColor: 'text-[#F97316]',
  },
  medium: {
    icon: Zap,
    container: 'border-[#F59E0B]/30 bg-[#F59E0B]/5',
    badge: 'bg-[#F59E0B]/20 text-[#F59E0B] border hover:bg-[#F59E0B]/20 border-[#F59E0B]/30',
    textColor: 'text-[#F59E0B]',
  },
  low: {
    icon: CheckCircle2,
    container: 'border-[#3B82F6]/30 bg-[#3B82F6]/5',
    badge: 'bg-[#3B82F6]/20 text-[#3B82F6] border hover:bg-[#3B82F6]/20 border-[#3B82F6]/30',
    textColor: 'text-[#3B82F6]',
  },
}

export function OptimizationRecommendations({ 
  recommendations, 
  onExecute 
}: OptimizationRecommendationsProps) {
  if (recommendations.length === 0) {
    return (
      <div className="bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl overflow-hidden text-center p-8">
        <CheckCircle2 className="w-10 h-10 text-[#10B981] mx-auto mb-4" />
        <h3 className="font-semibold text-white mb-2">All campaigns optimized</h3>
        <p className="text-sm text-[#A1A1AA]">
          No immediate actions needed. AI is monitoring 24/7.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden shadow-sm relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-50" />
      <div className="p-5 border-b border-[#27272A] bg-[#0A0A0A]">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#F59E0B]" />
          AI Recommendations ({recommendations.length})
        </h3>
      </div>
      
      <div className="p-5 space-y-4">
        {recommendations.map((rec, idx) => {
          const config = priorityConfig[rec.priority]
          const Icon = config.icon

          return (
            <div key={idx} className={`${config.container} border rounded-xl overflow-hidden shadow-sm`}>
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg bg-white/[0.05] border border-white/[0.05] flex-shrink-0 mt-0.5`}>
                    <Icon className={`w-4 h-4 ${config.textColor}`} />
                  </div>
                  <div className="flex-1 w-full min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                      <h4 className="font-semibold text-white text-sm truncate">{rec.title}</h4>
                      <div className="flex gap-2">
                        <Badge className={`${config.badge} text-[9px] uppercase font-bold tracking-widest`}>
                          {rec.priority}
                        </Badge>
                        {rec.auto_executable && (
                          <Badge variant="outline" className="border-[#10B981]/30 text-[#10B981] bg-[#10B981]/10 text-[9px] uppercase font-bold tracking-widest">
                            Auto
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-[#A1A1AA] mb-4 leading-relaxed">{rec.reason}</p>
                    
                    <div className="bg-[#0A0A0A] border border-[#27272A] p-4 rounded-lg mb-4">
                      <div className="mb-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] block mb-1">Action</span>
                        <span className="text-sm text-[#E5E7EB]">{rec.action}</span>
                      </div>
                      <div className="border-t border-[#27272A] pt-2 mt-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] block mb-1">Expected Impact</span>
                        <span className="text-xs text-[#10B981] font-medium">{rec.expected_impact}</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => onExecute(idx)}
                      className="bg-white text-black hover:bg-[#E5E7EB] h-8 text-xs font-semibold px-4 transition-colors"
                    >
                      {rec.auto_executable ? 'Execute Now' : 'Review & Apply'}
                      <ArrowRight className="w-3.5 h-3.5 ml-2 text-[#71717A]" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

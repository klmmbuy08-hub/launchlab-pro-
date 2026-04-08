'use client'

import { Sparkles } from 'lucide-react'

interface AIInsightsWidgetProps {
  insights: string[]
}

export function AIInsightsWidget({ insights }: AIInsightsWidgetProps) {
  return (
    <div className="bg-[#141414] border border-[#8B5CF6]/30 rounded-xl overflow-hidden shadow-sm relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B5CF6]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
      <div className="p-5 border-b border-[#8B5CF6]/20 bg-[#8B5CF6]/5">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
          AI Insights for Today
        </h3>
      </div>
      <div className="p-6">
        <ul className="space-y-4">
          {insights.map((insight, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="p-1.5 rounded-md bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex-shrink-0 mt-0.5">
                <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
              </div>
              <span className="text-sm text-[#E5E7EB] leading-relaxed font-medium">{insight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

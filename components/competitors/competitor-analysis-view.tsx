'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Target, 
  Lightbulb, 
  TrendingUp, 
  TrendingDown,
  Download,
  Sparkles
} from 'lucide-react'

interface CompetitorAnalysisViewProps {
  analysis: {
    content_strategy: {
      primary_themes: string[]
      posting_frequency: number
      best_performing_formats: string[]
      engagement_tactics: string[]
    }
    positioning: {
      unique_angle: string
      target_audience: string
      value_proposition: string
    }
    gaps_and_opportunities: {
      topic: string
      opportunity: string
      difficulty: 'easy' | 'medium' | 'hard'
      expected_impact: string
    }[]
    strengths: string[]
    weaknesses: string[]
    recommendations: string[]
  }
}

const difficultyColors = {
  easy: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
  medium: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
  hard: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20',
}

export function CompetitorAnalysisView({ analysis }: CompetitorAnalysisViewProps) {
  return (
    <div className="space-y-6">
      {/* Positioning */}
      <div className="bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#27272A] bg-gradient-to-b from-white/[0.02] to-transparent">
          <h3 className="text-base font-semibold flex items-center gap-2 text-white">
            <Target className="w-4 h-4 text-[#8B5CF6]" />
            Their Positioning
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] mb-1.5">Unique Angle:</p>
            <p className="text-[#E5E7EB] font-medium text-sm leading-relaxed">{analysis.positioning.unique_angle}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] mb-1.5">Target Audience:</p>
            <p className="text-[#E5E7EB] text-sm leading-relaxed">{analysis.positioning.target_audience}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] mb-1.5">Value Proposition:</p>
            <p className="text-[#E5E7EB] text-sm leading-relaxed">{analysis.positioning.value_proposition}</p>
          </div>
        </div>
      </div>

      {/* Content Strategy */}
      <div className="bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#27272A] bg-gradient-to-b from-white/[0.02] to-transparent">
          <h3 className="text-base font-semibold text-white">Content Strategy</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] mb-3">Primary Themes:</p>
            <div className="flex flex-wrap gap-2">
              {analysis.content_strategy.primary_themes.map((theme, idx) => (
                <Badge key={idx} className="border-[#3F3F46] text-[#A1A1AA] bg-[#1F1F1F]">
                  {theme}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] mb-3">Best Formats:</p>
            <div className="flex flex-wrap gap-2">
              {analysis.content_strategy.best_performing_formats.map((format, idx) => (
                <Badge key={idx} className="border-[#3B82F6]/30 text-[#3B82F6] bg-[#3B82F6]/5">
                  {format}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] mb-3">Engagement Tactics:</p>
            <ul className="space-y-2">
              {analysis.content_strategy.engagement_tactics.map((tactic, idx) => (
                <li key={idx} className="text-sm text-[#A1A1AA] flex items-start gap-2.5">
                  <span className="text-[#3B82F6] font-bold">•</span>
                  <span>{tactic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Gaps & Opportunities */}
      <div className="bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#27272A] bg-gradient-to-b from-white/[0.02] to-transparent flex items-center justify-between">
          <h3 className="text-base font-semibold flex items-center gap-2 text-white">
            <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
            Gaps & Opportunities
          </h3>
          <Button size="sm" className="h-8 border-[#27272A] bg-[#0A0A0A] hover:bg-[#1A1A1A] text-[#A1A1AA]">
            <Download className="w-3.5 h-3.5 mr-2" />
            <span className="text-xs">Export</span>
          </Button>
        </div>
        <div className="p-6 space-y-4">
          {analysis.gaps_and_opportunities.map((gap, idx) => (
            <div key={idx} className="bg-[#0A0A0A] border border-[#27272A] rounded-lg p-5">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-white text-sm">{gap.topic}</h4>
                <Badge className={`${difficultyColors[gap.difficulty]} uppercase text-[9px] tracking-widest font-bold`}>
                  {gap.difficulty}
                </Badge>
              </div>
              <p className="text-sm text-[#A1A1AA] mb-3 leading-relaxed">{gap.opportunity}</p>
              <div className="bg-[#10B981]/10 px-3 py-2 rounded border border-[#10B981]/20 inline-flex">
                <p className="text-xs text-[#10B981] font-medium">
                  Impact: {gap.expected_impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-[#27272A] bg-gradient-to-b from-white/[0.02] to-transparent">
            <h3 className="text-base font-semibold flex items-center gap-2 text-white">
              <TrendingUp className="w-4 h-4 text-[#10B981]" />
              Strengths
            </h3>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {analysis.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#A1A1AA]">
                  <span className="text-[#10B981] mt-0.5">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Weaknesses */}
        <div className="bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-[#27272A] bg-gradient-to-b from-white/[0.02] to-transparent">
            <h3 className="text-base font-semibold flex items-center gap-2 text-white">
              <TrendingDown className="w-4 h-4 text-[#EF4444]" />
              Weaknesses
            </h3>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {analysis.weaknesses.map((weakness, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#A1A1AA]">
                  <span className="text-[#EF4444] mt-0.5">✗</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden shadow-sm relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#10B981] to-transparent opacity-30" />
        <div className="p-5 border-b border-[#27272A] bg-gradient-to-b from-white/[0.02] to-transparent">
          <h3 className="text-base font-semibold flex items-center gap-2 text-white">
            <Sparkles className="w-4 h-4 text-[#10B981]" />
            How to Compete
          </h3>
        </div>
        <div className="p-6">
          <ul className="space-y-4">
            {analysis.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                <p className="text-sm text-[#E5E7EB] leading-relaxed pt-0.5">{rec}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

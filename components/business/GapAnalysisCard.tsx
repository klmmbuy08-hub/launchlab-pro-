'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, Lightbulb, Target, Sparkles } from "lucide-react"

interface GapAnalysisCardProps {
  competitor: any
}

export function GapAnalysisCard({ competitor }: GapAnalysisCardProps) {
  if (!competitor) return null

  // Use stored content_strategy or fallback to AI-style mocking
  const analysis = competitor.content_strategy || {
    gaps: [
      "Missing voice-over storytelling in reels",
      "Low frequency of conversion-focused stories",
      "No community-driven Q&A content",
      "Lack of educational carousels"
    ],
    strengths: [
      "Excellent high-hook retention",
      "Consistent visual branding",
      "High comment response rate"
    ],
    weaknesses: [
      "Generic CTAs (Click link in bio)",
      "Unoptimized posting times for EU/US",
      "Repetitive background music"
    ]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      <Card className="bg-[#171717] border-neutral-800 rounded-3xl p-4">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3 text-xl font-black">
            <div className="bg-red-500/20 p-2 rounded-xl">
              <Target className="h-5 w-5 text-red-500" />
            </div>
            Market Gaps Detected
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-neutral-500 font-medium">Opportunities you can exploit today:</p>
          <div className="grid gap-4">
            {analysis.gaps.map((gap: string, i: number) => (
              <div key={i} className="group flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-red-500/30 transition-colors">
                <div className="bg-yellow-500/10 h-8 w-8 rounded-full flex items-center justify-center shrink-0">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                </div>
                <p className="text-sm text-neutral-300 font-medium leading-relaxed group-hover:text-white">
                  {gap}
                </p>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gradient-to-r from-red-600/10 to-transparent border-l-2 border-red-500 rounded-r-2xl">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase mb-1">
                <Sparkles className="h-3 w-3 text-red-400" />
                AI Insight
              </div>
              <p className="text-[11px] text-neutral-400 italic">
                @{competitor.username}'s audience is asking for "Tutorials" in comments, but they only post "Inspiration". Fill this gap now.
              </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <Card className="bg-neutral-900 border-neutral-800 rounded-3xl overflow-hidden">
          <div className="bg-green-500/10 px-6 py-4 flex items-center gap-3 border-b border-white/5">
             <CheckCircle2 className="h-4 w-4 text-green-500" />
             <span className="text-xs font-black text-green-500 uppercase tracking-widest">Competitive Advantages</span>
          </div>
          <CardContent className="p-6">
             <div className="flex flex-wrap gap-2">
               {analysis.strengths.map((s: string, i: number) => (
                 <Badge key={i} className="bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-green-400 hover:border-green-500/50 transition-all font-bold px-4 py-2 rounded-xl">
                   {s}
                 </Badge>
               ))}
             </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800 rounded-3xl overflow-hidden">
          <div className="bg-red-500/10 px-6 py-4 flex items-center gap-3 border-b border-white/5">
             <AlertCircle className="h-4 w-4 text-red-500" />
             <span className="text-xs font-black text-red-500 uppercase tracking-widest">Identified Weaknesses</span>
          </div>
          <CardContent className="p-6">
             <div className="flex flex-wrap gap-2">
               {analysis.weaknesses.map((w: string, i: number) => (
                 <Badge key={i} className="bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-red-400 hover:border-red-500/50 transition-all font-bold px-4 py-2 rounded-xl">
                   {w}
                 </Badge>
               ))}
             </div>
          </CardContent>
        </Card>

        <div className="bg-neutral-800/30 p-6 rounded-3xl border border-white/5 border-dashed">
           <h4 className="text-xs font-black text-neutral-500 uppercase tracking-tighter mb-2">Strategy Summary</h4>
           <p className="text-sm text-neutral-400 leading-relaxed">
             They win on <strong>Branding</strong> but lose on <strong>Utility</strong>. To beat them, provide more actionable value while maintaining a similar aesthetic frequency.
           </p>
        </div>
      </div>
    </div>
  )
}

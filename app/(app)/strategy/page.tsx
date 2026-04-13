'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  BrainCircuit, 
  TrendingUp, 
  CheckCircle2, 
  Flag,
  Target,
  Zap,
  UserCircle2,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'

interface AgentStrategy {
  agent: 'CEO' | 'CMO' | 'SALES'
  role: string
  insight: string
  action_items: string[]
  metrics_to_watch: string[]
}

interface StrategyData {
  launch_title: string
  summary: string
  phase: string
  agents: AgentStrategy[]
}

export default function StrategyPage() {
  const [strategy, setStrategy] = useState<StrategyData | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/strategy/generate', { method: 'POST' })
      const result = await response.json()
      if (result.success) {
        setStrategy(result.data)
      }
    } catch (error) {
      console.error('Error generating strategy:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-blue-400" />
            Launch War Room
          </h1>
          <p className="text-neutral-400 mt-2 max-w-xl">
            Our AI board of directors analyzes your business niche and goals to create a high-impact execution plan.
          </p>
        </div>
        <Button 
          size="lg" 
          onClick={handleGenerate} 
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold h-14 px-8 shadow-xl shadow-blue-500/20"
        >
          {loading ? (
            <Sparkles className="w-5 h-5 mr-3 animate-spin" />
          ) : (
            <Zap className="w-5 h-5 mr-3" />
          )}
          {loading ? 'Brainstorming...' : 'Generate New Strategy'}
        </Button>
      </div>

      {!strategy ? (
        <Card className="bg-neutral-900/50 border-neutral-800 border-dashed py-20">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-10 h-10 text-neutral-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Ready to Launch?</h3>
            <p className="text-neutral-400 max-w-sm mb-8">
              Click the button above to assemble your AI board and receive your first battle plan.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Strategy Heading */}
          <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <Badge className="bg-blue-600/10 text-blue-400 py-1 px-4 border-blue-600/20 uppercase tracking-widest text-[10px] font-bold">
                Phase: {strategy.phase}
              </Badge>
            </div>
            <h2 className="text-4xl font-black text-white mb-4">{strategy.launch_title}</h2>
            <p className="text-xl text-neutral-300 max-w-3xl leading-relaxed">
              {strategy.summary}
            </p>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {strategy.agents.map((agent, index) => (
              <Card key={index} className="bg-neutral-950 border-neutral-900 group hover:border-blue-500/30 transition-all duration-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-2xl ${
                      agent.agent === 'CEO' ? 'bg-blue-600/20 text-blue-400' :
                      agent.agent === 'CMO' ? 'bg-purple-600/20 text-purple-400' :
                      'bg-green-600/20 text-green-400'
                    }`}>
                      <UserCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{agent.agent} Agent</CardTitle>
                      <CardDescription className="text-xs font-bold uppercase tracking-wider">{agent.role}</CardDescription>
                    </div>
                  </div>
                  <div className="p-4 bg-neutral-900/50 rounded-xl border border-neutral-800/50 group-hover:bg-neutral-900/80 transition-colors">
                    <p className="text-sm text-neutral-200 italic leading-relaxed">
                      "{agent.insight}"
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      Tactical Action Items
                    </h4>
                    <ul className="space-y-3">
                      {agent.action_items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 bg-neutral-900/30 p-3 rounded-lg border border-transparent hover:border-neutral-800 transition-colors">
                          <ChevronRight className="w-3 h-3 text-neutral-600 mt-1 shrink-0" />
                          <span className="text-sm text-neutral-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-neutral-900">
                    <h4 className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Target className="w-3 h-3" />
                      KPIs to Watch
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.metrics_to_watch.map((metric, i) => (
                        <Badge key={i} variant="secondary" className="bg-neutral-900 text-neutral-400 text-[10px]">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Master Recommendation */}
          <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/20 overflow-hidden">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-600/40 shrink-0 rotate-3">
                <Flag className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2 underline decoration-blue-500/50 decoration-4 underline-offset-8">
                  The Master Execution Path
                </h3>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  Based on the consensus between your AI directors, you are ready to move from planning to high-tempo execution. The next major milestone is hit your first 20% of the $${strategy.summary.includes('$') ? 'goal' : 'monthly revenue goal'}.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-white text-black hover:bg-neutral-200 font-bold px-6">
                    <Zap className="w-4 h-4 mr-2" />
                    Approve & Push to Calendar
                  </Button>
                  <Button variant="outline" className="border-neutral-700 text-neutral-300">
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Export Brief for Team
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

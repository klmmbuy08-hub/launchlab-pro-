'use client'

import { Sparkles, BrainCircuit, ShieldCheck, Zap } from 'lucide-react'

interface StepProps {
  data: any
}

export function Step4Finalizing({ data }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-white mb-2">Almost There!</h2>
        <p className="text-neutral-400">Our AI is preparing your personalized dashboard.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
          <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">Initializing AI Agents</p>
            <p className="text-xs text-neutral-500">Configuring CEO, CMO and Sales bots for {data.niche}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
          <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">Building Strategy Funnel</p>
            <p className="text-xs text-neutral-500">Optimizing for ${data.monthly_revenue_goal}/mo goal</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
          <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">Securing Infrastructure</p>
            <p className="text-xs text-neutral-500">Your data is protected by enterprise-grade encryption</p>
          </div>
        </div>
      </div>

      <div className="mt-10 py-8 flex flex-col items-center justify-center animate-pulse">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <p className="text-blue-400 font-bold uppercase tracking-widest text-[10px]">Preparing for engine start...</p>
      </div>
    </div>
  )
}

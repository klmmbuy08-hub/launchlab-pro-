'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Target, Users, TrendingUp } from 'lucide-react'

interface StepProps {
  data: any
  updateData: (data: any) => void
}

export function Step3Goals({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Define Your Victory</h2>
        <p className="text-neutral-400">Set clear monthly goals so we can track your progress.</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="font-bold text-white">Monthly Revenue Goal</p>
              <p className="text-xs text-neutral-500">How much do you want to invoice per month?</p>
            </div>
          </div>
          <div className="relative mt-2">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-bold">$</div>
            <Input 
              type="number"
              placeholder="15000" 
              value={data.monthly_revenue_goal || ''}
              onChange={(e) => updateData({ monthly_revenue_goal: parseFloat(e.target.value) })}
              className="bg-black border-neutral-800 focus:border-green-500 h-14 pl-8 text-lg font-bold"
            />
          </div>
        </div>

        <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="font-bold text-white">Monthly Leads Goal</p>
              <p className="text-xs text-neutral-500">How many potential clients do you need?</p>
            </div>
          </div>
          <Input 
            type="number"
            placeholder="300" 
            value={data.monthly_leads_goal || ''}
            onChange={(e) => updateData({ monthly_leads_goal: parseFloat(e.target.value) })}
            className="bg-black border-neutral-800 focus:border-blue-500 h-14 text-lg font-bold"
          />
        </div>

        <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl">
          <p className="text-[11px] text-yellow-500/70 text-center uppercase tracking-widest font-bold">
            💡 Pro Tip: Be realistic yet ambitious. You can always adjust these later.
          </p>
        </div>
      </div>
    </div>
  )
}

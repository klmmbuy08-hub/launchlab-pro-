'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { OnboardingData } from '@/lib/types/v2/onboarding'
import { DollarSign, Users } from 'lucide-react'

interface Step3GoalsProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
}

export function Step3Goals({ data, updateData }: Step3GoalsProps) {
  const calculateLeadsNeeded = () => {
    if (!data.monthlyRevenueGoal || !data.avgPrice) return 0
    const conversionRate = 0.08 // 8% default
    const salesNeeded = Math.ceil(data.monthlyRevenueGoal / data.avgPrice)
    return Math.ceil(salesNeeded / conversionRate)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Set Your Goals</h2>
        <p className="text-neutral-400">
          We'll help you track progress and give you insights to hit these targets
        </p>
      </div>

      {/* Revenue Goal */}
      <div>
        <Label htmlFor="revenueGoal" className="text-lg font-semibold text-white mb-3 block">
          Monthly Revenue Goal
        </Label>
        <div className="relative">
          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <Input
            id="revenueGoal"
            type="number"
            placeholder="10000"
            value={data.monthlyRevenueGoal || ''}
            onChange={(e) => updateData({ monthlyRevenueGoal: Number(e.target.value) })}
            className="bg-neutral-900 border-neutral-800 pl-12 h-14 text-lg"
          />
        </div>
        <p className="text-sm text-neutral-500 mt-2">
          How much revenue do you want to generate per month?
        </p>
      </div>

      {/* Leads Goal */}
      <div>
        <Label htmlFor="leadsGoal" className="text-lg font-semibold text-white mb-3 block">
          Monthly Leads Goal
        </Label>
        <div className="relative">
          <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <Input
            id="leadsGoal"
            type="number"
            placeholder="100"
            value={data.monthlyLeadsGoal || ''}
            onChange={(e) => updateData({ monthlyLeadsGoal: Number(e.target.value) })}
            className="bg-neutral-900 border-neutral-800 pl-12 h-14 text-lg"
          />
        </div>
        <p className="text-sm text-neutral-500 mt-2">
          How many qualified leads do you want per month?
        </p>
      </div>

      {/* Calculation Card */}
      {data.monthlyRevenueGoal && data.avgPrice && (
        <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-300 mb-4">📊 Quick Math:</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-neutral-400">Sales Needed</p>
                <p className="text-2xl font-bold text-white">
                  {Math.ceil(data.monthlyRevenueGoal / data.avgPrice)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Leads Needed*</p>
                <p className="text-2xl font-bold text-white">
                  {calculateLeadsNeeded()}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Conv. Rate</p>
                <p className="text-2xl font-bold text-white">8%</p>
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-4">
              *Assuming 8% conversion rate (industry average)
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RevenueOverview } from '@/components/business/revenue-overview'
import { PipelineFunnel } from '@/components/business/pipeline-funnel'
import { RevenueSources } from '@/components/business/revenue-sources'
import { GoalsTracker } from '@/components/business/goals-tracker'
import { ActionPlan } from '@/components/business/action-plan'
import { RefreshCw, Download, TrendingUp } from 'lucide-react'

export default function BusinessPage() {
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - En producción vendría de la API
  const businessData = {
    revenue: {
      cash_collected: 8450,
      revenue_growth: 23.5,
      revenue_forecast: 12800,
      monthly_goal: 15000,
      on_track: false,
    },
    pipeline: {
      total_leads: 347,
      in_conversation: 142,
      converted: 29,
      conversion_rate: 8.4,
    },
    sources: {
      organic: 6200,
      paid_ads: 1800,
      referrals: 450,
      other: 0,
    },
    goals: {
      monthly_revenue: 15000,
      monthly_leads: 400,
      conversion_rate: 10,
    },
    current: {
      revenue: 8450,
      leads: 347,
      conversions: 29,
    },
    action_plan: [
      {
        priority: 'critical' as const,
        title: 'Increase lead generation by 15%',
        description:
          'You need 53 more leads this month to hit your goal. Focus on high-performing content (reels + carousels).',
        expected_impact: '+$2,200 revenue',
        action_label: 'Generate Content Ideas',
      },
      {
        priority: 'high' as const,
        title: 'Improve conversion rate to 10%',
        description:
          'Your current 8.4% is below your goal. Better qualify leads and improve follow-up speed.',
        expected_impact: '+6 conversions (+$3,600)',
        action_label: 'View Sales Scripts',
      },
      {
        priority: 'medium' as const,
        title: 'Re-engage 15 inactive leads',
        description:
          'You have 15 qualified leads who went cold. A re-engagement campaign could recover $1,500-2,000.',
        expected_impact: '+$1,800 revenue',
        action_label: 'Create Re-engagement Campaign',
      },
    ],
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const handleUpdateGoals = (newGoals: any) => {
    console.log('Updating goals:', newGoals)
    // TODO: Call API to update goals
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Business Dashboard</h1>
          <p className="text-neutral-400">
            Complete overview of your business metrics and financial health
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-neutral-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* AI Insights Banner */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-purple-300 mb-2">💰 Financial Snapshot:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-200">
                <div>
                  <p>
                    • You're <strong>$6,550 behind</strong> your monthly goal with{' '}
                    <strong>15 days</strong> remaining
                  </p>
                  <p>
                    • At current pace, you'll end the month at <strong>$12,800</strong> (85% of
                    goal)
                  </p>
                </div>
                <div>
                  <p>
                    • Your conversion rate is <strong>8.4%</strong> - improving to 10% would add{' '}
                    <strong>+6 sales</strong>
                  </p>
                  <p>
                    • Need <strong>$437/day</strong> to hit goal (currently at <strong>$380/day</strong>)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Overview */}
      <RevenueOverview data={businessData.revenue} />

      {/* Pipeline & Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PipelineFunnel data={businessData.pipeline} />
        <RevenueSources data={businessData.sources} />
      </div>

      {/* Goals & Action Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GoalsTracker
          goals={businessData.goals}
          current={businessData.current}
          onUpdateGoals={handleUpdateGoals}
        />
        <ActionPlan recommendations={businessData.action_plan} />
      </div>

      {/* Historical Trend */}
      <Card className="bg-neutral-900/50 border-neutral-800">
        <CardContent className="p-6">
          <h3 className="font-semibold text-white mb-4">Revenue Trend (Last 30 Days)</h3>

          {/* Simple line chart visualization */}
          <div className="h-64 flex items-end gap-2">
            {Array.from({ length: 30 }, (_, i) => {
              const height = Math.random() * 100 + 20
              return (
                <div key={i} className="flex-1 flex flex-col justify-end">
                  <div
                    className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t transition-all hover:opacity-80 cursor-pointer"
                    style={{ height: `${height}%` }}
                    title={`Day ${i + 1}: $${Math.round(height * 10)}`}
                  />
                </div>
              )
            })}
          </div>

          <div className="flex justify-between mt-4 text-xs text-neutral-500">
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

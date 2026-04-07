'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Target } from 'lucide-react'

interface ForecastCardProps {
  current: {
    revenue: number
    leads: number
    conversions: number
  }
  forecast: {
    projected_revenue: number
    projected_leads: number
    projected_conversions: number
    confidence: number
  }
  goal: {
    revenue: number
    leads: number
  }
}

export function ForecastCard({ current, forecast, goal }: ForecastCardProps) {
  const revenueProgress = (current.revenue / goal.revenue) * 100
  const leadsProgress = (current.leads / goal.leads) * 100

  return (
    <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          End of Month Forecast
        </CardTitle>
        <p className="text-sm text-neutral-400">
          Based on current trajectory • {forecast.confidence}% confidence
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-sm text-neutral-400">Projected Revenue</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-white">
                ${forecast.projected_revenue.toLocaleString()}
              </span>
              <span className="text-sm text-neutral-500 ml-2">
                / ${goal.revenue.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: `${Math.min(revenueProgress, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-neutral-500">
              Current: ${current.revenue.toLocaleString()}
            </span>
            <span
              className={`text-xs font-medium ${
                revenueProgress >= 100
                  ? 'text-green-400'
                  : revenueProgress >= 80
                  ? 'text-yellow-400'
                  : 'text-red-400'
              }`}
            >
              {revenueProgress.toFixed(0)}% of goal
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-sm text-neutral-400">Projected Leads</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-white">
                {forecast.projected_leads}
              </span>
              <span className="text-sm text-neutral-500 ml-2">
                / {goal.leads}
              </span>
            </div>
          </div>
          <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              style={{ width: `${Math.min(leadsProgress, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-neutral-500">
              Current: {current.leads}
            </span>
            <span
              className={`text-xs font-medium ${
                leadsProgress >= 100
                  ? 'text-green-400'
                  : leadsProgress >= 80
                  ? 'text-yellow-400'
                  : 'text-red-400'
              }`}
            >
              {leadsProgress.toFixed(0)}% of goal
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-700">
          <p className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-orange-400" />
            To hit your goal, you need:
          </p>
          <div className="space-y-1 text-sm">
            <p className="text-neutral-300">
              • <strong>${Math.max(0, goal.revenue - current.revenue).toLocaleString()}</strong> more revenue
            </p>
            <p className="text-neutral-300">
              • <strong>{Math.max(0, goal.leads - current.leads)}</strong> more leads
            </p>
            <p className="text-neutral-300">
              • ~<strong>{Math.ceil(Math.max(0, goal.leads - current.leads) / (30 - new Date().getDate()))}</strong> leads/day
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

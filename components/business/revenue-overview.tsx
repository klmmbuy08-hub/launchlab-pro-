'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, TrendingUp, Target, Calendar } from 'lucide-react'

interface RevenueOverviewProps {
  data: {
    cash_collected: number
    revenue_growth: number
    revenue_forecast: number
    monthly_goal: number
    on_track: boolean
  }
}

export function RevenueOverview({ data }: RevenueOverviewProps) {
  const goalProgress = (data.cash_collected / data.monthly_goal) * 100
  const forecastProgress = (data.revenue_forecast / data.monthly_goal) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Cash Collected */}
      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-green-300 mb-1">Cash Collected</p>
              <h3 className="text-3xl font-bold text-white">
                ${data.cash_collected.toLocaleString()}
              </h3>
              <p className="text-xs text-green-200 mt-1">This month</p>
            </div>
            <div className="p-3 rounded-lg bg-green-500/20">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                data.revenue_growth >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              <span>{data.revenue_growth >= 0 ? '↑' : '↓'}</span>
              <span>{Math.abs(data.revenue_growth).toFixed(1)}%</span>
            </div>
            <span className="text-xs text-neutral-400">vs last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Forecast */}
      <Card className="bg-neutral-900/50 border-neutral-800">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-neutral-400 mb-1">Projected End of Month</p>
              <h3 className="text-3xl font-bold text-white">
                ${data.revenue_forecast.toLocaleString()}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">Based on current trend</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-medium ${
                forecastProgress >= 100 ? 'text-green-400' : 'text-yellow-400'
              }`}
            >
              {forecastProgress.toFixed(0)}% of goal
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Goal */}
      <Card className="bg-neutral-900/50 border-neutral-800">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-neutral-400 mb-1">Monthly Goal</p>
              <h3 className="text-3xl font-bold text-white">
                ${data.monthly_goal.toLocaleString()}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">Target revenue</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/10">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1">
            <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  goalProgress >= 100 ? 'bg-green-500' : 'bg-purple-500'
                }`}
                style={{ width: `${Math.min(100, goalProgress)}%` }}
              />
            </div>
            <p className="text-xs text-neutral-500">
              {goalProgress.toFixed(0)}% complete
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Days Remaining */}
      <Card
        className={`border ${
          data.on_track
            ? 'bg-green-500/10 border-green-500/30'
            : 'bg-yellow-500/10 border-yellow-500/30'
        }`}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p
                className={`text-sm mb-1 ${
                  data.on_track ? 'text-green-300' : 'text-yellow-300'
                }`}
              >
                {data.on_track ? 'On Track!' : 'Behind Target'}
              </p>
              <h3 className="text-3xl font-bold text-white">
                {new Date(
                  new Date().getFullYear(),
                  new Date().getMonth() + 1,
                  0
                ).getDate() - new Date().getDate()}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">Days remaining</p>
            </div>
            <div
              className={`p-3 rounded-lg ${
                data.on_track ? 'bg-green-500/20' : 'bg-yellow-500/20'
              }`}
            >
              <Calendar
                className={`w-6 h-6 ${
                  data.on_track ? 'text-green-400' : 'text-yellow-400'
                }`}
              />
            </div>
          </div>
          <p
            className={`text-sm ${
              data.on_track ? 'text-green-300' : 'text-yellow-300'
            }`}
          >
            {data.on_track
              ? '✓ Projected to hit goal'
              : `Need $${(data.monthly_goal - data.revenue_forecast).toLocaleString()} more`}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

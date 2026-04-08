'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, DollarSign, Users, FileText, Target } from 'lucide-react'

interface MetricsDashboardProps {
  metrics: {
    revenue: { current: number; previous: number; change: number }
    leads: { current: number; previous: number; change: number }
    conversions: { current: number; previous: number; change: number }
    engagement: { current: number; previous: number; change: number }
    followers: { current: number; previous: number; change: number }
    content_pieces: { current: number; previous: number; change: number }
  }
  period: string
}

export function MetricsDashboard({ metrics, period }: MetricsDashboardProps) {
  const metricCards = [
    {
      label: 'Revenue',
      icon: DollarSign,
      current: `$${metrics.revenue.current.toLocaleString()}`,
      change: metrics.revenue.change,
      color: 'blue',
    },
    {
      label: 'Leads Generated',
      icon: Users,
      current: metrics.leads.current.toString(),
      change: metrics.leads.change,
      color: 'green',
    },
    {
      label: 'Conversions',
      icon: Target,
      current: metrics.conversions.current.toString(),
      change: metrics.conversions.change,
      color: 'purple',
    },
    {
      label: 'Avg Engagement',
      icon: TrendingUp,
      current: `${metrics.engagement.current.toFixed(1)}%`,
      change: metrics.engagement.change,
      color: 'orange',
    },
    {
      label: 'Followers',
      icon: Users,
      current: metrics.followers.current.toLocaleString(),
      change: metrics.followers.change,
      color: 'pink',
    },
    {
      label: 'Content Pieces',
      icon: FileText,
      current: metrics.content_pieces.current.toString(),
      change: metrics.content_pieces.change,
      color: 'indigo',
    },
  ]

  const colorClasses: Record<string, string> = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    pink: 'from-pink-500 to-pink-600',
    indigo: 'from-indigo-500 to-indigo-600',
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Performance Overview</h3>
        <p className="text-sm text-neutral-400">{period}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((metric, idx) => {
          const Icon = metric.icon
          const isPositive = metric.change >= 0

          return (
            <Card key={idx} className="bg-neutral-900/50 border-neutral-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">{metric.label}</p>
                    <h3 className="text-3xl font-bold text-white">{metric.current}</h3>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[metric.color]}/10`}>
                    <Icon
                      className={`w-6 h-6 bg-gradient-to-br ${colorClasses[metric.color]} bg-clip-text text-transparent`}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${
                      isPositive ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{Math.abs(metric.change).toFixed(1)}%</span>
                  </div>
                  <span className="text-xs text-neutral-500">vs previous period</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

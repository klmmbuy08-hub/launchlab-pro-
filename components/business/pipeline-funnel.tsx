'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, MessageSquare, DollarSign, TrendingDown } from 'lucide-react'

interface PipelineFunnelProps {
  data: {
    total_leads: number
    in_conversation: number
    converted: number
    conversion_rate: number
  }
}

export function PipelineFunnel({ data }: PipelineFunnelProps) {
  const stages = [
    {
      name: 'Leads',
      count: data.total_leads,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      percentage: 100,
    },
    {
      name: 'In Conversation',
      count: data.in_conversation,
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600',
      percentage: (data.in_conversation / data.total_leads) * 100,
    },
    {
      name: 'Converted',
      count: data.converted,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      percentage: (data.converted / data.total_leads) * 100,
    },
  ]

  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-blue-400" />
          Sales Funnel
        </CardTitle>
        <p className="text-sm text-neutral-400">
          Where your leads are in the pipeline
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {stages.map((stage, idx) => {
          const Icon = stage.icon
          const dropoff = idx > 0 ? stages[idx - 1].count - stage.count : 0
          const dropoffRate = idx > 0 ? ((dropoff / stages[idx - 1].count) * 100).toFixed(0) : 0

          return (
            <div key={stage.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stage.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{stage.name}</p>
                    {idx > 0 && dropoff > 0 && (
                      <p className="text-xs text-red-400">
                        -{dropoff} dropped ({dropoffRate}% drop-off)
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{stage.count}</p>
                  <p className="text-xs text-neutral-500">{stage.percentage.toFixed(0)}%</p>
                </div>
              </div>

              {/* Funnel bar */}
              <div className="relative h-12 bg-neutral-800 rounded-lg overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${stage.color} transition-all flex items-center justify-center`}
                  style={{ width: `${stage.percentage}%` }}
                >
                  <span className="text-sm font-semibold text-white">{stage.count} leads</span>
                </div>
              </div>

              {/* Connector arrow */}
              {idx < stages.length - 1 && (
                <div className="flex justify-center my-2">
                  <div className="text-neutral-600">↓</div>
                </div>
              )}
            </div>
          )
        })}

        {/* Overall conversion */}
        <div className="mt-6 pt-6 border-t border-neutral-800">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-400">Overall Conversion Rate</span>
            <span
              className={`text-lg font-bold ${
                data.conversion_rate >= 10
                  ? 'text-green-400'
                  : data.conversion_rate >= 5
                  ? 'text-yellow-400'
                  : 'text-red-400'
              }`}
            >
              {data.conversion_rate.toFixed(1)}%
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            {data.conversion_rate >= 10
              ? '✓ Excellent conversion rate'
              : data.conversion_rate >= 5
              ? '⚡ Good, but can improve'
              : '⚠️ Below industry average (5-10%)'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

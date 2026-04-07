'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Filter, Users, MessageCircle, DollarSign } from 'lucide-react'

interface FunnelVisualizationProps {
  data: {
    followers: number
    leads: number
    conversations: number
    conversions: number
    drop_off_rates: {
      follower_to_lead: number
      lead_to_conversation: number
      conversation_to_conversion: number
    }
  }
}

export function FunnelVisualization({ data }: FunnelVisualizationProps) {
  const stages = [
    {
      name: 'Followers',
      value: data.followers,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      percentage: 100,
    },
    {
      name: 'Leads',
      value: data.leads,
      icon: Filter,
      color: 'from-purple-500 to-purple-600',
      percentage: (data.leads / data.followers) * 100,
      dropOff: data.drop_off_rates.follower_to_lead,
    },
    {
      name: 'Conversations',
      value: data.conversations,
      icon: MessageCircle,
      color: 'from-orange-500 to-orange-600',
      percentage: (data.conversations / data.followers) * 100,
      dropOff: data.drop_off_rates.lead_to_conversation,
    },
    {
      name: 'Conversions',
      value: data.conversions,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      percentage: (data.conversions / data.followers) * 100,
      dropOff: data.drop_off_rates.conversation_to_conversion,
    },
  ]

  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardHeader>
        <CardTitle className="text-lg">Sales Funnel</CardTitle>
        <p className="text-sm text-neutral-400">
          Where are you losing potential customers?
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {stages.map((stage, idx) => {
          const Icon = stage.icon
          return (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stage.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{stage.name}</p>
                    <p className="text-xs text-neutral-500">
                      {stage.value.toLocaleString()} ({stage.percentage.toFixed(1)}%)
                    </p>
                  </div>
                </div>
                {stage.dropOff !== undefined && (
                  <span className="text-xs text-red-400 font-medium">
                    {stage.dropOff}% drop-off
                  </span>
                )}
              </div>

              <div className="relative h-16 bg-neutral-800 rounded-lg overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${stage.color} transition-all`}
                  style={{ width: `${stage.percentage}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-white drop-shadow-lg">
                    {stage.value.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )
        })}

        <div className="mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-sm text-yellow-200">
            💡 <strong>Biggest drop-off:</strong> Focus here to improve conversions.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

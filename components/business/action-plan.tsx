'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Zap, ArrowRight } from 'lucide-react'

interface ActionPlanProps {
  recommendations: {
    priority: 'critical' | 'high' | 'medium'
    title: string
    description: string
    expected_impact: string
    action_label?: string
  }[]
}

const priorityConfig = {
  critical: {
    color: 'border-red-500/30 bg-red-500/10',
    badge: 'bg-red-500 text-white',
    icon: '🚨',
  },
  high: {
    color: 'border-orange-500/30 bg-orange-500/10',
    badge: 'bg-orange-500 text-white',
    icon: '⚡',
  },
  medium: {
    color: 'border-yellow-500/30 bg-yellow-500/10',
    badge: 'bg-yellow-500 text-black',
    icon: '💡',
  },
}

export function ActionPlan({ recommendations }: ActionPlanProps) {
  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Action Plan to Hit Your Goal
        </CardTitle>
        <p className="text-sm text-neutral-400">
          AI-powered recommendations based on your current metrics
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, idx) => {
          const config = priorityConfig[rec.priority]

          return (
            <Card key={idx} className={`${config.color} border`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{config.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-white">{rec.title}</h4>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${config.badge}`}>
                        {rec.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-300 mb-3">{rec.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-neutral-400">
                        Expected impact:{' '}
                        <span className="text-green-400 font-semibold">{rec.expected_impact}</span>
                      </p>
                      {rec.action_label && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-neutral-700"
                        >
                          {rec.action_label}
                          <ArrowRight className="w-3 h-3 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </CardContent>
    </Card>
  )
}

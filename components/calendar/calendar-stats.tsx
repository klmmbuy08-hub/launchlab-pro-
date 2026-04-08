'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, BarChart3 } from 'lucide-react'

interface CalendarStatsProps {
  stats: {
    total_entries: number
    by_type: { type: string; count: number }[]
    by_category: { category: string; count: number }[]
    avg_estimated_engagement: number
  }
}

export function CalendarStats({ stats }: CalendarStatsProps) {
  const typeColors: Record<string, string> = {
    reel: 'from-purple-500 to-purple-600',
    carousel: 'from-green-500 to-green-600',
    post: 'from-blue-500 to-blue-600',
    story: 'from-orange-500 to-orange-600',
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* By Type */}
      <Card className="bg-neutral-900/50 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-400" />
            Content Mix
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {stats.by_type.map((item) => {
            const percentage = (item.count / stats.total_entries) * 100

            return (
              <div key={item.type}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-neutral-300 capitalize">{item.type}s</span>
                  <span className="font-semibold text-white">
                    {item.count} ({percentage.toFixed(0)}%)
                  </span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${
                      typeColors[item.type] || 'from-neutral-500 to-neutral-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* By Category */}
      <Card className="bg-neutral-900/50 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-400" />
            Content Strategy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {stats.by_category.map((item) => {
            const percentage = (item.count / stats.total_entries) * 100

            return (
              <div key={item.category}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-neutral-300 capitalize">
                    {item.category.replace('_', ' ')}
                  </span>
                  <span className="font-semibold text-white">
                    {item.count} ({percentage.toFixed(0)}%)
                  </span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}

          <div className="pt-4 border-t border-neutral-800">
            <p className="text-sm text-neutral-400">
              💡 <strong>Strategy Balance:</strong>{' '}
              {(stats.by_category.find((c) => c.category === 'educational')?.count || 0) >
              stats.total_entries * 0.5
                ? 'Great! Focused on providing value first.'
                : 'Consider adding more educational content.'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

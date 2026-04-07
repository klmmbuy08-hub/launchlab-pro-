'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart } from 'lucide-react'

interface ContentBreakdownProps {
  data: {
    by_type: { type: string; count: number; percentage: number }[]
    by_category: { category: string; count: number; percentage: number }[]
  }
}

export function ContentBreakdown({ data }: ContentBreakdownProps) {
  const typeColors: Record<string, string> = {
    reel: 'from-purple-500 to-purple-600',
    carousel: 'from-green-500 to-green-600',
    post: 'from-blue-500 to-blue-600',
    story: 'from-orange-500 to-orange-600',
  }

  const categoryColors: Record<string, string> = {
    educational: 'from-blue-500 to-blue-600',
    promotional: 'from-red-500 to-red-600',
    transformation: 'from-green-500 to-green-600',
    engagement: 'from-purple-500 to-purple-600',
    behind_the_scenes: 'from-orange-500 to-orange-600',
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* By Type */}
      <Card className="bg-neutral-900/50 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-400" />
            Content by Type
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.by_type.map((item) => (
            <div key={item.type}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-neutral-300 capitalize">{item.type}</span>
                <span className="font-semibold text-white">
                  {item.count} ({item.percentage}%)
                </span>
              </div>
              <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${typeColors[item.type] || 'from-neutral-500 to-neutral-600'}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* By Category */}
      <Card className="bg-neutral-900/50 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <PieChart className="w-5 h-5 text-green-400" />
            Content by Category
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.by_category.map((item) => (
            <div key={item.category}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-neutral-300 capitalize">{item.category.replace('_', ' ')}</span>
                <span className="font-semibold text-white">
                  {item.count} ({item.percentage}%)
                </span>
              </div>
              <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${categoryColors[item.category] || 'from-neutral-500 to-neutral-600'}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

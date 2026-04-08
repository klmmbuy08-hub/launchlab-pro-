'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

interface TrendChartProps {
  title: string
  data: {
    date: string
    value: number
    label?: string
  }[]
  format?: 'currency' | 'number' | 'percentage'
}

export function TrendChart({ title, data, format = 'number' }: TrendChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value))
  const minValue = Math.min(...data.map((d) => d.value))

  const formatValue = (value: number) => {
    switch (format) {
      case 'currency':
        return `$${value.toLocaleString()}`
      case 'percentage':
        return `${value.toFixed(1)}%`
      default:
        return value.toLocaleString()
    }
  }

  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, idx) => {
            const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0

            return (
              <div key={idx}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-neutral-400">
                    {item.label ||
                      new Date(item.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                  </span>
                  <span className="font-semibold text-white">{formatValue(item.value)}</span>
                </div>
                <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <div className="mt-4 pt-4 border-t border-neutral-800 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-neutral-500">Min</p>
            <p className="text-sm font-semibold text-white">{formatValue(minValue)}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500">Max</p>
            <p className="text-sm font-semibold text-white">{formatValue(maxValue)}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500">Avg</p>
            <p className="text-sm font-semibold text-white">
              {formatValue(data.reduce((sum, d) => sum + d.value, 0) / data.length)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

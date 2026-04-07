'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

interface RevenueChartProps {
  data: {
    date: string
    amount: number
    label: string
  }[]
  total: number
  trend: number
}

export function RevenueChart({ data, total, trend }: RevenueChartProps) {
  const maxValue = Math.max(...data.map((d) => d.amount), 1)

  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Revenue Trend
            </CardTitle>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold text-white">
                ${total.toLocaleString()}
              </span>
              <span
                className={`text-sm font-medium ${
                  trend >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-end gap-1">
          {data.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end" style={{ height: '200px' }}>
                <div
                  className="w-full bg-gradient-to-t from-green-500 to-emerald-500 rounded-t hover:from-green-400 hover:to-emerald-400 transition-all cursor-pointer relative group"
                  style={{
                    height: `${(item.amount / maxValue) * 100}%`,
                    minHeight: item.amount > 0 ? '4px' : '0',
                  }}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-900 border border-neutral-700 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    ${item.amount.toLocaleString()}
                  </div>
                </div>
              </div>
              <span className="text-xs text-neutral-500 text-center">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

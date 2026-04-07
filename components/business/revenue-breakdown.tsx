'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, DollarSign } from 'lucide-react'

interface RevenueBreakdownProps {
  data: {
    source: string
    amount: number
    percentage: number
    color: string
  }[]
}

export function RevenueBreakdown({ data }: RevenueBreakdownProps) {
  const total = data.reduce((sum, item) => sum + item.amount, 0)

  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <PieChart className="w-5 h-5 text-green-400" />
          Revenue by Source
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              {data.map((item, idx) => {
                const prevPercentage = data
                  .slice(0, idx)
                  .reduce((sum, d) => sum + d.percentage, 0)

                return (
                  <circle
                    key={idx}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={item.color}
                    strokeWidth="20"
                    strokeDasharray={`${item.percentage * 2.51} 251`}
                    strokeDashoffset={-prevPercentage * 2.51}
                    className="transition-all"
                  />
                )
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-1" />
                <p className="text-sm font-bold text-white">${(total / 1000).toFixed(1)}K</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/50"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-neutral-300">{item.source}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">
                  ${item.amount.toLocaleString()}
                </p>
                <p className="text-xs text-neutral-500">{item.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

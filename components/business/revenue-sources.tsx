'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart } from 'lucide-react'

interface RevenueSourcesProps {
  data: {
    organic: number
    paid_ads: number
    referrals: number
    other: number
  }
}

export function RevenueSources({ data }: RevenueSourcesProps) {
  const total = data.organic + data.paid_ads + data.referrals + data.other

  const sources = [
    { name: 'Organic (Instagram)', value: data.organic, color: 'from-pink-500 to-purple-500' },
    { name: 'Paid Ads', value: data.paid_ads, color: 'from-blue-500 to-indigo-500' },
    { name: 'Referrals', value: data.referrals, color: 'from-green-500 to-emerald-500' },
    { name: 'Other', value: data.other, color: 'from-orange-500 to-red-500' },
  ].filter((s) => s.value > 0)

  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-green-400" />
          Revenue by Source
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sources.map((source) => {
          const percentage = (source.value / total) * 100

          return (
            <div key={source.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-300">{source.name}</span>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">
                    ${source.value.toLocaleString()}
                  </p>
                  <p className="text-xs text-neutral-500">{percentage.toFixed(0)}%</p>
                </div>
              </div>
              <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${source.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}

        {/* Insights */}
        <div className="pt-4 border-t border-neutral-800">
          <p className="text-sm text-neutral-400">
            💡 <strong>Insight:</strong>{' '}
            {data.organic > total * 0.6
              ? 'Organic is your strongest channel - keep creating value content!'
              : data.paid_ads > total * 0.5
              ? 'Paid ads driving most revenue - consider scaling budget'
              : 'Diversified revenue sources - good for stability'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

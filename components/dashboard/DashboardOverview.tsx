'use client'

import { useEffect } from 'react'
import { useBusinessMetrics } from '@/lib/hooks/v2'
import { StatsCard } from './StatsCard'
import { RevenueChart } from './RevenueChart'
import { ConversionFunnel } from './ConversionFunnel'

export function DashboardOverview() {
  const { metrics, fetchTodayMetrics } = useBusinessMetrics()

  useEffect(() => {
    fetchTodayMetrics()
  }, [fetchTodayMetrics])

  if (!metrics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Revenue Today"
          value={`$${metrics.cash_collected.toFixed(2)}`}
          change={metrics.revenue_forecast ? `+$${metrics.revenue_forecast.toFixed(2)}` : null}
          trend="up"
        />
        <StatsCard
          title="Total Leads"
          value={metrics.total_leads.toString()}
          change={metrics.qualified_leads ? `${Math.round((metrics.qualified_leads / metrics.total_leads) * 100)}% qualified` : null}
        />
        <StatsCard
          title="Conversion Rate"
          value={`${metrics.conversion_rate?.toFixed(1) || 0}%`}
          change={metrics.converted ? `${metrics.converted} closed` : null}
          trend={metrics.conversion_rate && metrics.conversion_rate > 5 ? 'up' : 'neutral'}
        />
        <StatsCard
          title="Avg LTV"
          value={`$${metrics.avg_ltv?.toFixed(0) || 0}`}
          change="Customer value"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart metric={metrics} />
        <ConversionFunnel metric={metrics} />
      </div>

      {/* Revenue Sources */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Revenue Sources</h3>
        <div className="space-y-3">
          {metrics.revenue_by_source && Object.entries(metrics.revenue_by_source).map(([source, value]) => (
            <div key={source} className="flex justify-between items-center">
              <span className="capitalize text-gray-600">{source}</span>
              <div className="flex items-center gap-2">
                <div className="w-40 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(value as number / metrics.cash_collected) * 100}%` }}
                  />
                </div>
                <span className="font-semibold min-w-20 text-right">${(value as number).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { useBusinessMetrics } from '@/lib/hooks/v2'
import { BusinessMetrics } from '@/lib/types/v2'
import { MetricCard } from './MetricCard'
import { PipelineFlow } from './PipelineFlow'
import { RevenueSourcesChart } from './RevenueSourcesChart'
import { MetricsDateRangePicker } from './MetricsDateRangePicker'

export function BusinessMetricsBoard() {
  const { metrics, metricsHistory, fetchTodayMetrics, fetchMetricsByDateRange, calculateAggregates } = useBusinessMetrics()
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  })
  const [aggregates, setAggregates] = useState<any>(null)

  useEffect(() => {
    fetchTodayMetrics()
  }, [fetchTodayMetrics])

  useEffect(() => {
    fetchMetricsByDateRange(dateRange.start, dateRange.end).then(() => {
      const agg = calculateAggregates(metricsHistory)
      setAggregates(agg)
    })
  }, [dateRange, fetchMetricsByDateRange, metricsHistory, calculateAggregates])

  const handleDateRangeChange = (start: string, end: string) => {
    setDateRange({ start, end })
  }

  return (
    <div className="space-y-6">
      {/* Header with Date Range */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Business Metrics</h2>
        <MetricsDateRangePicker onDateRangeChange={handleDateRangeChange} />
      </div>

      {/* Today's Snapshot */}
      {metrics && (
        <>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Today's Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <MetricCard
                label="Revenue Collected"
                value={`$${metrics.cash_collected.toFixed(2)}`}
                change={metrics.revenue_forecast ? `+$${metrics.revenue_forecast.toFixed(2)}` : null}
                trend="up"
              />
              <MetricCard
                label="Total Leads"
                value={metrics.total_leads.toString()}
                change={`${metrics.qualified_leads} qualified`}
              />
              <MetricCard
                label="Conversion Rate"
                value={`${metrics.conversion_rate?.toFixed(1) || 0}%`}
                change={metrics.converted ? `${metrics.converted} closed` : null}
                trend={metrics.conversion_rate && metrics.conversion_rate > 5 ? 'up' : 'neutral'}
              />
              <MetricCard
                label="Customer LTV"
                value={`$${metrics.avg_ltv?.toFixed(0) || 0}`}
                change="Avg value"
              />
            </div>
          </div>

          {/* Pipeline Flow */}
          <PipelineFlow metric={metrics} />

          {/* Aggregates - Period View */}
          {aggregates && metricsHistory.length > 0 && (
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Period Summary ({dateRange.start} to {dateRange.end})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">${aggregates.totalRevenue.toFixed(2)}</p>
                  <p className="text-xs text-gray-600 mt-1">Avg: ${(aggregates.totalRevenue / metricsHistory.length).toFixed(2)}/day</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Total Leads</p>
                  <p className="text-2xl font-bold text-blue-600">{aggregates.totalLeads}</p>
                  <p className="text-xs text-gray-600 mt-1">Avg: {Math.round(aggregates.totalLeads / metricsHistory.length)}/day</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Avg Conversion</p>
                  <p className="text-2xl font-bold text-purple-600">{aggregates.avgConversionRate.toFixed(1)}%</p>
                  <p className="text-xs text-gray-600 mt-1">{aggregates.totalConverted} closed</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Avg LTV</p>
                  <p className="text-2xl font-bold text-orange-600">${aggregates.avgLTV.toFixed(0)}</p>
                  <p className="text-xs text-gray-600 mt-1">Per customer</p>
                </div>
              </div>
            </div>
          )}

          {/* Revenue Sources */}
          <RevenueSourcesChart sources={metrics.revenue_by_source} />
        </>
      )}
    </div>
  )
}
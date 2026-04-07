'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RevenueChart } from '@/components/business/revenue-chart'
import { FunnelVisualization } from '@/components/business/funnel-visualization'
import { ForecastCard } from '@/components/business/forecast-card'
import { RevenueBreakdown } from '@/components/business/revenue-breakdown'
import { BarChart3, TrendingUp, Users, DollarSign, RefreshCw, Calendar } from 'lucide-react'

export default function BusinessPage() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d')

  // Mock data - En producción vendría de la API
  const businessData = {
    current_month: {
      cash_collected: 12500,
      total_leads: 156,
      qualified_leads: 109,
      conversions: 23,
      conversion_rate: 14.7,
      avg_deal_size: 2500,
    },
    forecast: {
      projected_revenue: 18750,
      projected_leads: 234,
      projected_conversions: 35,
      confidence: 82,
    },
    trends: {
      revenue_trend: 23,
      leads_trend: 18,
      conversion_trend: 5,
    },
    funnel: {
      followers: 12458,
      leads: 156,
      conversations: 94,
      conversions: 23,
      drop_off_rates: {
        follower_to_lead: 98.7,
        lead_to_conversation: 39.7,
        conversation_to_conversion: 75.5,
      },
    },
  }

  const revenueChartData = [
    { date: '2026-04-01', amount: 500, label: 'Apr 1' },
    { date: '2026-04-02', amount: 750, label: 'Apr 2' },
    { date: '2026-04-03', amount: 600, label: 'Apr 3' },
    { date: '2026-04-04', amount: 1200, label: 'Apr 4' },
    { date: '2026-04-05', amount: 850, label: 'Apr 5' },
    { date: '2026-04-06', amount: 1100, label: 'Apr 6' },
    { date: '2026-04-07', amount: 2500, label: 'Apr 7' },
    { date: '2026-04-08', amount: 900, label: 'Today' },
  ]

  const revenueBreakdownData = [
    { source: 'Direct Sales', amount: 5200, percentage: 42, color: '#10b981' },
    { source: 'Affiliates', amount: 3100, percentage: 25, color: '#8b5cf6' },
    { source: 'Organic', amount: 2800, percentage: 22, color: '#3b82f6' },
    { source: 'Partnerships', amount: 1400, percentage: 11, color: '#f59e0b' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Business Metrics</h1>
          <p className="text-neutral-400">
            Real-time tracking of revenue, leads, and conversions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-2 bg-neutral-800 p-1 rounded-lg">
            {(['7d', '30d', '90d'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition ${
                  period === p
                    ? 'bg-blue-600 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {p === '7d' ? '7 days' : p === '30d' ? '30 days' : '90 days'}
              </button>
            ))}
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-neutral-900/50 border-neutral-800">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-400 mb-1">Cash Collected</p>
                <h3 className="text-3xl font-bold text-white">
                  ${businessData.current_month.cash_collected.toLocaleString()}
                </h3>
                <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                  ↑ {businessData.trends.revenue_trend}% vs last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900/50 border-neutral-800">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-400 mb-1">Total Leads</p>
                <h3 className="text-3xl font-bold text-white">
                  {businessData.current_month.total_leads}
                </h3>
                <p className="text-xs text-blue-400 mt-2 flex items-center gap-1">
                  ↑ {businessData.trends.leads_trend}% vs last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900/50 border-neutral-800">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-400 mb-1">Conversions</p>
                <h3 className="text-3xl font-bold text-white">
                  {businessData.current_month.conversions}
                </h3>
                <p className="text-xs text-purple-400 mt-2">
                  {businessData.current_month.conversion_rate}% conversion rate
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900/50 border-neutral-800">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-400 mb-1">Avg Deal Size</p>
                <h3 className="text-3xl font-bold text-white">
                  ${(businessData.current_month.avg_deal_size / 1000).toFixed(1)}K
                </h3>
                <p className="text-xs text-orange-400 mt-2">Per customer</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-500/10">
                <BarChart3 className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart
            data={revenueChartData}
            total={businessData.current_month.cash_collected}
            trend={businessData.trends.revenue_trend}
          />
        </div>

        <RevenueBreakdown data={revenueBreakdownData} />
      </div>

      {/* Forecast & Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ForecastCard
          current={{
            revenue: businessData.current_month.cash_collected,
            leads: businessData.current_month.total_leads,
            conversions: businessData.current_month.conversions,
          }}
          forecast={businessData.forecast}
          goal={{
            revenue: 25000,
            leads: 300,
          }}
        />

        <FunnelVisualization data={businessData.funnel} />
      </div>

      {/* Detailed Metrics */}
      <Card className="bg-neutral-900/50 border-neutral-800">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            Detailed Metrics
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-neutral-800/50">
              <p className="text-xs text-neutral-500 mb-1">Qualified Leads</p>
              <p className="text-2xl font-bold text-white">
                {businessData.current_month.qualified_leads}
              </p>
              <p className="text-xs text-neutral-500 mt-1">70% of total</p>
            </div>

            <div className="p-4 rounded-lg bg-neutral-800/50">
              <p className="text-xs text-neutral-500 mb-1">Conv. Rate</p>
              <p className="text-2xl font-bold text-white">
                {businessData.current_month.conversion_rate}%
              </p>
              <p className="text-xs text-green-400 mt-1">↑ 2.3% growth</p>
            </div>

            <div className="p-4 rounded-lg bg-neutral-800/50">
              <p className="text-xs text-neutral-500 mb-1">Avg Conversation</p>
              <p className="text-2xl font-bold text-white">
                ${(businessData.current_month.cash_collected / businessData.current_month.conversions).toLocaleString()}
              </p>
              <p className="text-xs text-neutral-500 mt-1">Revenue per conversion</p>
            </div>

            <div className="p-4 rounded-lg bg-neutral-800/50">
              <p className="text-xs text-neutral-500 mb-1">Month Progress</p>
              <p className="text-2xl font-bold text-white">
                {Math.ceil((new Date().getDate() / 30) * 100)}%
              </p>
              <p className="text-xs text-neutral-500 mt-1">Days passed this month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

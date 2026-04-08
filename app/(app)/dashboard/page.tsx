'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { OverviewCards } from '@/components/dashboard/overview-cards'
import { QuickStats } from '@/components/dashboard/quick-stats'
import { AlertsFeed } from '@/components/dashboard/alerts-feed'
import { UpcomingTasks } from '@/components/dashboard/upcoming-tasks'
import { TopContentWidget } from '@/components/dashboard/top-content-widget'
import { RevenueTrendMini } from '@/components/dashboard/revenue-trend-mini'
import { AIInsightsWidget } from '@/components/dashboard/ai-insights-widget'
import { DashboardAggregator } from '@/lib/services/dashboard/aggregator'
import { RefreshCw, Map } from 'lucide-react'

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setIsLoading(true)
    const aggregator = new DashboardAggregator()
    const data = await aggregator.aggregateData()
    setDashboardData(data)
    setIsLoading(false)
  }

  if (isLoading || !dashboardData) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <RefreshCw className="w-6 h-6 text-[#3B82F6] animate-spin" />
        <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A]">
          Aggregating your business data...
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-12 w-full animate-in fade-in duration-700 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Welcome back! 👋
          </h1>
          <p className="text-[#A1A1AA] text-base max-w-xl">
            Here's what's happening with your business today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={loadDashboardData}
            disabled={isLoading}
            className="h-9 px-4 rounded-lg bg-white text-black hover:bg-[#E5E7EB] transition-colors shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="text-xs font-semibold">Sync Data</span>
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <OverviewCards data={dashboardData.overview} />

      {/* Quick Stats */}
      <QuickStats stats={dashboardData.quick_stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="xl:col-span-2 space-y-6">
          <AlertsFeed alerts={dashboardData.alerts} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <RevenueTrendMini data={dashboardData.revenue_trend_7d} />
             <div className="space-y-6">
               {/* Any left-column supplementary widgets could go here, for now it wraps elegantly */}
               <TopContentWidget content={dashboardData.top_content_today} />
             </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          <UpcomingTasks tasks={dashboardData.upcoming_tasks} />
          <AIInsightsWidget insights={dashboardData.ai_insights} />
        </div>
      </div>
    </div>
  )
}

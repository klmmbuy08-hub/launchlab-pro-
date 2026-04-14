'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils'
import {
  DollarSign,
  TrendingUp,
  Target,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Megaphone,
  Filter,
} from 'lucide-react'

interface BusinessStats {
  revenue: {
    total: number
    growth: number
    by_source: {
      organic: number
      paid: number
      referral: number
    }
  }
  funnel: {
    leads: number
    qualified_leads: number
    conversions: number
    conversion_rate: number
  }
  ads: {
    spend: number
    roas: number
    cpa: number
    active_campaigns: number
  }
}

export default function BusinessPage() {
  const [stats, setStats] = useState<BusinessStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBusinessStats()
  }, [])

  const fetchBusinessStats = async () => {
    try {
      const response = await fetch('/api/business/stats')
      const data = await response.json()
      if (data.success) {
        setStats(data.data)
      }
    } catch (error) {
      console.error('Error fetching business stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Business Intelligence</h1>
          <p className="text-[#6B7280] mt-1">
            Analyzing your revenue, funnel performance, and ROI
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Jan 1 - Jan 31
          </Button>
          <Button size="sm">
            Download Report
          </Button>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <Card className="bg-[#171717] border-[#262626]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#6B7280]">
              Total Revenue
            </CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <DollarSign className="w-4 h-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {formatCurrency(stats?.revenue.total || 0)}
            </div>
            <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
              <ArrowUpRight className="w-4 h-4" />
              <span>{formatPercentage(stats?.revenue.growth || 0)} from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Avg CPA */}
        <Card className="bg-[#171717] border-[#262626]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#6B7280]">
              Avg. CPA
            </CardTitle>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Target className="w-4 h-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {formatCurrency(stats?.ads.cpa || 0)}
            </div>
            <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
              <ArrowDownRight className="w-4 h-4" />
              <span>12.4% improved</span>
            </div>
          </CardContent>
        </Card>

        {/* ROAS */}
        <Card className="bg-[#171717] border-[#262626]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#6B7280]">
              Ad ROAS
            </CardTitle>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {stats?.ads.roas.toFixed(2)}x
            </div>
            <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
              <ArrowUpRight className="w-4 h-4" />
              <span>0.4x increase</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Funnel */}
        <Card className="bg-[#171717] border-[#262626]">
          <CardHeader>
            <CardTitle className="text-white">Sales Funnel</CardTitle>
            <CardDescription>Conversion efficiency from lead to sale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Leads */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#6B7280]">Total Leads</span>
                  <span className="text-white font-bold">{formatNumber(stats?.funnel.leads || 0)}</span>
                </div>
                <div className="h-4 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-full" />
                </div>
              </div>

              {/* Qualified Leads */}
              <div className="pl-6 border-l-2 border-[#262626]">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#6B7280]">Qualified Leads</span>
                  <span className="text-white font-bold">{formatNumber(stats?.funnel.qualified_leads || 0)}</span>
                </div>
                <div className="h-4 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-400 rounded-full" 
                    style={{ width: `${((stats?.funnel.qualified_leads || 0) / (stats?.funnel.leads || 1)) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-[#4B5563] mt-1 block">
                  {((stats?.funnel.qualified_leads || 0) / (stats?.funnel.leads || 1) * 100).toFixed(1)}% qualification rate
                </span>
              </div>

              {/* Conversions */}
              <div className="pl-12 border-l-2 border-[#262626]">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#6B7280]">Conversions (Sales)</span>
                  <span className="text-white font-bold">{formatNumber(stats?.funnel.conversions || 0)}</span>
                </div>
                <div className="h-4 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${((stats?.funnel.conversions || 0) / (stats?.funnel.leads || 1)) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-[#4B5563] mt-1 block font-medium text-green-400">
                  {stats?.funnel.conversion_rate.toFixed(1)}% total conversion rate
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        <Card className="bg-[#171717] border-[#262626]">
          <CardHeader>
            <CardTitle className="text-white">Revenue Sources</CardTitle>
            <CardDescription>Organic vs. Paid vs. Referrals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[240px] items-center justify-center gap-12">
              {/* Circular Chart Placeholder / Mock */}
              <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-neutral-800" strokeWidth="4" />
                  {/* Organic */}
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-blue-500" strokeWidth="4" 
                    strokeDasharray="60, 100" strokeDashoffset="25" />
                  {/* Paid */}
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-purple-500" strokeWidth="4" 
                    strokeDasharray="30, 100" strokeDashoffset="85" />
                  {/* Referral */}
                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-green-500" strokeWidth="4" 
                    strokeDasharray="10, 100" strokeDashoffset="95" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white">${(stats?.revenue.total || 0) / 1000}k</span>
                  <span className="text-[10px] text-[#6B7280]">Month</span>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <div>
                    <p className="text-xs text-[#6B7280]">Organic</p>
                    <p className="text-sm font-bold text-white">{formatCurrency(stats?.revenue.by_source.organic || 0)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  <div>
                    <p className="text-xs text-[#6B7280]">Paid Ads</p>
                    <p className="text-sm font-bold text-white">{formatCurrency(stats?.revenue.by_source.paid || 0)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <div>
                    <p className="text-xs text-[#6B7280]">Referrals</p>
                    <p className="text-sm font-bold text-white">{formatCurrency(stats?.revenue.by_source.referral || 0)}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ad Campaigns Table */}
      <Card className="bg-[#171717] border-[#262626]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">Active Ad Campaigns</CardTitle>
            <CardDescription>Performance of your Meta Ads</CardDescription>
          </div>
          <Button size="sm">
            <Megaphone className="w-4 h-4 mr-2" />
            Manage Ads
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#262626] text-xs font-medium text-[#6B7280]">
                  <th className="pb-3 pl-2">Campaign Name</th>
                  <th className="pb-3 text-center">Status</th>
                  <th className="pb-3 text-right">Spend</th>
                  <th className="pb-3 text-right">Leads</th>
                  <th className="pb-3 text-right">CPA</th>
                  <th className="pb-3 text-right pr-2">ROAS</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-[#262626]/50 hover:bg-[#1A1A1A]/30 transition-colors">
                  <td className="py-4 pl-2 font-medium text-white">Weight Loss Program - Jan</td>
                  <td className="py-4 text-center">
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-[10px] font-bold">ACTIVE</span>
                  </td>
                  <td className="py-4 text-right text-white">$750.00</td>
                  <td className="py-4 text-right text-white">38</td>
                  <td className="py-4 text-right text-white">$19.74</td>
                  <td className="py-4 text-right font-bold text-green-400 pr-2">3.2x</td>
                </tr>
                <tr className="border-b border-[#262626]/50 hover:bg-[#1A1A1A]/30 transition-colors">
                  <td className="py-4 pl-2 font-medium text-white">Lead Magnet: Guide</td>
                  <td className="py-4 text-center">
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-[10px] font-bold">ACTIVE</span>
                  </td>
                  <td className="py-4 text-right text-white">$210.00</td>
                  <td className="py-4 text-right text-white">26</td>
                  <td className="py-4 text-right text-white">$8.07</td>
                  <td className="py-4 text-right font-bold text-[#6B7280] pr-2">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

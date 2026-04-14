'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatNumber } from '@/lib/utils'
import {
  Megaphone,
  Plus,
  RefreshCw,
  TrendingUp,
  Target,
  MousePointer2,
  Eye,
  Sparkles,
  AlertCircle,
  MoreVertical,
  Play,
  Pause,
  DollarSign,
  Activity,
} from 'lucide-react'

interface Campaign {
  id: string
  campaign_name: string
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED'
  objective: string
  daily_budget: number
  spend: number
  reach: number
  clicks: number
  cpc: number
  ctr: number
  roas: number
  recommendation?: string
}

export default function AdsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [optimizing, setOptimizing] = useState<string | null>(null)

  useEffect(() => {
    fetchAds()
  }, [])

  const fetchAds = async () => {
    try {
      const response = await fetch('/api/ads')
      const data = await response.json()
      if (data.success) {
        setCampaigns(data.data.campaigns || [])
      }
    } catch (error) {
      console.error('Error fetching ads:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOptimize = async (id: string) => {
    setOptimizing(id)
    try {
      const response = await fetch(`/api/ads/optimize?id=${id}`, { method: 'POST' })
      const data = await response.json()
      if (data.success) {
        // Update campaigns with recommendation
        setCampaigns(prev => prev.map(c => 
          c.id === id ? { ...c, recommendation: data.data.recommendation } : c
        ))
      }
    } catch (error) {
      console.error('Optimization error:', error)
    } finally {
      setOptimizing(null)
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
          <h1 className="text-3xl font-bold text-white">Ads Manager</h1>
          <p className="text-[#6B7280] mt-1">
            Optimize your Meta Ads campaigns with AI Intelligence
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={fetchAds}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Meta
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Aggregate Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#171717] border-[#262626]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <DollarSign className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-[#6B7280]">Total Spend</p>
                <p className="text-xl font-bold text-white">$1,240.00</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#171717] border-[#262626]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-xl">
                <Target className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-[#6B7280]">Total Leads</p>
                <p className="text-xl font-bold text-white">64</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#171717] border-[#262626]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-[#6B7280]">Avg. ROAS</p>
                <p className="text-xl font-bold text-white">3.2x</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#171717] border-[#262626]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/10 rounded-xl">
                <Activity className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-[#6B7280]">Avg. CPC</p>
                <p className="text-xl font-bold text-white">$1.24</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Active Campaigns</h2>
        {campaigns.length === 0 ? (
          <Card className="bg-[#171717] border-[#262626] border-dashed py-12">
            <CardContent className="text-center">
              <Megaphone className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
              <p className="text-[#6B7280]">No campaigns found. Start by creating one!</p>
            </CardContent>
          </Card>
        ) : (
          campaigns.map((campaign) => (
            <Card key={campaign.id} className="bg-[#171717] border-[#262626] overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 flex flex-col lg:flex-row gap-6">
                  {/* Campaign Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{campaign.campaign_name}</h3>
                      <Badge className={campaign.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400' : 'bg-[#1A1A1A] text-[#6B7280]'}>
                        {campaign.status}
                      </Badge>
                      <Badge className="bg-neutral-900 border border-neutral-700 text-[#6B7280]">
                        {campaign.objective}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#6B7280] flex items-center gap-2">
                      Daily Budget: <span className="text-white font-medium">{formatCurrency(campaign.daily_budget)}</span>
                    </p>

                    {/* AI Recommendation Alert */}
                    {campaign.recommendation && (
                      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex gap-3">
                        <Sparkles className="w-5 h-5 text-blue-400 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">AI Optimization Tip</p>
                          <p className="text-sm text-blue-100 mt-1">{campaign.recommendation}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:border-l lg:border-[#262626] lg:pl-10">
                    <div>
                      <p className="text-[10px] text-[#4B5563] uppercase tracking-widest font-bold">Reach</p>
                      <p className="text-lg font-bold text-white mt-1">{formatNumber(campaign.reach)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#4B5563] uppercase tracking-widest font-bold">Clicks</p>
                      <p className="text-lg font-bold text-white mt-1">{formatNumber(campaign.clicks)}</p>
                      <p className="text-[10px] text-[#6B7280]">{campaign.ctr.toFixed(2)}% CTR</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#4B5563] uppercase tracking-widest font-bold">Spend</p>
                      <p className="text-lg font-bold text-white mt-1">{formatCurrency(campaign.spend)}</p>
                      <p className="text-[10px] text-[#6B7280]">${campaign.cpc.toFixed(2)} CPC</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#4B5563] uppercase tracking-widest font-bold">ROAS</p>
                      <p className="text-lg font-bold text-green-400 mt-1">{campaign.roas.toFixed(2)}x</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row lg:flex-col gap-2 justify-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-[#6B7280] hover:text-blue-400 hover:bg-blue-400/10 border border-[#262626]"
                      onClick={() => handleOptimize(campaign.id)}
                      disabled={optimizing === campaign.id}
                    >
                      {optimizing === campaign.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="text-[#6B7280] hover:text-white border border-[#262626]">
                      {campaign.status === 'ACTIVE' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="text-[#6B7280] hover:text-white border border-[#262626]">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

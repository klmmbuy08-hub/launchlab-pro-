'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CampaignCard } from '@/components/ads/campaign-card'
import { OptimizationRecommendations } from '@/components/ads/optimization-recommendations'
import { CampaignPerformanceChart } from '@/components/ads/campaign-performance-chart'
import { EmptyState } from '@/components/shared/empty-state'
import { 
  Plus, 
  RefreshCw, 
  Settings, 
  Megaphone,
  DollarSign,
  TrendingUp,
  Users,
  Zap,
  Activity
} from 'lucide-react'

export default function AdsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)

  // Mock data
  const campaigns = [
    {
      id: '1',
      name: 'Lead Gen - Fitness Webinar',
      status: 'ACTIVE' as const,
      objective: 'LEAD_GENERATION',
      daily_budget: 50,
      spent: 42.30,
      impressions: 12450,
      clicks: 342,
      ctr: 2.75,
      cpa: 8.50,
      roas: 3.2,
      conversions: 5,
    },
    {
      id: '2',
      name: 'Sales - Transformation Program',
      status: 'ACTIVE' as const,
      objective: 'CONVERSIONS',
      daily_budget: 100,
      spent: 95.80,
      impressions: 8920,
      clicks: 215,
      ctr: 2.41,
      cpa: 15.20,
      roas: 2.8,
      conversions: 6,
    },
    {
      id: '3',
      name: 'Retargeting - Cart Abandoners',
      status: 'PAUSED' as const,
      objective: 'CONVERSIONS',
      daily_budget: 30,
      spent: 0,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      cpa: 0,
      roas: 0,
      conversions: 0,
    },
  ]

  const recommendations = [
    {
      type: 'budget_increase',
      priority: 'high' as const,
      title: 'Scale winning campaign',
      reason: 'Lead Gen campaign has CPA of $8.50 (30% below target of $12) with consistent conversions',
      action: 'Increase daily budget from $50 to $65 (+30%)',
      expected_impact: '+2 conversions/day (~$40 additional revenue)',
      auto_executable: false,
    },
    {
      type: 'pause_campaign',
      priority: 'critical' as const,
      title: 'CPA exceeded threshold',
      reason: 'Sales campaign CPA is $15.20 (52% above target of $10)',
      action: 'Pause campaign immediately and review targeting/creatives',
      expected_impact: 'Save $95/day in wasted spend',
      auto_executable: true,
    },
    {
      type: 'change_creative',
      priority: 'medium' as const,
      title: 'Creative fatigue detected',
      reason: 'CTR dropped from 3.2% to 2.4% over last 3 days',
      action: 'Test new ad creatives with different hooks',
      expected_impact: 'Improve CTR by 30-50%',
      auto_executable: false,
    },
  ]

  const performanceData = Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString(),
    spend: 40 + Math.random() * 20,
    conversions: Math.floor(3 + Math.random() * 4),
    roas: 2.5 + Math.random() * 1.5,
  }))

  const totalStats = {
    total_spend: campaigns.reduce((sum, c) => sum + c.spent, 0),
    total_conversions: campaigns.reduce((sum, c) => sum + c.conversions, 0),
    avg_roas: (campaigns.reduce((sum, c) => sum + c.roas, 0) / (campaigns.filter(c => c.status === 'ACTIVE').length || 1)),
    active_campaigns: campaigns.filter(c => c.status === 'ACTIVE').length,
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const handleExecuteRecommendation = (index: number) => {
    console.log('Executing recommendation:', recommendations[index])
    // TODO: Implement execution logic
  }

  const handleTogglePause = (campaignId: string) => {
    console.log('Toggling pause for campaign:', campaignId)
    // TODO: Implement pause/play logic
  }

  return (
    <div className="space-y-8 pb-12 w-full animate-in fade-in duration-700 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">AI Ads Manager</h1>
          <p className="text-[#A1A1AA] text-base max-w-xl">
            Your Meta campaigns monitored and optimized 24/7 by artificial intelligence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 px-4 rounded-lg bg-[#0A0A0A] border-[#27272A] text-[#A1A1AA] hover:bg-[#1A1A1A] hover:text-white transition-colors">
            <Settings className="w-4 h-4 mr-2" />
            <span className="text-xs font-semibold">Settings</span>
          </Button>
          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            className="h-9 px-4 rounded-lg bg-[#3B82F6] text-white hover:bg-[#2563EB] border-transparent transition-colors shadow-[0_0_15px_rgba(59,130,246,0.2)]"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="text-xs font-semibold">Sync Data</span>
          </Button>
        </div>
      </div>

      {/* Global Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Spend (30d)', value: `$${totalStats.total_spend.toFixed(2)}`, icon: DollarSign, color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10' },
          { title: 'Conversions', value: totalStats.total_conversions, icon: Users, color: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/10' },
          { title: 'Average ROAS', value: `${totalStats.avg_roas.toFixed(2)}x`, icon: TrendingUp, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' },
          { title: 'Active Campaigns', value: totalStats.active_campaigns, icon: Activity, color: 'text-[#8B5CF6]', bg: 'bg-[#8B5CF6]/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#141414] rounded-xl border border-[#27272A] p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${stat.bg} border border-white/5`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A]">{stat.title}</p>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {/* Main Campaign Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="bg-[#141414] border border-[#27272A] p-1 rounded-lg h-10">
                <TabsTrigger value="all" className="rounded-md px-4 py-1.5 text-xs font-semibold data-[state=active]:bg-[#27272A] data-[state=active]:text-white text-[#71717A] transition-all">
                  <Megaphone className="w-3.5 h-3.5 mr-2" /> All Campaigns
                </TabsTrigger>
                <TabsTrigger value="active" className="rounded-md px-4 py-1.5 text-xs font-semibold data-[state=active]:bg-[#27272A] data-[state=active]:text-white text-[#71717A] transition-all">
                  <Activity className="w-3.5 h-3.5 mr-2" /> Active
                </TabsTrigger>
              </TabsList>
              
              <Button size="sm" className="bg-[#0A0A0A] border border-[#27272A] text-[#E5E7EB] hover:bg-[#1A1A1A] h-9 text-xs">
                <Plus className="w-3.5 h-3.5 mr-2" /> New Campaign
              </Button>
            </div>

            <TabsContent value="all" className="mt-0 focus-visible:outline-none">
              {campaigns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {campaigns.map(campaign => (
                    <CampaignCard 
                      key={campaign.id} 
                      campaign={campaign} 
                      onClick={() => setSelectedCampaign(campaign.id)}
                      onTogglePause={() => handleTogglePause(campaign.id)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState 
                  icon={Megaphone}
                  title="No campaigns found"
                  description="Connect your Meta Ads account or create your first campaign to get started."
                  action={{ label: "Connect Ad Account", onClick: () => {} }}
                />
              )}
            </TabsContent>

            <TabsContent value="active" className="mt-0 focus-visible:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {campaigns.filter(c => c.status === 'ACTIVE').map(campaign => (
                  <CampaignCard 
                    key={campaign.id} 
                    campaign={campaign} 
                    onClick={() => setSelectedCampaign(campaign.id)}
                    onTogglePause={() => handleTogglePause(campaign.id)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Auto-Optimization Settings */}
          <div className="bg-[#141414] border border-[#27272A] rounded-xl shadow-sm overflow-hidden mt-6">
            <div className="p-5 border-b border-[#27272A] bg-gradient-to-b from-white/[0.02] to-transparent">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#3B82F6]" />
                Auto-Optimization Settings
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#27272A]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-[#E5E7EB]">Auto-pause high CPA</span>
                    <div className="w-9 h-5 bg-[#10B981] rounded-full relative cursor-pointer shadow-inner">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] leading-relaxed">
                    Pause campaigns when CPA exceeds target by 50%
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#27272A]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-[#E5E7EB]">Auto-scale winners</span>
                    <div className="w-9 h-5 bg-[#3F3F46] rounded-full relative cursor-pointer shadow-inner">
                      <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-[#8B5CF6] rounded-full shadow-sm" />
                    </div>
                  </div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] leading-relaxed">
                    Increase budget for campaigns performing 20% better
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#27272A]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-[#E5E7EB]">Creative rotation</span>
                    <div className="w-9 h-5 bg-[#10B981] rounded-full relative cursor-pointer shadow-inner">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] leading-relaxed">
                    Alert when CTR drops below threshold
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-6">
          <OptimizationRecommendations 
            recommendations={recommendations} 
            onExecute={handleExecuteRecommendation} 
          />
          <CampaignPerformanceChart data={performanceData} />
        </div>
      </div>
    </div>
  )
}

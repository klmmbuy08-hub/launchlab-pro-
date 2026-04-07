'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ContentOverview } from '@/components/content/content-overview'
import { TopContentList } from '@/components/content/top-content-list'
import { ContentBreakdown } from '@/components/content/content-breakdown'
import { AIRecommendations } from '@/components/content/ai-recommendations'
import { RefreshCw, TrendingUp, TrendingDown, Calendar } from 'lucide-react'

export default function ContentPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d')

  // Mock data - En producción vendría de la API
  const contentData = {
    overview: {
      total_posts: 45,
      avg_engagement_rate: 6.8,
      total_revenue_attributed: 12450,
      total_leads_generated: 347,
    },
    top_content: [
      {
        id: '1',
        type: 'reel' as const,
        caption: 'How I got my first 10 clients in 30 days without ads 🔥',
        engagement_rate: 12.4,
        revenue_attributed: 1200,
        leads_generated: 23,
        published_at: '2024-03-15',
        permalink: 'https://instagram.com',
      },
      {
        id: '2',
        type: 'carousel' as const,
        caption: '5 mistakes fitness coaches make that cost them $10K/month',
        engagement_rate: 9.7,
        revenue_attributed: 800,
        leads_generated: 15,
        published_at: '2024-03-12',
        permalink: 'https://instagram.com',
      },
      {
        id: '3',
        type: 'post' as const,
        caption: 'Client transformation: Lost 40lbs in 90 days (her story)',
        engagement_rate: 8.3,
        revenue_attributed: 400,
        leads_generated: 8,
        published_at: '2024-03-10',
        permalink: 'https://instagram.com',
      },
    ],
    worst_content: [
      {
        id: '4',
        type: 'post' as const,
        caption: 'Random gym selfie 📸',
        engagement_rate: 1.2,
        revenue_attributed: 0,
        leads_generated: 0,
        published_at: '2024-03-08',
        permalink: 'https://instagram.com',
      },
    ],
    breakdown: {
      by_type: [
        { type: 'reel', count: 20, percentage: 44 },
        { type: 'carousel', count: 15, percentage: 33 },
        { type: 'post', count: 10, percentage: 23 },
      ],
      by_category: [
        { category: 'educational', count: 18, percentage: 40 },
        { category: 'transformation', count: 12, percentage: 27 },
        { category: 'promotional', count: 8, percentage: 18 },
        { category: 'engagement', count: 5, percentage: 11 },
        { category: 'behind_the_scenes', count: 2, percentage: 4 },
      ],
    },
    recommendations: [
      {
        title: 'Create more Reels',
        description: 'Your reels generate 3.2x more revenue than static posts. Focus on creating 4-5 reels per week.',
        priority: 'high' as const,
        action: 'Generate Reel Ideas',
      },
      {
        title: 'Add CTAs to all posts',
        description: 'Posts with clear call-to-actions generate 4x more leads. Always include "Link in bio" or "DM me".',
        priority: 'high' as const,
        action: 'Learn CTA Best Practices',
      },
      {
        title: 'More transformation stories',
        description: 'Your transformation posts have 85% higher engagement. Share 2-3 client stories per week.',
        priority: 'medium' as const,
        action: 'View Transformation Templates',
      },
      {
        title: 'Reduce random gym content',
        description: 'Generic gym content has 60% lower engagement and generates 0 leads. Replace with value-driven posts.',
        priority: 'low' as const,
      },
    ],
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Content Intelligence</h1>
          <p className="text-neutral-400">
            See exactly which content generates revenue and leads
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Period Selector */}
          <div className="flex items-center gap-2 p-1 rounded-lg bg-neutral-900 border border-neutral-800">
            {(['7d', '30d', '90d'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                  selectedPeriod === period
                    ? 'bg-blue-500 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {period === '7d' ? '7 days' : period === '30d' ? '30 days' : '90 days'}
              </button>
            ))}
          </div>

          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* AI Insights Banner */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-green-300 mb-2">📊 Key Insights:</h3>
              <ul className="space-y-1.5 text-sm text-green-200">
                <li>• Your reels generate $60 revenue per post (vs $8 for static posts)</li>
                <li>• Educational content brings 4x more qualified leads than promotional</li>
                <li>• Posts published at 6-8 PM have 45% higher engagement</li>
                <li>• Your best-performing hook type: "How I..." (avg 8.7% engagement)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Metrics */}
      <ContentOverview data={contentData.overview} />

      {/* Top vs Worst Content */}
      <Tabs defaultValue="top" className="space-y-6">
        <TabsList className="bg-neutral-900 border border-neutral-800">
          <TabsTrigger value="top" className="data-[state=active]:bg-green-500/20">
            <TrendingUp className="w-4 h-4 mr-2" />
            Top Performers
          </TabsTrigger>
          <TabsTrigger value="worst" className="data-[state=active]:bg-red-500/20">
            <TrendingDown className="w-4 h-4 mr-2" />
            Lowest Performers
          </TabsTrigger>
          <TabsTrigger value="breakdown">
            <Calendar className="w-4 h-4 mr-2" />
            Content Breakdown
          </TabsTrigger>
        </TabsList>

        <TabsContent value="top" className="space-y-6">
          <TopContentList
            content={contentData.top_content}
            title="Top Content This Month"
          />
        </TabsContent>

        <TabsContent value="worst" className="space-y-6">
          <TopContentList
            content={contentData.worst_content}
            title="Lowest Performing Content"
            emptyMessage="Great! No underperforming content this month."
          />
          <Card className="bg-blue-500/10 border-blue-500/30">
            <CardContent className="p-4">
              <p className="text-sm text-blue-200">
                💡 <strong>Tip:</strong> Analyze why these posts didn't perform and avoid similar content in the future.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <ContentBreakdown data={contentData.breakdown} />
        </TabsContent>
      </Tabs>

      {/* AI Recommendations */}
      <AIRecommendations recommendations={contentData.recommendations} />
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ContentOverview } from '@/components/content/content-overview'
import { TopContentList } from '@/components/content/top-content-list'
import { ContentBreakdown } from '@/components/content/content-breakdown'
import { AIRecommendations } from '@/components/content/ai-recommendations'
import { RefreshCw, TrendingUp, TrendingDown, Calendar, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContentPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d')

  // Mock data 
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
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  return (
    <div className="space-y-8 pb-12 w-full animate-in fade-in duration-700 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Content Intelligence</h1>
          <p className="text-[#A1A1AA] text-base max-w-xl">
            Uncover the real ROI of your content. See exactly which posts generate revenue and drive qualified leads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-lg bg-[#141414] border border-[#27272A]">
            {(['7d', '30d', '90d'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  selectedPeriod === period
                    ? 'bg-[#27272A] text-white shadow-sm'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-[#1F1F1F]'
                }`}
              >
                {period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>

          <Button
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="rounded-lg px-4 h-8 bg-white text-black hover:bg-[#E5E7EB] transition-colors text-xs font-semibold"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* AI Insights Banner Custom */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="relative overflow-hidden rounded-xl bg-[#0A0A0A] border border-[#10B981]/20 shadow-sm">
          {/* Subtle gradient accent line at the top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#10B981] via-[#3B82F6] to-transparent opacity-50" />
          
          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="flex-shrink-0 p-3 bg-[#10B981]/10 rounded-lg border border-[#10B981]/20">
                <Sparkles className="w-5 h-5 text-[#10B981]" />
              </div>
              <div className="flex-1 w-full">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                  Key Insights Discovered
                  <span className="px-2 py-0.5 rounded-md bg-[#10B981]/10 text-[#10B981] text-[10px] uppercase tracking-widest font-bold border border-[#10B981]/20">New</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-2 flex-shrink-0" />
                    <p className="text-sm text-[#A1A1AA]">Your reels generate <strong className="text-white font-medium">$60 revenue</strong> per post (vs $8 static)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-2 flex-shrink-0" />
                    <p className="text-sm text-[#A1A1AA]">Posts published at <strong className="text-white font-medium">6-8 PM</strong> have 45% higher engagement</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-2 flex-shrink-0" />
                    <p className="text-sm text-[#A1A1AA]">Educational content brings <strong className="text-white font-medium">4x more</strong> qualified leads</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-2 flex-shrink-0" />
                    <p className="text-sm text-[#A1A1AA]">Best-performing hook type: <strong className="text-white font-medium">"How I..."</strong> (avg 8.7%)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overview Metrics */}
      <ContentOverview data={contentData.overview} />

      {/* Main Content Areas */}
      <Tabs defaultValue="top" className="space-y-6">
        <TabsList className="bg-[#141414] border border-[#27272A] p-1 rounded-lg h-10">
          <TabsTrigger value="top" className="rounded-md px-4 py-1.5 text-xs font-semibold data-[state=active]:bg-[#27272A] data-[state=active]:text-white text-[#71717A] transition-all">
            <TrendingUp className="w-3.5 h-3.5 mr-2" />
            Top Performers
          </TabsTrigger>
          <TabsTrigger value="worst" className="rounded-md px-4 py-1.5 text-xs font-semibold data-[state=active]:bg-[#27272A] data-[state=active]:text-white text-[#71717A] transition-all">
            <TrendingDown className="w-3.5 h-3.5 mr-2" />
            Lowest Performers
          </TabsTrigger>
          <TabsTrigger value="breakdown" className="rounded-md px-4 py-1.5 text-xs font-semibold data-[state=active]:bg-[#27272A] data-[state=active]:text-white text-[#71717A] transition-all">
            <Calendar className="w-3.5 h-3.5 mr-2" />
            Breakdown
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="top" className="mt-0">
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}>
              <TopContentList content={contentData.top_content} title="Top Content This Month" />
            </motion.div>
          </TabsContent>

          <TabsContent value="worst" className="mt-0 space-y-4">
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}>
              <TopContentList content={contentData.worst_content} title="Lowest Performing Content" emptyMessage="Great! No underperforming content this month." />
              <div className="bg-[#3B82F6]/5 border border-[#3B82F6]/20 py-3 px-4 rounded-lg mt-4 flex items-start gap-3">
                <span className="text-xl">💡</span>
                <p className="text-[#A1A1AA] text-sm">
                  <strong className="text-[#3B82F6] font-medium mr-1">Pro-Tip:</strong> Analyze why these posts didn't perform and avoid similar content in the future.
                </p>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="breakdown" className="mt-0">
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}>
              <ContentBreakdown data={contentData.breakdown} />
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>

      {/* AI Recommendations */}
      <AIRecommendations recommendations={contentData.recommendations} />
    </div>
  )
}

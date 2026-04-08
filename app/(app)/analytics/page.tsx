'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MetricsDashboard } from '@/components/analytics/metrics-dashboard'
import { ReportPreview } from '@/components/analytics/report-preview'
import { TrendChart } from '@/components/analytics/trend-chart'
import { FileText, Calendar, Download, Sparkles, BarChart3, Clock } from 'lucide-react'

export default function AnalyticsPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month')

  // Mock data
  const metrics = {
    revenue: { current: 12450, previous: 10200, change: 22.1 },
    leads: { current: 347, previous: 289, change: 20.1 },
    conversions: { current: 29, previous: 23, change: 26.1 },
    engagement: { current: 6.8, previous: 5.9, change: 15.3 },
    followers: { current: 12458, previous: 10850, change: 14.8 },
    content_pieces: { current: 45, previous: 38, change: 18.4 },
  }

  const mockReport = {
    title: 'Monthly Report - March 2024',
    executive_summary:
      'Strong month with 22% revenue growth driven by improved content strategy and higher engagement rates. Key wins include 347 new leads and successful launch of transformation program.',
    sections: [
      {
        title: 'Revenue & Growth',
        content:
          'This month you generated $12,450 in revenue, representing a 22.1% increase from last month. This growth was driven primarily by your transformation program launch and improved conversion rates from organic content.',
        metrics: [
          { label: 'Total Revenue', value: '$12,450', change: '+22.1%' },
          { label: 'Conversions', value: '29', change: '+26.1%' },
          { label: 'Avg Deal Value', value: '$429' },
        ],
        insights: [
          'Revenue per lead improved by 8% this month',
          'Your transformation program accounted for 60% of revenue',
          'Organic content drove 73% of conversions',
        ],
      },
      {
        title: 'Content Strategy',
        content:
          'You published 45 pieces of content this month with an average engagement rate of 6.8%. Your reels significantly outperformed other content types, generating 3.2x more revenue per post.',
        metrics: [
          { label: 'Total Posts', value: '45', change: '+18.4%' },
          { label: 'Avg Engagement', value: '6.8%', change: '+15.3%' },
          { label: 'Top Format', value: 'Reels' },
        ],
        insights: [
          'Reels generated $60 revenue per post vs $18 for static posts',
          'Educational content brought 4x more qualified leads',
          'Posts at 6-8 PM had 45% higher engagement',
        ],
      },
      {
        title: 'Audience Development',
        content:
          'Your audience grew by 1,608 followers (14.8%) this month, with strong engagement from the 25-34 age demographic. Follower quality improved significantly with higher lead-to-follower ratios.',
        metrics: [
          { label: 'New Followers', value: '+1,608', change: '+14.8%' },
          { label: 'Engagement Rate', value: '6.8%', change: '+15.3%' },
          { label: 'Lead Rate', value: '2.8%' },
        ],
        insights: [
          'Your ideal follower profile is increasingly accurate',
          'Female followers (65%) show higher engagement',
          'Los Angeles audience is your most valuable segment',
        ],
      },
    ],
    recommendations: [
      'Double down on reels - they\'re generating 3.2x more revenue per post than static content',
      'Create 2-3 transformation stories per week - these drive 85% higher engagement',
      'Launch an email nurture sequence for your 142 warm leads in the pipeline',
      'Consider raising prices on your transformation program given strong demand',
      'Test running paid ads to your best-performing organic reel',
    ],
    next_steps: [
      'Create 12-15 reels for April (targeting 60% educational, 40% transformation)',
      'Build email sequence with 5 touchpoints for lead nurturing',
      'Set up consultation booking system for qualified leads',
      'Analyze competitor gaps and create content to fill those spaces',
    ],
  }

  const revenueData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
    value: 300 + Math.random() * 200,
  }))

  const leadsData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
    value: Math.floor(8 + Math.random() * 8),
  }))

  const engagementData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
    value: 5 + Math.random() * 3,
  }))

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    // Simular generación con IA
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(false)
  }

  const handleDownloadReport = () => {
    console.log('Downloading report as PDF...')
    // TODO: Implement PDF download
  }

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'week':
        return 'Last 7 Days'
      case 'month':
        return 'Last 30 Days'
      case 'quarter':
        return 'Last 90 Days'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics & Reporting</h1>
          <p className="text-neutral-400">
            Comprehensive insights and professional reports for your business
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Period Selector */}
          <div className="flex items-center gap-2 p-1 rounded-lg bg-neutral-900 border border-neutral-800">
            {(['week', 'month', 'quarter'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded text-sm font-medium transition-all capitalize ${
                  selectedPeriod === period
                    ? 'bg-blue-500 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          <Button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="bg-gradient-to-r from-blue-500 to-purple-500"
          >
            <Sparkles className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <MetricsDashboard metrics={metrics} period={getPeriodLabel()} />

      {/* Tabs */}
      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="bg-neutral-900 border border-neutral-800">
          <TabsTrigger value="trends">
            <BarChart3 className="w-4 h-4 mr-2" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="report">
            <FileText className="w-4 h-4 mr-2" />
            Full Report
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="w-4 h-4 mr-2" />
            Historical Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrendChart title="Daily Revenue" data={revenueData} format="currency" />
            <TrendChart title="Daily Leads" data={leadsData} format="number" />
          </div>
          <TrendChart title="Daily Engagement Rate" data={engagementData} format="percentage" />
        </TabsContent>

        <TabsContent value="report">
          <ReportPreview report={mockReport} onDownload={handleDownloadReport} />
        </TabsContent>

        <TabsContent value="history">
          <Card className="bg-neutral-900/50 border-neutral-800">
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { month: 'March 2024', generated: '2024-04-01', revenue: '$12,450' },
                  { month: 'February 2024', generated: '2024-03-01', revenue: '$10,200' },
                  { month: 'January 2024', generated: '2024-02-01', revenue: '$9,800' },
                ].map((report, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-lg bg-neutral-800/50 hover:bg-neutral-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-blue-500/10">
                        <FileText className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{report.month} Report</h3>
                        <p className="text-sm text-neutral-500">
                          Generated {new Date(report.generated).toLocaleDateString()} •{' '}
                          {report.revenue} revenue
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-neutral-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <Calendar className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="font-semibold text-white mb-1">Schedule Report</h3>
            <p className="text-sm text-neutral-400">Get automated reports weekly or monthly</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <Download className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="font-semibold text-white mb-1">Export Data</h3>
            <p className="text-sm text-neutral-400">Download raw data as CSV or Excel</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <FileText className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="font-semibold text-white mb-1">Custom Report</h3>
            <p className="text-sm text-neutral-400">Build a report with specific metrics</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

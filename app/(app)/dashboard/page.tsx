'use client'

import { MetricCard } from '@/components/shared/metric-card'
import { StatCard } from '@/components/shared/stat-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DollarSign,
  Users,
  TrendingUp,
  Target,
  Camera,
  Calendar,
  Zap,
  AlertCircle,
} from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-neutral-400">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>

      {/* Quick Actions Alert */}
      <Card className="bg-yellow-500/10 border-yellow-500/30">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-300 mb-1">
                  Your Instagram account needs reconnection
                </h3>
                <p className="text-sm text-yellow-200">
                  Token expired. Reconnect to continue tracking metrics.
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-yellow-500/30 text-yellow-400">
              Reconnect
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Cash Collected"
          value="$12,450"
          subtitle="This month"
          icon={DollarSign}
          iconColor="text-green-400"
          trend={{ value: 23, label: 'vs last month' }}
        />

        <MetricCard
          title="Total Leads"
          value="347"
          subtitle="This month"
          icon={Users}
          iconColor="text-blue-400"
          trend={{ value: 12, label: 'vs last month' }}
        />

        <MetricCard
          title="Conversion Rate"
          value="8.4%"
          subtitle="Lead to sale"
          icon={TrendingUp}
          iconColor="text-purple-400"
          trend={{ value: -2, label: 'vs last month' }}
        />

        <MetricCard
          title="Active Campaigns"
          value="3"
          subtitle="2 performing well"
          icon={Target}
          iconColor="text-orange-400"
        />
      </div>

      {/* Content Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Content */}
        <Card className="bg-neutral-900/50 border-neutral-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Top Content This Month
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                type: 'Reel',
                caption: 'How I got my first 10 clients...',
                metrics: { engagement: '8.4%', leads: 23, revenue: '$1,200' },
              },
              {
                type: 'Carousel',
                caption: '5 mistakes fitness coaches make',
                metrics: { engagement: '6.2%', leads: 15, revenue: '$800' },
              },
              {
                type: 'Post',
                caption: 'Client transformation story',
                metrics: { engagement: '5.1%', leads: 8, revenue: '$400' },
              },
            ].map((content, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-lg bg-neutral-800/50 hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500" />
                  <div>
                    <p className="font-medium text-white">{content.caption}</p>
                    <p className="text-xs text-neutral-500">{content.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-400">{content.metrics.revenue}</p>
                  <p className="text-xs text-neutral-500">{content.metrics.leads} leads</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Ideal Follower */}
        <Card className="bg-neutral-900/50 border-neutral-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              Your Ideal Follower
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                <div className="grid grid-cols-2 gap-4">
                  <StatCard label="Age Range" value="25-34" />
                  <StatCard label="Gender" value="65% F" />
                  <StatCard label="Location" value="USA" />
                  <StatCard label="Avg. Income" value="$60K+" />
                </div>
              </div>

              <div>
                <p className="text-sm text-neutral-400 mb-2">Top Interests:</p>
                <div className="flex flex-wrap gap-2">
                  {['Fitness', 'Health', 'Nutrition', 'Self-improvement', 'Business'].map(
                    (interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1 rounded-full bg-neutral-800 text-xs text-neutral-300"
                      >
                        {interest}
                      </span>
                    )
                  )}
                </div>
              </div>

              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                View Full Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-neutral-900/50 border-neutral-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 border-neutral-700">
              <Camera className="w-6 h-6 text-pink-400" />
              <span className="font-medium">Connect Instagram</span>
              <span className="text-xs text-neutral-500">Link your account</span>
            </Button>

            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 border-neutral-700">
              <Calendar className="w-6 h-6 text-blue-400" />
              <span className="font-medium">Generate Calendar</span>
              <span className="text-xs text-neutral-500">30-day content plan</span>
            </Button>

            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 border-neutral-700">
              <Target className="w-6 h-6 text-green-400" />
              <span className="font-medium">Add Competitor</span>
              <span className="text-xs text-neutral-500">Track competition</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

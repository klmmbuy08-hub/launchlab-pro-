'use client'

import { useEffect, useState } from 'react'
import { useAudienceInsights, useAccounts } from '@/lib/hooks/v2'
import { AudienceInsights } from '@/lib/types/v2'
import { DemographicsChart } from './DemographicsChart'
import { FollowerGrowthChart } from './FollowerGrowthChart'
import { AudienceCard } from './AudienceCard'

export function AudienceAnalytics({ accountId }: { accountId: string }) {
  const { insights, insightsHistory, fetchLatestInsights, fetchInsightsHistory } = useAudienceInsights()
  const [previousInsights, setPreviousInsights] = useState<AudienceInsights | null>(null)

  useEffect(() => {
    fetchLatestInsights(accountId)
    fetchInsightsHistory(accountId, 30)
  }, [accountId, fetchLatestInsights, fetchInsightsHistory])

  useEffect(() => {
    if (insightsHistory.length > 1) {
      setPreviousInsights(insightsHistory[1])
    }
  }, [insightsHistory])

  if (!insights) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  const followerGrowth = previousInsights
    ? insights.total_followers - previousInsights.total_followers
    : 0

  const growthPercentage = previousInsights && previousInsights.total_followers > 0
    ? ((followerGrowth / previousInsights.total_followers) * 100).toFixed(2)
    : '0.00'

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AudienceCard
          title="Total Followers"
          value={insights.total_followers.toLocaleString()}
          change={`${followerGrowth > 0 ? '+' : ''}${followerGrowth.toLocaleString()}`}
          changePercent={`${parseFloat(growthPercentage) > 0 ? '+' : ''}${growthPercentage}%`}
          trend={followerGrowth > 0 ? 'up' : 'down'}
        />
        <AudienceCard
          title="Engagement Rate"
          value={((insights.ideal_follower_profile?.interests?.length || 0) / 10 * 100).toFixed(1) + '%'}
          change="Estimated"
        />
        <AudienceCard
          title="Ideal Followers"
          value={insights.top_followers.length.toString()}
          change="High value"
        />
      </div>

      {/* Demographics */}
      <DemographicsChart demographics={insights.demographics} />

      {/* Growth Trend */}
      <FollowerGrowthChart history={insightsHistory} />

      {/* Top Followers */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Top Followers</h3>
        <div className="space-y-3">
          {insights.top_followers.slice(0, 10).map((follower, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-900">{follower.username}</span>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-600">Engagement: {follower.engagement_score.toFixed(1)}</span>
                <span className="text-blue-600 font-semibold">Value: {follower.value_score.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ideal Profile */}
      {insights.ideal_follower_profile && (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Ideal Follower Profile</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">Age Range</p>
              <p className="font-semibold text-gray-900">{insights.ideal_follower_profile.age_range}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Gender</p>
              <p className="font-semibold text-gray-900 capitalize">{insights.ideal_follower_profile.gender}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Location</p>
              <p className="font-semibold text-gray-900">{insights.ideal_follower_profile.location}</p>
            </div>
            <div className="col-span-2 md:col-span-3">
              <p className="text-xs text-gray-600 mb-2">Top Interests</p>
              <div className="flex flex-wrap gap-2">
                {insights.ideal_follower_profile.interests.slice(0, 5).map((interest, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-200 text-purple-700 text-sm rounded-full">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
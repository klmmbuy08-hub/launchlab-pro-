import { NextResponse } from 'next/server'

export async function GET() {
  const data = {
    success: true,
    data: {
      overview: {
        revenue_today: 1250,
        revenue_month: 42500,
        revenue_growth: 12.5,
        leads_today: 8,
        leads_month: 240,
        conversions_today: 2,
        on_track_to_goal: true,
        days_remaining: 17,
      },
      quick_stats: {
        total_followers: 15420,
        follower_growth: 2.3,
        avg_engagement: 4.8,
        content_this_week: 12,
        active_campaigns: 3,
        total_ad_spend: 250,
      },
      alerts: [
        {
          type: 'success',
          title: 'Campaign Performance',
          message: 'Your LinkedIn campaign exceeded CTR target by 15%',
          action: 'View Campaign',
          timestamp: new Date().toISOString(),
        },
        {
          type: 'warning',
          title: 'Low Engagement',
          message: 'Instagram reel engagement dropped 8% vs last week',
          action: 'Optimize',
          timestamp: new Date().toISOString(),
        },
      ],
      upcoming_tasks: [
        {
          id: '1',
          title: 'Follow up with qualified lead',
          due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'lead-follow-up',
          priority: 'high',
        },
        {
          id: '2',
          title: 'Create content calendar for next week',
          due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'content',
          priority: 'medium',
        },
      ],
    },
  }

  return NextResponse.json(data)
}

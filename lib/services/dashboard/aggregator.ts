// ============================================
// Dashboard Data Aggregator
// Consolida datos de todos los módulos
// ============================================

interface DashboardData {
  overview: {
    revenue_today: number
    revenue_month: number
    revenue_growth: number
    leads_today: number
    leads_month: number
    conversions_today: number
    on_track_to_goal: boolean
    days_remaining: number
  }
  quick_stats: {
    total_followers: number
    follower_growth: number
    avg_engagement: number
    content_this_week: number
    active_campaigns: number
    total_ad_spend: number
  }
  alerts: {
    type: 'critical' | 'warning' | 'info' | 'success'
    title: string
    message: string
    action?: string
    timestamp: string
  }[]
  upcoming_tasks: {
    id: string
    title: string
    due_date: string
    type: 'content' | 'campaign' | 'follow_up' | 'optimization'
    priority: 'high' | 'medium' | 'low'
  }[]
  top_content_today: {
    id: string
    type: string
    topic: string
    engagement_rate: number
    revenue: number
  }[]
  revenue_trend_7d: {
    date: string
    revenue: number
    leads: number
  }[]
  ai_insights: string[]
}

export class DashboardAggregator {
  async aggregateData(): Promise<DashboardData> {
    // En producción, esto llamaría a múltiples servicios
    // Por ahora, generamos data mock realista

    const today = new Date()
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
    const daysRemaining = daysInMonth - today.getDate()

    return {
      overview: {
        revenue_today: 427,
        revenue_month: 8450,
        revenue_growth: 23.5,
        leads_today: 12,
        leads_month: 347,
        conversions_today: 2,
        on_track_to_goal: true,
        days_remaining: daysRemaining,
      },
      quick_stats: {
        total_followers: 12458,
        follower_growth: 15.3,
        avg_engagement: 6.8,
        content_this_week: 7,
        active_campaigns: 2,
        total_ad_spend: 138.10,
      },
      alerts: this.generateAlerts(),
      upcoming_tasks: this.generateUpcomingTasks(),
      top_content_today: [
        {
          id: '1',
          type: 'reel',
          topic: 'How I got 10 clients in 30 days',
          engagement_rate: 12.4,
          revenue: 240,
        },
        {
          id: '2',
          type: 'carousel',
          topic: '5 mistakes fitness coaches make',
          engagement_rate: 9.7,
          revenue: 180,
        },
      ],
      revenue_trend_7d: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString(),
        revenue: 300 + Math.random() * 200,
        leads: Math.floor(10 + Math.random() * 15),
      })),
      ai_insights: this.generateAIInsights(),
    }
  }

  private generateAlerts(): DashboardData['alerts'] {
    return [
      {
        type: 'critical',
        title: 'High CPA Alert',
        message: 'Sales campaign CPA is $15.20 (52% above target). Immediate action required.',
        action: 'Review Campaign',
        timestamp: new Date().toISOString(),
      },
      {
        type: 'success',
        title: 'Goal Milestone',
        message: 'You hit 60% of your monthly revenue goal! Keep the momentum going.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        type: 'warning',
        title: 'Creative Fatigue Detected',
        message: 'Lead Gen campaign CTR dropped 30% in last 3 days. Time for new creatives.',
        action: 'Generate Content Ideas',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
      {
        type: 'info',
        title: 'Calendar Ready',
        message: 'Your 30-day content calendar has been generated and is ready to review.',
        action: 'View Calendar',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]
  }

  private generateUpcomingTasks(): DashboardData['upcoming_tasks'] {
    return [
      {
        id: '1',
        title: 'Post transformation reel',
        due_date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        type: 'content',
        priority: 'high',
      },
      {
        id: '2',
        title: 'Review ad campaign performance',
        due_date: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        type: 'campaign',
        priority: 'high',
      },
      {
        id: '3',
        title: 'Follow up with 5 warm leads',
        due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'follow_up',
        priority: 'medium',
      },
      {
        id: '4',
        title: 'Create carousel about meal prep',
        due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'content',
        priority: 'medium',
      },
    ]
  }

  private generateAIInsights(): string[] {
    return [
      '🔥 Your reels are generating 3.2x more revenue than static posts - create 5 more this week',
      '📊 Posts at 6-8 PM get 45% higher engagement - schedule your best content for evening',
      '💰 You need $437/day to hit your monthly goal (currently at $380/day)',
      '🎯 Your ideal follower: 25-34 Female interested in Fitness, Wellness, Nutrition',
      '⚡ Lead Gen campaign performing 30% below target - pause and review targeting',
    ]
  }
}

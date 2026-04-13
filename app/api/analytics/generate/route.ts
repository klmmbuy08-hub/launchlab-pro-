import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/services/supabase/client'
import { getSecureHeaders } from '@/lib/security/api-protection'
import { ReportGenerator } from '@/lib/services/reporting/report-generator'
import { aggregateAnalyticsData } from '@/lib/services/analytics/aggregator'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: getSecureHeaders() }
      )
    }

    const { reportType, dateRange } = await request.json()

    const analyticsData = await aggregateAnalyticsData({
      userId: session.user.id,
      preset: dateRange.preset,
      startDate: dateRange.custom?.start ? new Date(dateRange.custom.start) : undefined,
      endDate: dateRange.custom?.end ? new Date(dateRange.custom.end) : undefined,
    })

    const generator = new ReportGenerator()

    const startDateStr = dateRange.custom?.start
      ? new Date(dateRange.custom.start).toISOString().split('T')[0]
      : new Date(Date.now() - (dateRange.days || 30) * 86400000).toISOString().split('T')[0]

    const endDateStr = dateRange.custom?.end
      ? new Date(dateRange.custom.end).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]

    const report = await generator.generateMonthlyReport({
      period: {
        start_date: startDateStr,
        end_date: endDateStr,
        days: dateRange.days || 30,
      },
      business_metrics: {
        revenue: analyticsData.kpis.revenue,
        revenue_growth: analyticsData.kpis.revenue_growth,
        leads: analyticsData.kpis.leads,
        leads_growth: analyticsData.kpis.leads_growth,
        conversions: analyticsData.kpis.conversions,
        conversion_rate: analyticsData.kpis.conversion_rate,
        avg_deal_value: analyticsData.kpis.avg_order_value,
      },
      content_performance: {
        total_posts: analyticsData.content_performance.length,
        avg_engagement: analyticsData.content_performance.length > 0
          ? analyticsData.content_performance.reduce((a, b) => a + b.engagement_rate, 0) / analyticsData.content_performance.length
          : 0,
        top_content_type: 'Mixed',
        best_performing_post: analyticsData.content_performance[0] ? {
          topic: analyticsData.content_performance[0].title,
          engagement_rate: analyticsData.content_performance[0].engagement_rate,
          revenue: analyticsData.content_performance[0].revenue,
        } : {
          topic: 'N/A',
          engagement_rate: 0,
          revenue: 0,
        },
      },
      audience_insights: {
        follower_growth: 5.2,
        total_followers: 15000,
        engagement_rate: 4.5,
        top_demographics: { age_range: '25-34', percentage: 35 },
      },
    })

    return NextResponse.json(
      { success: true, data: report },
      { headers: getSecureHeaders() }
    )
  } catch (error: any) {
    console.error('Report generation error:', error)
    return NextResponse.json(
      { error: 'Report generation failed' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}

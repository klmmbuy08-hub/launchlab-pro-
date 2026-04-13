import { createServerClient } from '@/lib/services/supabase/client'
import { AnalyticsData, TimeSeriesData, ChannelMetrics, ContentPerformance } from '@/lib/types/analytics'

interface AggregatorOptions {
  userId: string
  preset: 'last_7' | 'last_30' | 'last_90' | 'custom'
  startDate?: Date
  endDate?: Date
}

export async function aggregateAnalyticsData(options: AggregatorOptions): Promise<AnalyticsData> {
  const supabase = createServerClient()
  const { userId, preset, startDate, endDate } = options

  // Calculate date range
  const end = endDate || new Date()
  const start = startDate || new Date(end.getTime() - (preset === 'last_7' ? 7 : preset === 'last_90' ? 90 : 30) * 86400000)

  // Fetch business metrics
  const { data: metrics } = await supabase
    .from('business_metrics')
    .select('*')
    .eq('user_id', userId)
    .gte('metric_date', start.toISOString().split('T')[0])
    .lte('metric_date', end.toISOString().split('T')[0])
    .order('metric_date', { ascending: true })

  // Process metrics into timeseries
  const timeseries: TimeSeriesData[] = (metrics || []).map((m) => ({
    date: new Date(m.metric_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: Number(m.revenue) || 0,
    leads: Number(m.leads) || 0,
    audience: Number(m.audience) || 0,
    engagement: Number(m.engagement) || 0,
    conversions: Number(m.conversions) || 0,
  }))

  // Calculate KPIs
  const totalRevenue = metrics?.reduce((sum, m) => sum + (Number(m.revenue) || 0), 0) || 0
  const totalLeads = metrics?.reduce((sum, m) => sum + (Number(m.leads) || 0), 0) || 0
  const totalConversions = metrics?.reduce((sum, m) => sum + (Number(m.conversions) || 0), 0) || 0

  return {
    kpis: {
      revenue: totalRevenue,
      revenue_growth: 12.5,
      leads: totalLeads,
      leads_growth: 8.2,
      conversions: totalConversions,
      conversion_rate: totalLeads > 0 ? (totalConversions / totalLeads) * 100 : 0,
      avg_order_value: totalConversions > 0 ? totalRevenue / totalConversions : 0,
      aov_growth: 5.3,
    },
    timeseries,
    channels: [
      { channel: 'LinkedIn', roi: 350, percentage: 35, spend: 5000, revenue: 17500 },
      { channel: 'Meta Ads', roi: 280, percentage: 30, spend: 6000, revenue: 16800 },
      { channel: 'Email', roi: 420, percentage: 25, spend: 2000, revenue: 8400 },
      { channel: 'Organic', roi: 0, percentage: 10, spend: 0, revenue: 5000 },
    ],
    content_performance: [
      { title: 'LinkedIn Post #1', type: 'LinkedIn', engagement_rate: 8.5, revenue: 2500, impressions: 15000 },
      { title: 'Email Campaign', type: 'Email', engagement_rate: 12.3, revenue: 3200, impressions: 8000 },
    ],
    period: {
      start_date: start.toISOString().split('T')[0],
      end_date: end.toISOString().split('T')[0],
      days: Math.ceil((end.getTime() - start.getTime()) / 86400000),
    },
  }
}

export type DatePreset = 'last_7' | 'last_30' | 'last_90' | 'custom'

export interface DateRange {
  preset: DatePreset
  days: number
  custom?: {
    start: Date
    end: Date
  }
}

export interface KPIs {
  revenue: number
  revenue_growth: number
  leads: number
  leads_growth: number
  conversions: number
  conversion_rate: number
  avg_order_value: number
  aov_growth: number
}

export interface TimeSeriesData {
  date: string
  revenue: number
  leads: number
  audience: number
  engagement: number
  conversions: number
}

export interface ChannelMetrics {
  channel: string
  roi: number
  percentage: number
  spend: number
  revenue: number
}

export interface ContentPerformance {
  title: string
  type: string
  engagement_rate: number
  revenue: number
  impressions: number
}

export interface AnalyticsData {
  kpis: KPIs
  timeseries: TimeSeriesData[]
  channels: ChannelMetrics[]
  content_performance: ContentPerformance[]
  period: {
    start_date: string
    end_date: string
    days: number
  }
}

export interface ReportTemplate {
  id: string
  type: 'weekly' | 'monthly' | 'quarterly' | 'custom'
  title: string
  description: string
  generatedAt: string
  data: AnalyticsData
}

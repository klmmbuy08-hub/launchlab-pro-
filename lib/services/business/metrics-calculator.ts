// ============================================
// Business Metrics Calculator
// Calcula métricas de negocio y proyecciones
// ============================================

export interface BusinessMetricsInput {
  revenue_this_month: number
  revenue_last_month: number
  leads_this_month: number
  leads_last_month: number
  conversions_this_month: number
  conversions_last_month: number
  avg_deal_value: number
  days_in_month?: number
}

export interface BusinessMetricsOutput {
  // Revenue
  cash_collected: number
  revenue_growth: number
  revenue_forecast: number
  daily_avg_revenue: number

  // Leads
  total_leads: number
  qualified_leads: number
  lead_growth: number

  // Conversions
  total_conversions: number
  conversion_rate: number
  conversion_growth: number

  // Pipeline
  pipeline_value: number
  avg_deal_value: number

  // Projections
  projected_month_end: number
  on_track_to_goal: boolean
  gap_to_goal?: number
}

export class MetricsCalculator {
  calculate(input: BusinessMetricsInput, goal?: number): BusinessMetricsOutput {
    const daysInMonth = input.days_in_month || 30
    const currentDay = new Date().getDate()

    // Revenue calculations
    const cash_collected = input.revenue_this_month
    const revenue_growth = this.calculateGrowth(input.revenue_this_month, input.revenue_last_month)
    const daily_avg_revenue = cash_collected / currentDay
    const revenue_forecast = daily_avg_revenue * daysInMonth

    // Lead calculations
    const total_leads = input.leads_this_month
    const qualified_leads = Math.round(total_leads * 0.6) // Assume 60% qualified
    const lead_growth = this.calculateGrowth(input.leads_this_month, input.leads_last_month)

    // Conversion calculations
    const total_conversions = input.conversions_this_month
    const conversion_rate = total_leads > 0 ? (total_conversions / total_leads) * 100 : 0
    const conversion_growth = this.calculateGrowth(input.conversions_this_month, input.conversions_last_month)

    // Pipeline
    const pipeline_value = qualified_leads * input.avg_deal_value

    // Projections
    const projected_month_end = revenue_forecast
    const on_track_to_goal = goal ? projected_month_end >= goal : true
    const gap_to_goal = goal ? Math.max(0, goal - projected_month_end) : undefined

    return {
      cash_collected,
      revenue_growth,
      revenue_forecast,
      daily_avg_revenue,
      total_leads,
      qualified_leads,
      lead_growth,
      total_conversions,
      conversion_rate,
      conversion_growth,
      pipeline_value,
      avg_deal_value: input.avg_deal_value,
      projected_month_end,
      on_track_to_goal,
      gap_to_goal,
    }
  }

  private calculateGrowth(current: number, previous: number): number {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  calculateRunwayToGoal(currentRevenue: number, goal: number, dailyAvg: number): number {
    const remaining = goal - currentRevenue
    if (remaining <= 0) return 0
    return Math.ceil(remaining / dailyAvg)
  }

  calculateLeadsNeeded(goal: number, avgDealValue: number, conversionRate: number): number {
    const salesNeeded = Math.ceil(goal / avgDealValue)
    return Math.ceil(salesNeeded / (conversionRate / 100))
  }
}

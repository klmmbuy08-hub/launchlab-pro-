// ============================================
// Business Metrics Calculator
// Calcula métricas de negocio y proyecciones
// ============================================

interface BusinessData {
  revenue_by_day: { date: string; amount: number }[]
  leads_by_day: { date: string; count: number }[]
  conversions_by_day: { date: string; count: number }[]
  avg_ticket_price: number
  avg_ltv: number
}

interface MetricsResult {
  current_month: {
    cash_collected: number
    total_leads: number
    qualified_leads: number
    conversions: number
    conversion_rate: number
    avg_deal_size: number
  }
  forecast: {
    projected_revenue: number
    projected_leads: number
    projected_conversions: number
    confidence: number
  }
  trends: {
    revenue_trend: number
    leads_trend: number
    conversion_trend: number
  }
  funnel: {
    followers: number
    leads: number
    conversations: number
    conversions: number
    drop_off_rates: {
      follower_to_lead: number
      lead_to_conversation: number
      conversation_to_conversion: number
    }
  }
}

export class MetricsCalculator {
  calculateMetrics(data: BusinessData, currentDate: Date = new Date()): MetricsResult {
    const currentMonth = this.getCurrentMonthData(data, currentDate)
    const previousMonth = this.getPreviousMonthData(data, currentDate)

    const current_month = {
      cash_collected: this.sumRevenue(currentMonth.revenue),
      total_leads: this.sumLeads(currentMonth.leads),
      qualified_leads: Math.round(this.sumLeads(currentMonth.leads) * 0.7),
      conversions: this.sumConversions(currentMonth.conversions),
      conversion_rate: this.calculateConversionRate(
        this.sumLeads(currentMonth.leads),
        this.sumConversions(currentMonth.conversions)
      ),
      avg_deal_size: data.avg_ticket_price,
    }

    const trends = {
      revenue_trend: this.calculateTrend(
        this.sumRevenue(previousMonth.revenue),
        current_month.cash_collected
      ),
      leads_trend: this.calculateTrend(
        this.sumLeads(previousMonth.leads),
        current_month.total_leads
      ),
      conversion_trend: this.calculateTrend(
        this.calculateConversionRate(
          this.sumLeads(previousMonth.leads),
          this.sumConversions(previousMonth.conversions)
        ),
        current_month.conversion_rate
      ),
    }

    const forecast = this.calculateForecast(currentMonth, currentDate)

    const funnel = {
      followers: 12458,
      leads: current_month.total_leads,
      conversations: Math.round(current_month.total_leads * 0.6),
      conversions: current_month.conversions,
      drop_off_rates: {
        follower_to_lead: this.calculateDropOff(12458, current_month.total_leads),
        lead_to_conversation: this.calculateDropOff(
          current_month.total_leads,
          Math.round(current_month.total_leads * 0.6)
        ),
        conversation_to_conversion: this.calculateDropOff(
          Math.round(current_month.total_leads * 0.6),
          current_month.conversions
        ),
      },
    }

    return {
      current_month,
      forecast,
      trends,
      funnel,
    }
  }

  private getCurrentMonthData(data: BusinessData, currentDate: Date) {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endOfMonth = currentDate

    return {
      revenue: data.revenue_by_day.filter((d) => {
        const date = new Date(d.date)
        return date >= startOfMonth && date <= endOfMonth
      }),
      leads: data.leads_by_day.filter((d) => {
        const date = new Date(d.date)
        return date >= startOfMonth && date <= endOfMonth
      }),
      conversions: data.conversions_by_day.filter((d) => {
        const date = new Date(d.date)
        return date >= startOfMonth && date <= endOfMonth
      }),
    }
  }

  private getPreviousMonthData(data: BusinessData, currentDate: Date) {
    const startOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    const endOfPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)

    return {
      revenue: data.revenue_by_day.filter((d) => {
        const date = new Date(d.date)
        return date >= startOfPrevMonth && date <= endOfPrevMonth
      }),
      leads: data.leads_by_day.filter((d) => {
        const date = new Date(d.date)
        return date >= startOfPrevMonth && date <= endOfPrevMonth
      }),
      conversions: data.conversions_by_day.filter((d) => {
        const date = new Date(d.date)
        return date >= startOfPrevMonth && date <= endOfPrevMonth
      }),
    }
  }

  private sumRevenue(data: { date: string; amount: number }[]): number {
    return data.reduce((sum, d) => sum + d.amount, 0)
  }

  private sumLeads(data: { date: string; count: number }[]): number {
    return data.reduce((sum, d) => sum + d.count, 0)
  }

  private sumConversions(data: { date: string; count: number }[]): number {
    return data.reduce((sum, d) => sum + d.count, 0)
  }

  private calculateConversionRate(leads: number, conversions: number): number {
    if (leads === 0) return 0
    return Math.round((conversions / leads) * 1000) / 10
  }

  private calculateTrend(previous: number, current: number): number {
    if (previous === 0) return current > 0 ? 100 : 0
    return Math.round(((current - previous) / previous) * 100)
  }

  private calculateDropOff(from: number, to: number): number {
    if (from === 0) return 0
    return Math.round((1 - to / from) * 100)
  }

  private calculateForecast(
    currentMonth: any,
    currentDate: Date
  ): MetricsResult['forecast'] {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate()
    const daysPassed = currentDate.getDate()
    const daysRemaining = daysInMonth - daysPassed

    const avgDailyRevenue =
      this.sumRevenue(currentMonth.revenue) / daysPassed
    const avgDailyLeads = this.sumLeads(currentMonth.leads) / daysPassed
    const avgDailyConversions =
      this.sumConversions(currentMonth.conversions) / daysPassed

    const projected_revenue = Math.round(
      this.sumRevenue(currentMonth.revenue) + avgDailyRevenue * daysRemaining
    )
    const projected_leads = Math.round(
      this.sumLeads(currentMonth.leads) + avgDailyLeads * daysRemaining
    )
    const projected_conversions = Math.round(
      this.sumConversions(currentMonth.conversions) + avgDailyConversions * daysRemaining
    )

    const confidence = Math.min(95, Math.round((daysPassed / daysInMonth) * 100))

    return {
      projected_revenue,
      projected_leads,
      projected_conversions,
      confidence,
    }
  }

  generateRevenueChart(data: { date: string; amount: number }[], period: '7d' | '30d' | '90d') {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90
    const now = new Date()
    const chartData = []

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]

      const dayData = data.find((d) => d.date === dateStr)
      chartData.push({
        date: dateStr,
        amount: dayData?.amount || 0,
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      })
    }

    return chartData
  }
}

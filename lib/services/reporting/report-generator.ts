// ============================================
// Report Generator
// Genera reportes profesionales con datos históricos
// ============================================

import Anthropic from '@anthropic-ai/sdk'

export interface ReportData {
  period: {
    start_date: string
    end_date: string
    days: number
  }
  business_metrics: {
    revenue: number
    revenue_growth: number
    leads: number
    leads_growth: number
    conversions: number
    conversion_rate: number
    avg_deal_value: number
  }
  content_performance: {
    total_posts: number
    avg_engagement: number
    top_content_type: string
    best_performing_post: {
      topic: string
      engagement_rate: number
      revenue: number
    }
  }
  audience_insights: {
    follower_growth: number
    total_followers: number
    engagement_rate: number
    top_demographics: {
      age_range: string
      percentage: number
    }
  }
  ads_performance?: {
    total_spend: number
    conversions: number
    avg_cpa: number
    avg_roas: number
  }
}

export interface GeneratedReport {
  title: string
  executive_summary: string
  sections: {
    title: string
    content: string
    metrics: { label: string; value: string; change?: string }[]
    insights: string[]
  }[]
  recommendations: string[]
  next_steps: string[]
}

export class ReportGenerator {
  private anthropic: Anthropic

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    })
  }

  async generateMonthlyReport(data: ReportData): Promise<GeneratedReport> {
    const prompt = `Generate a professional monthly business report for an infoproductor/coach.

PERIOD: ${data.period.start_date} to ${data.period.end_date} (${data.period.days} days)

BUSINESS METRICS:
- Revenue: $${data.business_metrics.revenue.toLocaleString()} (${data.business_metrics.revenue_growth >= 0 ? '+' : ''}${data.business_metrics.revenue_growth.toFixed(1)}%)
- Leads: ${data.business_metrics.leads} (${data.business_metrics.leads_growth >= 0 ? '+' : ''}${data.business_metrics.leads_growth.toFixed(1)}%)
- Conversions: ${data.business_metrics.conversions}
- Conversion Rate: ${data.business_metrics.conversion_rate.toFixed(1)}%
- Avg Deal Value: $${data.business_metrics.avg_deal_value}

CONTENT PERFORMANCE:
- Total Posts: ${data.content_performance.total_posts}
- Avg Engagement: ${data.content_performance.avg_engagement.toFixed(1)}%
- Top Content Type: ${data.content_performance.top_content_type}
- Best Post: "${data.content_performance.best_performing_post.topic}" (${data.content_performance.best_performing_post.engagement_rate.toFixed(1)}% engagement, $${data.content_performance.best_performing_post.revenue} revenue)

AUDIENCE:
- Follower Growth: ${data.audience_insights.follower_growth >= 0 ? '+' : ''}${data.audience_insights.follower_growth.toFixed(1)}%
- Total Followers: ${data.audience_insights.total_followers.toLocaleString()}
- Engagement Rate: ${data.audience_insights.engagement_rate.toFixed(1)}%
- Top Demographic: ${data.audience_insights.top_demographics.age_range} (${data.audience_insights.top_demographics.percentage}%)

${data.ads_performance ? `ADS PERFORMANCE:
- Total Spend: $${data.ads_performance.total_spend.toLocaleString()}
- Conversions: ${data.ads_performance.conversions}
- Avg CPA: $${data.ads_performance.avg_cpa.toFixed(2)}
- Avg ROAS: ${data.ads_performance.avg_roas.toFixed(2)}x` : ''}

Generate a professional report with:

1. Executive Summary (2-3 sentences highlighting key wins and challenges)

2. Sections (4-5 sections):
   - Revenue & Growth
   - Content Strategy
   - Audience Development
   - Marketing Performance (if ads data exists)
   - Each section needs: content (analysis), metrics array, insights array

3. Strategic Recommendations (3-5 actionable items)

4. Next Steps (3-4 specific actions for next month)

Return ONLY valid JSON with this structure:
{
  "title": "Monthly Report - [Month Year]",
  "executive_summary": "...",
  "sections": [
    {
      "title": "Section Title",
      "content": "Detailed analysis...",
      "metrics": [{"label": "Metric", "value": "Value", "change": "+10%"}],
      "insights": ["Insight 1", "Insight 2"]
    }
  ],
  "recommendations": ["Rec 1", "Rec 2"],
  "next_steps": ["Step 1", "Step 2"]
}

No markdown, just JSON.`

    try {
      const message = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 3072,
        messages: [{ role: 'user', content: prompt }],
      })

      const content = message.content[0]
      if (content.type === 'text') {
        const cleanJson = content.text.replace(/```json\n?|\n?```/g, '').trim()
        return JSON.parse(cleanJson)
      }

      throw new Error('Unexpected response format')
    } catch (error) {
      console.error('Report generation error:', error)
      return this.fallbackReport(data)
    }
  }

  private fallbackReport(data: ReportData): GeneratedReport {
    const monthYear = new Date(data.period.end_date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })

    return {
      title: `Monthly Report - ${monthYear}`,
      executive_summary: `Your business generated $${data.business_metrics.revenue.toLocaleString()} in revenue this month (${data.business_metrics.revenue_growth >= 0 ? 'up' : 'down'} ${Math.abs(data.business_metrics.revenue_growth).toFixed(1)}% from last month). Key wins include ${data.content_performance.total_posts} content pieces and ${data.business_metrics.leads} new leads.`,
      sections: [
        {
          title: 'Revenue & Growth',
          content: `This month you generated $${data.business_metrics.revenue.toLocaleString()} in revenue with ${data.business_metrics.conversions} conversions at a ${data.business_metrics.conversion_rate.toFixed(1)}% conversion rate.`,
          metrics: [
            {
              label: 'Total Revenue',
              value: `$${data.business_metrics.revenue.toLocaleString()}`,
              change: `${data.business_metrics.revenue_growth >= 0 ? '+' : ''}${data.business_metrics.revenue_growth.toFixed(1)}%`,
            },
            { label: 'Conversions', value: `${data.business_metrics.conversions}` },
            { label: 'Avg Deal Value', value: `$${data.business_metrics.avg_deal_value}` },
          ],
          insights: ['Revenue growth is trending positively', 'Conversion rate is within healthy range'],
        },
      ],
      recommendations: [
        'Focus on scaling your top-performing content type',
        'Improve lead nurturing to increase conversion rate',
        'Consider launching a new product tier',
      ],
      next_steps: [
        'Create 5 more posts in your best-performing format',
        'Implement email sequence for warm leads',
        'Review and optimize pricing strategy',
      ],
    }
  }

  async generateWeeklyReport(data: ReportData): Promise<GeneratedReport> {
    // Similar implementation but shorter, weekly-focused
    return this.generateMonthlyReport(data) // Simplified for now
  }

  async exportToCSV(data: any[]): Promise<string> {
    if (data.length === 0) return ''

    const headers = Object.keys(data[0])
    const csvRows = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header]
            return typeof value === 'string' && value.includes(',') ? `"${value}"` : value
          })
          .join(',')
      ),
    ]

    return csvRows.join('\n')
  }
}

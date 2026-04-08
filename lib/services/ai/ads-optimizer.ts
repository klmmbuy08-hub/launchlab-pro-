// ============================================
// AI Ads Optimizer
// Analiza performance y sugiere optimizaciones
// ============================================

import Anthropic from '@anthropic-ai/sdk'

interface CampaignData {
  id: string
  name: string
  objective: string
  daily_budget: number
  spent: number
  impressions: number
  clicks: number
  ctr: number
  cpc: number
  conversions: number
  cpa: number
  roas: number
  target_cpa?: number
  target_roas?: number
}

interface OptimizationRecommendation {
  type: 'budget_increase' | 'budget_decrease' | 'pause_campaign' | 'change_creative' | 'adjust_targeting' | 'bid_adjustment'
  priority: 'critical' | 'high' | 'medium' | 'low'
  title: string
  reason: string
  action: string
  expected_impact: string
  auto_executable: boolean
}

export class AdsOptimizer {
  private anthropic: Anthropic

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    })
  }

  async analyzeCampaign(campaign: CampaignData): Promise<OptimizationRecommendation[]> {
    const recommendations: OptimizationRecommendation[] = []

    // Rule-based optimizations (fast)
    recommendations.push(...this.ruleBasedOptimizations(campaign))

    // AI-powered optimizations (deep analysis)
    try {
      const aiRecommendations = await this.aiOptimizations(campaign)
      recommendations.push(...aiRecommendations)
    } catch (error) {
      console.error('AI optimization error:', error)
    }

    // Sort by priority
    return recommendations.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })
  }

  private ruleBasedOptimizations(campaign: CampaignData): OptimizationRecommendation[] {
    const recommendations: OptimizationRecommendation[] = []

    // High CPA - Pause or reduce budget
    if (campaign.target_cpa && campaign.cpa > campaign.target_cpa * 1.5) {
      recommendations.push({
        type: 'pause_campaign',
        priority: 'critical',
        title: 'CPA is 50% above target',
        reason: `Current CPA: $${campaign.cpa.toFixed(2)}, Target: $${campaign.target_cpa.toFixed(2)}`,
        action: 'Pause campaign immediately to prevent wasted spend',
        expected_impact: `Save $${((campaign.daily_budget / campaign.cpa) * (campaign.cpa - campaign.target_cpa)).toFixed(2)}/day`,
        auto_executable: true,
      })
    }

    // Low ROAS - Reduce budget
    if (campaign.target_roas && campaign.roas < campaign.target_roas * 0.7) {
      recommendations.push({
        type: 'budget_decrease',
        priority: 'high',
        title: 'ROAS below target',
        reason: `Current ROAS: ${campaign.roas.toFixed(2)}x, Target: ${campaign.target_roas.toFixed(2)}x`,
        action: `Reduce daily budget by 30% to $${(campaign.daily_budget * 0.7).toFixed(2)}`,
        expected_impact: 'Improve efficiency while gathering data',
        auto_executable: true,
      })
    }

    // Excellent performance - Scale up
    if (campaign.target_cpa && campaign.cpa < campaign.target_cpa * 0.8 && campaign.conversions > 5) {
      recommendations.push({
        type: 'budget_increase',
        priority: 'high',
        title: 'Campaign performing well - scale up',
        reason: `CPA is 20% below target with ${campaign.conversions} conversions`,
        action: `Increase daily budget by 20% to $${(campaign.daily_budget * 1.2).toFixed(2)}`,
        expected_impact: `Potential +${Math.round(campaign.conversions * 0.2)} conversions/day`,
        auto_executable: false, // Requires confirmation
      })
    }

    // Low CTR - Creative fatigue
    if (campaign.ctr < 1.0) {
      recommendations.push({
        type: 'change_creative',
        priority: 'medium',
        title: 'Low CTR indicates creative fatigue',
        reason: `CTR is ${campaign.ctr.toFixed(2)}% (industry avg: 1.5-2%)`,
        action: 'Test new creatives with different hooks',
        expected_impact: 'Improve CTR by 30-50%',
        auto_executable: false,
      })
    }

    return recommendations
  }

  private async aiOptimizations(campaign: CampaignData): Promise<OptimizationRecommendation[]> {
    const prompt = `Analyze this Meta Ads campaign and provide optimization recommendations:

CAMPAIGN: ${campaign.name}
OBJECTIVE: ${campaign.objective}
BUDGET: $${campaign.daily_budget}/day
SPENT: $${campaign.spent}

PERFORMANCE:
- Impressions: ${campaign.impressions.toLocaleString()}
- Clicks: ${campaign.clicks}
- CTR: ${campaign.ctr.toFixed(2)}%
- CPC: $${campaign.cpc.toFixed(2)}
- Conversions: ${campaign.conversions}
- CPA: $${campaign.cpa.toFixed(2)}
- ROAS: ${campaign.roas.toFixed(2)}x

${campaign.target_cpa ? `Target CPA: $${campaign.target_cpa}` : ''}
${campaign.target_roas ? `Target ROAS: ${campaign.target_roas}x` : ''}

Provide 2-3 advanced optimization recommendations that go beyond basic rules. Consider:
- Audience quality and targeting refinements
- Creative strategy adjustments
- Bidding strategy changes
- Timing and scheduling optimizations

Return JSON array with:
{
  "type": "adjust_targeting|change_creative|bid_adjustment",
  "priority": "high|medium|low",
  "title": "Brief title",
  "reason": "Why this matters",
  "action": "Specific action to take",
  "expected_impact": "Expected result",
  "auto_executable": false
}

Return ONLY valid JSON array, no markdown.`

    const message = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content[0]
    if (content.type === 'text') {
      const cleanJson = content.text.replace(/```json\n?|\n?```/g, '').trim()
      return JSON.parse(cleanJson)
    }

    return []
  }

  shouldAutoExecute(recommendation: OptimizationRecommendation, userPreferences: {
    auto_pause_high_cpa: boolean
    auto_scale_winners: boolean
    max_auto_budget_change: number
  }): boolean {
    if (!recommendation.auto_executable) return false

    switch (recommendation.type) {
      case 'pause_campaign':
        return userPreferences.auto_pause_high_cpa

      case 'budget_increase':
        return userPreferences.auto_scale_winners

      case 'budget_decrease':
        return true // Always auto-execute budget decreases

      default:
        return false
    }
  }
}

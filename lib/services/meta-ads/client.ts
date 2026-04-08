// ============================================
// Meta Ads API Client
// Integration with Facebook/Instagram Ads
// ============================================

interface AdAccount {
  id: string
  name: string
  currency: string
  balance: number
  spend_cap: number
}

interface Campaign {
  id: string
  name: string
  objective: string
  status: 'ACTIVE' | 'PAUSED' | 'DELETED'
  daily_budget: number
  lifetime_budget?: number
  start_time: string
  end_time?: string
}

interface AdSet {
  id: string
  campaign_id: string
  name: string
  status: string
  daily_budget: number
  targeting: any
  optimization_goal: string
}

interface AdCreative {
  id: string
  name: string
  object_story_spec: any
  thumbnail_url?: string
}

interface CampaignInsights {
  impressions: number
  reach: number
  clicks: number
  ctr: number
  cpc: number
  spend: number
  conversions: number
  cpa: number
  roas: number
}

export class MetaAdsClient {
  private accessToken: string
  private apiVersion = 'v18.0'

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  async getAdAccounts(): Promise<AdAccount[]> {
    const response = await fetch(
      `https://graph.facebook.com/${this.apiVersion}/me/adaccounts?access_token=${this.accessToken}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch ad accounts')
    }

    const data = await response.json()
    return data.data || []
  }

  async createCampaign(accountId: string, params: {
    name: string
    objective: string
    status: string
    daily_budget?: number
    lifetime_budget?: number
  }): Promise<Campaign> {
    const response = await fetch(
      `https://graph.facebook.com/${this.apiVersion}/${accountId}/campaigns`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...params,
          access_token: this.accessToken,
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to create campaign')
    }

    return response.json()
  }

  async updateCampaign(campaignId: string, params: {
    status?: string
    daily_budget?: number
    name?: string
  }): Promise<Campaign> {
    const response = await fetch(
      `https://graph.facebook.com/${this.apiVersion}/${campaignId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...params,
          access_token: this.accessToken,
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to update campaign')
    }

    return response.json()
  }

  async getCampaignInsights(
    campaignId: string,
    datePreset: 'today' | 'yesterday' | 'last_7d' | 'last_30d' = 'last_7d'
  ): Promise<CampaignInsights> {
    const response = await fetch(
      `https://graph.facebook.com/${this.apiVersion}/${campaignId}/insights?date_preset=${datePreset}&fields=impressions,reach,clicks,ctr,cpc,spend,actions,cost_per_action_type,purchase_roas&access_token=${this.accessToken}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch insights')
    }

    const data = await response.json()
    const insights = data.data[0] || {}

    // Extract conversion data
    const conversions = insights.actions?.find((a: any) => a.action_type === 'purchase')?.value || 0
    const cpa = insights.cost_per_action_type?.find((c: any) => c.action_type === 'purchase')?.value || 0

    return {
      impressions: parseInt(insights.impressions || 0),
      reach: parseInt(insights.reach || 0),
      clicks: parseInt(insights.clicks || 0),
      ctr: parseFloat(insights.ctr || 0),
      cpc: parseFloat(insights.cpc || 0),
      spend: parseFloat(insights.spend || 0),
      conversions: parseInt(conversions),
      cpa: parseFloat(cpa),
      roas: parseFloat(insights.purchase_roas?.[0]?.value || 0),
    }
  }

  async pauseCampaign(campaignId: string): Promise<void> {
    await this.updateCampaign(campaignId, { status: 'PAUSED' })
  }

  async activateCampaign(campaignId: string): Promise<void> {
    await this.updateCampaign(campaignId, { status: 'ACTIVE' })
  }
}

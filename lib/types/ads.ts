export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'failed';
export type CampaignObjective = 'leads' | 'sales' | 'awareness' | 'traffic' | 'engagement';
export type AdPlatform = 'meta' | 'google' | 'tiktok' | 'linkedin';

export interface AdCreative {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
}

export interface AdCampaign {
  id: string;
  user_id: string;
  name: string;
  platform: AdPlatform;
  objective: CampaignObjective;
  total_budget: number;
  daily_budget: number;
  spent: number;
  status: CampaignStatus;
  
  // Metrics
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  cpa: number;
  roas: number;
  
  creatives?: AdCreative[];
  ai_recommendations?: any;
  created_at: string;
}

export interface OptimizationSuggestion {
  id: string;
  campaign_id: string;
  type: 'budget_increase' | 'budget_decrease' | 'pause_ad' | 'creative_rotation' | 'target_tweak';
  reason: string;
  action: string;
  impact_score: number; // 0-100
}

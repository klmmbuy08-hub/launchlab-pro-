// ============================================
// LAUNCHOS V2 - TYPESCRIPT TYPES
// ============================================

export type Platform = 'instagram' | 'tiktok' | 'linkedin' | 'youtube'
export type ContentType = 'post' | 'reel' | 'story' | 'video'
export type CampaignObjective = 'leads' | 'sales' | 'awareness' | 'traffic' | 'engagement'
export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'failed'

// ============================================
// ACCOUNTS
// ============================================

export interface Account {
  id: string
  user_id: string
  platform: Platform
  username: string
  platform_user_id: string
  access_token: string
  refresh_token?: string
  token_expires_at?: string
  profile_data?: {
    display_name: string
    profile_picture_url: string
    bio: string
    followers_count: number
    following_count: number
    posts_count: number
  }
  is_active: boolean
  last_synced_at?: string
  connected_at: string
  updated_at: string
}

// ============================================
// CONTENT ANALYSIS
// ============================================

export interface ContentAnalysis {
  id: string
  account_id: string
  platform_content_id: string
  content_type: ContentType
  caption?: string
  media_url?: string
  permalink?: string

  // Metrics
  likes: number
  comments: number
  shares: number
  saves: number
  views?: number
  reach?: number
  engagement_rate: number

  // AI Analysis
  ai_analysis?: {
    sentiment: 'positive' | 'neutral' | 'negative'
    topics: string[]
    hook_type: string
    cta_present: boolean
    estimated_quality_score: number
  }

  // Revenue tracking
  generated_leads: number
  generated_sales: number
  revenue_attributed: number

  published_at: string
  analyzed_at: string
  created_at: string
  updated_at: string
}

// ============================================
// AUDIENCE INSIGHTS
// ============================================

export interface AudienceInsights {
  id: string
  account_id: string
  snapshot_date: string

  total_followers: number
  follower_growth: number

  demographics: {
    age_ranges: { range: string; percentage: number }[]
    gender: { male: number; female: number; other: number }
    top_locations: { city: string; country: string; percentage: number }[]
  }

  behavior_data: {
    online_times: { hour: number; day: string; engagement: number }[]
    interests: string[]
    engagement_patterns: {
      avg_likes_per_post: number
      avg_comments_per_post: number
      avg_shares_per_post: number
    }
  }

  top_followers: {
    username: string
    engagement_score: number
    value_score: number
    profile_url: string
  }[]

  ideal_follower_profile: {
    age_range: string
    gender: string
    location: string
    interests: string[]
    behaviors: string[]
    estimated_income_range?: string
  }

  created_at: string
}

// ============================================
// BUSINESS METRICS
// ============================================

export interface BusinessMetrics {
  id: string
  user_id: string
  date: string

  cash_collected: number
  revenue_forecast: number

  total_leads: number
  qualified_leads: number

  in_conversation: number
  converted: number
  conversion_rate: number

  avg_ltv: number

  revenue_by_source: {
    organic: number
    paid: number
    referral: number
    other: number
  }

  leads_by_source: {
    organic: number
    paid: number
    referral: number
    other: number
  }

  created_at: string
  updated_at: string
}

// ============================================
// COMPETITORS
// ============================================

export interface Competitor {
  id: string
  user_id: string
  platform: Platform
  username: string
  platform_user_id?: string

  profile_data?: {
    display_name: string
    bio: string
    followers: number
    following: number
    posts: number
    profile_picture_url: string
  }

  content_strategy: {
    posting_frequency: number // posts per week
    primary_content_types: ContentType[]
    themes: string[]
    avg_engagement_rate: number
  }

  pricing_info?: {
    products: { name: string; price: number }[]
    positioning: string
  }

  positioning?: string

  is_active: boolean
  last_analyzed_at?: string
  added_at: string
  updated_at: string
}

// ============================================
// AD CAMPAIGNS
// ============================================

export interface AdCampaign {
  id: string
  user_id: string
  account_id?: string

  name: string
  platform: 'meta' | 'google' | 'tiktok' | 'linkedin'
  platform_campaign_id?: string

  objective: CampaignObjective

  total_budget: number
  daily_budget: number
  spent: number

  target_audience: {
    age_min: number
    age_max: number
    genders: string[]
    locations: string[]
    interests: string[]
    behaviors: string[]
  }

  creatives: {
    id: string
    type: 'image' | 'video' | 'carousel'
    media_url: string
    headline: string
    description: string
    cta: string
  }[]

  ad_copy: {
    primary_text: string
    headline: string
    description: string
  }

  impressions: number
  clicks: number
  ctr: number
  conversions: number
  cpa: number
  roas: number

  status: CampaignStatus

  ai_optimization_enabled: boolean
  ai_recommendations?: {
    type: string
    reason: string
    suggested_action: string
    priority: 'low' | 'medium' | 'high'
  }[]

  start_date?: string
  end_date?: string
  created_at: string
  updated_at: string
}

// ============================================
// CONTENT CALENDAR
// ============================================

export interface ContentCalendarEntry {
  id: string
  user_id: string
  account_id?: string

  scheduled_date: string
  scheduled_time?: string

  content_type: ContentType
  caption?: string
  media_suggestions?: {
    type: 'image' | 'video'
    url?: string
    description: string
  }[]

  ai_generated: boolean
  ai_reasoning?: string

  status: 'planned' | 'approved' | 'published' | 'cancelled'

  published_content_id?: string

  created_at: string
  updated_at: string
}
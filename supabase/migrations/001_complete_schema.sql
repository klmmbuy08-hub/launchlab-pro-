-- ============================================
-- LAUNCHOS V2 - COMPLETE DATABASE SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS & AUTH
-- ============================================

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BUSINESS PROFILE
-- ============================================

CREATE TABLE IF NOT EXISTS public.business_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  business_type TEXT NOT NULL, -- fitness_coach, business_coach, etc.
  niche TEXT,
  product_name TEXT,
  product_price NUMERIC(10,2),
  monthly_revenue_goal NUMERIC(10,2),
  monthly_leads_goal INTEGER,
  target_conversion_rate NUMERIC(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ============================================
-- CONNECTED ACCOUNTS
-- ============================================

CREATE TABLE IF NOT EXISTS public.accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- instagram, tiktok, linkedin
  platform_user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  profile_data JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, platform)
);

-- ============================================
-- CONTENT ANALYSIS
-- ============================================

CREATE TABLE IF NOT EXISTS public.content_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE,
  platform_content_id TEXT NOT NULL,
  content_type TEXT NOT NULL, -- post, reel, story, carousel
  caption TEXT,
  published_at TIMESTAMPTZ,
  
  -- Metrics
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  engagement_rate NUMERIC(5,2),
  
  -- AI Analysis
  ai_analysis JSONB, -- sentiment, topics, hook_type, cta, etc.
  
  -- Business Impact
  revenue_attributed NUMERIC(10,2) DEFAULT 0,
  leads_generated INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(account_id, platform_content_id)
);

CREATE INDEX idx_content_user ON public.content_analysis(user_id);
CREATE INDEX idx_content_published ON public.content_analysis(published_at DESC);

-- ============================================
-- AUDIENCE INSIGHTS
-- ============================================

CREATE TABLE IF NOT EXISTS public.audience_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE,
  snapshot_date DATE NOT NULL,
  
  -- Demographics
  demographics JSONB NOT NULL, -- age_ranges, gender, locations
  
  -- Growth
  total_followers INTEGER NOT NULL,
  follower_growth NUMERIC(5,2),
  
  -- Engagement
  avg_engagement_rate NUMERIC(5,2),
  
  -- Ideal Follower Profile (AI generated)
  ideal_follower_profile JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(account_id, snapshot_date)
);

CREATE INDEX idx_audience_user ON public.audience_insights(user_id);
CREATE INDEX idx_audience_date ON public.audience_insights(snapshot_date DESC);

-- ============================================
-- BUSINESS METRICS
-- ============================================

CREATE TABLE IF NOT EXISTS public.business_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  
  -- Revenue
  revenue NUMERIC(10,2) DEFAULT 0,
  
  -- Leads & Conversions
  leads INTEGER DEFAULT 0,
  qualified_leads INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  
  -- Pipeline
  pipeline_value NUMERIC(10,2) DEFAULT 0,
  
  -- Sources
  revenue_organic NUMERIC(10,2) DEFAULT 0,
  revenue_paid_ads NUMERIC(10,2) DEFAULT 0,
  revenue_referrals NUMERIC(10,2) DEFAULT 0,
  revenue_other NUMERIC(10,2) DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, metric_date)
);

CREATE INDEX idx_metrics_user ON public.business_metrics(user_id);
CREATE INDEX idx_metrics_date ON public.business_metrics(metric_date DESC);

-- ============================================
-- COMPETITORS
-- ============================================

CREATE TABLE IF NOT EXISTS public.competitors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  username TEXT NOT NULL,
  profile_data JSONB,
  
  -- Latest Analysis
  latest_analysis JSONB,
  last_analyzed_at TIMESTAMPTZ,
  
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, platform, username)
);

CREATE TABLE IF NOT EXISTS public.competitor_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  competitor_id UUID REFERENCES public.competitors(id) ON DELETE CASCADE,
  snapshot_date DATE NOT NULL,
  
  followers INTEGER,
  following INTEGER,
  posts_count INTEGER,
  avg_engagement_rate NUMERIC(5,2),
  
  -- AI Analysis
  content_strategy JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(competitor_id, snapshot_date)
);

-- ============================================
-- AD CAMPAIGNS
-- ============================================

CREATE TABLE IF NOT EXISTS public.ad_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Meta Ads
  meta_campaign_id TEXT UNIQUE,
  campaign_name TEXT NOT NULL,
  objective TEXT NOT NULL,
  status TEXT NOT NULL, -- ACTIVE, PAUSED, DELETED
  
  -- Budget
  daily_budget NUMERIC(10,2),
  lifetime_budget NUMERIC(10,2),
  
  -- Targets
  target_cpa NUMERIC(10,2),
  target_roas NUMERIC(5,2),
  
  -- Dates
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ad_optimization_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES public.ad_campaigns(id) ON DELETE CASCADE,
  
  optimization_type TEXT NOT NULL, -- budget_increase, pause, creative_change, etc.
  reason TEXT NOT NULL,
  action_taken TEXT NOT NULL,
  
  -- Metrics before/after
  metrics_before JSONB,
  metrics_after JSONB,
  
  auto_executed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CONTENT CALENDAR
-- ============================================

CREATE TABLE IF NOT EXISTS public.content_calendar (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  
  scheduled_date DATE NOT NULL,
  content_type TEXT NOT NULL, -- reel, carousel, post, story
  topic TEXT NOT NULL,
  caption_hook TEXT,
  content_category TEXT NOT NULL, -- educational, promotional, etc.
  cta TEXT,
  
  best_time_to_post TEXT,
  reasoning TEXT,
  estimated_engagement NUMERIC(5,2),
  
  status TEXT DEFAULT 'planned', -- planned, approved, published
  published_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_calendar_user ON public.content_calendar(user_id);
CREATE INDEX idx_calendar_date ON public.content_calendar(scheduled_date);

-- ============================================
-- REPORTS
-- ============================================

CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  
  report_type TEXT NOT NULL, -- weekly, monthly, quarterly
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  
  -- Generated Report
  report_data JSONB NOT NULL, -- executive_summary, sections, recommendations
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, report_type, period_start)
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audience_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitor_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_optimization_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own data

CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own business profile" ON public.business_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own business profile" ON public.business_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own accounts" ON public.accounts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own accounts" ON public.accounts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own content" ON public.content_analysis
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own content" ON public.content_analysis
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own audience" ON public.audience_insights
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own audience" ON public.audience_insights
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own metrics" ON public.business_metrics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own metrics" ON public.business_metrics
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own competitors" ON public.competitors
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own competitors" ON public.competitors
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own campaigns" ON public.ad_campaigns
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own campaigns" ON public.ad_campaigns
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own calendar" ON public.content_calendar
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own calendar" ON public.content_calendar
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own reports" ON public.reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own reports" ON public.reports
  FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- AUTO-UPDATE TIMESTAMPS
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_business_profiles_updated_at BEFORE UPDATE ON public.business_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON public.accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON public.content_analysis
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_metrics_updated_at BEFORE UPDATE ON public.business_metrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_competitors_updated_at BEFORE UPDATE ON public.competitors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON public.ad_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_updated_at BEFORE UPDATE ON public.content_calendar
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

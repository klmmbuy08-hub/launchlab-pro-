-- ============================================
-- LAUNCHOS V2 - NUEVA ARQUITECTURA
-- ============================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: accounts
-- Cuentas de redes sociales conectadas
-- ============================================

CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Información de la cuenta
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'tiktok', 'linkedin', 'youtube')),
  username TEXT NOT NULL,
  platform_user_id TEXT NOT NULL,

  -- Tokens de acceso
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,

  -- Metadata
  profile_data JSONB, -- foto, bio, followers, etc.
  is_active BOOLEAN DEFAULT true,
  last_synced_at TIMESTAMPTZ,

  -- Timestamps
  connected_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(platform, platform_user_id)
);

CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_accounts_platform ON accounts(platform);

-- ============================================
-- TABLE: content_analysis
-- Análisis de contenido (posts, reels, stories)
-- ============================================

CREATE TABLE IF NOT EXISTS content_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

  -- Identificación del contenido
  platform_content_id TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('post', 'reel', 'story', 'video')),

  -- Contenido
  caption TEXT,
  media_url TEXT,
  permalink TEXT,

  -- Métricas
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  views INTEGER,
  reach INTEGER,
  engagement_rate DECIMAL(5,2),

  -- Análisis IA
  ai_analysis JSONB, -- sentiment, topics, hook_type, etc.

  -- Revenue tracking (conectado con ventas)
  generated_leads INTEGER DEFAULT 0,
  generated_sales INTEGER DEFAULT 0,
  revenue_attributed DECIMAL(10,2) DEFAULT 0,

  -- Timestamps
  published_at TIMESTAMPTZ NOT NULL,
  analyzed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(account_id, platform_content_id)
);

CREATE INDEX idx_content_account_id ON content_analysis(account_id);
CREATE INDEX idx_content_published_at ON content_analysis(published_at DESC);
CREATE INDEX idx_content_engagement ON content_analysis(engagement_rate DESC);
CREATE INDEX idx_content_revenue ON content_analysis(revenue_attributed DESC);

-- ============================================
-- TABLE: audience_insights
-- Análisis de audiencia y seguidores
-- ============================================

CREATE TABLE IF NOT EXISTS audience_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

  -- Fecha del snapshot
  snapshot_date DATE NOT NULL,

  -- Métricas generales
  total_followers INTEGER NOT NULL,
  follower_growth INTEGER DEFAULT 0,

  -- Demografia
  demographics JSONB, -- age, gender, location

  -- Comportamiento
  behavior_data JSONB, -- online_times, interests, engagement_patterns

  -- Top seguidores del período
  top_followers JSONB, -- array de {username, engagement, value_score}

  -- Seguidor ideal (calculado por IA)
  ideal_follower_profile JSONB,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(account_id, snapshot_date)
);

CREATE INDEX idx_audience_account_id ON audience_insights(account_id);
CREATE INDEX idx_audience_date ON audience_insights(snapshot_date DESC);

-- ============================================
-- TABLE: business_metrics
-- Métricas de negocio (revenue, leads, pipeline)
-- ============================================

CREATE TABLE IF NOT EXISTS business_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Fecha
  date DATE NOT NULL,

  -- Revenue
  cash_collected DECIMAL(10,2) DEFAULT 0,
  revenue_forecast DECIMAL(10,2),

  -- Leads
  total_leads INTEGER DEFAULT 0,
  qualified_leads INTEGER DEFAULT 0,

  -- Pipeline
  in_conversation INTEGER DEFAULT 0,
  converted INTEGER DEFAULT 0,
  conversion_rate DECIMAL(5,2),

  -- Cliente lifetime value
  avg_ltv DECIMAL(10,2),

  -- Fuentes
  revenue_by_source JSONB, -- {organic: X, paid: Y, referral: Z}
  leads_by_source JSONB,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, date)
);

CREATE INDEX idx_business_user_id ON business_metrics(user_id);
CREATE INDEX idx_business_date ON business_metrics(date DESC);

-- ============================================
-- TABLE: competitors
-- Competidores trackeados
-- ============================================

CREATE TABLE IF NOT EXISTS competitors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Info del competidor
  platform TEXT NOT NULL,
  username TEXT NOT NULL,
  platform_user_id TEXT,

  -- Metadata
  profile_data JSONB, -- bio, followers, etc.

  -- Análisis
  content_strategy JSONB, -- posting_frequency, content_types, themes
  pricing_info JSONB,
  positioning TEXT,

  -- Tracking
  is_active BOOLEAN DEFAULT true,
  last_analyzed_at TIMESTAMPTZ,

  -- Timestamps
  added_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, platform, username)
);

CREATE INDEX idx_competitors_user_id ON competitors(user_id);

-- ============================================
-- TABLE: competitor_snapshots
-- Snapshots periódicos de competidores
-- ============================================

CREATE TABLE IF NOT EXISTS competitor_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  competitor_id UUID NOT NULL REFERENCES competitors(id) ON DELETE CASCADE,

  -- Fecha del snapshot
  snapshot_date DATE NOT NULL,

  -- Métricas
  followers INTEGER,
  following INTEGER,
  total_posts INTEGER,
  avg_engagement_rate DECIMAL(5,2),

  -- Top content del período
  top_content JSONB, -- array de top posts

  -- Análisis
  content_themes JSONB,
  posting_frequency JSONB,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(competitor_id, snapshot_date)
);

CREATE INDEX idx_snapshots_competitor_id ON competitor_snapshots(competitor_id);
CREATE INDEX idx_snapshots_date ON competitor_snapshots(snapshot_date DESC);

-- ============================================
-- TABLE: ad_campaigns
-- Campañas de ads gestionadas por AI
-- ============================================

CREATE TABLE IF NOT EXISTS ad_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,

  -- Info de la campaña
  name TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('meta', 'google', 'tiktok', 'linkedin')),
  platform_campaign_id TEXT,

  -- Objetivos
  objective TEXT NOT NULL CHECK (objective IN ('leads', 'sales', 'awareness', 'traffic', 'engagement')),

  -- Presupuesto
  total_budget DECIMAL(10,2) NOT NULL,
  daily_budget DECIMAL(10,2),
  spent DECIMAL(10,2) DEFAULT 0,

  -- Configuración
  target_audience JSONB,
  creatives JSONB, -- array de creativos
  ad_copy JSONB,

  -- Métricas
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  ctr DECIMAL(5,2),
  conversions INTEGER DEFAULT 0,
  cpa DECIMAL(10,2),
  roas DECIMAL(5,2),

  -- Estado
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed', 'failed')),

  -- AI config
  ai_optimization_enabled BOOLEAN DEFAULT true,
  ai_recommendations JSONB,

  -- Timestamps
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_campaigns_user_id ON ad_campaigns(user_id);
CREATE INDEX idx_campaigns_status ON ad_campaigns(status);

-- ============================================
-- TABLE: ad_optimization_logs
-- Logs de optimizaciones automáticas del AI Ads Manager
-- ============================================

CREATE TABLE IF NOT EXISTS ad_optimization_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID NOT NULL REFERENCES ad_campaigns(id) ON DELETE CASCADE,

  -- Tipo de optimización
  optimization_type TEXT NOT NULL, -- 'budget_increase', 'budget_decrease', 'pause_ad', 'creative_rotation', etc.

  -- Detalles
  reason TEXT NOT NULL,
  action_taken JSONB,
  metrics_before JSONB,
  metrics_after JSONB,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_optimization_campaign_id ON ad_optimization_logs(campaign_id);
CREATE INDEX idx_optimization_created_at ON ad_optimization_logs(created_at DESC);

-- ============================================
-- TABLE: content_calendar
-- Calendario de contenido planificado
-- ============================================

CREATE TABLE IF NOT EXISTS content_calendar (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,

  -- Fecha programada
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,

  -- Contenido
  content_type TEXT NOT NULL,
  caption TEXT,
  media_suggestions JSONB,

  -- Generado por IA
  ai_generated BOOLEAN DEFAULT false,
  ai_reasoning TEXT, -- Por qué la IA sugirió este contenido

  -- Estado
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'approved', 'published', 'cancelled')),

  -- Referencia si fue publicado
  published_content_id UUID REFERENCES content_analysis(id),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_calendar_user_id ON content_calendar(user_id);
CREATE INDEX idx_calendar_date ON content_calendar(scheduled_date);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON content_analysis
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_business_updated_at BEFORE UPDATE ON business_metrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_competitors_updated_at BEFORE UPDATE ON competitors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON ad_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_updated_at BEFORE UPDATE ON content_calendar
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE audience_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_optimization_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_calendar ENABLE ROW LEVEL SECURITY;

-- Policies para accounts
CREATE POLICY "Users can view their own accounts"
  ON accounts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own accounts"
  ON accounts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own accounts"
  ON accounts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own accounts"
  ON accounts FOR DELETE
  USING (auth.uid() = user_id);

-- Policies para content_analysis
CREATE POLICY "Users can view content from their accounts"
  ON content_analysis FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM accounts WHERE accounts.id = content_analysis.account_id AND accounts.user_id = auth.uid()
  ));

-- Policies para business_metrics
CREATE POLICY "Users can view their own metrics"
  ON business_metrics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own metrics"
  ON business_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own metrics"
  ON business_metrics FOR UPDATE
  USING (auth.uid() = user_id);

-- Policies similares para otras tablas...
CREATE POLICY "Users can view their competitors" ON competitors FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create competitors" ON competitors FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their competitors" ON competitors FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their competitors" ON competitors FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their campaigns" ON ad_campaigns FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create campaigns" ON ad_campaigns FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their campaigns" ON ad_campaigns FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their calendar" ON content_calendar FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create calendar entries" ON content_calendar FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their calendar" ON content_calendar FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete calendar entries" ON content_calendar FOR DELETE USING (auth.uid() = user_id);
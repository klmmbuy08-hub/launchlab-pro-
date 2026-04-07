-- ============================================
-- LAUNCHOS AGENTS SYSTEM - DATABASE SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: launches
-- Información principal de cada lanzamiento
-- ============================================

CREATE TABLE IF NOT EXISTS launches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Información básica
  name TEXT NOT NULL,
  product_type TEXT NOT NULL CHECK (product_type IN ('course', 'mentorship', 'community', 'ebook', 'coaching', 'saas')),
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  target_audience TEXT NOT NULL,
  
  -- Estrategia
  launch_date DATE,
  current_audience TEXT NOT NULL CHECK (current_audience IN ('none', 'small', 'medium', 'large')),
  budget DECIMAL(10,2) NOT NULL CHECK (budget >= 0),
  experience_level TEXT NOT NULL CHECK (experience_level IN ('first_launch', 'some_experience', 'expert')),
  
  -- Preferencias
  tone TEXT DEFAULT 'inspirational' CHECK (tone IN ('professional', 'casual', 'inspirational', 'aggressive')),
  copy_style TEXT DEFAULT 'short_concise' CHECK (copy_style IN ('long_form', 'short_concise', 'storytelling')),
  design_style TEXT DEFAULT 'vibrant' CHECK (design_style IN ('minimalist', 'vibrant', 'corporate', 'startup')),
  risk_tolerance TEXT DEFAULT 'balanced' CHECK (risk_tolerance IN ('conservative', 'balanced', 'aggressive')),
  
  -- Contexto adicional
  main_problem TEXT,
  unique_value TEXT,
  has_testimonials BOOLEAN DEFAULT false,
  has_previous_launches BOOLEAN DEFAULT false,
  
  -- Estado
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'paused', 'cancelled')),
  
  -- Datos de onboarding
  onboarding_data JSONB,
  onboarding_completed_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index para búsquedas rápidas
CREATE INDEX idx_launches_user_id ON launches(user_id);
CREATE INDEX idx_launches_status ON launches(status);
CREATE INDEX idx_launches_created_at ON launches(created_at DESC);

-- ============================================
-- TABLE: agent_generations
-- Almacena cada generación de cada agente
-- ============================================

CREATE TABLE IF NOT EXISTS agent_generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  launch_id UUID NOT NULL REFERENCES launches(id) ON DELETE CASCADE,
  
  -- Identificación del agente
  agent_type TEXT NOT NULL CHECK (agent_type IN ('ceo', 'cmo', 'sales', 'designer', 'voice', 'cdo', 'coo')),
  
  -- Datos de generación
  input JSONB NOT NULL, -- Datos que se enviaron al agente
  output JSONB, -- Resultado del agente (JSON estructurado)
  
  -- Versionado
  version INTEGER DEFAULT 1,
  parent_generation_id UUID REFERENCES agent_generations(id),
  
  -- Estado
  status TEXT DEFAULT 'generating' CHECK (status IN ('pending', 'generating', 'completed', 'failed', 'edited')),
  
  -- Métricas
  tokens_used INTEGER,
  generation_time_ms INTEGER,
  
  -- Feedback del usuario
  user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5),
  user_feedback TEXT,
  
  -- Error handling
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_agent_generations_launch_id ON agent_generations(launch_id);
CREATE INDEX idx_agent_generations_agent_type ON agent_generations(agent_type);
CREATE INDEX idx_agent_generations_status ON agent_generations(status);
CREATE INDEX idx_agent_generations_version ON agent_generations(launch_id, agent_type, version);

-- ============================================
-- TABLE: agent_tasks
-- Para tracking de progreso en tiempo real
-- ============================================

CREATE TABLE IF NOT EXISTS agent_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  launch_id UUID NOT NULL REFERENCES launches(id) ON DELETE CASCADE,
  
  -- Identificación
  agent_type TEXT NOT NULL,
  task_type TEXT NOT NULL, -- 'generate_timeline', 'generate_hooks', etc.
  
  -- Estado
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  
  -- Progreso (para UI)
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  current_step TEXT,
  
  -- Error handling
  retry_count INTEGER DEFAULT 0,
  error_message TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_agent_tasks_launch_id ON agent_tasks(launch_id);
CREATE INDEX idx_agent_tasks_status ON agent_tasks(status);

-- ============================================
-- TABLE: agent_debates
-- Almacena debates/desacuerdos entre agentes
-- ============================================

CREATE TABLE IF NOT EXISTS agent_debates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  launch_id UUID NOT NULL REFERENCES launches(id) ON DELETE CASCADE,
  
  -- Agentes involucrados
  agents_involved TEXT[] NOT NULL,
  
  -- Contexto del debate
  scenario TEXT NOT NULL,
  topic TEXT NOT NULL,
  
  -- Perspectivas
  perspectives JSONB NOT NULL, -- Array de {agent, position, rationale, data}
  
  -- Resolución
  user_decision TEXT,
  resolved_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_agent_debates_launch_id ON agent_debates(launch_id);

-- ============================================
-- TABLE: launch_metrics
-- Métricas en tiempo real del lanzamiento
-- ============================================

CREATE TABLE IF NOT EXISTS launch_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  launch_id UUID NOT NULL REFERENCES launches(id) ON DELETE CASCADE,
  
  -- Fecha de la métrica
  date DATE NOT NULL,
  
  -- Métricas principales
  revenue DECIMAL(10,2) DEFAULT 0,
  leads INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  conversion_rate DECIMAL(5,2),
  
  -- Métricas por canal
  metrics_by_channel JSONB, -- {meta_ads: {...}, google_ads: {...}, organic: {...}}
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraint: Una fila por día por lanzamiento
  UNIQUE(launch_id, date)
);

-- Index
CREATE INDEX idx_launch_metrics_launch_date ON launch_metrics(launch_id, date DESC);

-- ============================================
-- FUNCTIONS: Auto-update timestamps
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para auto-update
CREATE TRIGGER update_launches_updated_at BEFORE UPDATE ON launches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_generations_updated_at BEFORE UPDATE ON agent_generations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_tasks_updated_at BEFORE UPDATE ON agent_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_launch_metrics_updated_at BEFORE UPDATE ON launch_metrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE launches ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_debates ENABLE ROW LEVEL SECURITY;
ALTER TABLE launch_metrics ENABLE ROW LEVEL SECURITY;

-- Policies para launches
CREATE POLICY "Users can view their own launches"
  ON launches FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own launches"
  ON launches FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own launches"
  ON launches FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own launches"
  ON launches FOR DELETE
  USING (auth.uid() = user_id);

-- Policies para agent_generations
CREATE POLICY "Users can view generations from their launches"
  ON agent_generations FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM launches WHERE launches.id = agent_generations.launch_id AND launches.user_id = auth.uid()
  ));

CREATE POLICY "Users can create generations for their launches"
  ON agent_generations FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM launches WHERE launches.id = agent_generations.launch_id AND launches.user_id = auth.uid()
  ));

CREATE POLICY "Users can update generations from their launches"
  ON agent_generations FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM launches WHERE launches.id = agent_generations.launch_id AND launches.user_id = auth.uid()
  ));

-- Policies similares para otras tablas
CREATE POLICY "Users can view tasks from their launches"
  ON agent_tasks FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM launches WHERE launches.id = agent_tasks.launch_id AND launches.user_id = auth.uid()
  ));

CREATE POLICY "Users can view debates from their launches"
  ON agent_debates FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM launches WHERE launches.id = agent_debates.launch_id AND launches.user_id = auth.uid()
  ));

CREATE POLICY "Users can view metrics from their launches"
  ON launch_metrics FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM launches WHERE launches.id = launch_metrics.launch_id AND launches.user_id = auth.uid()
  ));

-- ============================================
-- VIEWS: Para consultas comunes
-- ============================================

-- Vista de lanzamientos con última generación de cada agente
CREATE OR REPLACE VIEW launches_with_agents AS
SELECT 
  l.*,
  (
    SELECT jsonb_object_agg(
      ag.agent_type,
      jsonb_build_object(
        'id', ag.id,
        'status', ag.status,
        'version', ag.version,
        'output', ag.output,
        'completed_at', ag.completed_at
      )
    )
    FROM (
      SELECT DISTINCT ON (agent_type)
        agent_type, id, status, version, output, completed_at
      FROM agent_generations
      WHERE launch_id = l.id
      ORDER BY agent_type, version DESC, created_at DESC
    ) ag
  ) as agents
FROM launches l;

-- ============================================
-- SEED DATA (opcional, para testing)
-- ============================================

-- Función para crear lanzamiento demo
CREATE OR REPLACE FUNCTION create_demo_launch(p_user_id UUID)
RETURNS UUID AS $$
DECLARE
  v_launch_id UUID;
BEGIN
  INSERT INTO launches (
    user_id, name, product_type, price, target_audience,
    current_audience, budget, experience_level,
    status, main_problem, unique_value
  ) VALUES (
    p_user_id,
    'Masterclass de Copywriting',
    'course',
    997,
    'Emprendedores digitales que quieren mejorar sus ventas',
    'small',
    5000,
    'some_experience',
    'active',
    'No saben escribir copy que convierte',
    'Sistema único que combina copywriting + psicología + IA'
  ) RETURNING id INTO v_launch_id;
  
  RETURN v_launch_id;
END;
$$ LANGUAGE plpgsql;

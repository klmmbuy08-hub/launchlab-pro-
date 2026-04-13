-- Tabla de Leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  status VARCHAR(20) DEFAULT 'new',
  source VARCHAR(100),
  value DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Contenido
CREATE TABLE IF NOT EXISTS content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  platform VARCHAR(50) NOT NULL,
  content_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'draft',
  scheduled_date TIMESTAMP,
  published_date TIMESTAMP,
  ai_score INTEGER,
  engagement_likes INTEGER DEFAULT 0,
  engagement_comments INTEGER DEFAULT 0,
  engagement_shares INTEGER DEFAULT 0,
  engagement_views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Workflows
CREATE TABLE IF NOT EXISTS workflows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  platform VARCHAR(50) NOT NULL,
  trigger TEXT,
  executions INTEGER DEFAULT 0,
  last_run TIMESTAMP,
  success_rate DECIMAL(5, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Integraciones
CREATE TABLE IF NOT EXISTS integrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  status VARCHAR(20) DEFAULT 'disconnected',
  icon VARCHAR(255),
  description TEXT,
  config JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para mejor performance
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_content_status ON content(status);
CREATE INDEX idx_content_platform ON content(platform);
CREATE INDEX idx_workflows_status ON workflows(status);

-- Enable RLS (Row Level Security)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;

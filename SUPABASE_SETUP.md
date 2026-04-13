# 🗄️ Configuración de Supabase - LaunchOS

## Paso 1: Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Click en "New Project"
3. Selecciona tu organización
4. Configura:
   - **Project Name**: `launchos`
   - **Database Password**: Genera una segura
   - **Region**: Elige la más cercana (ej: `us-east-1`)
5. Click "Create new project"

## Paso 2: Obtener Credenciales

Una vez creado el proyecto:

1. Ve a **Settings → API**
2. Copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Paso 3: Configurar Variables de Entorno

Crea o actualiza `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-random-secret-here
```

## Paso 4: Crear Tablas

En Supabase, ve a **SQL Editor** y ejecuta:

```sql
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

-- Índices
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_content_status ON content(status);
CREATE INDEX idx_content_platform ON content(platform);
CREATE INDEX idx_workflows_status ON workflows(status);

-- RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
```

## Paso 5: Instalar Dependencia

```bash
npm install @supabase/supabase-js
```

## Paso 6: Usar en tu Aplicación

### Importar el cliente:
```typescript
import { supabase } from '@/lib/supabase/client'
```

### Usar los hooks:
```typescript
import { useLeads } from '@/lib/hooks/use-leads'

export default function LeadsPage() {
  const { leads, loading, addLead } = useLeads()
  // ...
}
```

### Llamadas directas:
```typescript
// Obtener datos
const { data, error } = await supabase
  .from('leads')
  .select('*')
  .order('created_at', { ascending: false })

// Insertar
const { data } = await supabase
  .from('leads')
  .insert([{ name, email, phone, company, status: 'new' }])
  .select()

// Actualizar
const { data } = await supabase
  .from('leads')
  .update({ status: 'qualified' })
  .eq('id', leadId)
  .select()
```

## Paso 7: Habilitar RLS Policies (Seguridad)

Para permitir que los usuarios autenticados accedan a sus datos:

Ve a **Authentication → Policies** para cada tabla y añade:

```sql
-- Allow authenticated users to read their own data
CREATE POLICY "Users can read own leads"
ON leads FOR SELECT
USING (auth.uid() = user_id);

-- Allow authenticated users to insert
CREATE POLICY "Users can insert leads"
ON leads FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to update
CREATE POLICY "Users can update own leads"
ON leads FOR UPDATE
USING (auth.uid() = user_id);
```

## Paso 8: Habilitar Autenticación (Opcional)

En **Authentication:**
1. Ve a **Providers**
2. Habilita los que necesites:
   - Email/Password
   - Google
   - GitHub
   - etc.

## 📊 Estructura de Datos

### Leads
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string",
  "status": "new|contacted|qualified|proposal|closed",
  "source": "string",
  "value": 2500,
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Content
```json
{
  "id": "uuid",
  "title": "string",
  "platform": "instagram|linkedin|tiktok|twitter",
  "content_type": "reel|carousel|post|story",
  "status": "draft|scheduled|published",
  "scheduled_date": "timestamp|null",
  "published_date": "timestamp|null",
  "ai_score": 85,
  "engagement_likes": 245,
  "engagement_comments": 32,
  "engagement_shares": 18,
  "engagement_views": 3400,
  "created_at": "timestamp"
}
```

### Workflows
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "status": "active|paused|draft",
  "platform": "n8n|make|zapier",
  "trigger": "string",
  "executions": 245,
  "last_run": "timestamp",
  "success_rate": 94,
  "created_at": "timestamp"
}
```

## ✅ Checklist

- [ ] Proyecto creado en Supabase
- [ ] Credenciales copiadas
- [ ] Variables de entorno configuradas
- [ ] Tablas creadas
- [ ] @supabase/supabase-js instalado
- [ ] Hooks probados en componentes
- [ ] RLS habilitado (opcional)
- [ ] Auth configurado (opcional)

## 🐛 Troubleshooting

### Error: "CORS error"
Solución: Ve a **Settings → CORS** en Supabase y añade tu URL local

### Error: "Unauthorized"
Solución: Verifica que tienes las credenciales correctas en .env.local

### Error: "Row-level security violation"
Solución: Habilita los RLS policies correctamente o desactiva RLS temporalmente

## 📚 Recursos

- [Supabase Docs](https://supabase.com/docs)
- [JavaScript Client](https://supabase.com/docs/reference/javascript)
- [SQL Reference](https://supabase.com/docs/guides/database)

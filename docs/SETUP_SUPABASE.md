# Setup Supabase para LaunchLab Pro

## 1. Crear la tabla `launches`

Copia y ejecuta este SQL en la consola de Supabase (SQL Editor):

```sql
CREATE TABLE launches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  product_type TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  target_audience TEXT NOT NULL,
  launch_date DATE,
  description TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para mejorar queries por fecha
CREATE INDEX launches_created_at_idx ON launches(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE launches ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública (opcional)
CREATE POLICY "Allow public read" ON launches
  FOR SELECT USING (true);

-- Política para permitir inserción pública (opcional para MVP)
CREATE POLICY "Allow public insert" ON launches
  FOR INSERT WITH CHECK (true);

-- Política para permitir actualización pública (opcional para MVP)
CREATE POLICY "Allow public update" ON launches
  FOR UPDATE USING (true);

-- Política para permitir eliminación pública (opcional para MVP)
CREATE POLICY "Allow public delete" ON launches
  FOR DELETE USING (true);
```

## 2. Variables de entorno

Ya están configuradas en `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 3. Verificar conexión

El formulario en `/launches/new` ahora se conecta automáticamente a Supabase y guarda los datos cuando haces submit.

## 4. Seguridad (Próximos pasos)

Para producción:
- Implementar autenticación de usuarios
- Crear RLS policies por usuario en lugar de públicas
- Validar datos en backend
- Implementar rate limiting

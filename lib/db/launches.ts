import { supabase } from '@/lib/supabase/client'
import { OnboardingData } from '@/lib/types/onboarding'

export interface Launch {
  id: string
  user_id: string
  name: string
  product_type: string
  price: number
  target_audience: string
  launch_date?: string
  current_audience: string
  budget: number
  experience_level: string
  tone: string
  copy_style: string
  design_style: string
  risk_tolerance: string
  main_problem?: string
  unique_value?: string
  has_testimonials: boolean
  has_previous_launches: boolean
  status: 'draft' | 'active' | 'completed' | 'paused' | 'cancelled'
  onboarding_data?: any
  onboarding_completed_at?: string
  created_at: string
  updated_at: string
}

export interface CreateLaunchInput {
  name: string
  product_type: string
  price: number
  target_audience: string
  launch_date?: string
  current_audience: string
  budget: number
  experience_level: string
  tone?: string
  copy_style?: string
  design_style?: string
  risk_tolerance?: string
  main_problem?: string
  unique_value?: string
  has_testimonials?: boolean
  has_previous_launches?: boolean
  onboarding_data?: OnboardingData
}

// Crear lanzamiento
export async function createLaunch(data: CreateLaunchInput) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Not authenticated')

  const { data: launch, error } = await supabase
    .from('launches')
    .insert({
      user_id: session.user.id,
      ...data,
      status: 'draft',
      onboarding_completed_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  return launch as Launch
}

// Obtener lanzamientos del usuario
export async function getUserLaunches() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('launches')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Launch[]
}

// Obtener lanzamiento por ID
export async function getLaunchById(id: string) {
  const { data, error } = await supabase
    .from('launches')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Launch
}

// Actualizar lanzamiento
export async function updateLaunch(id: string, updates: Partial<CreateLaunchInput>) {
  const { data, error } = await supabase
    .from('launches')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Launch
}

// Eliminar lanzamiento
export async function deleteLaunch(id: string) {
  const { error } = await supabase.from('launches').delete().eq('id', id)

  if (error) throw error
  return true
}

// Activar lanzamiento (cambiar de draft a active)
export async function activateLaunch(id: string) {
  return updateLaunch(id, { status: 'active' } as any)
}

import { supabase } from '@/lib/supabase/client'

export interface AgentGeneration {
  id: string
  launch_id: string
  agent_type: 'ceo' | 'cmo' | 'sales' | 'designer' | 'voice' | 'cdo' | 'coo'
  input: any
  output: any
  version: number
  parent_generation_id?: string
  status: 'pending' | 'generating' | 'completed' | 'failed' | 'edited'
  tokens_used?: number
  generation_time_ms?: number
  user_rating?: number
  user_feedback?: string
  error_message?: string
  retry_count: number
  created_at: string
  updated_at: string
  completed_at?: string
}

// Crear generación
export async function createAgentGeneration(data: {
  launch_id: string
  agent_type: string
  input: any
  version?: number
}) {
  const { data: generation, error } = await supabase
    .from('agent_generations')
    .insert({
      ...data,
      status: 'pending',
      version: data.version || 1,
    })
    .select()
    .single()

  if (error) throw error
  return generation as AgentGeneration
}

// Actualizar generación
export async function updateAgentGeneration(
  id: string,
  updates: Partial<{
    output: any
    status: string
    tokens_used: number
    generation_time_ms: number
    error_message: string
    completed_at: string
    user_rating: number
    user_feedback: string
  }>
) {
  const { data, error } = await supabase
    .from('agent_generations')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as AgentGeneration
}

// Obtener generaciones de un lanzamiento
export async function getGenerationsByLaunch(launchId: string) {
  const { data, error } = await supabase
    .from('agent_generations')
    .select('*')
    .eq('launch_id', launchId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as AgentGeneration[]
}

// Obtener última versión de cada agente
export async function getLatestGenerations(launchId: string) {
  const { data, error } = await supabase
    .from('agent_generations')
    .select('*')
    .eq('launch_id', launchId)
    .eq('status', 'completed')
    .order('version', { ascending: false })

  if (error) throw error

  // Agrupar por agent_type y tomar solo la última versión
  const latest: Record<string, AgentGeneration> = {}
  data.forEach((gen: AgentGeneration) => {
    if (!latest[gen.agent_type] || gen.version > latest[gen.agent_type].version) {
      latest[gen.agent_type] = gen
    }
  })

  return latest
}

// Calificar generación
export async function rateGeneration(id: string, rating: number, feedback?: string) {
  return updateAgentGeneration(id, {
    user_rating: rating,
    user_feedback: feedback || '',
  })
}

// Tipos para el sistema de debates entre agentes

export interface AgentPerspective {
  agent: 'ceo' | 'cmo' | 'sales' | 'designer' | 'voice' | 'cdo' | 'coo'
  position: string
  rationale: string
  data_supporting: Record<string, any>
  priority: 'critical' | 'high' | 'medium' | 'low'
}

export interface AgentDebate {
  id: string
  launch_id: string
  agents_involved: string[]
  scenario: string
  topic: string
  perspectives: AgentPerspective[]
  system_recommendation?: string
  user_decision?: string
  resolved_at?: string
  created_at: string
}

export type DebateResolution = 'accept_agent_a' | 'accept_agent_b' | 'compromise' | 'custom'

export interface DebateDecision {
  debate_id: string
  resolution: DebateResolution
  selected_agent?: string
  custom_decision?: string
  notes?: string
}

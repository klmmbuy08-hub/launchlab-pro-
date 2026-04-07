import Anthropic from '@anthropic-ai/sdk'

// Cliente de Anthropic (server-side only)
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

// Modelo a usar (Claude 3.5 Haiku - El más rápido y eficiente)
export const MODEL = 'claude-3-5-haiku-20241022'

// Configuración por defecto
export const DEFAULT_CONFIG = {
  model: MODEL,
  max_tokens: 4096,
  temperature: 1,
}

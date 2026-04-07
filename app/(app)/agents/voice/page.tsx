'use client'

import { AgentPageTemplate } from '@/components/agents/agent-page-template'

export default function AgentVoicePage() {
  const config = {
    id: 'voice',
    name: 'Agent Voice',
    title: 'AI Caller',
    emoji: '🎙️',
    color: 'from-cyan-500 to-blue-500',
    description: 'El Agent Voice usa VAPI para confirmar automáticamente asistencia a llamadas 24-48h antes. Reagenda si es necesario, califica leads (HOT/WARM/COLD) y actualiza Google Sheets. Mejora show-up rate de 40% a 80%+.',
    tasksCompleted: 423,
    capabilities: [
      {
        title: 'Confirmación de Llamadas',
        description: 'Llamadas automáticas de confirmación',
        items: [
          'Llama 24-48h antes de la cita',
          'Script de 2-3 minutos natural',
          'Confirma o reagenda en el momento',
          'Voz IA indistinguible de humano',
        ],
      },
      {
        title: 'Calificación de Leads',
        description: 'Scoring automático durante la llamada',
        items: [
          'HOT: confirmado y muy interesado',
          'WARM: confirmado con dudas',
          'COLD: no confirmó o canceló',
          'Notas automáticas de la conversación',
        ],
      },
      {
        title: 'Integración Google Sheets',
        description: 'Sincronización bidireccional',
        items: [
          'Lee leads automáticamente',
          'Actualiza estado después de llamar',
          'Escribe notas de la conversación',
          'Sync cada 5 minutos',
        ],
      },
      {
        title: 'Métricas y Reportes',
        description: 'Análisis de rendimiento',
        items: [
          'Tasa de confirmación actual',
          'Mejora vs. sin confirmación',
          'Motivos de cancelación comunes',
          'Recomendaciones de optimización',
        ],
      },
    ],
  }

  return <AgentPageTemplate config={config} />
}

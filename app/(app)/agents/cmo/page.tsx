'use client'
export const dynamic = 'force-dynamic'

import { AgentPageTemplate } from '@/components/agents/agent-page-template'

export default function AgentCMOPage() {
  const config = {
    id: 'cmo',
    name: 'Agent CMO',
    title: 'Marketing & Content',
    emoji: '📖',
    color: 'from-pink-500 to-rose-500',
    description: 'El Agent CMO se especializa en crear toda tu estrategia de marketing y contenido. Desde extraer tu historia personal con StoryMarker hasta generar 50+ hooks en múltiples frameworks y scripts VSL completos.',
    tasksCompleted: 234,
    capabilities: [
      {
        title: 'StoryMarker',
        description: 'Extrae tu historia personal a través de conversación',
        items: [
          'Conversación de 12 preguntas estratégicas',
          'Identifica puntos de dolor y transformación',
          'Crea narrativa principal del lanzamiento',
          'Define mensajes clave para cada fase',
        ],
      },
      {
        title: 'Hook Generator',
        description: 'Genera hooks virales en múltiples formatos',
        items: [
          '50+ hooks en 10 frameworks diferentes',
          'PAS, AIDA, BAB, 4P, Feature-Benefit',
          'Optimizados para cada plataforma',
          'A/B testing automático de variaciones',
        ],
      },
      {
        title: 'VSL Scripts',
        description: 'Scripts completos para Video Sales Letters',
        items: [
          'Versión corta (3 minutos)',
          'Versión media (8 minutos)',
          'Versión larga (15 minutos)',
          'Con timestamps y indicaciones de edición',
        ],
      },
      {
        title: 'Calendario de Contenido',
        description: 'Plan completo de contenido para 30-90 días',
        items: [
          'Posts diarios para redes sociales',
          'Temas alineados con fases del lanzamiento',
          'Mix de contenido: educativo, testimonial, urgencia',
          'Sugerencias de formato (carrusel, video, texto)',
        ],
      },
    ],
  }

  return <AgentPageTemplate config={config} />
}

'use client'

import { AgentPageTemplate } from '@/components/agents/agent-page-template'

export default function AgentCDOPage() {
  const config = {
    id: 'cdo',
    name: 'Agent CDO',
    title: 'Chief Content Officer',
    emoji: '🎬',
    color: 'from-purple-500 to-violet-500',
    description: 'El Agent CDO crea todo el contenido multimedia: scripts de YouTube optimizados con SEO, 90 reels para 30 días, stories diarias, VSL en 3 versiones, webinar completo de 90 min y call scripts.',
    tasksCompleted: 156,
    capabilities: [
      {
        title: 'Scripts YouTube',
        description: 'Videos optimizados para SEO',
        items: [
          'Duración: 12-18 minutos',
          'Estructura: gancho, problema, solución, CTA',
          'Keywords SEO incluidas',
          'Sugerencias de thumbnail',
        ],
      },
      {
        title: 'Reels & TikTok',
        description: 'Contenido viral de formato corto',
        items: [
          '90 reels planificados para 30 días',
          'Secuencia estratégica de mensajes',
          'Hooks virales para primeros 3 segundos',
          'CTAs específicos por etapa de lanzamiento',
        ],
      },
      {
        title: 'Stories',
        description: 'Contenido diario para engagement',
        items: [
          'Secuencias de 5-7 slides por día',
          'Mix: educativo, personal, promocional',
          'Stickers y elementos interactivos',
          'Alineado con calendario de contenido',
        ],
      },
      {
        title: 'Webinar Completo',
        description: 'Presentación de 90 minutos lista',
        items: [
          'Script completo con tiempos',
          '60 slides profesionales',
          'Storytelling + educación + venta',
          'Q&A y manejo de objeciones incluido',
        ],
      },
    ],
  }

  return <AgentPageTemplate config={config} />
}

'use client'

import { AgentPageTemplate } from '@/components/agents/agent-page-template'

export default function AgentDesignerPage() {
  const config = {
    id: 'designer',
    name: 'Agent Designer',
    title: 'Visual Designer',
    emoji: '🎨',
    color: 'from-amber-500 to-orange-500',
    description: 'El Agent Designer crea todos los activos visuales: slides profesionales estilo Figma con 5 paletas de color, landing pages exportables a HTML/Figma/Webflow, dashboards de métricas y brand kit completo.',
    tasksCompleted: 98,
    capabilities: [
      {
        title: 'Slides Profesionales',
        description: 'Presentaciones de alto impacto visual',
        items: [
          'Estilo Figma/Canva profesional',
          '5 paletas de color predefinidas',
          'Plantillas: pitch, webinar, curso',
          'Exportable a PDF, PPTX, PNG',
        ],
      },
      {
        title: 'Landing Pages',
        description: 'Páginas web listas para convertir',
        items: [
          'Diseño responsive mobile-first',
          'Exportable a HTML, Figma, Webflow',
          'Optimizado para conversión',
          'Incluye todas las secciones clave',
        ],
      },
      {
        title: 'Dashboards',
        description: 'Visualización de métricas',
        items: [
          'Dashboard de lanzamiento (revenue, leads, conversión)',
          'Dashboard de negocio (MRR, churn, LTV)',
          'Gráficos interactivos',
          'Actualización en tiempo real',
        ],
      },
      {
        title: 'Brand Kit',
        description: 'Identidad visual completa',
        items: [
          'Logo primario + variaciones',
          'Paleta de colores completa',
          'Tipografías recomendadas',
          'Guidelines de uso',
        ],
      },
    ],
  }

  return <AgentPageTemplate config={config} />
}

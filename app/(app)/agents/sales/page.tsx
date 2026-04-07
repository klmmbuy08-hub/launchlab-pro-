'use client'

import { AgentPageTemplate } from '@/components/agents/agent-page-template'

export default function AgentSalesPage() {
  const config = {
    id: 'sales',
    name: 'Agent Sales',
    title: 'Head of Sales',
    emoji: '💰',
    color: 'from-green-500 to-emerald-500',
    description: 'El Agent Sales crea todo el copy de ventas: landing page con framework PAS, secuencias completas de email (cold, warm, launch, post-purchase), ad copy para Meta y Google, y sistema de manejo de objeciones.',
    tasksCompleted: 189,
    capabilities: [
      {
        title: 'Landing Page Copy',
        description: 'Copy completo usando framework PAS',
        items: [
          'Problema: identifica dolor principal',
          'Agitación: amplifica consecuencias',
          'Solución: presenta tu producto',
          'Secciones: hero, beneficios, testimoniales, garantía, CTA',
        ],
      },
      {
        title: 'Email Sequences',
        description: 'Secuencias automatizadas para cada etapa',
        items: [
          'Cold: 5 emails para leads fríos',
          'Warm: 14 días de pre-lanzamiento',
          'Launch: 21 días de lanzamiento activo',
          'Post-purchase: onboarding de compradores',
          'Win-back: recuperación de carritos abandonados',
        ],
      },
      {
        title: 'Ad Copy',
        description: 'Copys para publicidad pagada',
        items: [
          '20 variaciones para Meta Ads',
          '15 variaciones para Google Ads',
          'Headlines, descripciones, CTAs',
          'Optimizado para diferentes audiencias',
        ],
      },
      {
        title: 'Manejo de Objeciones',
        description: 'Sistema de respuesta a objeciones comunes',
        items: [
          'Top 10 objeciones identificadas',
          'Scripts de respuesta para cada una',
          'FAQs optimizados',
          'Contadores persuasivos',
        ],
      },
    ],
  }

  return <AgentPageTemplate config={config} />
}

'use client'

import { AgentPageTemplate } from '@/components/agents/agent-page-template'

export default function AgentCOOPage() {
  const config = {
    id: 'coo',
    name: 'Agent COO',
    title: 'Chief Operating & Financial Officer',
    emoji: '💼',
    color: 'from-yellow-500 to-orange-500',
    description: 'El Agent COO gestiona todas las finanzas y operaciones: budget planning con distribución óptima, cash flow tracking diario, ROI por canal, P&L completo, proyecciones financieras y gestión de riesgos.',
    tasksCompleted: 201,
    capabilities: [
      {
        title: 'Budget Planning',
        description: 'Distribución óptima de presupuesto',
        items: [
          'Ads: 45% del presupuesto total',
          'Herramientas: 16% (email, webinar, etc)',
          'Producción: 10% (diseño, video)',
          'Contingencia: 9% para imprevistos',
        ],
      },
      {
        title: 'Cash Flow Tracking',
        description: 'Seguimiento diario de dinero',
        items: [
          'Ingresos en tiempo real',
          'Gastos categorizados',
          'Balance actual proyectado',
          'Alertas de cash flow negativo',
        ],
      },
      {
        title: 'ROI por Canal',
        description: 'Retorno de inversión por fuente',
        items: [
          'Meta Ads: coste por lead y conversión',
          'Google Ads: ROI y CPC',
          'Orgánico: valor de contenido',
          'Email: revenue por secuencia',
          'Webinar: tasa de asistencia y conversión',
        ],
      },
      {
        title: 'Financial Forecasting',
        description: 'Proyecciones a 30 días',
        items: [
          'Escenario lineal (tendencia actual)',
          'Escenario exponencial (crecimiento)',
          'Escenario conservador (pesimista)',
          'Recomendaciones de inversión',
        ],
      },
    ],
  }

  return <AgentPageTemplate config={config} />
}

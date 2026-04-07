'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Target, TrendingUp, Calendar, AlertCircle, Play, Download } from 'lucide-react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AgentCEOPage() {
  const timeline = [
    {
      phase: 'Fase 1: Warm-up',
      days: '1-7',
      status: 'completed',
      tasks: [
        { name: 'Definir posicionamiento', status: 'completed' },
        { name: 'Identificar competidores', status: 'completed' },
        { name: 'Crear propuesta de valor', status: 'completed' },
        { name: 'Validar con audiencia', status: 'completed' },
      ],
    },
    {
      phase: 'Fase 2: Story',
      days: '8-14',
      status: 'active',
      tasks: [
        { name: 'Crear narrativa principal', status: 'completed' },
        { name: 'Diseñar customer journey', status: 'active' },
        { name: 'Preparar contenido educativo', status: 'pending' },
        { name: 'Teaser campaigns', status: 'pending' },
      ],
    },
    {
      phase: 'Fase 3: Pre-launch',
      days: '15-21',
      status: 'pending',
      tasks: [
        { name: 'Webinar de pre-venta', status: 'pending' },
        { name: 'Early bird offer', status: 'pending' },
        { name: 'Generar urgencia', status: 'pending' },
        { name: 'Lista de espera', status: 'pending' },
      ],
    },
    {
      phase: 'Fase 4: Launch',
      days: '22-30',
      status: 'pending',
      tasks: [
        { name: 'Apertura de carritos', status: 'pending' },
        { name: 'Email sequence diaria', status: 'pending' },
        { name: 'Q&A sessions en vivo', status: 'pending' },
        { name: 'Cierre de carritos', status: 'pending' },
      ],
    },
  ]

  const metrics = [
    { label: 'Revenue Actual', value: '$42,547', target: '$50,000', progress: 85 },
    { label: 'Leads Generados', value: '847', target: '1,000', progress: 85 },
    { label: 'Tasa de Conversión', value: '18.4%', target: '20%', progress: 92 },
    { label: 'Días Restantes', value: '12', target: '30', progress: 60 },
  ]

  const projections = {
    conservative: { revenue: 45000, leads: 900, conversions: 81 },
    probable: { revenue: 52000, leads: 1100, conversions: 94 },
    optimistic: { revenue: 68000, leads: 1400, conversions: 126 },
  }

  return (
    <div className="space-y-8">
      {/* Back button */}
      <Link href="/agents">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a agentes
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-4xl">
            🎯
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-100 mb-1 font-heading">
              Agent CEO
            </h1>
            <p className="text-neutral-400 mb-2">Shadow Operator</p>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/30 text-xs font-semibold">
                Activo
              </div>
              <span className="text-sm text-neutral-500">147 tareas completadas</span>
            </div>
          </div>
        </div>

        <Button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-neutral-950">
          <Play className="w-4 h-4 mr-2" />
          Ejecutar Análisis
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList className="bg-neutral-800 border border-neutral-700">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="metrics">Métricas</TabsTrigger>
          <TabsTrigger value="projections">Proyecciones</TabsTrigger>
          <TabsTrigger value="config">Configuración</TabsTrigger>
        </TabsList>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card className="bg-neutral-800/50 border-neutral-700">
            <CardHeader>
              <CardTitle>Timeline de 30 Días</CardTitle>
              <CardDescription>
                Estrategia completa dividida en 4 fases
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {timeline.map((phase, index) => (
                <div key={index} className="relative">
                  {/* Phase header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                        phase.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400'
                          : phase.status === 'active'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-neutral-700 text-neutral-400'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-100">{phase.phase}</h3>
                        <p className="text-sm text-neutral-400">Días {phase.days}</p>
                      </div>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      phase.status === 'completed'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                        : phase.status === 'active'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                        : 'bg-neutral-700/50 text-neutral-400 border border-neutral-600'
                    }`}>
                      {phase.status === 'completed' ? 'Completada' : phase.status === 'active' ? 'En Progreso' : 'Pendiente'}
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="ml-14 space-y-2">
                    {phase.tasks.map((task, taskIndex) => (
                      <div
                        key={taskIndex}
                        className="flex items-center gap-3 p-3 rounded-lg bg-neutral-700/30 hover:bg-neutral-700/50 transition-colors"
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          task.status === 'completed'
                            ? 'bg-green-500 border-green-500'
                            : task.status === 'active'
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-neutral-600'
                        }`}>
                          {task.status === 'completed' && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`flex-1 text-sm ${
                          task.status === 'completed' ? 'text-neutral-300' : 'text-neutral-400'
                        }`}>
                          {task.name}
                        </span>
                        {task.status === 'active' && (
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Connector line */}
                  {index < timeline.length - 1 && (
                    <div className="ml-5 h-6 w-0.5 bg-neutral-700 my-2" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {metrics.map((metric) => (
              <Card key={metric.label} className="bg-neutral-800/50 border-neutral-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-neutral-400">{metric.label}</span>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  
                  <div className="text-3xl font-bold text-neutral-100 mb-1">
                    {metric.value}
                  </div>
                  
                  <div className="text-sm text-neutral-500 mb-4">
                    Objetivo: {metric.target}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500">Progreso</span>
                      <span className="text-neutral-300 font-semibold">{metric.progress}%</span>
                    </div>
                    <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                        style={{ width: `${metric.progress}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Alerts */}
          <Card className="bg-yellow-500/10 border-yellow-500/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <CardTitle className="text-yellow-400">Alertas Activas</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-neutral-800/50">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-neutral-100 mb-1">
                    Conversión por debajo del objetivo
                  </p>
                  <p className="text-sm text-neutral-400">
                    La tasa de conversión está 1.6% por debajo del objetivo. Se recomienda optimizar el copy de la landing page.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projections Tab */}
        <TabsContent value="projections" className="space-y-6">
          <Card className="bg-neutral-800/50 border-neutral-700">
            <CardHeader>
              <CardTitle>Proyecciones de Revenue</CardTitle>
              <CardDescription>
                Tres escenarios basados en tendencias actuales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(projections).map(([scenario, data]) => (
                  <div key={scenario} className="p-6 rounded-xl bg-neutral-700/30 border border-neutral-600">
                    <div className="text-sm font-semibold text-neutral-400 uppercase mb-4">
                      {scenario === 'conservative' ? 'Conservador' : scenario === 'probable' ? 'Probable' : 'Optimista'}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-2xl font-bold text-neutral-100 mb-1">
                          ${data.revenue.toLocaleString()}
                        </div>
                        <div className="text-xs text-neutral-400">Revenue Final</div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-400">Leads</span>
                        <span className="text-neutral-100 font-semibold">{data.leads}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-400">Conversiones</span>
                        <span className="text-neutral-100 font-semibold">{data.conversions}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Config Tab */}
        <TabsContent value="config" className="space-y-6">
          <Card className="bg-neutral-800/50 border-neutral-700">
            <CardHeader>
              <CardTitle>Configuración del Agente</CardTitle>
              <CardDescription>
                Personaliza cómo trabaja el Agent CEO
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-700/30">
                <div>
                  <div className="font-semibold text-neutral-100 mb-1">Alertas Automáticas</div>
                  <div className="text-sm text-neutral-400">Recibe notificaciones cuando las métricas caen</div>
                </div>
                <button className="w-12 h-6 rounded-full bg-primary-500 relative">
                  <div className="w-5 h-5 rounded-full bg-white absolute right-0.5 top-0.5" />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-700/30">
                <div>
                  <div className="font-semibold text-neutral-100 mb-1">Análisis Diario</div>
                  <div className="text-sm text-neutral-400">Genera reporte de progreso cada 24h</div>
                </div>
                <button className="w-12 h-6 rounded-full bg-primary-500 relative">
                  <div className="w-5 h-5 rounded-full bg-white absolute right-0.5 top-0.5" />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-700/30">
                <div>
                  <div className="font-semibold text-neutral-100 mb-1">Recomendaciones IA</div>
                  <div className="text-sm text-neutral-400">Sugerencias proactivas de optimización</div>
                </div>
                <button className="w-12 h-6 rounded-full bg-neutral-600 relative">
                  <div className="w-5 h-5 rounded-full bg-white absolute left-0.5 top-0.5" />
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

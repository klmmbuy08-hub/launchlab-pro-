'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Target, Book, DollarSign, Palette, Phone, Video, Briefcase, ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AgentsPage() {
  const agents = [
    {
      id: 'ceo',
      name: 'Agent CEO',
      title: 'Shadow Operator',
      description: 'Crea estrategia completa, timeline de 30 días, proyecciones de revenue y métricas en tiempo real.',
      icon: Target,
      color: 'from-blue-500 to-indigo-500',
      emoji: '🎯',
      features: [
        'Análisis de mercado',
        'Timeline de 30 días',
        'Proyecciones de revenue',
        'Tracking de métricas',
      ],
      status: 'active',
      tasksCompleted: 147,
    },
    {
      id: 'cmo',
      name: 'Agent CMO',
      title: 'Marketing & Content',
      description: 'StoryMarker, generador de hooks, scripts VSL, calendario de contenido y toda la estrategia de marketing.',
      icon: Book,
      color: 'from-pink-500 to-rose-500',
      emoji: '📖',
      features: [
        'StoryMarker (12 preguntas)',
        '50+ hooks en 10 frameworks',
        'Scripts VSL (3/8/15 min)',
        'Calendario de contenido',
      ],
      status: 'active',
      tasksCompleted: 234,
    },
    {
      id: 'sales',
      name: 'Agent Sales',
      title: 'Head of Sales',
      description: 'Landing page copy, secuencias de email (cold, warm, launch), ad copy y manejo de objeciones.',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      emoji: '💰',
      features: [
        'Landing page copy (PAS)',
        'Email sequences completas',
        'Ad copy (20 variaciones)',
        'Manejo de objeciones',
      ],
      status: 'active',
      tasksCompleted: 189,
    },
    {
      id: 'designer',
      name: 'Agent Designer',
      title: 'Visual Designer',
      description: 'Slides profesionales, landing pages exportables, dashboards de métricas y brand kit completo.',
      icon: Palette,
      color: 'from-amber-500 to-orange-500',
      emoji: '🎨',
      features: [
        'Slides estilo Figma',
        'Landing pages exportables',
        'Dashboards de métricas',
        'Brand kit completo',
      ],
      status: 'active',
      tasksCompleted: 98,
    },
    {
      id: 'voice',
      name: 'Agent Voice',
      title: 'AI Caller',
      description: 'Confirma asistencia a llamadas 24-48h antes, reagenda automáticamente y califica leads (HOT/WARM/COLD).',
      icon: Phone,
      color: 'from-cyan-500 to-blue-500',
      emoji: '🎙️',
      features: [
        'Confirmación de llamadas',
        'Reagendamiento automático',
        'Calificación de leads',
        'Integración con Google Sheets',
      ],
      status: 'active',
      tasksCompleted: 423,
    },
    {
      id: 'cdo',
      name: 'Agent CDO',
      title: 'Chief Content Officer',
      description: 'Scripts de YouTube, Reels/TikTok, Stories, VSL, Webinar completo y call scripts.',
      icon: Video,
      color: 'from-purple-500 to-violet-500',
      emoji: '🎬',
      features: [
        'Scripts YouTube (12-18 min)',
        '90 reels en 30 días',
        'Stories diarias',
        'Webinar 90 min + slides',
      ],
      status: 'active',
      tasksCompleted: 156,
    },
    {
      id: 'coo',
      name: 'Agent COO',
      title: 'Chief Operating & Financial Officer',
      description: 'Presupuesto, cash flow, ROI por canal, P&L, proyecciones financieras y gestión de riesgos.',
      icon: Briefcase,
      color: 'from-yellow-500 to-orange-500',
      emoji: '💼',
      features: [
        'Budget planning',
        'Cash flow tracking',
        'ROI por canal',
        'Financial forecasting',
      ],
      status: 'active',
      tasksCompleted: 201,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-100 mb-2 font-heading">
          🤖 Tus Agentes IA
        </h1>
        <p className="text-neutral-400">
          7 especialistas trabajando 24/7 en tu lanzamiento
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-neutral-800/50 border-neutral-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-neutral-100 mb-1">
              {agents.filter(a => a.status === 'active').length}
            </div>
            <div className="text-sm text-neutral-400">Agentes Activos</div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800/50 border-neutral-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-neutral-100 mb-1">
              {agents.reduce((sum, a) => sum + a.tasksCompleted, 0)}
            </div>
            <div className="text-sm text-neutral-400">Tareas Completadas</div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800/50 border-neutral-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-neutral-100 mb-1">
              98.4%
            </div>
            <div className="text-sm text-neutral-400">Tasa de Éxito</div>
          </CardContent>
        </Card>
      </div>

      {/* Agents Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-neutral-800/50 border-neutral-700 hover:border-primary-500/50 transition-all group h-full">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                    {agent.emoji}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/30 text-xs font-semibold">
                    Activo
                  </div>
                </div>

                <CardTitle className="text-xl font-bold">{agent.name}</CardTitle>
                <CardDescription className="text-primary-400 font-semibold">
                  {agent.title}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {agent.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {agent.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                      <span className="text-neutral-400">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="pt-4 border-t border-neutral-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-400">Tareas completadas</span>
                    <span className="text-neutral-100 font-semibold">{agent.tasksCompleted}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link href={`/agents/${agent.id}`}>
                  <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-primary-500 group-hover:to-secondary-500 group-hover:text-neutral-950 transition-all">
                    Ver Detalles
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

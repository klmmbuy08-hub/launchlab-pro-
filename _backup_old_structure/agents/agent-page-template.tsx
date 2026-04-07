'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Play, Settings, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

interface AgentConfig {
  id: string
  name: string
  title: string
  emoji: string
  color: string
  description: string
  tasksCompleted: number
  capabilities: {
    title: string
    description: string
    items: string[]
  }[]
}

export function AgentPageTemplate({ config }: { config: AgentConfig }) {
  return (
    <div className="space-y-8">
      <Link href="/agents">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a agentes
        </Button>
      </Link>

      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center text-4xl`}>
            {config.emoji}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-100 mb-1 font-heading">
              {config.name}
            </h1>
            <p className="text-neutral-400 mb-2">{config.title}</p>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/30 text-xs font-semibold">
                Activo
              </div>
              <span className="text-sm text-neutral-500">{config.tasksCompleted} tareas completadas</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
          <Button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-neutral-950">
            <Play className="w-4 h-4 mr-2" />
            Ejecutar
          </Button>
        </div>
      </div>

      <Card className="bg-neutral-800/50 border-neutral-700">
        <CardHeader>
          <CardTitle>Descripción</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-300 leading-relaxed">
            {config.description}
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {config.capabilities.map((capability, index) => (
          <Card key={index} className="bg-neutral-800/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-lg">{capability.title}</CardTitle>
              <CardDescription>{capability.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {capability.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                    <span className="text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-neutral-800/50 border-neutral-700">
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Últimas tareas completadas por este agente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { text: 'Generó análisis completo', time: 'Hace 2h' },
              { text: 'Completó tarea asignada', time: 'Hace 5h' },
              { text: 'Actualizó métricas', time: 'Hace 1d' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-neutral-700/30">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="flex-1 text-sm text-neutral-300">{activity.text}</span>
                <span className="text-xs text-neutral-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

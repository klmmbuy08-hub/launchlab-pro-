'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

const AGENTS = [
  { id: 'ceo', name: 'Agent CEO', emoji: '🎯', duration: 120 },
  { id: 'cmo', name: 'Agent CMO', emoji: '📖', duration: 180 },
  { id: 'sales', name: 'Agent Sales', emoji: '💰', duration: 180 },
  { id: 'designer', name: 'Agent Designer', emoji: '🎨', duration: 120 },
  { id: 'voice', name: 'Agent Voice', emoji: '🎙️', duration: 90 },
  { id: 'cdo', name: 'Agent CDO', emoji: '🎬', duration: 180 },
  { id: 'coo', name: 'Agent COO', emoji: '💼', duration: 120 },
]

const FUN_FACTS = [
  'Un equipo humano tardaría 3-5 días en crear esta estrategia',
  'Estamos analizando +1,000 lanzamientos similares para optimizar tu plan',
  'Los agentes están colaborando entre ellos en tiempo real',
  'Tu estrategia será única, adaptada a tu producto específico',
  'Cada agente tiene personalidad y expertise únicos',
]

interface GenerationLoadingProps {
  onComplete?: () => void
}

export function GenerationLoading({ onComplete }: GenerationLoadingProps) {
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [agentProgress, setAgentProgress] = useState<Record<string, number>>({})

  useEffect(() => {
    // Rotar fun facts cada 5 segundos
    const factInterval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % FUN_FACTS.length)
    }, 5000)

    return () => clearInterval(factInterval)
  }, [])

  useEffect(() => {
    // Simular progreso de agentes
    const progressInterval = setInterval(() => {
      setAgentProgress((prev) => {
        const updated = { ...prev }
        
        AGENTS.forEach((agent) => {
          const current = prev[agent.id] || 0
          if (current < 100) {
            // Incremento aleatorio para simular trabajo real
            const increment = Math.random() * 15
            updated[agent.id] = Math.min(100, current + increment)
          }
        })

        return updated
      })
    }, 500)

    return () => {
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4 md:p-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-4xl mb-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-100">
          🤖 Tus agentes están trabajando...
        </h1>
        <p className="text-neutral-400">
          Esto tomará aproximadamente 5 minutos. Puedes cerrar esta ventana si quieres.
        </p>
      </div>

      {/* Fun fact rotativo */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/30">
        <CardContent className="p-6 text-center">
          <p className="text-blue-300">
            💡 <strong>Dato curioso:</strong> {FUN_FACTS[currentFactIndex]}
          </p>
        </CardContent>
      </Card>

      {/* Progress de cada agente */}
      <div className="grid md:grid-cols-2 gap-4">
        {AGENTS.map((agent) => {
          const progress = agentProgress[agent.id] || 0
          const isComplete = progress >= 100
          const status = isComplete
            ? 'Completado'
            : progress > 0
            ? 'Trabajando...'
            : 'En espera...'

          return (
            <Card
              key={agent.id}
              className={`bg-neutral-800/50 border-neutral-700 transition-all \${
                isComplete ? 'border-green-500/30' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{agent.emoji}</span>
                    <span className="font-medium text-neutral-100">{agent.name}</span>
                  </div>
                  {isComplete && <span className="text-green-400 text-sm">✓</span>}
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="h-2 bg-neutral-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 \${
                        isComplete ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `\${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">{status}</span>
                    <span className="text-neutral-500">{Math.round(progress)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Timeline estimado */}
      <Card className="bg-neutral-800/50 border-neutral-700">
        <CardContent className="p-6">
          <h3 className="font-semibold text-neutral-100 mb-4">⏱️ Timeline de generación:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-neutral-300">
                <strong>Fase 1 (0-2 min):</strong> Agent CEO genera estrategia base
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-neutral-300">
                <strong>Fase 2 (2-5 min):</strong> Otros agentes generan en paralelo
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-neutral-300">
                <strong>Fase 3 (5 min):</strong> Sincronización y validación final
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { AgentDebate } from '@/lib/types/agent-debate'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Scale, CheckCircle2, Clock } from 'lucide-react'

interface DebatesListProps {
  debates: AgentDebate[]
  onDebateClick: (debate: AgentDebate) => void
}

const AGENT_EMOJI: Record<string, string> = {
  ceo: '🎯',
  cmo: '📖',
  sales: '💰',
  designer: '🎨',
  voice: '🎙️',
  cdo: '🎬',
  coo: '💼',
}

export function DebatesList({ debates, onDebateClick }: DebatesListProps) {
  const pendingDebates = debates.filter((d) => !d.resolved_at)
  const resolvedDebates = debates.filter((d) => d.resolved_at)

  if (debates.length === 0) {
    return (
      <Card className="bg-neutral-800/50 border-neutral-700">
        <CardContent className="p-8 text-center text-white">
          <div className="text-4xl mb-3">✨</div>
          <h3 className="font-semibold text-neutral-100 mb-2">
            No hay debates entre agentes
          </h3>
          <p className="text-sm text-neutral-400">
            Todos los agentes están alineados en tu estrategia
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Debates pendientes */}
      {pendingDebates.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            <h3 className="font-semibold text-neutral-100">
              Debates pendientes ({pendingDebates.length})
            </h3>
          </div>

          <div className="space-y-3">
            {pendingDebates.map((debate) => (
              <Card
                key={debate.id}
                className="bg-neutral-800/50 border-yellow-500/30 hover:border-yellow-500/50 transition-all cursor-pointer"
                onClick={() => onDebateClick(debate)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Agentes involucrados */}
                      <div className="flex items-center gap-2 mb-2">
                        {debate.agents_involved.map((agent) => (
                          <span key={agent} className="text-2xl">
                            {AGENT_EMOJI[agent]}
                          </span>
                        ))}
                        <Scale className="w-4 h-4 text-yellow-400" />
                      </div>

                      {/* Topic */}
                      <h4 className="font-semibold text-neutral-100 mb-1">{debate.topic}</h4>
                      <p className="text-sm text-neutral-400 line-clamp-2">{debate.scenario}</p>

                      {/* Fecha */}
                      <p className="text-xs text-neutral-500 mt-2">
                        {new Date(debate.created_at).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    <Badge
                      variant="outline"
                      className="border-yellow-500/30 text-yellow-400 flex-shrink-0"
                    >
                      Pendiente
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Debates resueltos */}
      {resolvedDebates.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <h3 className="font-semibold text-neutral-100">
              Debates resueltos ({resolvedDebates.length})
            </h3>
          </div>

          <div className="space-y-3">
            {resolvedDebates.map((debate) => (
              <Card
                key={debate.id}
                className="bg-neutral-800/50 border-neutral-700 opacity-60 cursor-pointer hover:opacity-100 transition-all"
                onClick={() => onDebateClick(debate)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Agentes involucrados */}
                      <div className="flex items-center gap-2 mb-2">
                        {debate.agents_involved.map((agent) => (
                          <span key={agent} className="text-2xl">
                            {AGENT_EMOJI[agent]}
                          </span>
                        ))}
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      </div>

                      {/* Topic */}
                      <h4 className="font-semibold text-neutral-100 mb-1">{debate.topic}</h4>

                      {/* Decisión del usuario */}
                      {debate.user_decision && (
                        <p className="text-sm text-green-300 mt-2">
                          Decisión: {debate.user_decision}
                        </p>
                      )}

                      {/* Fecha de resolución */}
                      <p className="text-xs text-neutral-500 mt-2">
                        Resuelto el{' '}
                        {new Date(debate.resolved_at!).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    <Badge
                      variant="outline"
                      className="border-green-500/30 text-green-400 flex-shrink-0"
                    >
                      Resuelto
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

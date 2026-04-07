'use client'

import { useState } from 'react'
import { AgentDebate, AgentPerspective, DebateDecision } from '@/lib/types/agent-debate'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle2, Scale, Lightbulb } from 'lucide-react'

const AGENT_EMOJI: Record<string, string> = {
  ceo: '🎯',
  cmo: '📖',
  sales: '💰',
  designer: '🎨',
  voice: '🎙️',
  cdo: '🎬',
  coo: '💼',
}

const AGENT_NAME: Record<string, string> = {
  ceo: 'Agent CEO',
  cmo: 'Agent CMO',
  sales: 'Agent Sales',
  designer: 'Agent Designer',
  voice: 'Agent Voice',
  cdo: 'Agent CDO',
  coo: 'Agent COO',
}

interface AgentDebateModalProps {
  debate: AgentDebate
  open: boolean
  onOpenChange: (open: boolean) => void
  onResolve: (decision: DebateDecision) => Promise<void>
}

export function AgentDebateModal({
  debate,
  open,
  onOpenChange,
  onResolve,
}: AgentDebateModalProps) {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [customDecision, setCustomDecision] = useState('')
  const [isResolving, setIsResolving] = useState(false)

  const handleResolve = async (resolution: 'accept_agent_a' | 'accept_agent_b' | 'custom') => {
    setIsResolving(true)

    try {
      await onResolve({
        debate_id: debate.id,
        resolution,
        selected_agent: selectedAgent || undefined,
        custom_decision: resolution === 'custom' ? customDecision : undefined,
      })

      onOpenChange(false)
    } catch (error) {
      console.error('Error resolving debate:', error)
    } finally {
      setIsResolving(false)
    }
  }

  const perspectiveA = debate.perspectives[0]
  const perspectiveB = debate.perspectives[1]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-900 border-neutral-700">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-yellow-400" />
            <DialogTitle className="text-2xl text-white">Los agentes tienen perspectivas diferentes</DialogTitle>
          </div>
          <DialogDescription className="text-neutral-400">
            Revisa ambas opiniones y decide cuál seguir
          </DialogDescription>
        </DialogHeader>

        {/* Contexto del debate */}
        <Card className="bg-neutral-800/50 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-neutral-100 mb-1">{debate.topic}</h3>
                <p className="text-sm text-neutral-400">{debate.scenario}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Perspectivas de los agentes */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Perspectiva A */}
          <Card
            className={`cursor-pointer transition-all ${
              selectedAgent === perspectiveA.agent
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-neutral-700 bg-neutral-800/50 hover:border-neutral-600'
            }`}
            onClick={() => setSelectedAgent(perspectiveA.agent)}
          >
            <CardContent className="p-4 space-y-3">
              {/* Header del agente */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{AGENT_EMOJI[perspectiveA.agent]}</span>
                  <div>
                    <h3 className="font-semibold text-neutral-100">
                      {AGENT_NAME[perspectiveA.agent]}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        perspectiveA.priority === 'critical'
                          ? 'border-red-500 text-red-400'
                          : perspectiveA.priority === 'high'
                          ? 'border-orange-500 text-orange-400'
                          : 'border-yellow-500 text-yellow-400'
                      }`}
                    >
                      {perspectiveA.priority}
                    </Badge>
                  </div>
                </div>
                {selectedAgent === perspectiveA.agent && (
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                )}
              </div>

              {/* Posición */}
              <div>
                <h4 className="text-sm font-semibold text-neutral-300 mb-1">Posición:</h4>
                <p className="text-sm text-neutral-100">{perspectiveA.position}</p>
              </div>

              {/* Razonamiento */}
              <div>
                <h4 className="text-sm font-semibold text-neutral-300 mb-1">Razonamiento:</h4>
                <p className="text-sm text-neutral-400">{perspectiveA.rationale}</p>
              </div>

              {/* Datos de soporte */}
              {Object.keys(perspectiveA.data_supporting).length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-neutral-300 mb-2">Datos:</h4>
                  <div className="space-y-1">
                    {Object.entries(perspectiveA.data_supporting).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between text-xs bg-neutral-900 p-2 rounded"
                      >
                        <span className="text-neutral-400">{key}:</span>
                        <span className="text-neutral-200 font-medium">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Perspectiva B */}
          <Card
            className={`cursor-pointer transition-all ${
              selectedAgent === perspectiveB.agent
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-neutral-700 bg-neutral-800/50 hover:border-neutral-600'
            }`}
            onClick={() => setSelectedAgent(perspectiveB.agent)}
          >
            <CardContent className="p-4 space-y-3">
              {/* Header del agente */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{AGENT_EMOJI[perspectiveB.agent]}</span>
                  <div>
                    <h3 className="font-semibold text-neutral-100">
                      {AGENT_NAME[perspectiveB.agent]}
                    </h3>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        perspectiveB.priority === 'critical'
                          ? 'border-red-500 text-red-400'
                          : perspectiveB.priority === 'high'
                          ? 'border-orange-500 text-orange-400'
                          : 'border-yellow-500 text-yellow-400'
                      }`}
                    >
                      {perspectiveB.priority}
                    </Badge>
                  </div>
                </div>
                {selectedAgent === perspectiveB.agent && (
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                )}
              </div>

              {/* Posición */}
              <div>
                <h4 className="text-sm font-semibold text-neutral-300 mb-1">Posición:</h4>
                <p className="text-sm text-neutral-100">{perspectiveB.position}</p>
              </div>

              {/* Razonamiento */}
              <div>
                <h4 className="text-sm font-semibold text-neutral-300 mb-1">Razonamiento:</h4>
                <p className="text-sm text-neutral-400">{perspectiveB.rationale}</p>
              </div>

              {/* Datos de soporte */}
              {Object.keys(perspectiveB.data_supporting).length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-neutral-300 mb-2">Datos:</h4>
                  <div className="space-y-1">
                    {Object.entries(perspectiveB.data_supporting).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between text-xs bg-neutral-900 p-2 rounded"
                      >
                        <span className="text-neutral-400">{key}:</span>
                        <span className="text-neutral-200 font-medium">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recomendación del sistema */}
        {debate.system_recommendation && (
          <Card className="bg-green-500/10 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-300 mb-1">
                    Recomendación del sistema:
                  </h3>
                  <p className="text-sm text-green-200">{debate.system_recommendation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Decisión personalizada */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-neutral-300">
            O toma tu propia decisión (opcional):
          </h4>
          <Textarea
            placeholder="Ej: Voy a usar la estrategia del CEO pero con el presupuesto ajustado que sugiere el COO..."
            value={customDecision}
            onChange={(e) => setCustomDecision(e.target.value)}
            rows={3}
            className="bg-neutral-900 border-neutral-700 resize-none text-white"
          />
        </div>

        {/* Acciones */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-neutral-700">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isResolving}
            className="border-neutral-700 text-white"
          >
            Decidir después
          </Button>

          <div className="flex gap-2">
            {/* Seguir perspectiva seleccionada */}
            <Button
              onClick={() =>
                handleResolve(
                  selectedAgent === perspectiveA.agent ? 'accept_agent_a' : 'accept_agent_b'
                )
              }
              disabled={!selectedAgent || isResolving}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
            >
              {isResolving ? 'Aplicando...' : `Seguir a ${selectedAgent ? AGENT_NAME[selectedAgent] : '...'}`}
            </Button>

            {/* Usar decisión personalizada */}
            {customDecision.trim().length > 10 && (
              <Button
                onClick={() => handleResolve('custom')}
                disabled={isResolving}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
              >
                Usar mi decisión
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

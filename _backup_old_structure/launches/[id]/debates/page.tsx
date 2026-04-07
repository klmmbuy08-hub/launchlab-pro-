'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AgentDebate, DebateDecision } from '@/lib/types/agent-debate'
import { AgentDebateModal } from '@/components/agents/agent-debate-modal'
import { DebatesList } from '@/components/agents/debates-list'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function DebatesPage() {
  const params = useParams()
  const launchId = params.id as string

  const [debates, setDebates] = useState<AgentDebate[]>([])
  const [selectedDebate, setSelectedDebate] = useState<AgentDebate | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Cargar debates
  useEffect(() => {
    async function loadDebates() {
      try {
        const response = await fetch(`/api/launches/${launchId}/debates`)
        const data = await response.json()
        
        if (data.success) {
          setDebates(data.debates)
        }
      } catch (error) {
        console.error('Error loading debates:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDebates()
  }, [launchId])

  // Manejar click en debate
  const handleDebateClick = (debate: AgentDebate) => {
    setSelectedDebate(debate)
    setIsModalOpen(true)
  }

  // Resolver debate
  const handleResolveDebate = async (decision: DebateDecision) => {
    if (!selectedDebate) return

    try {
      const response = await fetch(`/api/debates/${decision.debate_id}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(decision),
      })

      if (response.ok) {
        // Recargar debates
        const refreshResponse = await fetch(`/api/launches/${launchId}/debates`)
        const data = await refreshResponse.json()
        
        if (data.success) {
          setDebates(data.debates)
        }
      }
    } catch (error) {
      console.error('Error resolving debate:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-white text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-neutral-800 rounded w-1/3 mx-auto" />
          <div className="h-32 bg-neutral-800 rounded" />
          <div className="h-32 bg-neutral-800 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild className="border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700">
          <Link href={`/launches/${launchId}`}>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-neutral-100">Debates entre Agentes</h1>
          <p className="text-neutral-400">
            Revisa y resuelve los desacuerdos estratégicos
          </p>
        </div>
      </div>

      {/* Lista de debates */}
      <DebatesList debates={debates} onDebateClick={handleDebateClick} />

      {/* Modal de debate */}
      {selectedDebate && (
        <AgentDebateModal
          debate={selectedDebate}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onResolve={handleResolveDebate}
        />
      )}
    </div>
  )
}

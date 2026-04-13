'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Play, Pause, Edit, Zap, Clock, Activity } from 'lucide-react'

interface Workflow {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'draft'
  platform: 'n8n' | 'make' | 'zapier'
  trigger: string
  executions: number
  last_run: string
  success_rate: number
}

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWorkflows()
  }, [])

  const fetchWorkflows = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/workflows')
      const result = await response.json()
      if (result.success) {
        setWorkflows(result.data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const statusColors = {
    active: 'bg-green-500/10 text-green-400',
    paused: 'bg-yellow-500/10 text-yellow-400',
    draft: 'bg-neutral-600 text-neutral-300',
  }

  const platformColors = {
    n8n: 'text-blue-400',
    make: 'text-purple-400',
    zapier: 'text-green-400',
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-[600px]"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Automation Workflows</h1>
          <p className="text-neutral-400 mt-1">Build and manage your automated processes</p>
        </div>
        <Button size="lg"><Plus className="w-4 h-4 mr-2" />Create Workflow</Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-neutral-900 border border-neutral-800">
          <TabsTrigger value="all">All Workflows</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="paused">Paused</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {workflows.length === 0 ? (
            <Card className="bg-neutral-900 border-neutral-800">
              <CardContent className="py-12 text-center">
                <Zap className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-400">No workflows yet. Create your first automation!</p>
              </CardContent>
            </Card>
          ) : (
            workflows.map(workflow => (
              <Card key={workflow.id} className="bg-neutral-900 border-neutral-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{workflow.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${statusColors[workflow.status]}`}>
                          {workflow.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-400 mb-3">{workflow.description}</p>
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-1 text-neutral-400">
                          <span className={platformColors[workflow.platform]}>●</span>
                          {workflow.platform.toUpperCase()}
                        </div>
                        <div className="flex items-center gap-1 text-neutral-400">
                          <Zap className="w-3 h-3" />
                          Trigger: {workflow.trigger}
                        </div>
                        <div className="flex items-center gap-1 text-neutral-400">
                          <Activity className="w-3 h-3" />
                          {workflow.executions} runs
                        </div>
                        <div className="flex items-center gap-1 text-green-400">
                          {workflow.success_rate}% success
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        {workflow.status === 'active' ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

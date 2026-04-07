'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Rocket, 
  Calendar, 
  Users, 
  ArrowLeft, 
  Loader2, 
  Zap, 
  FileText, 
  Target, 
  TrendingUp,
  Mail,
  Layout,
  MessageSquare,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { useAgent } from '@/lib/hooks/use-agent'

interface Launch {
  id: string
  name: string
  product_type: string
  price: number
  target_audience: string
  launch_date: string | null
  description: string
  status: string
}

interface AgentGeneration {
  id: string
  agent_type: string
  task: string
  content: any
  created_at: string
}

export default function LaunchDetailPage() {
  const params = useParams()
  const router = useRouter()
  const launchId = params.id as string
  
  const [launch, setLaunch] = useState<Launch | null>(null)
  const [generations, setGenerations] = useState<AgentGeneration[]>([])
  const [loading, setLoading] = useState(true)

  const ceoAgent = useAgent('ceo')
  const cmoAgent = useAgent('cmo')
  const salesAgent = useAgent('sales')

  useEffect(() => {
    fetchLaunchData()
  }, [launchId])

  async function fetchLaunchData() {
    try {
      // Fetch launch details
      const { data: launchData, error: launchError } = await supabase
        .from('launches')
        .select('*')
        .eq('id', launchId)
        .single()

      if (launchError) throw launchError
      setLaunch(launchData)

      // Fetch agent generations
      const { data: genData, error: genError } = await supabase
        .from('agent_generations')
        .select('*')
        .eq('launch_id', launchId)
        .order('created_at', { ascending: false })

      if (genError) throw genError
      setGenerations(genData || [])
    } catch (error) {
      console.error('Error fetching launch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async (agentType: 'ceo' | 'cmo' | 'sales') => {
    if (!launch) return

    try {
      let result
      if (agentType === 'ceo') {
        result = await ceoAgent.execute({
          launchId: launch.id,
          productName: launch.name,
          productType: launch.product_type,
          price: launch.price,
          targetAudience: launch.target_audience,
          launchDate: launch.launch_date
        })
      } else if (agentType === 'cmo') {
        result = await cmoAgent.execute({
          launchId: launch.id,
          task: 'hooks',
          productName: launch.name,
          targetAudience: launch.target_audience
        })
      } else if (agentType === 'sales') {
        result = await salesAgent.execute({
          launchId: launch.id,
          task: 'landing',
          productName: launch.name,
          price: launch.price,
          targetAudience: launch.target_audience,
          mainProblem: launch.description || 'Necesita mejores resultados'
        })
      }
      
      // Refresh data to show new generation
      fetchLaunchData()
    } catch (error) {
      console.error(`Error generating ${agentType} content:`, error)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500 mb-4" />
        <p className="text-neutral-400">Cargando detalles del lanzamiento...</p>
      </div>
    )
  }

  if (!launch) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-neutral-100">Lanzamiento no encontrado</h2>
        <Link href="/launches">
          <Button variant="ghost">Volver a lanzamientos</Button>
        </Link>
      </div>
    )
  }

  const getGeneration = (agentType: string, task?: string) => {
    return generations.find(g => g.agent_type === agentType && (!task || g.task === task))
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/launches">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5 text-neutral-400" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-neutral-100">{launch.name}</h1>
              <Badge variant="success" className="capitalize">{launch.status}</Badge>
            </div>
            <p className="text-neutral-400 text-sm flex items-center gap-4">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {launch.launch_date || 'Sin fecha'}</span>
              <span className="flex items-center gap-1 capitalize"><Rocket className="w-4 h-4" /> {launch.product_type}</span>
              <span className="flex items-center gap-1 font-semibold text-primary-500">${launch.price}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Editar</Button>
          <Button size="sm" className="bg-primary-500 text-neutral-950 font-bold">Lanzar con IA</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="bg-neutral-800/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-lg">Audiencia Objetivo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {launch.target_audience}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-800/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-lg">Estado de Agentes</CardTitle>
              <CardDescription>Resumen de trabajo realizado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'CEO', type: 'ceo', icon: Target, color: 'text-blue-400' },
                { name: 'CMO', type: 'cmo', icon: MessageSquare, color: 'text-pink-400' },
                { name: 'Sales', type: 'sales', icon: Layout, color: 'text-green-400' },
              ].map((agent) => (
                <div key={agent.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <agent.icon className={`w-4 h-4 ${agent.color}`} />
                    <span className="text-sm font-medium text-neutral-200">{agent.name}</span>
                  </div>
                  {getGeneration(agent.type) ? (
                    <Badge variant="secondary" className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Listo</Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[10px] bg-neutral-500/10 text-neutral-500 border border-neutral-500/20">Pendiente</Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content Areas */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="strategy" className="w-full">
            <TabsList className="bg-neutral-800/80 border-neutral-700 p-1 mb-6 grid grid-cols-4">
              <TabsTrigger value="strategy" className="data-[state=active]:bg-neutral-700">Estrategia</TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-neutral-700">Contenido</TabsTrigger>
              <TabsTrigger value="copy" className="data-[state=active]:bg-neutral-700">Ventas</TabsTrigger>
              <TabsTrigger value="execution" className="data-[state=active]:bg-neutral-700">Ejecución</TabsTrigger>
            </TabsList>

            <TabsContent value="strategy" className="mt-0">
              {getGeneration('ceo') ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-neutral-800/30 border-neutral-700">
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-primary-500" /> Proyecciones
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="py-0 pb-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-neutral-400">Probable</span>
                            <span className="text-primary-400 font-bold">${getGeneration('ceo')?.content.projections.probable.revenue}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-neutral-400">Conservador</span>
                            <span className="text-neutral-300 font-bold">${getGeneration('ceo')?.content.projections.conservative.revenue}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-neutral-800/30 border-neutral-700">
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-yellow-400" /> Rec. Estratégicas
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="py-0 pb-4">
                        <ul className="text-[11px] text-neutral-400 space-y-1">
                          {getGeneration('ceo')?.content.recommendations.slice(0, 2).map((rec: any, i: number) => (
                            <li key={i} className="flex gap-2"><div className="w-1 h-1 rounded-full bg-primary-500 mt-1.5" /> {rec.action}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-neutral-800/50 border-neutral-700">
                    <CardHeader>
                      <CardTitle>Timeline Maestro de 30 Días</CardTitle>
                      <CardDescription>Fases detalladas generadas por el Agent CEO</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {Object.entries(getGeneration('ceo')?.content.timeline).map(([key, phase]: [string, any], index: number) => (
                        <div key={key} className="relative pl-6 border-l border-neutral-700">
                          <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-primary-500 border-4 border-neutral-900" />
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-neutral-100">{phase.name}</h4>
                            <Badge variant="secondary" className="text-[10px]">{phase.days}</Badge>
                          </div>
                          <ul className="grid md:grid-cols-2 gap-2">
                            {phase.tasks.map((task: string, i: number) => (
                              <li key={i} className="text-xs text-neutral-400 flex items-start gap-2">
                                <FileText className="w-3 h-3 mt-0.5 text-neutral-500" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <EmptyState icon={Target} title="Estrategia no generada" description="Permite que el Agent CEO analice tu lanzamiento y cree el timeline de 30 días." onGenerate={() => handleGenerate('ceo')} loading={ceoAgent.loading} />
              )}
            </TabsContent>

            <TabsContent value="content" className="mt-0">
               {getGeneration('cmo') ? (
                <div className="space-y-6">
                  <Card className="bg-neutral-800/50 border-neutral-700">
                    <CardHeader>
                      <CardTitle>Biblioteca de Hooks (50+)</CardTitle>
                      <CardDescription>Generados por el Agent CMO usando 10 frameworks diferentes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        {getGeneration('cmo')?.content.hooks.slice(0, 10).map((hook: any, i: number) => (
                          <div key={i} className="p-3 bg-neutral-900/50 border border-neutral-800 rounded-lg group hover:border-primary-500/30 transition-all">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="secondary" className="text-[10px] uppercase font-mono">{hook.framework}</Badge>
                              <Badge variant="secondary" className="text-[9px]">{hook.platform}</Badge>
                            </div>
                            <p className="text-sm text-neutral-300 italic">"{hook.hook}"</p>
                          </div>
                        ))}
                        <Button variant="ghost" className="text-xs text-primary-500">Ver todos los hooks...</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <EmptyState icon={MessageSquare} title="Activos de Contenido" description="Genera 50 hooks épicos y un script VSL completo para tu oferta." onGenerate={() => handleGenerate('cmo')} loading={cmoAgent.loading} />
              )}
            </TabsContent>

            <TabsContent value="copy" className="mt-0">
              {getGeneration('sales') ? (
                <div className="space-y-6">
                  <Card className="bg-neutral-800/50 border-neutral-700">
                    <CardHeader>
                      <CardTitle>Landing Page Copy (PAS Framework)</CardTitle>
                      <CardDescription>Todo el texto listo para tu frontend o constructor visual</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-xs text-primary-500 uppercase font-bold">Headline Principal</Label>
                        <p className="text-xl font-bold text-neutral-100">{getGeneration('sales')?.content.landing_page.headline}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-neutral-500 uppercase font-bold">Problema & Agitación</Label>
                        <p className="text-sm text-neutral-300 leading-relaxed">{getGeneration('sales')?.content.landing_page.problem_section}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-neutral-500 uppercase font-bold">Solución (Tu producto)</Label>
                        <p className="text-sm text-neutral-300 leading-relaxed">{getGeneration('sales')?.content.landing_page.solution}</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        {getGeneration('sales')?.content.landing_page.benefits.map((benefit: string, i: number) => (
                          <div key={i} className="flex gap-2 text-sm text-neutral-400">
                            <Zap className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <EmptyState icon={Layout} title="Copy de Ventas" description="Escribe el copy de tu landing page y secuencias de email automáticamente." onGenerate={() => handleGenerate('sales')} loading={salesAgent.loading} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ icon: Icon, title, description, onGenerate, loading }: { icon: any, title: string, description: string, onGenerate: () => void, loading: boolean }) {
  return (
    <Card className="bg-neutral-800/50 border-neutral-700 border-dashed py-12">
      <CardContent className="flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-neutral-600" />
        </div>
        <h3 className="text-xl font-bold text-neutral-200 mb-2">{title}</h3>
        <p className="text-sm text-neutral-500 max-w-sm mb-6">{description}</p>
        <Button onClick={onGenerate} disabled={loading} className="bg-primary-500 text-neutral-950 hover:bg-primary-400 transition-colors">
          {loading ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generando...</>
          ) : (
            <><Zap className="w-4 h-4 mr-2" /> Ejecutar Agente</>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

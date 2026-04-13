'use client'

import { useDashboard } from '@/lib/hooks/use-dashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function DashboardPage() {
  const { data, loading, error, refetch } = useDashboard()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#6B7280]">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Error al cargar el Dashboard</h3>
          <p className="text-[#6B7280] mb-4">{error || 'No se pudieron cargar los datos del dashboard'}</p>
          <Button onClick={refetch}>Reintentar</Button>
        </div>
      </div>
    )
  }

  const { overview, quick_stats, alerts, upcoming_tasks } = data

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#171717] border border-[#262626] p-8 shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Sparkles className="w-64 h-64 text-blue-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-blue-600/10 text-blue-400 border-0 text-[10px] font-bold py-1 px-3 uppercase tracking-widest">
                Estado: Activo
              </Badge>
              <Badge className="bg-green-600/10 text-green-400 border-0 text-[10px] font-bold py-1 px-3 uppercase tracking-widest">
                Agentes IA: Online
              </Badge>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">
              Bienvenido de nuevo, Comandante.
            </h1>
            <p className="text-[#6B7280] text-lg max-w-xl">
              LaunchOS ha analizado tus últimos datos y actualizado tu estrategia. Tu negocio está actualmente <span className="text-green-400 font-bold">un 18% por encima</span> del objetivo.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-center p-6 bg-black/40 rounded-2xl border border-[#262626] backdrop-blur-sm min-w-[140px]">
              <p className="text-[10px] font-bold text-[#4B5563] uppercase tracking-widest mb-1">Ingresos Mes</p>
              <p className="text-2xl font-black text-white">{formatCurrency(overview.revenue_month)}</p>
            </div>
            <div className="text-center p-6 bg-blue-600 rounded-2xl shadow-xl shadow-blue-600/20 min-w-[140px]">
              <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest mb-1">Estado Objetivo</p>
              <p className="text-2xl font-black text-white">{overview.on_track_to_goal ? 'EN RUTA' : 'RETRASADO'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Today */}
        <Card className="bg-[#171717] border-[#262626]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#6B7280]">
              Ingresos Hoy
            </CardTitle>
            <DollarSign className="w-4 h-4 text-[#6B7280]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(overview.revenue_today)}
            </div>
            <p className="text-xs text-[#6B7280] mt-1">
              {formatCurrency(overview.revenue_month)} este mes
            </p>
            <div className="flex items-center gap-1 mt-2">
              {overview.revenue_growth >= 0 ? (
                <TrendingUp className="w-3 h-3 text-green-400" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-400" />
              )}
              <span className={`text-xs ${overview.revenue_growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatPercentage(overview.revenue_growth)} vs mes pasado
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Leads Today */}
        <Card className="bg-[#171717] border-[#262626]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#6B7280]">
              Leads Hoy
            </CardTitle>
            <Users className="w-4 h-4 text-[#6B7280]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {overview.leads_today}
            </div>
            <p className="text-xs text-[#6B7280] mt-1">
              {overview.leads_month} este mes
            </p>
          </CardContent>
        </Card>

        {/* Conversions */}
        <Card className="bg-[#171717] border-[#262626]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#6B7280]">
              Conversiones Hoy
            </CardTitle>
            <Target className="w-4 h-4 text-[#6B7280]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {overview.conversions_today}
            </div>
            <p className="text-xs text-[#6B7280] mt-1">
              {overview.leads_today > 0
                ? ((overview.conversions_today / overview.leads_today) * 100).toFixed(1)
                : '0'}% tasa de conversión
            </p>
          </CardContent>
        </Card>

        {/* Goal Progress */}
        <Card className="bg-[#171717] border-[#262626]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#6B7280]">
              Meta Mensual
            </CardTitle>
            {overview.on_track_to_goal ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${overview.on_track_to_goal ? 'text-green-400' : 'text-red-400'}`}>
              {overview.on_track_to_goal ? 'En Ruta' : 'Retrasado'}
            </div>
            <p className="text-xs text-[#6B7280] mt-1">
              {overview.days_remaining} días restantes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#171717] border-[#262626]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-[#6B7280]">
              Seguidores Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatNumber(quick_stats.total_followers)}
            </div>
            <p className="text-xs text-green-400 mt-1">
              {formatPercentage(quick_stats.follower_growth)} de crecimiento
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#171717] border-[#262626]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-[#6B7280]">
              Contenido esta Semana
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {quick_stats.content_this_week}
            </div>
            <p className="text-xs text-[#6B7280] mt-1">
              {quick_stats.avg_engagement.toFixed(1)}% engagement promedio
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#171717] border-[#262626]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-[#6B7280]">
              Campañas Activas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {quick_stats.active_campaigns}
            </div>
            <p className="text-xs text-[#6B7280] mt-1">
              {formatCurrency(quick_stats.total_ad_spend)}/día de gasto
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <Card className="bg-[#171717] border-[#262626]">
          <CardHeader>
            <CardTitle className="text-white">Alertas e Insights</CardTitle>
          </CardHeader>
          <CardContent>
            {alerts.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-[#6B7280]">
                <CheckCircle className="w-5 h-5 mr-2" />
                ¡Todo bien! No hay alertas.
              </div>
            ) : (
              <div className="space-y-3">
                {alerts.map((alert: any, index: number) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      alert.type === 'critical'
                        ? 'bg-red-500/10 border-red-500/30'
                        : alert.type === 'warning'
                        ? 'bg-yellow-500/10 border-yellow-500/30'
                        : alert.type === 'success'
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-blue-500/10 border-blue-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        alert.type === 'critical' ? 'text-red-400' :
                        alert.type === 'warning' ? 'text-yellow-400' :
                        alert.type === 'success' ? 'text-green-400' :
                        'text-blue-400'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium text-white">{alert.title}</p>
                        <p className="text-sm text-neutral-300 mt-1">
                          {alert.message}
                        </p>
                        {alert.action && (
                          <button className="text-sm text-blue-400 hover:text-blue-300 mt-2">
                            {alert.action} →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="bg-[#171717] border-[#262626]">
          <CardHeader>
            <CardTitle className="text-white">Próximas Tareas</CardTitle>
          </CardHeader>
          <CardContent>
            {upcoming_tasks.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-[#6B7280]">
                <Clock className="w-5 h-5 mr-2" />
                No hay tareas pendientes
              </div>
            ) : (
              <div className="space-y-3">
                {upcoming_tasks.map((task: any) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-lg bg-neutral-800 border border-neutral-700 hover:border-neutral-600 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-medium text-white">{task.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-[#6B7280]" />
                          <p className="text-xs text-[#6B7280]">
                            {new Date(task.due_date).toLocaleDateString('es-ES', {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          task.priority === 'high'
                            ? 'bg-red-500/20 text-red-400'
                            : task.priority === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {task.priority === 'high' ? 'alta' : task.priority === 'medium' ? 'media' : 'baja'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Insights CTA */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Obtén Insights Potenciados por IA
              </h3>
              <p className="text-blue-100">
                Deja que la IA analice tus datos y proporcione recomendaciones personalizadas
              </p>
            </div>
            <Button size="lg" variant="secondary">
              <Sparkles className="w-4 h-4 mr-2" />
              Analizar Ahora
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

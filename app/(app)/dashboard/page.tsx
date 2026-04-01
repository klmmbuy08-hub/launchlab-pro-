import { Header } from "@/components/layout/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  Clock,
  Linkedin,
} from "lucide-react";

const recentActivity = [
  {
    prospect: "Carlos Martínez",
    company: "Engel & Völkers Madrid",
    status: "activo",
    signal: "Alta",
    time: "Hace 2h",
  },
  {
    prospect: "Ana López",
    company: "Re/Max España",
    status: "evaluacion",
    signal: "Media",
    time: "Hace 4h",
  },
  {
    prospect: "Roberto García",
    company: "Inmobiliaria Mediterráneo",
    status: "latente",
    signal: "Baja",
    time: "Hace 6h",
  },
  {
    prospect: "Sara Fernández",
    company: "Century 21 Barcelona",
    status: "activo",
    signal: "Alta",
    time: "Hace 8h",
  },
  {
    prospect: "Miguel Torres",
    company: "ERA Inmobiliaria",
    status: "descartado",
    signal: "Ninguna",
    time: "Ayer",
  },
];

const statusConfig: Record<
  string,
  { label: string; variant: "success" | "warning" | "default" | "danger" | "secondary" }
> = {
  activo: { label: "Activo 🟢", variant: "success" },
  evaluacion: { label: "Evaluación 🟡", variant: "warning" },
  latente: { label: "Latente 🟡", variant: "warning" },
  descartado: { label: "Descartado ❌", variant: "secondary" },
};

export default function DashboardPage() {
  return (
    <div>
      <Header
        title="Dashboard"
        description="Visión general del sistema de adquisición"
        action={
          <Button size="sm">
            <Linkedin className="h-3.5 w-3.5" />
            Nuevo agente
          </Button>
        }
      />

      <div className="p-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Conversaciones activas"
            value="47"
            change="+12 esta semana"
            changeType="positive"
            icon={MessageSquare}
            iconColor="text-indigo-600"
          />
          <StatCard
            title="Señales detectadas"
            value="18"
            change="+5 vs semana anterior"
            changeType="positive"
            icon={TrendingUp}
            iconColor="text-emerald-600"
          />
          <StatCard
            title="Oportunidades 🟢"
            value="7"
            change="3 pendientes de llamada"
            changeType="neutral"
            icon={Users}
            iconColor="text-amber-600"
          />
          <StatCard
            title="Cierres este mes"
            value="2"
            change="5.000€ generados"
            changeType="positive"
            icon={CheckCircle}
            iconColor="text-emerald-600"
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Pipeline funnel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Pipeline actual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: "Conversaciones iniciadas", value: 47, color: "bg-indigo-200", pct: 100 },
                  { label: "Con respuesta", value: 31, color: "bg-indigo-300", pct: 66 },
                  { label: "Señal detectada", value: 18, color: "bg-amber-300", pct: 38 },
                  { label: "En evaluación", value: 11, color: "bg-amber-400", pct: 23 },
                  { label: "Oportunidades 🟢", value: 7, color: "bg-emerald-400", pct: 15 },
                ].map(({ label, value, color, pct }) => (
                  <div key={label}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-zinc-600">{label}</span>
                      <span className="font-semibold text-zinc-900">{value}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-zinc-100">
                      <div
                        className={`h-1.5 rounded-full ${color}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent activity */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Actividad reciente</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">
                Ver todo
                <ArrowRight className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((item) => {
                  const status = statusConfig[item.status];
                  return (
                    <div
                      key={item.prospect}
                      className="flex items-center gap-3 rounded-lg border border-zinc-100 p-3"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600">
                        {item.prospect[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-zinc-900">
                          {item.prospect}
                        </p>
                        <p className="truncate text-xs text-zinc-500">{item.company}</p>
                      </div>
                      <Badge variant={status.variant} className="shrink-0">
                        {status.label}
                      </Badge>
                      <div className="flex items-center gap-1 shrink-0 text-xs text-zinc-400">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Resumen semanal del agente LinkedIn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { day: "Lun", conversations: 8, signals: 3 },
                { day: "Mar", conversations: 10, signals: 4 },
                { day: "Mié", conversations: 7, signals: 2 },
                { day: "Jue", conversations: 12, signals: 5 },
                { day: "Vie", conversations: 6, signals: 2 },
                { day: "Sáb", conversations: 4, signals: 2 },
              ].map(({ day, conversations, signals }) => (
                <div key={day} className="text-center">
                  <p className="text-xs font-medium text-zinc-400">{day}</p>
                  <div className="mt-2 space-y-1">
                    <div className="text-sm font-bold text-zinc-900">{conversations}</div>
                    <div className="text-xs text-zinc-400">conv.</div>
                    <div className="text-sm font-semibold text-emerald-600">{signals}</div>
                    <div className="text-xs text-zinc-400">señales</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

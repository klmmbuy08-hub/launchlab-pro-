import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Bot,
  Linkedin,
  Phone,
  Mail,
  MessageSquare,
  Activity,
  Pause,
  Play,
  Settings,
  Zap,
  TrendingUp,
} from "lucide-react";

const agents = [
  {
    id: "1",
    name: "Setter Senior LinkedIn — España",
    type: "LinkedIn",
    icon: Linkedin,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    status: "activo",
    model: "Claude Sonnet 4.6",
    conversations: 234,
    signals: 45,
    conversionRate: "19.2%",
    lastAction: "Hace 3 min",
    description:
      "Prospección inteligente en LinkedIn. Abre conversaciones humanas, filtra señal y clasifica oportunidades para inmobiliarias españolas.",
    tasks: ["Conexión", "Mensaje inicial", "Follow-up", "Detección de señal", "CRM sync"],
  },
  {
    id: "2",
    name: "Agente de Voz — Follow-up",
    type: "VAPI Voice",
    icon: Phone,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    status: "activo",
    model: "VAPI + Claude Haiku 4.5",
    conversations: 67,
    signals: 18,
    conversionRate: "26.9%",
    lastAction: "Hace 1h",
    description:
      "Llamadas automáticas de seguimiento. Cualifica prospectos latentes y agenda reuniones con los perfiles de mayor interés.",
    tasks: ["Llamada saliente", "Script adaptativo", "Detección intención", "Agenda reunión"],
  },
  {
    id: "3",
    name: "Setter LinkedIn — Dubái",
    type: "LinkedIn",
    icon: Linkedin,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    status: "pausado",
    model: "Claude Sonnet 4.6",
    conversations: 89,
    signals: 21,
    conversionRate: "23.6%",
    lastAction: "Hace 2 días",
    description:
      "Versión adaptada para el mercado de Dubái. Foco en brokers con ticket alto y alta competencia digital.",
    tasks: ["Conexión", "Mensaje inicial", "Follow-up", "Detección de señal"],
  },
  {
    id: "4",
    name: "Nurturing Email — Pipeline Latente",
    type: "Email",
    icon: Mail,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    status: "borrador",
    model: "Claude Haiku 4.5",
    conversations: 0,
    signals: 0,
    conversionRate: "—",
    lastAction: "Sin actividad",
    description:
      "Secuencia de email para prospectos clasificados como latentes. Mantiene la relación sin presión hasta que estén listos.",
    tasks: ["Email D+1", "Email D+3", "Email D+7", "Email D+14", "Re-clasificación"],
  },
];

const statusConfig: Record<
  string,
  { label: string; variant: "success" | "warning" | "secondary" }
> = {
  activo: { label: "Activo", variant: "success" },
  pausado: { label: "Pausado", variant: "warning" },
  borrador: { label: "Borrador", variant: "secondary" },
};

export default function AgentsPage() {
  return (
    <div>
      <Header
        title="Agentes IA"
        description="Gestiona tus agentes de adquisición automatizada"
        action={
          <Button size="sm">
            <Plus className="h-3.5 w-3.5" />
            Nuevo agente
          </Button>
        }
      />

      <div className="p-6">
        {/* Overview */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Agentes activos", value: "2", icon: Bot, color: "text-indigo-600" },
            { label: "Conversaciones hoy", value: "47", icon: MessageSquare, color: "text-blue-600" },
            { label: "Señales esta semana", value: "18", icon: TrendingUp, color: "text-emerald-600" },
            { label: "Tasa conversión media", value: "21.4%", icon: Activity, color: "text-amber-600" },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card key={label}>
              <CardContent className="flex items-center gap-3 p-5">
                <div className="rounded-lg bg-zinc-50 p-2.5">
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500">{label}</p>
                  <p className="text-xl font-bold text-zinc-900">{value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Agents grid */}
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {agents.map((agent) => {
            const status = statusConfig[agent.status];
            const Icon = agent.icon;
            return (
              <Card key={agent.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${agent.iconBg}`}>
                      <Icon className={`h-5 w-5 ${agent.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-zinc-900">{agent.name}</h3>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-zinc-500">{agent.model}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-xs leading-relaxed text-zinc-500">{agent.description}</p>

                  {/* Tasks */}
                  <div className="flex flex-wrap gap-1.5">
                    {agent.tasks.map((task) => (
                      <span
                        key={task}
                        className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600"
                      >
                        {task}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 rounded-lg bg-zinc-50 p-3">
                    <div className="text-center">
                      <p className="text-sm font-bold text-zinc-900">{agent.conversations}</p>
                      <p className="text-xs text-zinc-500">Conv.</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-zinc-900">{agent.signals}</p>
                      <p className="text-xs text-zinc-500">Señales</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-zinc-900">{agent.conversionRate}</p>
                      <p className="text-xs text-zinc-500">Conv. rate</p>
                    </div>
                  </div>

                  {/* Last action + controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-zinc-400">
                      <Zap className="h-3 w-3" />
                      {agent.lastAction}
                    </div>
                    <div className="flex items-center gap-1">
                      {agent.status === "activo" ? (
                        <Button variant="outline" size="sm">
                          <Pause className="h-3.5 w-3.5" />
                          Pausar
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Play className="h-3.5 w-3.5" />
                          Activar
                        </Button>
                      )}
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

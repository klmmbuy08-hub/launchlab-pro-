import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Key,
  Webhook,
  Bell,
  CreditCard,
  Save,
  RefreshCw,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

const integrations = [
  {
    name: "LinkedIn",
    description: "Conexión para el Agente Setter Senior",
    status: "conectado",
    icon: "🔗",
  },
  {
    name: "Pipedrive",
    description: "CRM — Sincronización de oportunidades",
    status: "conectado",
    icon: "📊",
  },
  {
    name: "n8n Cloud",
    description: "Motor de automatización de workflows",
    status: "conectado",
    icon: "⚡",
  },
  {
    name: "VAPI",
    description: "Plataforma de agentes de voz",
    status: "pendiente",
    icon: "📞",
  },
  {
    name: "Supabase",
    description: "Base de datos y autenticación",
    status: "conectado",
    icon: "🗄️",
  },
  {
    name: "Meta Ads",
    description: "Gestión de campañas publicitarias",
    status: "pendiente",
    icon: "📢",
  },
];

export default function SettingsPage() {
  return (
    <div>
      <Header
        title="Configuración"
        description="Gestiona tu cuenta y las integraciones del sistema"
        action={
          <Button size="sm">
            <Save className="h-3.5 w-3.5" />
            Guardar cambios
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-zinc-500" />
              <CardTitle>Perfil</CardTitle>
            </div>
            <CardDescription>Información de tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                O
              </div>
              <div>
                <Button variant="outline" size="sm">
                  Cambiar foto
                </Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700">Nombre</label>
                <Input defaultValue="Omar" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700">Apellido</label>
                <Input defaultValue="—" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700">Email</label>
                <Input defaultValue="omar@launchlab.pro" type="email" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700">Empresa</label>
                <Input defaultValue="LaunchLab Pro" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-zinc-500" />
              <CardTitle>API Keys</CardTitle>
            </div>
            <CardDescription>Credenciales para las integraciones del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Anthropic API Key", placeholder: "sk-ant-api03-..." },
              { label: "n8n API Key", placeholder: "n8n_api_..." },
              { label: "VAPI API Key", placeholder: "vapi_..." },
              { label: "Pipedrive API Token", placeholder: "pipedrive_token_..." },
            ].map(({ label, placeholder }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-medium text-zinc-700">{label}</label>
                  <Input
                    type="password"
                    placeholder={placeholder}
                    defaultValue="••••••••••••••••"
                  />
                </div>
                <Button variant="ghost" size="icon" className="mt-5">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Webhook className="h-4 w-4 text-zinc-500" />
              <CardTitle>Integraciones</CardTitle>
            </div>
            <CardDescription>Estado de las conexiones del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="flex items-center gap-3 rounded-lg border border-zinc-100 p-4"
                >
                  <span className="text-2xl">{integration.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900">{integration.name}</p>
                    <p className="truncate text-xs text-zinc-500">{integration.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {integration.status === "conectado" ? (
                      <Badge variant="success">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Conectado
                      </Badge>
                    ) : (
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Conectar
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-zinc-500" />
              <CardTitle>Notificaciones</CardTitle>
            </div>
            <CardDescription>Cuándo y cómo quieres recibir alertas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: "Nueva oportunidad 🟢 detectada", active: true },
                { label: "Agente pausado por error", active: true },
                { label: "Resumen diario del pipeline", active: true },
                { label: "Nuevas conversaciones iniciadas", active: false },
                { label: "Follow-up sin respuesta (7 días)", active: true },
              ].map(({ label, active }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-zinc-700">{label}</span>
                  <div
                    className={`relative h-5 w-9 cursor-pointer rounded-full transition-colors ${
                      active ? "bg-indigo-600" : "bg-zinc-200"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                        active ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Plan */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-zinc-500" />
              <CardTitle>Plan y facturación</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between rounded-lg bg-indigo-50 p-4">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-zinc-900">Plan Pro</p>
                  <Badge variant="default">Activo</Badge>
                </div>
                <p className="mt-1 text-sm text-zinc-500">
                  Hasta 5 agentes · 10.000 conversaciones/mes · Soporte prioritario
                </p>
              </div>
              <Button variant="outline" size="sm">
                Gestionar plan
              </Button>
            </div>
            <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
              {[
                { label: "Agentes activos", value: "2 / 5" },
                { label: "Conversaciones este mes", value: "390 / 10.000" },
                { label: "Próxima factura", value: "1 Abr 2025" },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg bg-zinc-50 p-3">
                  <p className="text-xs text-zinc-500">{label}</p>
                  <p className="mt-0.5 font-semibold text-zinc-900">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

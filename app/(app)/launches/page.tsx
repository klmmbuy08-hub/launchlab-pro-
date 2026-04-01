import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Rocket,
  Calendar,
  Users,
  TrendingUp,
  MoreHorizontal,
  Play,
  Pause,
  Eye,
} from "lucide-react";

const launches = [
  {
    id: "1",
    name: "Captación Propietarios Madrid Q1",
    type: "LinkedIn Outreach",
    status: "activo",
    prospects: 234,
    signals: 45,
    conversions: 8,
    startDate: "01 Mar 2025",
    endDate: "31 Mar 2025",
    budget: "2.500€",
  },
  {
    id: "2",
    name: "Meta Ads — Vendedores Barcelona",
    type: "Meta Ads",
    status: "activo",
    prospects: 1240,
    signals: 87,
    conversions: 12,
    startDate: "15 Feb 2025",
    endDate: "15 Abr 2025",
    budget: "800€/mes",
  },
  {
    id: "3",
    name: "Setter LinkedIn — Inmobiliarias Dubái",
    type: "LinkedIn Outreach",
    status: "pausado",
    prospects: 89,
    signals: 21,
    conversions: 3,
    startDate: "01 Feb 2025",
    endDate: "28 Feb 2025",
    budget: "0€",
  },
  {
    id: "4",
    name: "Agente de Voz — Follow-up Propietarios",
    type: "VAPI Voice",
    status: "borrador",
    prospects: 0,
    signals: 0,
    conversions: 0,
    startDate: "—",
    endDate: "—",
    budget: "Por definir",
  },
  {
    id: "5",
    name: "Email Nurturing — Pipeline Latente",
    type: "Email Marketing",
    status: "completado",
    prospects: 156,
    signals: 34,
    conversions: 6,
    startDate: "01 Ene 2025",
    endDate: "31 Ene 2025",
    budget: "0€",
  },
];

const statusConfig: Record<
  string,
  { label: string; variant: "success" | "warning" | "default" | "secondary" | "danger" }
> = {
  activo: { label: "Activo", variant: "success" },
  pausado: { label: "Pausado", variant: "warning" },
  borrador: { label: "Borrador", variant: "secondary" },
  completado: { label: "Completado", variant: "default" },
};

export default function LaunchesPage() {
  return (
    <div>
      <Header
        title="Lanzamientos"
        description="Gestiona todas tus campañas de adquisición"
        action={
          <Button size="sm">
            <Plus className="h-3.5 w-3.5" />
            Nuevo lanzamiento
          </Button>
        }
      />

      <div className="p-6">
        {/* Summary cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Lanzamientos activos", value: "2", icon: Rocket, color: "text-indigo-600" },
            { label: "Prospectos totales", value: "1.719", icon: Users, color: "text-zinc-600" },
            { label: "Señales detectadas", value: "187", icon: TrendingUp, color: "text-emerald-600" },
            { label: "Conversiones", value: "29", icon: TrendingUp, color: "text-amber-600" },
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

        {/* Launches table */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Todos los lanzamientos</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-100">
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500">
                      Nombre
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">
                      Tipo
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">
                      Estado
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-zinc-500">
                      Prospectos
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-zinc-500">
                      Señales
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-zinc-500">
                      Conv.
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">
                      Periodo
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">
                      Budget
                    </th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {launches.map((launch) => {
                    const status = statusConfig[launch.status];
                    return (
                      <tr key={launch.id} className="hover:bg-zinc-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-zinc-900">{launch.name}</div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-xs text-zinc-500">{launch.type}</span>
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </td>
                        <td className="px-4 py-4 text-right text-zinc-700">
                          {launch.prospects.toLocaleString("es-ES")}
                        </td>
                        <td className="px-4 py-4 text-right text-zinc-700">
                          {launch.signals}
                        </td>
                        <td className="px-4 py-4 text-right font-medium text-emerald-600">
                          {launch.conversions}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1 text-xs text-zinc-500">
                            <Calendar className="h-3 w-3" />
                            {launch.startDate} → {launch.endDate}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-xs text-zinc-600">{launch.budget}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                            {launch.status === "activo" ? (
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Pause className="h-3.5 w-3.5" />
                              </Button>
                            ) : launch.status !== "completado" ? (
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Play className="h-3.5 w-3.5" />
                              </Button>
                            ) : null}
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Bot,
  Rocket,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Agentes IA 24/7",
    description:
      "Setter Senior en LinkedIn que prospecta, filtra y clasifica oportunidades sin desgaste humano.",
  },
  {
    icon: Rocket,
    title: "Gestión de Lanzamientos",
    description:
      "Controla cada fase de tus campañas de captación. Del primer contacto al cierre.",
  },
  {
    icon: BarChart3,
    title: "Dashboard en Tiempo Real",
    description:
      "Métricas claras: conversaciones, señales detectadas, oportunidades activas y cierres.",
  },
  {
    icon: Shield,
    title: "Filtración Inteligente",
    description:
      "Solo los prospectos con señal real llegan a tu equipo. Elimina el 60-70% del ruido.",
  },
  {
    icon: Users,
    title: "Pipeline Ordenado",
    description:
      "Integración con Pipedrive. Tu equipo sabe a quién llamar, cuándo y por qué.",
  },
  {
    icon: TrendingUp,
    title: "Escalable y Replicable",
    description:
      "Sistema construido para crecer. Añade más agentes, más mercados, más clientes.",
  },
];

const stats = [
  { value: "60-70%", label: "Reducción de ruido en el pipeline" },
  { value: "3x", label: "Más conversaciones de calidad" },
  { value: "24/7", label: "Operación continua sin equipo humano" },
  { value: "2.500€", label: "Ticket promedio por sistema instalado" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-zinc-900">LaunchLab Pro</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Acceder
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">
                Empezar gratis
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            <Zap className="h-3 w-3" />
            Sistema de Adquisición con IA para Inmobiliarias
          </span>
          <h1 className="mt-6 text-5xl font-bold tracking-tight text-zinc-900">
            Convierte conversaciones en{" "}
            <span className="text-indigo-600">clientes reales</span>
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-zinc-500">
            Un sistema de filtración y priorización comercial 24/7. Tu equipo deja de
            improvisar y empieza a cerrar con criterio.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg">
                Ver el dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/launches">
              <Button variant="outline" size="lg">
                Ver lanzamientos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-zinc-900">{value}</div>
                <div className="mt-1 text-sm text-zinc-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-zinc-900">
            Todo lo que necesitas, nada que sobre
          </h2>
          <p className="mt-4 text-lg text-zinc-500">
            Cuatro pilares que transforman tu proceso comercial
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                <Icon className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-zinc-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-zinc-900">Cómo funciona</h2>
            <p className="mt-4 text-lg text-zinc-500">
              Del primer contacto al cierre en 4 pasos
            </p>
          </div>
          <div className="mt-16 grid gap-4 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "LinkedIn → Conversación",
                desc: "El agente prospecta con criterio y abre diálogos humanos sin pitch.",
              },
              {
                step: "02",
                title: "Conversación → Filtro",
                desc: "Detecta señal real. Clasifica: Curioso, Latente o Activo.",
              },
              {
                step: "03",
                title: "Filtro → Evaluación",
                desc: "Mide compromiso. Sin evaluación no hay avance. Filtra el ruido.",
              },
              {
                step: "04",
                title: "Evaluación → Pipeline",
                desc: "Solo los 🟢 llegan al equipo. Con contexto y recomendación.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative rounded-xl bg-white p-6 shadow-sm">
                <div className="text-4xl font-bold text-indigo-100">{step}</div>
                <h3 className="mt-2 text-sm font-semibold text-zinc-900">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <div className="rounded-2xl bg-indigo-600 px-8 py-16">
          <h2 className="text-3xl font-bold text-white">
            Listo para ordenar tu proceso comercial
          </h2>
          <p className="mt-4 text-lg text-indigo-200">
            Sistema instalado en 7 días. Resultados visibles en 30.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
                Acceder al dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-indigo-200">
            {["Sin contrato largo", "Soporte incluido", "Instalación guiada"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-8 text-center text-sm text-zinc-400">
        © 2025 LaunchLab Pro · Todos los derechos reservados
      </footer>
    </div>
  );
}

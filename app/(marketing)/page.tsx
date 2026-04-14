"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap } from "lucide-react";
import { AgentsSection } from "@/components/landing/agents-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { PricingSection } from "@/components/landing/pricing-section";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500">
              <Zap className="h-4 w-4 text-neutral-950" />
            </div>
            <span className="text-sm font-semibold text-neutral-100">LaunchLab Pro</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-neutral-300 hover:text-neutral-100">
                Acceder
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-gradient-to-r from-primary-500 to-secondary-500 text-neutral-950">
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
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 px-3 py-1 text-xs font-medium text-primary-500">
            <Zap className="h-3 w-3" />
            Sistema de Adquisición con IA para Inmobiliarias
          </span>
          <h1 className="mt-6 text-5xl font-bold tracking-tight text-neutral-100 font-heading">
            Convierte conversaciones en{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              clientes reales
            </span>
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-neutral-400">
            Un sistema de filtración y priorización comercial 24/7. Tu equipo deja de
            improvisar y empieza a cerrar con criterio.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-primary-500 to-secondary-500 text-neutral-950">
                Ver el dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/launches">
              <Button size="lg" className="border-neutral-700 text-neutral-300 hover:bg-neutral-900">
                Ver lanzamientos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <AgentsSection />

      {/* How it works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* Pricing */}
      <PricingSection />

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <div className="rounded-2xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 px-8 py-16">
          <h2 className="text-3xl font-bold text-neutral-100 font-heading">
            Listo para ordenar tu proceso comercial
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Sistema instalado en 7 días. Resultados visibles en 30.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-primary-500 to-secondary-500 text-neutral-950">
                Acceder al dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-neutral-300">
            {["Sin contrato largo", "Soporte incluido", "Instalación guiada"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-primary-500" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8 text-center text-sm text-neutral-500">
        © 2025 LaunchLab Pro · Todos los derechos reservados
      </footer>
    </div>
  );
}

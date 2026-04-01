import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Terminal, Rocket } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20">
          <Terminal className="w-4 h-4 text-primary-500" />
          <span className="text-sm font-mono text-neutral-100">
            Sistema Operativo de Lanzamientos
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold font-heading">
          De{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-pink to-accent-yellow">
            Confundido
          </span>
          <br />
          a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
            Lanzamiento Completo
          </span>
          <br />
          en 10 Minutos
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto">
          7 Agentes IA crean tu estrategia, copy, diseño y confirman tus leads.
          <br />
          <span className="text-neutral-100 font-semibold">
            $15K de equipo por $297/mes.
          </span>
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="group">
            Empezar Trial 7 Días Gratis
            <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button size="lg" variant="secondary">
            Ver Demo en Vivo
          </Button>
        </div>

        {/* Status */}
        <div className="text-sm text-neutral-400 space-y-2">
          <p>✅ Proyecto instalado exitosamente</p>
          <p>🚀 Next.js 14 + Tailwind CSS + shadcn/ui</p>
          <p>Ready to build!</p>
        </div>
      </div>
    </div>
  )
}

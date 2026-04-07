'use client'

import { Button } from '@/components/ui/button'
import { Terminal, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(0, 255, 157) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(0, 255, 157) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 backdrop-blur-sm">
            <Terminal className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-mono text-neutral-100">
              Sistema Operativo de Lanzamientos
            </span>
            <span className="px-2 py-0.5 rounded-full bg-primary-500 text-neutral-950 text-xs font-bold">
              BETA
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
        >
          De{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-pink via-accent-yellow to-accent-pink">
            Confundido
          </span>
          <br />
          a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500">
            Lanzamiento Completo
          </span>
          <br />
          <span className="text-neutral-50">en 10 Minutos</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl lg:text-3xl text-neutral-300 max-w-4xl mx-auto leading-relaxed"
        >
          7 Agentes IA trabajan en paralelo para crear tu estrategia, copy, diseño y confirmar tus leads.{' '}
          <span className="text-neutral-50 font-semibold">$15K de equipo por $297/mes.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
        >
          <Button
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-primary-500 to-secondary-500 text-neutral-950 px-8 py-6 text-lg font-semibold shadow-2xl shadow-primary-500/50 hover:shadow-primary-500/80 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Empezar Trial 7 Días Gratis
              <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </Button>

          <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
            Ver Demo en Vivo
          </Button>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-neutral-400 pt-8"
        >
          {['Sin tarjeta de crédito', '7 días gratis', 'Cancela cuando quieras'].map((label) => (
            <div key={label} className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span className="text-neutral-300">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

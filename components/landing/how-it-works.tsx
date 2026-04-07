'use client'

import { motion } from 'framer-motion'
import { FileText, Bot, CheckCircle, Rocket } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Define tu lanzamiento',
      description: 'Responde 5 preguntas sobre tu producto, mercado y objetivo.',
      icon: FileText,
    },
    {
      number: '02',
      title: 'Los agentes trabajan',
      description: 'En paralelo crean estrategia, copy, diseño y secuencias de email.',
      icon: Bot,
    },
    {
      number: '03',
      title: 'Revisa y ajusta',
      description: 'Aprueba cada pieza. Los agentes iteran hasta que esté perfecto.',
      icon: CheckCircle,
    },
    {
      number: '04',
      title: 'Lanza y escala',
      description: 'Activa tus campañas. El sistema monitoriza y optimiza solo.',
      icon: Rocket,
    },
  ]

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-secondary-500/10 border border-secondary-500/20 text-secondary-500 text-sm font-mono mb-4">
            PROCESO EN 4 PASOS
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
            Cómo funciona
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            De idea confusa a sistema completo en menos tiempo que una reunión
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700 hover:border-primary-500/50 transition-all h-full">
                  {/* Step number circle */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto relative z-10">
                      <span className="text-2xl font-bold text-neutral-950">{step.number}</span>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full blur-xl opacity-50" />
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <step.icon className="w-8 h-8 text-primary-500" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-neutral-100 text-center">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-400 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

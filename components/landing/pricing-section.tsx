'use client'

import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: 97,
      description: 'Para empezar a validar',
      features: [
        '3 Agentes IA',
        '1 lanzamiento activo',
        '1,000 conversaciones/mes',
        'Dashboard básico',
        'Soporte por email',
      ],
      cta: 'Empezar',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: 297,
      description: 'El sistema completo',
      badge: 'MÁS POPULAR',
      features: [
        '7 Agentes IA completos',
        'Lanzamientos ilimitados',
        '10,000 conversaciones/mes',
        'Dashboard avanzado + analytics',
        'Integración Pipedrive / n8n / VAPI',
        'Soporte prioritario',
      ],
      cta: 'Trial 7 días gratis',
      highlighted: true,
    },
    {
      name: 'Agency',
      price: 997,
      description: 'Para escalar con clientes',
      features: [
        'Todo en Pro',
        'Hasta 10 workspaces',
        'White-label',
        'API access',
        'Onboarding dedicado',
        'SLA garantizado',
      ],
      cta: 'Hablar con ventas',
      highlighted: false,
    },
  ]

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-sm font-mono mb-4">
            PRECIOS
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
            Simple y{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              sin sorpresas
            </span>
          </h2>
          <p className="text-xl text-neutral-400">
            7 días de prueba gratuita en todos los planes.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${plan.highlighted ? 'md:-mt-4' : ''}`}
            >
              <div className={`
                relative bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8
                border-2 h-full flex flex-col
                ${plan.highlighted
                  ? 'border-primary-500 shadow-2xl shadow-primary-500/20'
                  : 'border-neutral-700'
                }
              `}>
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-neutral-950 text-sm font-bold">
                    {plan.badge}
                  </div>
                )}

                {/* Plan name */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-neutral-100 mb-2">{plan.name}</h3>
                  <p className="text-neutral-400">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-neutral-100">${plan.price}</span>
                    <span className="text-neutral-400">/mes</span>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  className={`w-full mb-8 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-neutral-950 hover:shadow-lg hover:shadow-primary-500/50'
                      : 'bg-neutral-700 text-neutral-100 hover:bg-neutral-600'
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>

                {/* Features */}
                <div className="space-y-4 flex-1">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hover glow for highlighted */}
                {plan.highlighted && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 opacity-10 blur-2xl -z-10" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Money back guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/30 text-green-400">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">
              Garantía de 7 días - Reembolso completo sin preguntas
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

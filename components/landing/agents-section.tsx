'use client'

import { motion } from 'framer-motion'
import { Target, Book, DollarSign, Palette, Phone, Video, Briefcase, Zap } from 'lucide-react'

export function AgentsSection() {
  const agents = [
    {
      icon: Target,
      name: 'Estratega',
      description: 'Define tu posicionamiento, ICP y propuesta de valor en minutos.',
      color: 'from-blue-500 to-indigo-500',
      emoji: '🎯'
    },
    {
      icon: Book,
      name: 'Copywriter',
      description: 'Genera headline, VSL, emails y página de ventas que convierten.',
      color: 'from-pink-500 to-rose-500',
      emoji: '📖'
    },
    {
      icon: Palette,
      name: 'Diseñador',
      description: 'Crea la estructura visual de tu funnel y activos de marca.',
      color: 'from-amber-500 to-orange-500',
      emoji: '🎨'
    },
    {
      icon: DollarSign,
      name: 'Email Marketer',
      description: 'Secuencias de nurturing, follow-up y re-activación automatizadas.',
      color: 'from-cyan-500 to-blue-500',
      emoji: '💰'
    },
    {
      icon: Video,
      name: 'Analista',
      description: 'Métricas de conversión, A/B testing y optimización continua.',
      color: 'from-purple-500 to-violet-500',
      emoji: '📊'
    },
    {
      icon: Phone,
      name: 'Setter Senior',
      description: 'Prospecta en LinkedIn, filtra señal real y llena tu pipeline.',
      color: 'from-green-500 to-emerald-500',
      emoji: '👥'
    },
    {
      icon: Phone,
      name: 'Agente de Voz',
      description: 'Llama, cualifica y agenda reuniones con tus leads automáticamente.',
      color: 'from-yellow-500 to-amber-500',
      emoji: '🎙️'
    },
    {
      icon: Zap,
      name: 'Más agentes',
      description: 'Próximamente',
      color: 'from-neutral-500 to-neutral-600',
      emoji: '⚡',
      comingSoon: true
    },
  ]

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-sm font-mono mb-4">
            7 AGENTES IA ESPECIALIZADOS
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
            Tu equipo completo,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              sin nómina
            </span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Cada agente es experto en su área. Trabajan en paralelo, sin fricciones, sin reuniones.
          </p>
        </motion.div>

        {/* Agents grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className={`
                relative bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-6
                border border-neutral-700 hover:border-primary-500/50
                transition-all duration-300 h-full
                ${agent.comingSoon ? 'opacity-60' : 'hover:scale-105'}
              `}>
                {/* Icon */}
                <div className={`
                  w-14 h-14 rounded-xl bg-gradient-to-br ${agent.color}
                  flex items-center justify-center mb-4 text-3xl
                  group-hover:scale-110 transition-transform
                `}>
                  {agent.emoji}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 text-neutral-100">
                  {agent.name}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {agent.description}
                </p>

                {/* Coming soon badge */}
                {agent.comingSoon && (
                  <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-neutral-700 text-xs text-neutral-300">
                    Próximamente
                  </div>
                )}

                {/* Hover glow */}
                <div className={`
                  absolute inset-0 rounded-2xl bg-gradient-to-br ${agent.color}
                  opacity-0 group-hover:opacity-10 transition-opacity blur-xl -z-10
                `} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

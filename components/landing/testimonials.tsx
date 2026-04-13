'use client'

import { CardStack } from '@/components/ui/card-stack'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export function Testimonials() {
  const testimonials = [
    {
      id: 0,
      name: "Carlos M.",
      designation: "Director Comercial @ Engel & Völkers",
      content: (
        <p>
          En 10 días teníamos el sistema funcionando. <span className="font-bold text-primary-500">3 cierres</span> en el primer mes sin contratar a nadie más.
        </p>
      ),
    },
    {
      id: 1,
      name: "Ana L.",
      designation: "CEO @ Re/Max España",
      content: (
        <p>
          El Setter Senior llena el pipeline <span className="font-bold text-secondary-500">mientras duermo</span>. Ya no perdemos tiempo con curiosos.
        </p>
      ),
    },
    {
      id: 2,
      name: "Roberto G.",
      designation: "Broker @ Inmobiliaria Mediterráneo",
      content: (
        <p>
          Pasé de 0 a sistema completo en una semana. El <span className="font-bold text-accent-pink">ROI fue inmediato</span>. Muy recomendado para brokers.
        </p>
      ),
    },
  ]

  return (
    <section className="py-24 px-4 flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-accent-yellow/10 border border-accent-yellow/20 text-accent-yellow text-sm font-mono mb-4">
            RESULTADOS REALES
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
            Lo que dicen{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              los clientes
            </span>
          </h2>
        </motion.div>

        {/* Testimonials CardStack */}
        <div className="flex items-center justify-center w-full min-h-[300px]">
          <CardStack items={testimonials} />
        </div>
      </div>
    </section>
  )
}

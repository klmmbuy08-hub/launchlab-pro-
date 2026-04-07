'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export function Testimonials() {
  const testimonials = [
    {
      text: "En 10 días teníamos el sistema funcionando. 3 cierres en el primer mes sin contratar a nadie más.",
      author: "Carlos M.",
      role: "Director Comercial",
      company: "Engel & Völkers",
      rating: 5,
    },
    {
      text: "El Setter Senior llena el pipeline mientras duermo. Ya no perdemos tiempo con curiosos.",
      author: "Ana L.",
      role: "CEO",
      company: "Re/Max España",
      rating: 5,
    },
    {
      text: "Pasé de 0 a sistema completo en una semana. El ROI fue inmediato.",
      author: "Roberto G.",
      role: "Broker",
      company: "Inmobiliaria Mediterráneo",
      rating: 5,
    },
  ]

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
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

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700 hover:border-primary-500/50 transition-all h-full">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent-yellow text-accent-yellow" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-neutral-200 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div>
                  <div className="font-semibold text-neutral-100">{testimonial.author}</div>
                  <div className="text-sm text-neutral-400">
                    {testimonial.role} · {testimonial.company}
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-5 transition-opacity blur-xl -z-10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

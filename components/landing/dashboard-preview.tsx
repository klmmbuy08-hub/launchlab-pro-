'use client'

import { motion } from 'framer-motion'

export function DashboardPreview() {
  const stats = [
    { value: '47', label: 'Conversaciones', color: 'from-blue-500 to-purple-500' },
    { value: '18', label: 'Señales', color: 'from-green-500 to-emerald-500' },
    { value: '7', label: 'Oportunidades', color: 'from-yellow-500 to-orange-500' },
    { value: '2', label: 'Cierres', color: 'from-pink-500 to-rose-500' },
  ]

  const activities = [
    { name: 'Carlos M.', status: 'Activo', color: 'bg-green-500' },
    { name: 'Ana L.', status: 'Evaluación', color: 'bg-yellow-500' },
    { name: 'Roberto G.', status: 'Latente', color: 'bg-orange-500' },
  ]

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-t from-primary-500/30 via-transparent to-transparent blur-3xl" />

          {/* Dashboard container */}
          <div className="relative bg-neutral-900/50 backdrop-blur-xl border-2 border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-6 py-4 bg-neutral-800/50 border-b border-neutral-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs font-mono text-neutral-400">
                  app.launchlab.pro/dashboard
                </span>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-8 space-y-6">
              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700 hover:border-primary-500/50 transition-all">
                      <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} text-transparent bg-clip-text mb-2`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-neutral-400">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pipeline and Activity */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Pipeline */}
                <div className="bg-neutral-800/30 rounded-xl p-6 border border-neutral-700">
                  <h3 className="text-lg font-semibold mb-4 text-neutral-100">Pipeline</h3>
                  <div className="space-y-3">
                    {[100, 70, 40].map((width, i) => (
                      <div key={i} className="h-8 bg-neutral-700/50 rounded-lg overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${width}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.2, duration: 1 }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-neutral-800/30 rounded-xl p-6 border border-neutral-700">
                  <h3 className="text-lg font-semibold mb-4 text-neutral-100">Actividad reciente</h3>
                  <div className="space-y-3">
                    {activities.map((activity, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-sm font-bold text-neutral-950">
                          {activity.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-neutral-100">{activity.name}</div>
                          <div className="text-xs text-neutral-400">{activity.status}</div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${activity.color}`} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats below dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {[
            { value: '60-70%', label: 'Menos ruido en el pipeline' },
            { value: '3x', label: 'Más conversaciones de calidad' },
            { value: '24/7', label: 'Operación sin equipo humano' },
            { value: '10 min', label: 'De idea a lanzamiento activo' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

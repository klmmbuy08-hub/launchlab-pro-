'use client'

import { TrendingUp, DollarSign, Users, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

interface ContentOverviewProps {
  data: {
    total_posts: number
    avg_engagement_rate: number
    total_revenue_attributed: number
    total_leads_generated: number
  }
}

export function ContentOverview({ data }: ContentOverviewProps) {
  const metrics = [
    {
      title: 'Total Posts',
      value: data.total_posts,
      subtitle: 'Last 30 days',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      bgClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    {
      title: 'Avg Engagement',
      value: `${data.avg_engagement_rate}%`,
      subtitle: '+2.3% vs last month',
      subtitleColor: 'text-emerald-400',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      bgClass: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    },
    {
      title: 'Revenue Generated',
      value: `$${data.total_revenue_attributed.toLocaleString()}`,
      subtitle: 'From content',
      icon: DollarSign,
      color: 'from-emerald-400 to-teal-500',
      bgClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      title: 'Leads Generated',
      value: data.total_leads_generated,
      subtitle: 'Qualified leads',
      icon: Users,
      color: 'from-amber-400 to-orange-500',
      bgClass: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m, i) => (
        <motion.div
          key={m.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="relative group rounded-3xl overflow-hidden shadow-lg"
        >
          {/* Animated glow background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${m.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] group-hover:border-white/[0.1] transition-colors duration-500 rounded-3xl" />
          
          <div className="relative p-6 sm:p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-neutral-400 mb-2">{m.title}</p>
                <h3 className="text-3xl font-bold text-white tracking-tight leading-none">{m.value}</h3>
              </div>
              <div className={`p-3.5 rounded-2xl border ${m.bgClass} shadow-inner`}>
                <m.icon className="w-6 h-6" />
              </div>
            </div>
            
            <p className={`text-sm mt-4 font-medium ${m.subtitleColor || 'text-neutral-500'} flex items-center gap-1.5`}>
              {m.subtitle}
            </p>
            
            {/* Subtle bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r opacity-30 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-r ${m.color}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

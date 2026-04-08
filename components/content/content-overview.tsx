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
      accent: 'text-[#3B82F6]',
      iconBg: 'bg-[#3B82F6]/10',
    },
    {
      title: 'Avg Engagement',
      value: `${data.avg_engagement_rate}%`,
      subtitle: '+2.3% vs last month',
      subtitleColor: 'text-[#10B981]',
      icon: Heart,
      accent: 'text-[#8B5CF6]',
      iconBg: 'bg-[#8B5CF6]/10',
    },
    {
      title: 'Revenue Generated',
      value: `$${data.total_revenue_attributed.toLocaleString()}`,
      subtitle: 'From content',
      icon: DollarSign,
      accent: 'text-[#10B981]',
      iconBg: 'bg-[#10B981]/10',
    },
    {
      title: 'Leads Generated',
      value: data.total_leads_generated,
      subtitle: 'Qualified leads',
      icon: Users,
      accent: 'text-[#F59E0B]',
      iconBg: 'bg-[#F59E0B]/10',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {metrics.map((m, i) => (
        <motion.div
          key={m.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="group relative bg-[#141414] rounded-xl overflow-hidden border border-[#27272A] hover:border-[#3F3F46] transition-all duration-300 shadow-sm"
        >
          {/* Subtle top glare */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="p-5">
            <div className="flex items-start justify-between mb-4">
              <p className="text-sm font-medium text-[#A1A1AA]">{m.title}</p>
              <div className={`p-1.5 rounded-lg ${m.iconBg} ring-1 ring-inset ring-white/5`}>
                <m.icon className={`w-4 h-4 ${m.accent}`} />
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <h3 className="text-3xl font-semibold text-white tracking-tight">{m.value}</h3>
              <p className={`text-xs font-medium ${m.subtitleColor || 'text-[#71717A]'}`}>
                {m.subtitle}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

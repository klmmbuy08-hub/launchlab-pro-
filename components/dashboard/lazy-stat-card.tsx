'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

interface LazyStatCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: any
  color: string
  index: number
}

export function LazyStatCard({ title, value, change, trend, icon: Icon, color, index }: LazyStatCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="bg-neutral-800/50 border-neutral-700 hover:border-primary-500/50 transition-all overflow-hidden group">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{change}</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-100 mb-1">
            {value}
          </div>
          <div className="text-sm text-neutral-400">{title}</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

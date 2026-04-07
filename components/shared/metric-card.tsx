'use client'

import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  iconColor?: string
  trend?: {
    value: number
    label: string
  }
  onClick?: () => void
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-blue-400',
  trend,
  onClick,
}: MetricCardProps) {
  return (
    <Card
      className={`bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 transition-all ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-neutral-400 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-white">{value}</h3>
            {subtitle && <p className="text-xs text-neutral-500 mt-1">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-lg bg-neutral-800 ${iconColor}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>

        {trend && (
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                trend.value >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              <span>{trend.value >= 0 ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
            <span className="text-xs text-neutral-500">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

'use client'

interface StatCardProps {
  label: string
  value: string | number
  change?: {
    value: number
    period: string
  }
  format?: 'number' | 'currency' | 'percentage'
}

export function StatCard({ label, value, change, format = 'number' }: StatCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
        }).format(val)
      case 'percentage':
        return `${val}%`
      default:
        return new Intl.NumberFormat('en-US').format(val)
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-neutral-500 uppercase tracking-wide">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">{formatValue(value)}</span>
        {change && (
          <span
            className={`text-sm font-medium ${
              change.value >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {change.value >= 0 ? '+' : ''}
            {change.value}% {change.period}
          </span>
        )}
      </div>
    </div>
  )
}

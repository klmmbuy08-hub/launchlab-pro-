interface MetricCardProps {
  label: string
  value: string | number
  change?: string | null
  trend?: 'up' | 'down' | 'neutral'
}

export function MetricCard({ label, value, change, trend = 'neutral' }: MetricCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <p className="text-xs font-medium text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
      {change && <p className={`text-xs font-semibold ${getTrendColor()}`}>{change}</p>}
    </div>
  )
}
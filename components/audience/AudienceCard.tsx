interface AudienceCardProps {
  title: string
  value: string | number
  change?: string
  changePercent?: string
  trend?: 'up' | 'down' | 'neutral'
}

export function AudienceCard({ title, value, change, changePercent, trend = 'neutral' }: AudienceCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-50'
      case 'down':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mb-3">{value}</p>
      {(change || changePercent) && (
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getTrendColor()}`}>
          {change && <span>{change}</span>}
          {change && changePercent && <span> • </span>}
          {changePercent && <span>{changePercent}</span>}
        </div>
      )}
    </div>
  )
}
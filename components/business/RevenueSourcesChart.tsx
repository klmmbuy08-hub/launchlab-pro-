interface RevenueSourcesChartProps {
  sources?: {
    organic?: number
    paid?: number
    referral?: number
    other?: number
  }
}

export function RevenueSourcesChart({ sources }: RevenueSourcesChartProps) {
  if (!sources) return null

  const total = Object.values(sources).reduce((sum, val) => sum + (val || 0), 0)
  if (total === 0) return null

  const sourceData = [
    { name: 'Organic', value: sources.organic || 0, color: 'from-green-400 to-green-500', icon: '🌱' },
    { name: 'Paid', value: sources.paid || 0, color: 'from-blue-400 to-blue-500', icon: '💰' },
    { name: 'Referral', value: sources.referral || 0, color: 'from-purple-400 to-purple-500', icon: '🔗' },
    { name: 'Other', value: sources.other || 0, color: 'from-gray-400 to-gray-500', icon: '📊' },
  ].filter(s => s.value > 0)

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-6">Revenue by Source</h3>

      <div className="space-y-4">
        {sourceData.map((source, idx) => {
          const percentage = (source.value / total) * 100
          return (
            <div key={idx}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{source.icon}</span>
                  <span className="font-medium text-gray-700">{source.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${source.value.toFixed(2)}</p>
                  <p className="text-xs text-gray-600">{percentage.toFixed(1)}%</p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${source.color} transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Total */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900">Total Revenue</span>
          <p className="text-2xl font-bold text-green-600">${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
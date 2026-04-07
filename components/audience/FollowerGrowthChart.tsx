import { AudienceInsights } from '@/lib/types/v2'

interface FollowerGrowthChartProps {
  history: AudienceInsights[]
}

export function FollowerGrowthChart({ history }: FollowerGrowthChartProps) {
  if (!history || history.length === 0) {
    return null
  }

  const maxFollowers = Math.max(...history.map(h => h.total_followers))
  const chartHeight = 200

  // Normalize data for chart
  const chartData = history
    .slice()
    .reverse()
    .map((item, idx) => ({
      date: new Date(item.snapshot_date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
      followers: item.total_followers,
      height: maxFollowers > 0 ? (item.total_followers / maxFollowers) * chartHeight : 0,
    }))

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-6">Follower Growth</h3>

      {/* Chart */}
      <div className="mb-6">
        <div style={{ height: chartHeight + 40 }} className="relative flex items-end justify-between gap-1 px-2 py-4 bg-gray-50 rounded-lg">
          {chartData.map((item, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center group"
              style={{ minWidth: '30px' }}
            >
              <div className="relative w-full flex flex-col items-center">
                {/* Bar */}
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:from-blue-600 hover:to-blue-500 transition-all cursor-pointer"
                  style={{ height: `${item.height}px`, minHeight: '4px' }}
                >
                  {/* Tooltip */}
                  <div className="hidden group-hover:block absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                    {item.followers.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Label */}
              <p className="text-xs text-gray-600 mt-2 text-center">{item.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
        <div>
          <p className="text-xs text-gray-600 mb-1">Current</p>
          <p className="text-lg font-bold text-gray-900">
            {history[0].total_followers.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Growth (30d)</p>
          <p className="text-lg font-bold text-green-600">
            +{(history[0].total_followers - history[history.length - 1].total_followers).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Avg Daily</p>
          <p className="text-lg font-bold text-blue-600">
            +{Math.round((history[0].total_followers - history[history.length - 1].total_followers) / history.length)}
          </p>
        </div>
      </div>
    </div>
  )
}
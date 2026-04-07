import { BusinessMetrics } from '@/lib/types/v2'

interface RevenueChartProps {
  metric: BusinessMetrics
}

export function RevenueChart({ metric }: RevenueChartProps) {
  const currentRevenue = metric.cash_collected
  const forecastRevenue = metric.revenue_forecast || 0
  const totalRevenue = currentRevenue + forecastRevenue
  const currentPercentage = totalRevenue > 0 ? (currentRevenue / totalRevenue) * 100 : 0

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-6">Revenue Overview</h3>

      <div className="space-y-6">
        {/* Revenue Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Collected</span>
            <span className="text-lg font-bold text-gray-900">${currentRevenue.toFixed(2)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${currentPercentage}%` }}
            />
          </div>
        </div>

        {/* Forecast Bar */}
        {forecastRevenue > 0 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Forecasted</span>
              <span className="text-lg font-bold text-blue-600">${forecastRevenue.toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-400 h-3 rounded-full transition-all duration-300"
                style={{ width: `${100 - currentPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Total */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Total Target</span>
            <span className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
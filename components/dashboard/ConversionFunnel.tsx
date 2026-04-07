import { BusinessMetrics } from '@/lib/types/v2'

interface ConversionFunnelProps {
  metric: BusinessMetrics
}

export function ConversionFunnel({ metric }: ConversionFunnelProps) {
  const totalLeads = metric.total_leads || 1
  const qualifiedRate = totalLeads > 0 ? (metric.qualified_leads / totalLeads) * 100 : 0
  const conversionRate = totalLeads > 0 ? (metric.converted / totalLeads) * 100 : 0

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-6">Conversion Funnel</h3>

      <div className="space-y-4">
        {/* All Leads */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Total Leads</span>
            <span className="font-semibold text-gray-900">{totalLeads}</span>
          </div>
          <div className="w-full bg-blue-100 rounded-lg h-12 flex items-center justify-start px-3">
            <span className="text-sm font-medium text-blue-700">100%</span>
          </div>
        </div>

        {/* Qualified Leads */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Qualified</span>
            <span className="font-semibold text-gray-900">{metric.qualified_leads} ({qualifiedRate.toFixed(1)}%)</span>
          </div>
          <div className="w-full bg-purple-100 rounded-lg h-12 flex items-center justify-start px-3">
            <div
              className="bg-purple-500 rounded h-10 flex items-center justify-center text-white text-sm font-medium"
              style={{ width: `${qualifiedRate}%`, minWidth: '40px' }}
            >
              {qualifiedRate.toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Converted */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Converted</span>
            <span className="font-semibold text-gray-900">{metric.converted} ({conversionRate.toFixed(1)}%)</span>
          </div>
          <div className="w-full bg-green-100 rounded-lg h-12 flex items-center justify-start px-3">
            <div
              className="bg-green-500 rounded h-10 flex items-center justify-center text-white text-sm font-medium"
              style={{ width: `${conversionRate}%`, minWidth: '40px' }}
            >
              {conversionRate.toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-600 mb-1">Qualified → Converted</p>
            <p className="text-lg font-bold text-gray-900">
              {metric.qualified_leads > 0 ? ((metric.converted / metric.qualified_leads) * 100).toFixed(1) : 0}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Conversion Rate</p>
            <p className="text-lg font-bold text-gray-900">
              {metric.conversion_rate?.toFixed(1) || 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
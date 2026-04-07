import { BusinessMetrics } from '@/lib/types/v2'

interface PipelineFlowProps {
  metric: BusinessMetrics
}

export function PipelineFlow({ metric }: PipelineFlowProps) {
  const totalLeads = metric.total_leads || 1
  const qualifiedRate = (metric.qualified_leads / totalLeads) * 100
  const conversationRate = (metric.in_conversation / metric.qualified_leads) * 100 || 0
  const conversionRate = (metric.converted / metric.in_conversation) * 100 || 0

  const stages = [
    {
      label: 'All Leads',
      value: totalLeads,
      color: 'from-blue-400 to-blue-500',
      percentage: 100,
    },
    {
      label: 'Qualified',
      value: metric.qualified_leads,
      color: 'from-purple-400 to-purple-500',
      percentage: qualifiedRate,
    },
    {
      label: 'In Conversation',
      value: metric.in_conversation,
      color: 'from-orange-400 to-orange-500',
      percentage: conversationRate,
    },
    {
      label: 'Converted',
      value: metric.converted,
      color: 'from-green-400 to-green-500',
      percentage: conversionRate,
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-6">Sales Pipeline</h3>

      <div className="space-y-6">
        {stages.map((stage, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">{stage.label}</span>
              <div className="text-right">
                <span className="font-bold text-gray-900">{stage.value}</span>
                <span className="text-xs text-gray-600 ml-2">({stage.percentage.toFixed(0)}%)</span>
              </div>
            </div>
            <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${stage.color} flex items-center justify-start px-3 transition-all duration-300`}
                style={{ width: `${stage.percentage}%` }}
              >
                {stage.percentage > 15 && (
                  <span className="text-sm font-bold text-white">{stage.percentage.toFixed(0)}%</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Conversion Metrics */}
      <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-gray-600 mb-1">Qualification Rate</p>
          <p className="text-xl font-bold text-purple-600">{qualifiedRate.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Engagement Rate</p>
          <p className="text-xl font-bold text-orange-600">{conversationRate.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Close Rate</p>
          <p className="text-xl font-bold text-green-600">{conversionRate.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Overall Conversion</p>
          <p className="text-xl font-bold text-blue-600">
            {totalLeads > 0 ? ((metric.converted / totalLeads) * 100).toFixed(1) : 0}%
          </p>
        </div>
      </div>
    </div>
  )
}
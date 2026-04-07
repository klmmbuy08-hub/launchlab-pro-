import { AdCampaign } from '@/lib/types/v2'
import { useAdCampaigns } from '@/lib/hooks/v2'
import { useState } from 'react'

interface CampaignCardProps {
  campaign: AdCampaign
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const { updateCampaign, pauseCampaign, activateCampaign } = useAdCampaigns()
  const [isUpdating, setIsUpdating] = useState(false)

  const budgetSpent = campaign.total_budget > 0 ? (campaign.spent / campaign.total_budget) * 100 : 0
  const budgetRemaining = campaign.total_budget - campaign.spent

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'paused':
        return 'bg-yellow-100 text-yellow-700'
      case 'draft':
        return 'bg-gray-100 text-gray-700'
      case 'completed':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-red-100 text-red-700'
    }
  }

  const handleToggleStatus = async () => {
    setIsUpdating(true)
    try {
      if (campaign.status === 'active') {
        await pauseCampaign(campaign.id)
      } else if (campaign.status === 'paused') {
        await activateCampaign(campaign.id)
      }
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{campaign.name}</h3>
          <p className="text-sm text-gray-600 capitalize">{campaign.platform} • {campaign.objective}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}>
          {campaign.status}
        </span>
      </div>

      {/* Budget Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Budget</span>
          <span className="text-sm font-bold text-gray-900">${campaign.spent.toFixed(2)} / ${campaign.total_budget.toFixed(2)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              budgetSpent > 90 ? 'bg-red-500' : budgetSpent > 70 ? 'bg-yellow-500' : 'bg-blue-500'
            }`}
            style={{ width: `${Math.min(budgetSpent, 100)}%` }}
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
        <div>
          <p className="text-xs text-gray-600 mb-1">Impressions</p>
          <p className="text-lg font-bold text-gray-900">{campaign.impressions.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Conversions</p>
          <p className="text-lg font-bold text-gray-900">{campaign.conversions}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">ROAS</p>
          <p className="text-lg font-bold text-green-600">{campaign.roas.toFixed(2)}x</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">CPA</p>
          <p className="text-lg font-bold text-gray-900">${campaign.cpa.toFixed(2)}</p>
        </div>
      </div>

      {/* AI Recommendations */}
      {campaign.ai_recommendations && campaign.ai_recommendations.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs font-semibold text-blue-900 mb-1">💡 AI Recommendation</p>
          <p className="text-xs text-blue-700">{campaign.ai_recommendations[0].reason}</p>
        </div>
      )}

      {/* Actions */}
      <button
        onClick={handleToggleStatus}
        disabled={isUpdating || campaign.status === 'completed' || campaign.status === 'failed'}
        className={`w-full py-2 rounded-lg font-semibold transition ${
          campaign.status === 'active'
            ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
            : 'bg-green-50 text-green-700 hover:bg-green-100'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isUpdating
          ? 'Updating...'
          : campaign.status === 'active'
          ? 'Pause Campaign'
          : 'Activate Campaign'}
      </button>
    </div>
  )
}
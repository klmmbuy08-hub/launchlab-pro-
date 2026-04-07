'use client'

import { useEffect, useState } from 'react'
import { useAdCampaigns } from '@/lib/hooks/v2'
import { AdCampaign } from '@/lib/types/v2'
import { CampaignCard } from './CampaignCard'
import { BudgetSummary } from './BudgetSummary'
import { CreateCampaignModal } from './CreateCampaignModal'

export function CampaignManager() {
  const { campaigns, activeCampaigns, fetchCampaigns } = useAdCampaigns()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    fetchCampaigns()
  }, [fetchCampaigns])

  const filteredCampaigns = filterStatus === 'all'
    ? campaigns
    : campaigns.filter(c => c.status === filterStatus)

  const totalBudget = campaigns.reduce((sum, c) => sum + c.total_budget, 0)
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0)
  const totalROAS = campaigns.length > 0
    ? campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length
    : 0

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Campaign Manager</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Create Campaign
        </button>
      </div>

      {/* Budget Summary */}
      <BudgetSummary
        totalBudget={totalBudget}
        totalSpent={totalSpent}
        activeCount={activeCampaigns.length}
        averageROAS={totalROAS}
      />

      {/* Active Campaigns Summary */}
      {activeCampaigns.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">
            {activeCampaigns.length} Active Campaign{activeCampaigns.length !== 1 ? 's' : ''}
          </h3>
          <p className="text-sm text-green-700">
            Currently spending ${(activeCampaigns.reduce((sum, c) => sum + c.spent, 0)).toFixed(2)}
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'active', 'paused', 'draft', 'completed'].map((status) => {
          const count = status === 'all'
            ? campaigns.length
            : campaigns.filter(c => c.status === status).length

          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg transition whitespace-nowrap text-sm font-medium border ${
                filterStatus === status
                  ? 'bg-blue-100 border-blue-300 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              <span className="ml-2 text-xs opacity-70">({count})</span>
            </button>
          )
        })}
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 mb-4">No campaigns found</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Create your first campaign →
            </button>
          </div>
        )}
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <CreateCampaignModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            fetchCampaigns()
          }}
        />
      )}
    </div>
  )
}
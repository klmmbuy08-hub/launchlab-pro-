import { useState } from 'react'
import { useAdCampaigns } from '@/lib/hooks/v2'

interface CreateCampaignModalProps {
  onClose: () => void
  onSuccess: () => void
}

export function CreateCampaignModal({ onClose, onSuccess }: CreateCampaignModalProps) {
  const { createCampaign } = useAdCampaigns()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    platform: 'meta' as const,
    objective: 'leads' as const,
    total_budget: 100,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await createCampaign({
        ...formData,
        user_id: '',
        daily_budget: formData.total_budget / 30,
        status: 'draft',
        impressions: 0,
        clicks: 0,
        ctr: 0,
        conversions: 0,
        cpa: 0,
        roas: 0,
        target_audience: {},
        creatives: [],
        ad_copy: { primary_text: '', headline: '', description: '' },
        ai_optimization_enabled: true,
      } as any)
      onSuccess()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Create Campaign</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="E.g., Summer Promo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="meta">Meta (Facebook/Instagram)</option>
              <option value="google">Google</option>
              <option value="tiktok">TikTok</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Objective</label>
            <select
              value={formData.objective}
              onChange={(e) => setFormData({ ...formData, objective: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="leads">Generate Leads</option>
              <option value="sales">Drive Sales</option>
              <option value="traffic">Drive Traffic</option>
              <option value="awareness">Build Awareness</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
            <input
              type="number"
              required
              min="10"
              step="10"
              value={formData.total_budget}
              onChange={(e) => setFormData({ ...formData, total_budget: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
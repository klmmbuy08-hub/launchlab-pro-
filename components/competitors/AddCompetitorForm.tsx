import { useState } from 'react'
import { Competitor } from '@/lib/types/v2'

interface AddCompetitorFormProps {
  onClose: () => void
  onSubmit: (data: Omit<Competitor, 'id' | 'added_at' | 'updated_at'>) => void
}

export function AddCompetitorForm({ onClose, onSubmit }: AddCompetitorFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    platform: 'instagram' as const,
    username: '',
    profile_data: { display_name: '', bio: '', followers: 0, following: 0, posts: 0, profile_picture_url: '' },
    content_strategy: { posting_frequency: 3.5, primary_content_types: [], themes: [], avg_engagement_rate: 0 },
    positioning: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onSubmit({
        user_id: '',
        platform: formData.platform,
        username: formData.username,
        profile_data: formData.profile_data,
        content_strategy: formData.content_strategy,
        positioning: formData.positioning,
        is_active: true,
      } as any)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-96 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add Competitor</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="linkedin">LinkedIn</option>
              <option value="youtube">YouTube</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="@competitor"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
            <input
              type="text"
              value={formData.profile_data.display_name}
              onChange={(e) => setFormData({
                ...formData,
                profile_data: { ...formData.profile_data, display_name: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Followers</label>
            <input
              type="number"
              value={formData.profile_data.followers}
              onChange={(e) => setFormData({
                ...formData,
                profile_data: { ...formData.profile_data, followers: Number(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Positioning</label>
            <textarea
              value={formData.positioning}
              onChange={(e) => setFormData({ ...formData, positioning: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="How do they position themselves?"
              rows={2}
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
              {isLoading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
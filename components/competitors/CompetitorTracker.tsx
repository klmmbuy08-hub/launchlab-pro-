'use client'

import { useEffect, useState } from 'react'
import { useCompetitors } from '@/lib/hooks/v2'
import { Competitor } from '@/lib/types/v2'
import { CompetitorTable } from './CompetitorTable'
import { CompetitorAnalysis } from './CompetitorAnalysis'
import { AddCompetitorForm } from './AddCompetitorForm'

export function CompetitorTracker() {
  const { competitors, fetchCompetitors, addCompetitor } = useCompetitors()
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null)
  const [platform, setPlatform] = useState<string>('all')

  useEffect(() => {
    fetchCompetitors()
  }, [fetchCompetitors])

  const filteredCompetitors = platform === 'all'
    ? competitors
    : competitors.filter(c => c.platform === platform)

  const handleAddCompetitor = async (data: any) => {
    await addCompetitor(data)
    setShowAddForm(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Competitor Tracking</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Add Competitor
        </button>
      </div>

      {/* Platform Filter */}
      <div className="flex gap-2">
        {['all', 'instagram', 'tiktok', 'linkedin', 'youtube'].map((p) => {
          const count = p === 'all' ? competitors.length : competitors.filter(c => c.platform === p).length
          return (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                platform === p
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)} ({count})
            </button>
          )
        })}
      </div>

      {/* Stats Overview */}
      {filteredCompetitors.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-600 mb-1">Total Competitors</p>
            <p className="text-2xl font-bold text-gray-900">{filteredCompetitors.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-600 mb-1">Avg Followers</p>
            <p className="text-2xl font-bold text-blue-600">
              {Math.round(
                filteredCompetitors.reduce((sum, c) => sum + (c.profile_data?.followers || 0), 0) /
                  filteredCompetitors.length
              ).toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-600 mb-1">Avg Engagement</p>
            <p className="text-2xl font-bold text-green-600">
              {(
                filteredCompetitors.reduce((sum, c) => sum + (c.content_strategy?.avg_engagement_rate || 0), 0) /
                filteredCompetitors.length
              ).toFixed(1)}%
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Competitor List */}
        <div className="lg:col-span-2">
          <CompetitorTable
            competitors={filteredCompetitors}
            onSelectCompetitor={setSelectedCompetitor}
            selected={selectedCompetitor}
          />
        </div>

        {/* Competitor Analysis */}
        <div>
          {selectedCompetitor ? (
            <CompetitorAnalysis competitor={selectedCompetitor} />
          ) : (
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
              <p className="text-gray-600">Select a competitor to view analysis</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Competitor Modal */}
      {showAddForm && (
        <AddCompetitorForm
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddCompetitor}
        />
      )}
    </div>
  )
}
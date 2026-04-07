'use client'

import { useEffect, useState } from 'react'
import { useContentAnalysis } from '@/lib/hooks/v2'
import { ContentAnalysis } from '@/lib/types/v2'
import { ContentCard } from './ContentCard'
import { ContentFilters } from './ContentFilters'

interface ContentGridProps {
  accountId: string
}

export function ContentGrid({ accountId }: ContentGridProps) {
  const { content, loading, fetchContentByAccount, fetchTopContent } = useContentAnalysis()
  const [topContent, setTopContent] = useState<ContentAnalysis[]>([])
  const [filterType, setFilterType] = useState<string>('all')

  useEffect(() => {
    fetchContentByAccount(accountId)
    fetchTopContent(accountId, 100).then(setTopContent)
  }, [accountId, fetchContentByAccount, fetchTopContent])

  const filteredContent = filterType === 'all'
    ? content
    : content.filter(c => c.content_type === filterType)

  const sortedContent = [...filteredContent].sort((a, b) =>
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  )

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <ContentFilters
        onFilterChange={setFilterType}
        totalContent={content.length}
        topContent={topContent.length}
      />

      {/* Top Performing Content */}
      {topContent.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">🔥 Top Performing Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topContent.slice(0, 3).map((item) => (
              <ContentCard key={item.id} content={item} highlight="top" />
            ))}
          </div>
        </div>
      )}

      {/* Content Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {filterType === 'all' ? 'All Content' : `${filterType.charAt(0).toUpperCase() + filterType.slice(1)}s`}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedContent.length > 0 ? (
            sortedContent.map((item) => (
              <ContentCard key={item.id} content={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No content found</p>
            </div>
          )}
        </div>
      </div>

      {/* Statistics */}
      {content.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Content Performance Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">Avg Engagement</p>
              <p className="text-xl font-bold text-gray-900">
                {(content.reduce((sum, c) => sum + c.engagement_rate, 0) / content.length).toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Total Likes</p>
              <p className="text-xl font-bold text-gray-900">
                {content.reduce((sum, c) => sum + c.likes, 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Total Comments</p>
              <p className="text-xl font-bold text-gray-900">
                {content.reduce((sum, c) => sum + c.comments, 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Attributed Revenue</p>
              <p className="text-xl font-bold text-green-600">
                ${content.reduce((sum, c) => sum + c.revenue_attributed, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
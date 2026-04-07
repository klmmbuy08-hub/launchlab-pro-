import { ContentAnalysis } from '@/lib/types/v2'

interface ContentCardProps {
  content: ContentAnalysis
  highlight?: 'top'
}

export function ContentCard({ content, highlight }: ContentCardProps) {
  const isBorder = highlight === 'top'
  const engagementLevel = content.engagement_rate > 10 ? 'high' : content.engagement_rate > 5 ? 'medium' : 'low'

  const getEngagementColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-green-600'
      case 'medium':
        return 'text-yellow-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div
      className={`bg-white rounded-lg border-2 p-4 hover:shadow-lg transition ${
        isBorder ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'
      }`}
    >
      {/* Badge */}
      {highlight === 'top' && (
        <div className="mb-3 inline-block px-2 py-1 bg-yellow-200 text-yellow-700 text-xs font-bold rounded">
          🔥 TOP PERFORMER
        </div>
      )}

      {/* Media */}
      {content.media_url && (
        <div className="mb-3 w-full h-40 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={content.media_url}
            alt="Content"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content Type */}
      <div className="mb-2 inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
        {content.content_type.toUpperCase()}
      </div>

      {/* Caption */}
      {content.caption && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {content.caption}
        </p>
      )}

      {/* Metrics */}
      <div className="space-y-2 mb-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Engagement Rate</span>
          <span className={`font-bold ${getEngagementColor(engagementLevel)}`}>
            {content.engagement_rate.toFixed(2)}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Reach</span>
          <span className="font-bold text-gray-900">
            {(content.reach || 0).toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="text-center">
            <p className="text-xs text-gray-600">Likes</p>
            <p className="font-bold text-gray-900">{content.likes.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">Comments</p>
            <p className="font-bold text-gray-900">{content.comments.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">Shares</p>
            <p className="font-bold text-gray-900">{content.shares.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Revenue */}
      {content.revenue_attributed > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-1">Attributed Revenue</p>
          <p className="text-lg font-bold text-green-600">
            ${content.revenue_attributed.toFixed(2)}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
        {new Date(content.published_at).toLocaleDateString('es-ES')}
      </div>
    </div>
  )
}
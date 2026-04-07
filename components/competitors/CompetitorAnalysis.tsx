import { Competitor } from '@/lib/types/v2'

interface CompetitorAnalysisProps {
  competitor: Competitor
}

export function CompetitorAnalysis({ competitor }: CompetitorAnalysisProps) {
  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          {competitor.profile_data?.profile_picture_url && (
            <img
              src={competitor.profile_data.profile_picture_url}
              alt={competitor.username}
              className="w-12 h-12 rounded-full"
            />
          )}
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">{competitor.profile_data?.display_name}</h3>
            <p className="text-sm text-gray-600">@{competitor.username}</p>
          </div>
        </div>

        {competitor.profile_data?.bio && (
          <p className="text-sm text-gray-700 mb-4">{competitor.profile_data.bio}</p>
        )}

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-600 mb-1">Followers</p>
            <p className="font-bold text-gray-900">
              {(competitor.profile_data?.followers || 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Posts</p>
            <p className="font-bold text-gray-900">
              {competitor.profile_data?.posts || 0}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Following</p>
            <p className="font-bold text-gray-900">
              {(competitor.profile_data?.following || 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Content Strategy */}
      {competitor.content_strategy && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Content Strategy</h4>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-600 mb-1">Posting Frequency</p>
              <p className="font-bold text-gray-900">
                {competitor.content_strategy.posting_frequency?.toFixed(1)} posts/week
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Avg Engagement</p>
              <p className="font-bold text-green-600">
                {competitor.content_strategy.avg_engagement_rate?.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Content Types</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {competitor.content_strategy.primary_content_types?.slice(0, 3).map((type, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Main Themes</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {competitor.content_strategy.themes?.slice(0, 3).map((theme, idx) => (
                  <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Info */}
      {competitor.pricing_info?.products && competitor.pricing_info.products.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Products/Pricing</h4>
          <div className="space-y-2">
            {competitor.pricing_info.products.slice(0, 3).map((product, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">{product.name}</span>
                <span className="font-bold text-gray-900">${product.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Positioning */}
      {competitor.positioning && (
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
          <h4 className="font-semibold text-blue-900 text-sm mb-2">Market Positioning</h4>
          <p className="text-sm text-blue-700">{competitor.positioning}</p>
        </div>
      )}
    </div>
  )
}
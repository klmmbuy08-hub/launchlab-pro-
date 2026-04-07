import { Competitor } from '@/lib/types/v2'

interface CompetitorTableProps {
  competitors: Competitor[]
  onSelectCompetitor: (competitor: Competitor) => void
  selected: Competitor | null
}

export function CompetitorTable({ competitors, onSelectCompetitor, selected }: CompetitorTableProps) {
  if (competitors.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-500 mb-4">No competitors tracked yet</p>
        <p className="text-sm text-gray-400">Add competitors to start monitoring</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Competitor</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Platform</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Followers</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Engagement</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Posts/Week</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {competitors.map((competitor) => (
              <tr
                key={competitor.id}
                onClick={() => onSelectCompetitor(competitor)}
                className={`cursor-pointer transition ${
                  selected?.id === competitor.id
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {competitor.profile_data?.profile_picture_url && (
                      <img
                        src={competitor.profile_data.profile_picture_url}
                        alt={competitor.username}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{competitor.profile_data?.display_name || competitor.username}</p>
                      <p className="text-xs text-gray-600">@{competitor.username}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                    {competitor.platform}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900">
                    {(competitor.profile_data?.followers || 0).toLocaleString()}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-green-600">
                    {competitor.content_strategy?.avg_engagement_rate?.toFixed(2) || '0.00'}%
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900">
                    {competitor.content_strategy?.posting_frequency?.toFixed(1) || '0'}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
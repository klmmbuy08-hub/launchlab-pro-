import { ContentCalendarEntry } from '@/lib/types/v2'
import { useContentCalendar } from '@/lib/hooks/v2'
import { useState } from 'react'

interface ApprovalQueueProps {
  pending: ContentCalendarEntry[]
}

export function ApprovalQueue({ pending }: ApprovalQueueProps) {
  const { approveEntry } = useContentCalendar()
  const [approving, setApproving] = useState<string | null>(null)

  const handleApprove = async (id: string) => {
    setApproving(id)
    try {
      await approveEntry(id)
    } finally {
      setApproving(null)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-xl">⏳</span>
        Pending Approval ({pending.length})
      </h3>

      {pending.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-8">All content approved! 🎉</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {pending.map((entry) => (
            <div key={entry.id} className="border border-yellow-200 bg-yellow-50 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-sm text-gray-900">
                    {entry.content_type.charAt(0).toUpperCase() + entry.content_type.slice(1)}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {new Date(entry.scheduled_date).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <span className="px-2 py-1 bg-yellow-200 text-yellow-700 text-xs font-semibold rounded">
                  {entry.status}
                </span>
              </div>

              {entry.caption && (
                <p className="text-sm text-gray-700 mb-2 line-clamp-2">{entry.caption}</p>
              )}

              {entry.ai_generated && (
                <div className="mb-2 text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded w-fit">
                  🤖 AI Generated
                </div>
              )}

              <button
                onClick={() => handleApprove(entry.id)}
                disabled={approving === entry.id}
                className="w-full mt-2 px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded hover:bg-green-700 disabled:opacity-50 transition"
              >
                {approving === entry.id ? 'Approving...' : 'Approve'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
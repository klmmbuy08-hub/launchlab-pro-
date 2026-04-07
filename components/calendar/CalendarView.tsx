import { ContentCalendarEntry } from '@/lib/types/v2'
import { useState } from 'react'

interface CalendarViewProps {
  entries: ContentCalendarEntry[]
}

export function CalendarView({ entries }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const monthDays = Array.from({ length: daysInMonth(currentDate) }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth(currentDate) }, (_, i) => i)

  const getEntriesForDay = (day: number) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      .toISOString()
      .split('T')[0]
    return entries.filter(e => e.scheduled_date === dateStr)
  }

  const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-gray-900 capitalize">{monthName}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            →
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {emptyDays.map((_, idx) => (
          <div key={`empty-${idx}`} className="aspect-square" />
        ))}

        {monthDays.map((day) => {
          const dayEntries = getEntriesForDay(day)
          const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

          return (
            <div
              key={day}
              className={`aspect-square rounded-lg border-2 p-2 overflow-hidden cursor-pointer hover:shadow-md transition ${
                isToday
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <p className={`text-sm font-semibold mb-1 ${isToday ? 'text-blue-700' : 'text-gray-900'}`}>
                {day}
              </p>
              <div className="space-y-1 text-xs">
                {dayEntries.slice(0, 2).map((entry, idx) => (
                  <div
                    key={idx}
                    className={`px-1 py-0.5 rounded text-white text-xs truncate ${
                      entry.status === 'approved'
                        ? 'bg-green-500'
                        : entry.status === 'planned'
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                    }`}
                  >
                    {entry.content_type[0].toUpperCase()}
                  </div>
                ))}
                {dayEntries.length > 2 && (
                  <p className="text-gray-600 text-xs">+{dayEntries.length - 2}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-gray-200 flex gap-4 flex-wrap text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span className="text-gray-600">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-gray-600">Approved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span className="text-gray-600">Published</span>
        </div>
      </div>
    </div>
  )
}
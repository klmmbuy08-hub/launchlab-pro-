'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'

interface CalendarEntry {
  date: string
  content_type: 'reel' | 'carousel' | 'post' | 'story'
  topic: string
  caption_hook: string
  content_category: string
  cta: string
  best_time_to_post: string
  status?: 'planned' | 'approved' | 'published'
}

interface CalendarViewProps {
  entries: CalendarEntry[]
  onEntryClick: (entry: CalendarEntry) => void
  onGenerateMore?: () => void
}

const contentTypeColors = {
  reel: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  carousel: 'bg-green-500/20 text-green-300 border-green-500/30',
  post: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  story: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
}

const contentTypeIcons = {
  reel: '🎬',
  carousel: '📸',
  post: '📄',
  story: '📱',
}

export function CalendarView({ entries, onEntryClick, onGenerateMore }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Get calendar grid
  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  const startDay = startOfMonth.getDay()
  const daysInMonth = endOfMonth.getDate()

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const getEntriesForDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return entries.filter((e) => e.date === dateStr)
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-bold text-white">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevMonth}
              className="border-neutral-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentMonth(new Date())}
              className="border-neutral-700"
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextMonth}
              className="border-neutral-700"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          {days.map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-neutral-500 py-2">
              {day}
            </div>
          ))}

          {/* Empty cells before month starts */}
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Days of month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const dayEntries = getEntriesForDate(day)
            const isToday =
              day === new Date().getDate() &&
              currentMonth.getMonth() === new Date().getMonth() &&
              currentMonth.getFullYear() === new Date().getFullYear()

            return (
              <div
                key={day}
                className={`aspect-square border rounded-lg p-2 ${
                  isToday
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-neutral-800 bg-neutral-900/50'
                } hover:border-neutral-700 transition-colors`}
              >
                <div className="h-full flex flex-col">
                  <span
                    className={`text-xs font-semibold mb-1 ${isToday ? 'text-blue-400' : 'text-neutral-400'}`}
                  >
                    {day}
                  </span>

                  <div className="flex-1 space-y-1 overflow-y-auto">
                    {dayEntries.map((entry, idx) => (
                      <div
                        key={idx}
                        onClick={() => onEntryClick(entry)}
                        className={`text-[10px] px-1.5 py-0.5 rounded border cursor-pointer hover:opacity-80 transition-opacity ${
                          contentTypeColors[entry.content_type]
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span>{contentTypeIcons[entry.content_type]}</span>
                          <span className="truncate">{entry.topic.slice(0, 15)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-neutral-800">
          <div className="flex items-center gap-4 text-xs">
            <span className="text-neutral-500">Legend:</span>
            {Object.entries(contentTypeColors).map(([type]) => (
              <div key={type} className="flex items-center gap-1.5">
                <span>{contentTypeIcons[type as keyof typeof contentTypeIcons]}</span>
                <span className="text-neutral-400 capitalize">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Generate more button */}
        {onGenerateMore && (
          <Button
            onClick={onGenerateMore}
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500"
          >
            Generate Next 30 Days
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

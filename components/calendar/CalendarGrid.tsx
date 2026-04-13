'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PostCard } from './PostCard'
import { ContentCalendarEntry } from '@/lib/types/v2'
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths 
} from 'date-fns'

interface CalendarGridProps {
  posts: ContentCalendarEntry[]
  onDateClick: (date: Date) => void
  currentMonth: Date
  setCurrentMonth: (date: Date) => void
}

export function CalendarGrid({ posts, onDateClick, currentMonth, setCurrentMonth }: CalendarGridProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  })

  const getPostsForDay = (date: Date) => {
    return posts.filter(post => {
      const postDate = new Date(post.scheduled_date)
      return isSameDay(postDate, date)
    })
  }

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  if (isMobile) {
    const relevantDays = calendarDays.filter(day => isSameMonth(day, monthStart))
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-[#171717] rounded-xl border border-[#404040]">
          <h2 className="text-lg font-semibold text-white">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={prevMonth} className="text-neutral-400">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={nextMonth} className="text-neutral-400">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          {relevantDays.map(day => {
            const dayPosts = getPostsForDay(day)
            if (dayPosts.length === 0) return null
            
            return (
              <div key={day.toString()} className="p-4 bg-[#171717] rounded-xl border border-[#404040]">
                <div className="text-xs font-bold text-neutral-500 mb-2 uppercase">
                  {format(day, 'EEEE, MMM d')}
                </div>
                <div className="space-y-2">
                  {dayPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )
          })}
          {posts.length === 0 && (
            <div className="p-8 text-center bg-[#171717] rounded-xl border border-dashed border-[#404040]">
               <p className="text-neutral-500 text-sm">No scheduled posts for this month.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#171717] rounded-xl border border-[#404040] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#404040]">
        <h2 className="text-lg font-semibold text-white">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={prevMonth} className="text-neutral-400 hover:text-white">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={nextMonth} className="text-neutral-400 hover:text-white">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 bg-black/20 border-b border-[#404040]">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-2 text-center text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((day, idx) => {
          const dayPosts = getPostsForDay(day)
          const isCurrentMonth = isSameMonth(day, monthStart)
          const isToday = isSameDay(day, new Date())
          
          return (
            <div 
              key={day.toString()} 
              className={`min-h-[120px] border-r border-b border-[#404040] p-2 hover:bg-neutral-800/30 transition-colors group relative ${
                !isCurrentMonth ? 'bg-black/20 opacity-40' : ''
              } ${isToday ? 'bg-blue-600/5' : ''}`}
              onClick={() => onDateClick(day)}
            >
              <div className="flex justify-between items-start">
                <span className={`text-xs font-medium ${
                  isToday ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center -mt-1 -ml-1' : 
                  isCurrentMonth ? 'text-neutral-300' : 'text-neutral-600'
                }`}>
                  {format(day, 'd')}
                </span>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-neutral-800 rounded-full hover:bg-neutral-700">
                  <Plus className="w-3 h-3 text-white" />
                </button>
              </div>
              
              <div className="mt-2 space-y-1">
                {dayPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              
              {isToday && (
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

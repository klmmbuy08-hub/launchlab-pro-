'use client'

import { Badge } from '@/components/ui/badge'
import { CheckSquare, Clock } from 'lucide-react'

interface UpcomingTasksProps {
  tasks: {
    id: string
    title: string
    due_date: string
    type: 'content' | 'campaign' | 'follow_up' | 'optimization'
    priority: 'high' | 'medium' | 'low'
  }[]
}

const typeColors = {
  content: 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30',
  campaign: 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/30',
  follow_up: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30',
  optimization: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30',
}

const priorityColors = {
  high: 'bg-[#EF4444]/10 text-[#EF4444]',
  medium: 'bg-[#F59E0B]/10 text-[#F59E0B]',
  low: 'bg-[#71717A]/10 text-[#A1A1AA]',
}

export function UpcomingTasks({ tasks }: UpcomingTasksProps) {
  const getTimeUntil = (dueDate: string) => {
    const now = new Date()
    const due = new Date(dueDate)
    const diffMs = due.getTime() - now.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    
    if (diffHours < 1) return 'Due now'
    if (diffHours < 24) return `${diffHours}h`
    return `${Math.floor(diffHours / 24)}d`
  }

  return (
    <div className="bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-[#27272A] bg-[#0A0A0A]">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-[#10B981]" />
          Upcoming Tasks
        </h3>
      </div>
      <div className="p-5">
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start md:items-center justify-between p-4 rounded-xl bg-[#0A0A0A] border border-[#27272A] hover:border-[#3F3F46] transition-colors cursor-pointer group"
            >
              <div className="flex items-start md:items-center gap-4 flex-1">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 mt-0.5 md:mt-0 rounded bg-[#141414] border border-[#3F3F46] checked:bg-[#10B981] checked:border-[#10B981] focus:ring-[#10B981] focus:ring-offset-0 cursor-pointer"
                />
                <div className="flex-1 w-full min-w-0">
                  <p className="text-sm font-semibold text-white mb-2 truncate group-hover:text-[#10B981] transition-colors">{task.title}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={`${typeColors[task.type]} text-[9px] uppercase font-bold tracking-widest`}>
                      {task.type.replace('_', ' ')}
                    </Badge>
                    <Badge className={`${priorityColors[task.priority]} text-[9px] uppercase font-bold tracking-widest border-transparent`}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-[#71717A] ml-4 bg-[#141414] border border-[#27272A] px-2 py-1 rounded-md whitespace-nowrap hidden md:flex">
                <Clock className="w-3 h-3" />
                <span>{getTimeUntil(task.due_date)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

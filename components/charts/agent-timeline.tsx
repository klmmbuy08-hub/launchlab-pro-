'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'

interface TimelineEvent {
  agent: string
  emoji: string
  task: string
  status: 'completed' | 'in_progress' | 'pending'
  time: string
  color: string
}

interface AgentTimelineProps {
  events: TimelineEvent[]
}

export function AgentTimeline({ events }: AgentTimelineProps) {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-4"
        >
          {/* Timeline dot */}
          <div className="relative flex-shrink-0">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${event.color} flex items-center justify-center text-lg`}>
              {event.emoji}
            </div>
            {index < events.length - 1 && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-neutral-700" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-8">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-neutral-100">{event.agent}</span>
              <div className="flex items-center gap-1">
                {event.status === 'completed' && (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                )}
                {event.status === 'in_progress' && (
                  <Clock className="w-4 h-4 text-blue-400 animate-pulse" />
                )}
                {event.status === 'pending' && (
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                )}
                <span className={`text-xs font-semibold ${
                  event.status === 'completed' ? 'text-green-400' :
                  event.status === 'in_progress' ? 'text-blue-400' :
                  'text-yellow-400'
                }`}>
                  {event.status === 'completed' ? 'Completado' :
                   event.status === 'in_progress' ? 'En progreso' :
                   'Pendiente'}
                </span>
              </div>
            </div>
            <p className="text-sm text-neutral-400 mb-1">{event.task}</p>
            <span className="text-xs text-neutral-500">{event.time}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

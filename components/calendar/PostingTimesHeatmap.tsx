'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Clock } from 'lucide-react'

interface HeatmapData {
  day: string
  hour: number
  engagement: number
}

interface PostingTimesHeatmapProps {
  data: HeatmapData[]
}

export function PostingTimesHeatmap({ data }: PostingTimesHeatmapProps) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const getColor = (engagement: number) => {
    if (engagement > 80) return 'bg-blue-500'
    if (engagement > 60) return 'bg-blue-600/80'
    if (engagement > 40) return 'bg-blue-700/60'
    if (engagement > 20) return 'bg-blue-800/40'
    return 'bg-neutral-900 border border-neutral-800'
  }

  return (
    <Card className="bg-[#171717] border-[#404040]">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          Optimal Posting Times
        </CardTitle>
        <CardDescription className="text-xs text-neutral-400">
          Based on historical engagement data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-[30px_1fr] gap-2">
            <div className="flex flex-col justify-between py-1">
              {days.map(day => (
                <span key={day} className="text-[9px] text-neutral-500 font-bold uppercase">{day[0]}</span>
              ))}
            </div>
            <div className="grid grid-cols-24 gap-1">
              {data.map((item, idx) => (
                <div 
                  key={idx}
                  className={`aspect-square rounded-sm ${getColor(item.engagement)}`}
                  title={`${item.day} ${item.hour}:00 - Engagement: ${item.engagement}%`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-between text-[8px] text-neutral-500 uppercase tracking-widest font-bold px-8">
            <span>12 AM</span>
            <span>6 AM</span>
            <span>12 PM</span>
            <span>6 PM</span>
            <span>11 PM</span>
          </div>

          <div className="flex items-center gap-4 pt-2 border-t border-[#404040]">
             <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-sm bg-blue-500" />
                <span className="text-[10px] text-neutral-400">High Impact</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-sm bg-blue-900" />
                <span className="text-[10px] text-neutral-400">Low Activity</span>
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

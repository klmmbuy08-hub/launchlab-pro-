'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  AlertTriangle, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  ArrowRight
} from 'lucide-react'

interface AlertsFeedProps {
  alerts: {
    type: 'critical' | 'warning' | 'info' | 'success'
    title: string
    message: string
    action?: string
    timestamp: string
  }[]
}

const alertConfig = {
  critical: {
    icon: AlertTriangle,
    color: 'border-[#EF4444]/30 bg-[#EF4444]/5',
    badge: 'text-[#EF4444] border-[#EF4444]/30 bg-[#EF4444]/10',
    iconColor: 'text-[#EF4444]',
  },
  warning: {
    icon: AlertCircle,
    color: 'border-[#F59E0B]/30 bg-[#F59E0B]/5',
    badge: 'text-[#F59E0B] border-[#F59E0B]/30 bg-[#F59E0B]/10',
    iconColor: 'text-[#F59E0B]',
  },
  info: {
    icon: Info,
    color: 'border-[#3B82F6]/30 bg-[#3B82F6]/5',
    badge: 'text-[#3B82F6] border-[#3B82F6]/30 bg-[#3B82F6]/10',
    iconColor: 'text-[#3B82F6]',
  },
  success: {
    icon: CheckCircle2,
    color: 'border-[#10B981]/30 bg-[#10B981]/5',
    badge: 'text-[#10B981] border-[#10B981]/30 bg-[#10B981]/10',
    iconColor: 'text-[#10B981]',
  },
}

export function AlertsFeed({ alerts }: AlertsFeedProps) {
  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffMs = now.getTime() - time.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    
    if (diffHours < 1) return 'Just now'
    if (diffHours === 1) return '1 hour ago'
    if (diffHours < 24) return `${diffHours} hours ago`
    return `${Math.floor(diffHours / 24)} days ago`
  }

  return (
    <div className="bg-[#141414] border border-[#27272A] rounded-xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-[#27272A] bg-[#0A0A0A] flex items-center justify-between">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
          Alerts & Notifications
        </h3>
        <Badge variant="outline" className="border-[#27272A] bg-[#141414] text-[#A1A1AA] rounded-md h-6">
          {alerts.length} New
        </Badge>
      </div>
      <div className="p-5">
        <div className="space-y-4">
          {alerts.map((alert, idx) => {
            const config = alertConfig[alert.type]
            const Icon = config.icon

            return (
              <div key={idx} className={`${config.color} border rounded-xl overflow-hidden shadow-sm`}>
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.05] flex-shrink-0 mt-0.5">
                      <Icon className={`w-4 h-4 ${config.iconColor}`} />
                    </div>
                    <div className="flex-1 w-full min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-white text-sm truncate">{alert.title}</h4>
                          <Badge variant="outline" className={`${config.badge} text-[9px] uppercase font-bold tracking-widest`}>
                            {alert.type}
                          </Badge>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#71717A] whitespace-nowrap">
                          {getTimeAgo(alert.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-[#A1A1AA] mb-4 leading-relaxed">{alert.message}</p>
                      
                      {alert.action && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 bg-[#0A0A0A] border-[#27272A] hover:bg-[#1A1A1A] hover:text-white text-xs font-semibold px-4 transition-colors text-[#E5E7EB]"
                        >
                          {alert.action}
                          <ArrowRight className="w-3.5 h-3.5 ml-2 text-[#71717A]" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Target, Edit, Check, X } from 'lucide-react'
import { useState } from 'react'

interface GoalsTrackerProps {
  goals: {
    monthly_revenue: number
    monthly_leads: number
    conversion_rate: number
  }
  current: {
    revenue: number
    leads: number
    conversions: number
  }
  onUpdateGoals: (goals: any) => void
}

export function GoalsTracker({ goals, current, onUpdateGoals }: GoalsTrackerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedGoals, setEditedGoals] = useState(goals)

  const handleSave = () => {
    onUpdateGoals(editedGoals)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedGoals(goals)
    setIsEditing(false)
  }

  const calculateProgress = (current: number, goal: number) => {
    return Math.min(100, (current / goal) * 100)
  }

  const goalItems = [
    {
      label: 'Monthly Revenue',
      current: current.revenue,
      goal: goals.monthly_revenue,
      format: (val: number) => `$${val.toLocaleString()}`,
      key: 'monthly_revenue' as const,
    },
    {
      label: 'Monthly Leads',
      current: current.leads,
      goal: goals.monthly_leads,
      format: (val: number) => val.toString(),
      key: 'monthly_leads' as const,
    },
    {
      label: 'Conversion Rate',
      current: (current.conversions / current.leads) * 100,
      goal: goals.conversion_rate,
      format: (val: number) => `${val.toFixed(1)}%`,
      key: 'conversion_rate' as const,
    },
  ]

  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            Goals Tracker
          </CardTitle>
          {!isEditing ? (
            <Button
             
              size="sm"
              onClick={() => setIsEditing(true)}
              className="border-neutral-700"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Goals
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
               
                size="sm"
                onClick={handleCancel}
                className="border-neutral-700"
              >
                <X className="w-4 h-4" />
              </Button>
              <Button size="sm" onClick={handleSave} className="bg-green-500 hover:bg-green-600">
                <Check className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {goalItems.map((item) => {
          const progress = calculateProgress(item.current, item.goal)
          const isOnTrack = progress >= 70

          return (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-neutral-300">{item.label}</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedGoals[item.key]}
                    onChange={(e) =>
                      setEditedGoals({
                        ...editedGoals,
                        [item.key]: Number(e.target.value),
                      })
                    }
                    className="w-32 h-8 bg-neutral-800 border-neutral-700"
                  />
                ) : (
                  <span className="text-sm text-neutral-500">
                    Goal: {item.format(item.goal)}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-white">
                    {item.format(item.current)}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      isOnTrack ? 'text-green-400' : 'text-yellow-400'
                    }`}
                  >
                    {progress.toFixed(0)}%
                  </span>
                </div>

                <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      progress >= 100
                        ? 'bg-green-500'
                        : isOnTrack
                        ? 'bg-blue-500'
                        : 'bg-yellow-500'
                    }`}
                    style={{ width: `${Math.min(100, progress)}%` }}
                  />
                </div>

                <p className="text-xs text-neutral-500">
                  {progress >= 100
                    ? '🎉 Goal achieved!'
                    : isOnTrack
                    ? '✓ On track'
                    : `Need ${item.format(item.goal - item.current)} more`}
                </p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

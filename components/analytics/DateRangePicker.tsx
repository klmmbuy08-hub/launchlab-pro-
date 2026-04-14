'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
import { DateRange } from '@/lib/types/analytics'
import { useState } from 'react'

interface DateRangePickerProps {
  value: DateRange
  onChange: (range: DateRange) => void
}

export default function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [showCustom, setShowCustom] = useState(false)
  const [customStart, setCustomStart] = useState('')
  const [customEnd, setCustomEnd] = useState('')

  const presets = [
    { label: 'Last 7 Days', preset: 'last_7' as const, days: 7 },
    { label: 'Last 30 Days', preset: 'last_30' as const, days: 30 },
    { label: 'Last 90 Days', preset: 'last_90' as const, days: 90 },
    { label: 'Custom', preset: 'custom' as const, days: 0 },
  ]

  const handleApplyCustom = () => {
    if (customStart && customEnd) {
      onChange({
        preset: 'custom',
        days: 0,
        custom: {
          start: new Date(customStart),
          end: new Date(customEnd),
        },
      })
      setShowCustom(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-neutral-400" />
        <span className="text-sm text-neutral-400">Date Range</span>
      </div>

      <div className="flex gap-2 flex-wrap">
        {presets.map((preset) => (
          <Button
            key={preset.preset}
            variant={value.preset === preset.preset ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              if (preset.preset === 'custom') {
                setShowCustom(true)
              } else {
                onChange(preset)
                setShowCustom(false)
              }
            }}
            className={preset.preset === 'custom' ? '' : 'border-neutral-700'}
          >
            {preset.label}
          </Button>
        ))}
      </div>

      {showCustom && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-neutral-400 mb-1">Start Date</label>
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-1">End Date</label>
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-white text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleApplyCustom} className="flex-1">
              Apply
            </Button>
            <Button
              size="sm"
             
              onClick={() => setShowCustom(false)}
              className="flex-1 border-neutral-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

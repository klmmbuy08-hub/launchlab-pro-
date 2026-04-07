import { useState } from 'react'

interface MetricsDateRangePickerProps {
  onDateRangeChange: (start: string, end: string) => void
}

export function MetricsDateRangePicker({ onDateRangeChange }: MetricsDateRangePickerProps) {
  const [range, setRange] = useState('30')
  const today = new Date()

  const getRangeeDates = (days: string) => {
    const end = today.toISOString().split('T')[0]
    const start = new Date(Date.now() - parseInt(days) * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]
    return { start, end }
  }

  const handleRangeChange = (newRange: string) => {
    setRange(newRange)
    const { start, end } = getRangeeDates(newRange)
    onDateRangeChange(start, end)
  }

  return (
    <div className="flex gap-2">
      {[
        { label: '7D', value: '7' },
        { label: '30D', value: '30' },
        { label: '90D', value: '90' },
      ].map((btn) => (
        <button
          key={btn.value}
          onClick={() => handleRangeChange(btn.value)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
            range === btn.value
              ? 'bg-blue-100 text-blue-700 border border-blue-300'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
          }`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  )
}
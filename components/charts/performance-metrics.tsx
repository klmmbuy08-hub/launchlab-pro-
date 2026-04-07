'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface PerformanceMetricsProps {
  data: Array<{
    day: string
    conversions: number
    leads: number
    emailOpen: number
  }>
  height?: number
}

export function PerformanceMetrics({ data, height = 250 }: PerformanceMetricsProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
        <XAxis 
          dataKey="day" 
          stroke="#9ca3af"
          tick={{ fill: '#9ca3af', fontSize: 12 }}
        />
        <YAxis 
          stroke="#9ca3af"
          tick={{ fill: '#9ca3af', fontSize: 12 }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1f2937', 
            border: '1px solid #374151',
            borderRadius: '8px'
          }}
        />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="circle"
        />
        <Line 
          type="monotone" 
          dataKey="conversions" 
          stroke="#00ff9d" 
          strokeWidth={2}
          name="Conversiones"
          dot={{ fill: '#00ff9d', r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="leads" 
          stroke="#00d4ff" 
          strokeWidth={2}
          name="Leads"
          dot={{ fill: '#00d4ff', r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="emailOpen" 
          stroke="#ffd700" 
          strokeWidth={2}
          name="Email Open %"
          dot={{ fill: '#ffd700', r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

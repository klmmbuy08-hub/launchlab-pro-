'use client'

import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

interface RevenueChartProps {
  data: Array<{ day: string; revenue: number; target?: number }>
  height?: number
  showTarget?: boolean
}

export function RevenueChart({ data, height = 300, showTarget = false }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#00ff9d" stopOpacity={0}/>
          </linearGradient>
          {showTarget && (
            <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffd700" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#ffd700" stopOpacity={0}/>
            </linearGradient>
          )}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
        <XAxis 
          dataKey="day" 
          stroke="#9ca3af" 
          tick={{ fill: '#9ca3af', fontSize: 12 }}
          tickLine={false}
        />
        <YAxis 
          stroke="#9ca3af" 
          tick={{ fill: '#9ca3af', fontSize: 12 }}
          tickLine={false}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1f2937', 
            border: '1px solid #374151',
            borderRadius: '8px',
            padding: '12px'
          }}
          labelStyle={{ color: '#e5e7eb', fontWeight: 600, marginBottom: '4px' }}
          itemStyle={{ color: '#00ff9d' }}
          formatter={(value: any) => [`$${value.toLocaleString()}`, 'Revenue']}
        />
        {showTarget && (
          <Area 
            type="monotone" 
            dataKey="target" 
            stroke="#ffd700" 
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="url(#targetGradient)"
            opacity={0.5}
          />
        )}
        <Area 
          type="monotone" 
          dataKey="revenue" 
          stroke="#00ff9d" 
          strokeWidth={3}
          fill="url(#revenueGradient)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

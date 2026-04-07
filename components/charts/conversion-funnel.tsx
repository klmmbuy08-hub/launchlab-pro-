'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface ConversionFunnelProps {
  data: Array<{ stage: string; value: number; color: string }>
  height?: number
}

export function ConversionFunnel({ data, height = 300 }: ConversionFunnelProps) {
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
        <XAxis 
          type="number" 
          stroke="#9ca3af"
          tick={{ fill: '#9ca3af', fontSize: 12 }}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <YAxis 
          dataKey="stage" 
          type="category" 
          stroke="#9ca3af"
          tick={{ fill: '#e5e7eb', fontSize: 13, fontWeight: 600 }}
          width={100}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1f2937', 
            border: '1px solid #374151',
            borderRadius: '8px',
            padding: '12px'
          }}
          labelStyle={{ color: '#e5e7eb', fontWeight: 600 }}
          formatter={(value: any, name, props) => [
            value.toLocaleString(),
            `${((value / maxValue) * 100).toFixed(1)}% del total`
          ]}
        />
        <Bar dataKey="value" radius={[0, 8, 8, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { ChartPie } from 'lucide-react'

interface DistributionData {
  name: string
  value: number
}

interface ContentDistributionChartProps {
  data: DistributionData[]
}

const COLORS: Record<string, string> = {
  reel: '#3b82f6',     // blue
  carousel: '#a855f7', // purple
  post: '#22c55e',     // green
  story: '#f97316',    // orange
}

export function ContentDistributionChart({ data }: ContentDistributionChartProps) {
  return (
    <Card className="bg-[#171717] border-[#404040]">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
          <ChartPie className="w-4 h-4 text-purple-400" />
          Content Mix
        </CardTitle>
        <CardDescription className="text-xs text-neutral-400">
          Distribution of scheduled formats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#8884d8'} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#171717', border: '1px solid #404040', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '10px', textTransform: 'capitalize' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

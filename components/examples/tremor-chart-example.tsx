'use client'

import { Card, AreaChart, BarChart, DonutChart } from '@tremor/react'

// Ejemplo de datos
const revenueData = [
  { date: 'Jan 23', Revenue: 2890, Leads: 120 },
  { date: 'Feb 23', Revenue: 2756, Leads: 110 },
  { date: 'Mar 23', Revenue: 3322, Leads: 145 },
  { date: 'Apr 23', Revenue: 3470, Leads: 158 },
  { date: 'May 23', Revenue: 3475, Leads: 162 },
  { date: 'Jun 23', Revenue: 3129, Leads: 135 },
  { date: 'Jul 23', Revenue: 3490, Leads: 168 },
  { date: 'Aug 23', Revenue: 2903, Leads: 125 },
  { date: 'Sep 23', Revenue: 2643, Leads: 115 },
  { date: 'Oct 23', Revenue: 2837, Leads: 130 },
  { date: 'Nov 23', Revenue: 2954, Leads: 138 },
  { date: 'Dec 23', Revenue: 3239, Leads: 152 },
]

const categoryData = [
  { name: 'Organic', value: 4567 },
  { name: 'Paid Ads', value: 3543 },
  { name: 'Email', value: 1234 },
  { name: 'Referrals', value: 789 },
]

export default function TremorChartExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Area Chart */}
      <Card className="bg-neutral-900 border-neutral-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Revenue & Leads Trend
        </h3>
        <AreaChart
          className="h-72"
          data={revenueData}
          index="date"
          categories={['Revenue', 'Leads']}
          colors={['blue', 'purple']}
          valueFormatter={(number) =>
            `$${Intl.NumberFormat('us').format(number).toString()}`
          }
          showLegend={true}
          showGridLines={true}
          showAnimation={true}
        />
      </Card>

      {/* Bar Chart */}
      <Card className="bg-neutral-900 border-neutral-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Monthly Revenue
        </h3>
        <BarChart
          className="h-72"
          data={revenueData}
          index="date"
          categories={['Revenue']}
          colors={['blue']}
          valueFormatter={(number) =>
            `$${Intl.NumberFormat('us').format(number).toString()}`
          }
          showAnimation={true}
        />
      </Card>

      {/* Donut Chart */}
      <Card className="bg-neutral-900 border-neutral-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Revenue by Source
        </h3>
        <DonutChart
          className="h-72"
          data={categoryData}
          category="value"
          index="name"
          colors={['blue', 'purple', 'cyan', 'pink']}
          valueFormatter={(number) =>
            `$${Intl.NumberFormat('us').format(number).toString()}`
          }
          showAnimation={true}
        />
      </Card>
    </div>
  )
}

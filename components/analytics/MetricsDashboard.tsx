'use client'

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnalyticsData, DateRange } from '@/lib/types/analytics'
import { TrendingUp, Users, Eye, DollarSign } from 'lucide-react'

interface MetricsDashboardProps {
  data: AnalyticsData
  dateRange: DateRange
  chartType?: 'revenue' | 'leads' | 'roi' | 'all'
}

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444']

export default function MetricsDashboard({
  data,
  dateRange,
  chartType = 'all',
}: MetricsDashboardProps) {
  const KPICard = ({
    icon: Icon,
    label,
    value,
    change,
  }: {
    icon: any
    label: string
    value: string
    change: string
  }) => (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-neutral-400 text-sm">{label}</p>
            <p className="text-2xl font-bold text-white mt-2">{value}</p>
            <p className="text-sm text-green-400 mt-1">{change}</p>
          </div>
          <Icon className="w-8 h-8 text-blue-400" />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      {(chartType === 'all' || chartType === 'revenue') && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            icon={DollarSign}
            label="Total Revenue"
            value={`$${data.kpis.revenue.toLocaleString()}`}
            change={`+${data.kpis.revenue_growth}% vs last period`}
          />
          <KPICard
            icon={Users}
            label="Total Leads"
            value={data.kpis.leads.toLocaleString()}
            change={`+${data.kpis.leads_growth}% vs last period`}
          />
          <KPICard
            icon={Eye}
            label="Conversions"
            value={data.kpis.conversions.toLocaleString()}
            change={`${data.kpis.conversion_rate.toFixed(2)}% rate`}
          />
          <KPICard
            icon={TrendingUp}
            label="Avg Order Value"
            value={`$${data.kpis.avg_order_value.toFixed(2)}`}
            change={`+${data.kpis.aov_growth}% growth`}
          />
        </div>
      )}

      {/* Revenue Trend Chart */}
      {(chartType === 'all' || chartType === 'revenue') && (
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.timeseries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                <XAxis dataKey="date" stroke="#A3A3A3" />
                <YAxis stroke="#A3A3A3" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #404040' }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Lead Generation Chart */}
      {(chartType === 'all' || chartType === 'leads') && (
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Lead Generation Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.timeseries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                <XAxis dataKey="date" stroke="#A3A3A3" />
                <YAxis stroke="#A3A3A3" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #404040' }}
                />
                <Bar dataKey="leads" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* ROI by Channel */}
      {(chartType === 'all' || chartType === 'roi') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">ROI by Channel</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.channels}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                  <XAxis dataKey="channel" stroke="#A3A3A3" />
                  <YAxis stroke="#A3A3A3" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #404040' }}
                  />
                  <Bar dataKey="roi" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">Channel Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.channels}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ channel, percentage }) => `${channel}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {data.channels.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Content Performance */}
      {chartType === 'all' && (
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Content Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.content_performance.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-sm text-neutral-400">{item.engagement_rate}% engagement</p>
                  </div>
                  <p className="text-blue-400 font-semibold">${item.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Audience Growth */}
      {chartType === 'all' && (
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Audience Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.timeseries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                <XAxis dataKey="date" stroke="#A3A3A3" />
                <YAxis stroke="#A3A3A3" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #404040' }}
                />
                <Line type="monotone" dataKey="audience" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

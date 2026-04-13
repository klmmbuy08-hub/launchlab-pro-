'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Download, Calendar, TrendingUp, Users, Eye, BarChart3, Settings } from 'lucide-react'
import DateRangePicker from '@/components/analytics/DateRangePicker'
import ReportTemplateCard from '@/components/analytics/ReportTemplateCard'
import MetricsDashboard from '@/components/analytics/MetricsDashboard'
import ExportMenu from '@/components/analytics/ExportMenu'
import ReportPreview from '@/components/analytics/ReportPreview'
import { AnalyticsData, DateRange } from '@/lib/types/analytics'

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [dateRange, setDateRange] = useState<DateRange>({ preset: 'last_30', days: 30 })
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    fetchAnalytics()
  }, [dateRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams({
        preset: dateRange.preset,
        ...(dateRange.custom && {
          start_date: dateRange.custom.start.toISOString().split('T')[0],
          end_date: dateRange.custom.end.toISOString().split('T')[0],
        }),
      })

      const response = await fetch(`/api/analytics?${queryParams}`)
      const result = await response.json()

      if (result.success) {
        setData(result.data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateReport = async (templateType: string) => {
    setSelectedReport(templateType)
    setPreviewOpen(true)
  }

  const handleExport = async (format: 'pdf' | 'csv' | 'email') => {
    setExporting(true)
    try {
      const response = await fetch('/api/analytics/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          format,
          dateRange,
          reportType: selectedReport || 'full',
          data,
        }),
      })

      if (!response.ok) throw new Error('Export failed')

      if (format === 'pdf' || format === 'csv') {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `report.${format === 'pdf' ? 'pdf' : 'csv'}`
        a.click()
      }
    } catch (error) {
      console.error('Export error:', error)
    } finally {
      setExporting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics & Reports</h1>
          <p className="text-neutral-400 mt-1">Track performance and generate insights</p>
        </div>
        <div className="flex gap-3">
          <ExportMenu onExport={handleExport} loading={exporting} />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setScheduleOpen(true)}
            className="border-neutral-700"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>

      {/* Date Range Picker */}
      <DateRangePicker value={dateRange} onChange={setDateRange} />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-neutral-900 border border-neutral-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Report Templates</TabsTrigger>
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {data && <MetricsDashboard data={data} dateRange={dateRange} />}
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReportTemplateCard
              title="Weekly Summary"
              description="Last 7 days performance overview"
              icon={<TrendingUp className="w-6 h-6" />}
              onClick={() => handleGenerateReport('weekly')}
            />
            <ReportTemplateCard
              title="Monthly Report"
              description="Complete 30-day analysis"
              icon={<BarChart3 className="w-6 h-6" />}
              onClick={() => handleGenerateReport('monthly')}
            />
            <ReportTemplateCard
              title="Quarterly Review"
              description="90-day strategic review"
              icon={<Eye className="w-6 h-6" />}
              onClick={() => handleGenerateReport('quarterly')}
            />
            <ReportTemplateCard
              title="Custom Report"
              description="Build your own report"
              icon={<Settings className="w-6 h-6" />}
              onClick={() => handleGenerateReport('custom')}
            />
          </div>
        </TabsContent>

        {/* Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          {data && (
            <div className="space-y-6">
              {/* Revenue Trend */}
              <Card className="bg-neutral-900 border-neutral-800">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <MetricsDashboard data={data} chartType="revenue" dateRange={dateRange} />
                </CardContent>
              </Card>

              {/* Lead Generation */}
              <Card className="bg-neutral-900 border-neutral-800">
                <CardHeader>
                  <CardTitle className="text-white">Lead Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <MetricsDashboard data={data} chartType="leads" dateRange={dateRange} />
                </CardContent>
              </Card>

              {/* ROI by Channel */}
              <Card className="bg-neutral-900 border-neutral-800">
                <CardHeader>
                  <CardTitle className="text-white">ROI by Channel</CardTitle>
                </CardHeader>
                <CardContent>
                  <MetricsDashboard data={data} chartType="roi" dateRange={dateRange} />
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Report Preview Modal */}
      {selectedReport && (
        <ReportPreview
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          reportType={selectedReport}
          dateRange={dateRange}
          onExport={handleExport}
        />
      )}

      {/* Schedule Modal */}
      {scheduleOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-neutral-900 border-neutral-800 w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-white">Schedule Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Frequency</label>
                <select className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white">
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Email Recipient</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => setScheduleOpen(false)}
                >
                  Schedule
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setScheduleOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

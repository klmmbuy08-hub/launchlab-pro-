'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Loader } from 'lucide-react'
import { DateRange } from '@/lib/types/analytics'

interface ReportPreviewProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reportType: string
  dateRange: DateRange
  onExport: (format: 'pdf' | 'csv' | 'email') => void
}

export default function ReportPreview({
  open,
  onOpenChange,
  reportType,
  dateRange,
  onExport,
}: ReportPreviewProps) {
  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      generateReport()
    }
  }, [open])

  const generateReport = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/analytics/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportType, dateRange }),
      })

      const result = await response.json()
      if (result.success) {
        setReport(result.data)
      }
    } catch (error) {
      console.error('Error generating report:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-900 border-neutral-800 max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Report Preview</DialogTitle>
          <DialogDescription>
            {reportType.charAt(0).toUpperCase() + reportType.slice(1)} report
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-6 h-6 animate-spin text-blue-400" />
          </div>
        ) : report ? (
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h2 className="text-2xl font-bold text-white">{report.title}</h2>
              <p className="text-neutral-400 mt-2">{report.executive_summary}</p>
            </div>

            {/* Sections */}
            {report.sections?.map((section: any, i: number) => (
              <Card key={i} className="bg-neutral-800 border-neutral-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-neutral-300">{section.content}</p>

                  {/* Metrics */}
                  {section.metrics && (
                    <div className="grid grid-cols-2 gap-3">
                      {section.metrics.map((metric: any, j: number) => (
                        <div key={j} className="bg-neutral-900 rounded p-3">
                          <p className="text-sm text-neutral-400">{metric.label}</p>
                          <p className="text-lg font-bold text-white mt-1">{metric.value}</p>
                          {metric.change && (
                            <p className="text-xs text-green-400 mt-1">{metric.change}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Insights */}
                  {section.insights && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-neutral-300">Key Insights:</p>
                      <ul className="space-y-1">
                        {section.insights.map((insight: string, j: number) => (
                          <li key={j} className="text-sm text-neutral-400">
                            • {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Recommendations */}
            {report.recommendations && (
              <Card className="bg-neutral-800 border-neutral-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {report.recommendations.map((rec: string, i: number) => (
                      <li key={i} className="text-sm text-neutral-300">
                        {i + 1}. {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Next Steps */}
            {report.next_steps && (
              <Card className="bg-neutral-800 border-neutral-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {report.next_steps.map((step: string, i: number) => (
                      <li key={i} className="text-sm text-neutral-300">
                        {i + 1}. {step}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Export Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => onExport('pdf')}
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                Export as PDF
              </Button>
              <Button
                onClick={() => onExport('csv')}
               
                className="flex-1 border-neutral-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Export as CSV
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-neutral-400">No report data available</p>
        )}
      </DialogContent>
    </Dialog>
  )
}

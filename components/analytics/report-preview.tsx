'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileText, TrendingUp, TrendingDown } from 'lucide-react'

interface ReportPreviewProps {
  report: {
    title: string
    executive_summary: string
    sections: {
      title: string
      content: string
      metrics: { label: string; value: string; change?: string }[]
      insights: string[]
    }[]
    recommendations: string[]
    next_steps: string[]
  }
  onDownload: () => void
}

export function ReportPreview({ report, onDownload }: ReportPreviewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">{report.title}</CardTitle>
              <p className="text-sm text-blue-200">{report.executive_summary}</p>
            </div>
            <Button onClick={onDownload} className="bg-blue-500 hover:bg-blue-600">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Sections */}
      {report.sections.map((section, idx) => (
        <Card key={idx} className="bg-neutral-900/50 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Content */}
            <p className="text-sm text-neutral-300">{section.content}</p>

            {/* Metrics */}
            {section.metrics.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {section.metrics.map((metric, metricIdx) => (
                  <div key={metricIdx} className="p-4 rounded-lg bg-neutral-800/50 border border-neutral-700">
                    <p className="text-xs text-neutral-500 mb-1">{metric.label}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                      {metric.change && (
                        <span
                          className={`text-sm font-medium flex items-center gap-1 ${
                            metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          {metric.change.startsWith('+') ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {metric.change}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Insights */}
            {section.insights.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-neutral-300 mb-2">Key Insights:</p>
                <ul className="space-y-1">
                  {section.insights.map((insight, insightIdx) => (
                    <li key={insightIdx} className="text-sm text-neutral-400 flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Recommendations */}
      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Strategic Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {report.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-sm font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                <p className="text-sm text-green-200">{rec}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-neutral-900/50 border-neutral-800">
        <CardHeader>
          <CardTitle>Next Steps for Next Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {report.next_steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-neutral-800/50">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-neutral-600" />
                <p className="text-sm text-neutral-300">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

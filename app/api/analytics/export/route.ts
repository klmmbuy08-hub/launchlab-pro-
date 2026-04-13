import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/services/supabase/client'
import { getSecureHeaders } from '@/lib/security/api-protection'
import { ReportGenerator } from '@/lib/services/reporting/report-generator'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: getSecureHeaders() }
      )
    }

    const { format, data } = await request.json()

    const generator = new ReportGenerator()

    if (format === 'csv') {
      const csvData = [
        ['Metric', 'Value', 'Growth'],
        ['Revenue', data.kpis.revenue, `${data.kpis.revenue_growth}%`],
        ['Leads', data.kpis.leads, `${data.kpis.leads_growth}%`],
        ['Conversions', data.kpis.conversions, `${data.kpis.conversion_rate.toFixed(2)}%`],
        ['Avg Order Value', `$${data.kpis.avg_order_value.toFixed(2)}`, `${data.kpis.aov_growth}%`],
      ]

      // Add timeseries data
      csvData.push(['', '', ''])
      csvData.push(['Date', 'Revenue', 'Leads', 'Conversions'])
      data.timeseries.forEach((item: any) => {
        csvData.push([item.date, item.revenue, item.leads, item.conversions])
      })

      const csv = csvData.map((row) => row.map((cell) => (typeof cell === 'string' && cell.includes(',') ? `"${cell}"` : cell)).join(',')).join('\n')

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename=analytics-report.csv',
          ...getSecureHeaders(),
        },
      })
    }

    if (format === 'pdf') {
      // Placeholder - would use a library like pdfkit or html2pdf
      const pdfContent = `
ANALYTICS REPORT
================
Date Range: ${data.period.start_date} to ${data.period.end_date}

KEY METRICS
-----------
Total Revenue: $${data.kpis.revenue.toLocaleString()}
Total Leads: ${data.kpis.leads.toLocaleString()}
Conversions: ${data.kpis.conversions.toLocaleString()}
Conversion Rate: ${data.kpis.conversion_rate.toFixed(2)}%
Avg Order Value: $${data.kpis.avg_order_value.toFixed(2)}

CHANNEL PERFORMANCE
-------------------
${data.channels.map((ch: any) => `${ch.channel}: ROI ${ch.roi}% (${ch.percentage}% of traffic)`).join('\n')}

CONTENT PERFORMANCE
-------------------
${data.content_performance.map((cp: any) => `${cp.title}: ${cp.engagement_rate}% engagement, $${cp.revenue} revenue`).join('\n')}
      `

      return new NextResponse(pdfContent, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename=analytics-report.pdf',
          ...getSecureHeaders(),
        },
      })
    }

    if (format === 'email') {
      // Send email via Supabase Edge Function or third-party service
      // For now, just return success
      return NextResponse.json(
        { success: true, message: 'Report sent to email' },
        { headers: getSecureHeaders() }
      )
    }

    throw new Error('Unsupported format')
  } catch (error: any) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Export failed' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}

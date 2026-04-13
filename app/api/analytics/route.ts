import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/services/supabase/client'
import { getSecureHeaders } from '@/lib/security/api-protection'
import { aggregateAnalyticsData } from '@/lib/services/analytics/aggregator'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: getSecureHeaders() }
      )
    }

    const { searchParams } = new URL(request.url)
    const preset = searchParams.get('preset') || 'last_30'
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')

    const data = await aggregateAnalyticsData({
      userId: session.user.id,
      preset: preset as any,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    })

    return NextResponse.json(
      { success: true, data },
      { headers: getSecureHeaders() }
    )
  } catch (error: any) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}

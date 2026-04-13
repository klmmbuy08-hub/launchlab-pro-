import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/services/supabase/client'
import { getSecureHeaders } from '@/lib/security/api-protection'

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
    const period = searchParams.get('period') || '30d'
    const days = period === '30d' ? 30 : period === '90d' ? 90 : 7
    const userId = session.user.id

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Fetch metrics from business_metrics
    const { data: metrics, error } = await supabase
      .from('business_metrics')
      .select('*')
      .eq('user_id', userId)
      .gte('metric_date', startDate.toISOString().split('T')[0])
      .order('metric_date', { ascending: true })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500, headers: getSecureHeaders() }
      )
    }

    // Format for charts
    const chartData = metrics?.map(m => ({
      date: new Date(m.metric_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: Number(m.revenue) || 0,
      leads: Number(m.leads) || 0,
      engagement: 11.4, // Simplified
    }))

    return NextResponse.json(
      { success: true, data: chartData || [] },
      { headers: getSecureHeaders() }
    )
  } catch (error: any) {
    console.error('Analytics timeseries error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}

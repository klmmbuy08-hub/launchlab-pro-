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

    const userId = session.user.id

    // Fetch campaigns
    const { data: campaigns, error } = await supabase
      .from('ad_campaigns')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500, headers: getSecureHeaders() }
      )
    }

    // Mock metrics (in production would fetch from Meta API or ad_metrics table)
    const campaignsWithMetrics = campaigns?.map(c => ({
      ...c,
      spend: Number(c.daily_budget) * 15, // Mock spend for last 15 days
      reach: Math.floor(Math.random() * 50000) + 10000,
      clicks: Math.floor(Math.random() * 2000) + 500,
      cpc: 1.24,
      ctr: 2.1,
      roas: c.target_roas || 3.2,
    }))

    return NextResponse.json(
      { success: true, data: { campaigns: campaignsWithMetrics || [] } },
      { headers: getSecureHeaders() }
    )
  } catch (error: any) {
    console.error('Ads error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}

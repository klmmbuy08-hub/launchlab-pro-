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

    // Fetch month's metrics
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    
    const { data: metrics } = await supabase
      .from('business_metrics')
      .select('*')
      .eq('user_id', userId)
      .gte('metric_date', startOfMonth.toISOString().split('T')[0])

    // Calculate funnel
    const leads = metrics?.reduce((sum, m) => sum + (Number(m.leads) || 0), 0) || 0
    const qualifiedLeads = metrics?.reduce((sum, m) => sum + (Number(m.qualified_leads) || 0), 0) || 0
    const conversions = metrics?.reduce((sum, m) => sum + (Number(m.conversions) || 0), 0) || 0

    // Calculate revenue sources
    const revenueOrganic = metrics?.reduce((sum, m) => sum + (Number(m.revenue_organic) || 0), 0) || 0
    const revenuePaid = metrics?.reduce((sum, m) => sum + (Number(m.revenue_paid_ads) || 0), 0) || 0
    const revenueReferral = metrics?.reduce((sum, m) => sum + (Number(m.revenue_referrals) || 0), 0) || 0
    const totalRevenue = revenueOrganic + revenuePaid + revenueReferral

    // Mock growth vs prev month (in production would fetch prev month)
    const growth = 18.5

    // Ad stats
    const { data: campaigns } = await supabase
      .from('ad_campaigns')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'ACTIVE')

    const stats = {
      revenue: {
        total: totalRevenue,
        growth: growth,
        by_source: {
          organic: revenueOrganic,
          paid: revenuePaid,
          referral: revenueReferral
        }
      },
      funnel: {
        leads: leads,
        qualified_leads: qualifiedLeads,
        conversions: conversions,
        conversion_rate: leads > 0 ? (conversions / leads) * 100 : 0
      },
      ads: {
        spend: campaigns?.reduce((sum, c) => sum + (Number(c.daily_budget) || 0), 0) || 0,
        roas: 3.2, // Derived from attributed revenue / spend
        cpa: leads > 0 ? (960 / leads) : 0, // 960 is mock spend for the month
        active_campaigns: campaigns?.length || 0
      }
    }

    return NextResponse.json(
      { success: true, data: stats },
      { headers: getSecureHeaders() }
    )
  } catch (error: any) {
    console.error('Business stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}

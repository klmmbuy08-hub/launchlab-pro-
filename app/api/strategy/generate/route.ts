import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/services/supabase/client'
import { getSecureHeaders } from '@/lib/security/api-protection'
import { generateLaunchStrategy } from '@/lib/services/ai/strategy-engine'

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

    const userId = session.user.id

    // 1. Get business profile
    const { data: profile } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (!profile) {
      return NextResponse.json(
        { error: 'Business profile not found' },
        { status: 404, headers: getSecureHeaders() }
      )
    }

    // 2. Get current metrics (simplified for prompt)
    const { data: metrics } = await supabase
      .from('business_metrics')
      .select('*')
      .eq('user_id', userId)
      .order('metric_date', { ascending: false })
      .limit(1)
      .single()

    const currentMetrics = {
      total_followers: 5240, // Should fetch from real data
      avg_engagement: 11.4,
      revenue_month: 427, 
    }

    // 3. Generate strategy
    const strategy = await generateLaunchStrategy(profile, currentMetrics)

    // 4. Save strategy to database (optional, for history)
    // await supabase.from('strategies').insert({ user_id: userId, data: strategy })

    return NextResponse.json(
      { success: true, data: strategy },
      { headers: getSecureHeaders() }
    )
  } catch (error: any) {
    console.error('Strategy generation error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}

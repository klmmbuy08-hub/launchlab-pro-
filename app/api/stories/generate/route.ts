import { NextRequest, NextResponse } from 'next/server'
import { requireSupabaseAuth } from '@/lib/security/auth'
import { createServerClient } from '@/lib/services/supabase/client'
import { getSecureHeaders } from '@/lib/security/api-protection'
import { StoriesAgent } from '@/lib/agents/stories-agent'

export async function POST(request: NextRequest) {
  try {
    const auth = await requireSupabaseAuth()
    if (!auth.authenticated) return auth.response

    const { goal } = await request.json()
    const supabase = createServerClient()
    
    const { data: profile } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('user_id', auth.userId)
      .single()

    const stories = await StoriesAgent.generate({
      goal,
      niche: profile?.niche || 'Digital Marketing',
      productName: profile?.product_name || 'LaunchOS',
      audience: profile?.target_audience || 'Entrepreneurs',
    })

    return NextResponse.json(
      { success: true, stories },
      { headers: getSecureHeaders() }
    )
  } catch (error: any) {
    console.error('Stories generate error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}

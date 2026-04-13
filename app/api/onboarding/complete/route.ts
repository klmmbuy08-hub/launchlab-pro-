import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/services/supabase/client'
import { getSecureHeaders } from '@/lib/security/api-protection'

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
    const body = await request.json()

    // 1. Update business profile
    const { error: profileError } = await supabase
      .from('business_profiles')
      .upsert({
        user_id: userId,
        business_type: body.business_type,
        niche: body.niche,
        product_name: body.product_name,
        product_price: body.product_price,
        monthly_revenue_goal: body.monthly_revenue_goal,
        monthly_leads_goal: body.monthly_leads_goal,
        updated_at: new Date().toISOString(),
      })

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 500, headers: getSecureHeaders() }
      )
    }

    // 2. Mark onboarding as completed
    const { error: userError } = await supabase
      .from('users')
      .update({ onboarding_completed: true })
      .eq('id', userId)

    if (userError) {
      return NextResponse.json(
        { error: userError.message },
        { status: 500, headers: getSecureHeaders() }
      )
    }

    return NextResponse.json(
      { success: true },
      { headers: getSecureHeaders() }
    )
  } catch (error: any) {
    console.error('Onboarding complete error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}

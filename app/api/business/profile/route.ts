import { NextRequest, NextResponse } from 'next/server'
import { requireSupabaseAuth } from '@/lib/security/auth'
import { createServerClient } from '@/lib/services/supabase/client'
import { validateRequest, getSecureHeaders } from '@/lib/security/api-protection'
import { BusinessProfileSchema } from '@/lib/security/validation-schemas'

// GET - Fetch business profile
export async function GET(request: NextRequest) {
  try {
    const auth = await requireSupabaseAuth()
    if (!auth.authenticated) return auth.response

    const supabase = createServerClient()
    
    const { data, error } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('user_id', auth.userId)
      .single()

    if (error && error.code !== 'PGRST116') { // Not found is OK
      return NextResponse.json(
        { error: error.message },
        { status: 500, headers: getSecureHeaders() }
      )
    }

    return NextResponse.json(
      { success: true, data },
      { headers: getSecureHeaders() }
    )
  } catch (error: any) {
    console.error('Get profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}

// POST - Create/Update business profile
export async function POST(request: NextRequest) {
  try {
    const auth = await requireSupabaseAuth()
    if (!auth.authenticated) return auth.response

    const body = await request.json()
    
    const validation = validateRequest(BusinessProfileSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400, headers: getSecureHeaders() }
      )
    }

    const supabase = createServerClient()
    
    const { data, error } = await supabase
      .from('business_profiles')
      .upsert({
        user_id: auth.userId,
        business_type: validation.data.businessType,
        niche: validation.data.niche,
        product_name: validation.data.productName,
        product_price: validation.data.productPrice,
        monthly_revenue_goal: validation.data.monthlyRevenueGoal,
        monthly_leads_goal: validation.data.monthlyLeadsGoal,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500, headers: getSecureHeaders() }
      )
    }

    return NextResponse.json(
      { success: true, data },
      { headers: getSecureHeaders() }
    )
  } catch (error: any) {
    console.error('Save profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}

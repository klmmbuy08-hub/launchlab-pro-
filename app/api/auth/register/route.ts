import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/services/supabase/client'
import { validateRequest, sanitizeObject, getSecureHeaders } from '@/lib/security/api-protection'
import { RegisterSchema } from '@/lib/security/validation-schemas'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const validation = validateRequest(RegisterSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400, headers: getSecureHeaders() }
      )
    }

    const { email, password, fullName } = sanitizeObject(validation.data)

    const supabase = await createServerClient()
    
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400, headers: getSecureHeaders() }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'User creation failed' },
        { status: 500, headers: getSecureHeaders() }
      )
    }

    // Create user profile
    const { error: profileError } = await supabase.from('users').insert({
      id: authData.user.id,
      email,
      full_name: fullName,
      onboarding_completed: false,
    })

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 500, headers: getSecureHeaders() }
      )
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: authData.user.id,
          email: authData.user.email,
        },
      },
      { status: 201, headers: getSecureHeaders() }
    )
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}

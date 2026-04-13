import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/services/supabase/client'
import { validateRequest, sanitizeObject, getSecureHeaders } from '@/lib/security/api-protection'
import { LoginSchema } from '@/lib/security/validation-schemas'

export async function POST(request: NextRequest) {
  try {
    // Parse body
    const body = await request.json()
    
    // Validate
    const validation = validateRequest(LoginSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400, headers: getSecureHeaders() }
      )
    }

    const { email, password } = sanitizeObject(validation.data)

    // Authenticate with Supabase
    const supabase = await createServerClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401, headers: getSecureHeaders() }
      )
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
        },
        session: {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        },
      },
      { headers: getSecureHeaders() }
    )
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}

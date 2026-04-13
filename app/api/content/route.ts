import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/services/supabase/client'
import { getSecureHeaders } from '@/lib/security/api-protection'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.user) {
      return NextResponse.json(
        { success: true, data: { content: [] } },
        { headers: getSecureHeaders() }
      )
    }

    const userId = session.user.id
    const { data: content } = await supabase
      .from('content_analysis')
      .select('*')
      .eq('user_id', userId)
      .order('published_at', { ascending: false })
      .limit(50)

    return NextResponse.json(
      { success: true, data: { content: content || [] } },
      { headers: getSecureHeaders() }
    )
  } catch (error: any) {
    console.error('Content error:', error)
    return NextResponse.json(
      { success: true, data: { content: [] }, warning: 'Using fallback data' },
      { headers: getSecureHeaders() }
    )
  }
}

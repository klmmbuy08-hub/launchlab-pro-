import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/services/supabase/client'
import { getSecureHeaders } from '@/lib/security/api-protection'
import { startOfMonth, endOfMonth, parseISO } from 'date-fns'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: getSecureHeaders() }
      )
    }

    const userId = session.user.id
    const searchParams = request.nextUrl.searchParams
    const month = searchParams.get('month') || new Date().toISOString()
    
    const date = parseISO(month)
    const start = startOfMonth(date).toISOString().split('T')[0]
    const end = endOfMonth(date).toISOString().split('T')[0]

    // Fetch scheduled posts
    const { data: posts, error } = await supabase
      .from('content_calendar')
      .select('*')
      .eq('user_id', userId)
      .gte('scheduled_date', start)
      .lte('scheduled_date', end)
      .order('scheduled_date', { ascending: true })

    if (error) throw error

    // Fetch historical data for best times (mocking aggregation logic)
    // In a real app, this would query content_analysis and audience_insights
    const { data: insights } = await supabase
      .from('audience_insights')
      .select('behavior_data')
      .eq('user_id', userId)
      .order('snapshot_date', { ascending: false })
      .limit(1)
      .single()

    const bestTimes = insights?.behavior_data?.online_times || generateMockHeatmap()
    
    // Calculate distribution
    const distribution = calculateDistribution(posts || [])

    return NextResponse.json(
      { 
        success: true, 
        data: { 
          posts: posts || [],
          bestTimes,
          distribution
        } 
      },
      { headers: getSecureHeaders() }
    )
  } catch (error: any) {
    console.error('Calendar error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await request.json()
    const { data, error } = await supabase
      .from('content_calendar')
      .insert([{ ...payload, user_id: session.user.id }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data }, { headers: getSecureHeaders() })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function generateMockHeatmap() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const heatmap = []
  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      heatmap.push({ day: days[d], hour: h, engagement: Math.floor(Math.random() * 100) })
    }
  }
  return heatmap
}

function calculateDistribution(posts: any[]) {
  const types = ['reel', 'carousel', 'post', 'story']
  const counts: Record<string, number> = { reel: 0, carousel: 0, post: 0, story: 0 }
  
  posts.forEach(p => {
    if (counts[p.content_type] !== undefined) {
      counts[p.content_type]++
    }
  })
  
  return Object.entries(counts)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({ name, value }))
}

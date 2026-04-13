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

    // Fetch competitors for the user with their snapshots
    const { data: competitors, error: compError } = await supabase
      .from('competitors')
      .select(`
        *,
        snapshots: competitor_snapshots(*)
      `)
      .eq('user_id', session.user.id)
      .eq('is_active', true)
      .order('added_at', { ascending: false })

    if (compError) throw compError

    // Fetch user's own accounts for benchmarking
    const { data: userAccounts, error: accError } = await supabase
      .from('accounts')
      .select(`
        *,
        insights: audience_insights(*)
      `)
      .eq('user_id', session.user.id)
      .eq('is_active', true)

    if (accError) throw accError

    // Process trends (Compare latest with previous snapshots)
    const processedCompetitors = competitors.map(comp => {
      const sortedSnapshots = (comp.snapshots || []).sort((a: any, b: any) => 
        new Date(b.snapshot_date).getTime() - new Date(a.snapshot_date).getTime()
      )
      
      const latest = sortedSnapshots[0] || {}
      
      // Calculate growth by looking back in snapshots
      const getSnapshotDaysAgo = (days: number) => {
        const target = new Date()
        target.setDate(target.getDate() - days)
        return sortedSnapshots.find((s: any) => new Date(s.snapshot_date) <= target) || sortedSnapshots[sortedSnapshots.length -1]
      }

      const snapshot7 = getSnapshotDaysAgo(7)
      const snapshot30 = getSnapshotDaysAgo(30)

      const calc = (cur: number, pre: number) => {
        if (!pre || pre === 0) return 0
        return ((cur - pre) / pre) * 100
      }

      return {
        ...comp,
        latest_snapshot: latest,
        growth_7d: calc(latest.followers, snapshot7?.followers),
        growth_30d: calc(latest.followers, snapshot30?.followers),
        snapshots: undefined // Clear snapshots to keep response lean
      }
    })

    return NextResponse.json(
      { 
        success: true, 
        data: { 
          competitors: processedCompetitors,
          user_account: userAccounts[0] || null
        } 
      },
      { headers: getSecureHeaders() }
    )
  } catch (error: any) {
    console.error('Competitors API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: getSecureHeaders() })
    }

    const { username, platform } = await request.json()

    if (!username || !platform) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('competitors')
      .insert({
        user_id: session.user.id,
        platform,
        username,
        is_active: true
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data }, { headers: getSecureHeaders() })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: getSecureHeaders() })
  }
}

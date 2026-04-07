import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    // Actualizar debate como resuelto
    const { data, error } = await supabase
      .from('agent_debates')
      .update({
        user_decision: body.custom_decision || `Siguió a ${body.selected_agent}`,
        resolved_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, debate: data })
  } catch (error: any) {
    console.error('Resolve debate error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

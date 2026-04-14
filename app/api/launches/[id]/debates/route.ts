import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data, error } = await supabase
      .from('agent_debates')
      .select('*')
      .eq('launch_id', id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, debates: data })
  } catch (error: any) {
    console.error('Get debates error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// Crear un debate (usado por el sistema cuando detecta desacuerdo)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json()
    const { id } = await params

    const { data, error } = await supabase
      .from('agent_debates')
      .insert({
        launch_id: id,
        agents_involved: body.agents_involved,
        scenario: body.scenario,
        topic: body.topic,
        perspectives: body.perspectives,
        system_recommendation: body.system_recommendation,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, debate: data })
  } catch (error: any) {
    console.error('Create debate error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

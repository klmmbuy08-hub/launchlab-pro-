import { NextRequest, NextResponse } from 'next/server'
import { requireSupabaseAuth } from '@/lib/security/auth'
import { createServerClient } from '@/lib/services/supabase/client'
import { getSecureHeaders } from '@/lib/security/api-protection'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const auth = await requireSupabaseAuth()
    if (!auth.authenticated) return auth.response

    const { message, agent } = await request.json()
    const supabase = await createServerClient()
    
    const { data: profile } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('user_id', auth.userId)
      .single()

    const agentPrompts = {
      CEO: "You are the Strategic CEO. Focus on high-level growth, revenue goals, and business vision.",
      CMO: "You are the Creative CMO. Focus on marketing strategies, content creation, and audience psychology.",
      SALES: "You are the Closer Sales Director. Focus on lead conversion, sales scripts, and closing deals."
    }

    const prompt = `${agentPrompts[agent as keyof typeof agentPrompts]}
    Business Context: ${profile?.niche || 'Health'} niche, Product: ${profile?.product_name || 'Service'}.
    User message: ${message}
    
    Respond in a professional, brief, and actionable way (max 3 sentences).`

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    })

    const reply = response.content[0].type === 'text' ? response.content[0].text : 'I am processing your request.'

    return NextResponse.json(
      { success: true, data: { reply } },
      { headers: getSecureHeaders() }
    )
  } catch (error: any) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}

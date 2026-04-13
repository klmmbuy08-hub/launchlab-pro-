import { NextRequest, NextResponse } from 'next/server'
import { requireSupabaseAuth } from '@/lib/security/auth'
import { createServerClient } from '@/lib/services/supabase/client'
import { getSecureHeaders } from '@/lib/security/api-protection'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function GET(request: NextRequest) {
  try {
    const auth = await requireSupabaseAuth()
    if (!auth.authenticated) return auth.response

    const supabase = await createServerClient()
    
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'briefing'

    // Get business profile for context
    const { data: profile } = await supabase
      .from('business_profiles')
      .select('*')
      .eq('user_id', auth.userId)
      .single()

    const { data: user } = await supabase
      .from('users')
      .select('full_name')
      .eq('id', auth.userId)
      .single()

    const name = user?.full_name?.split(' ')[0] || 'Founder'

    const prompt = type === 'welcome' 
      ? `You are an elite virtual assistant. Greet the user "${name}" warmly (e.g. "Welcome back Omar"). 
         In 2 concise sentences, tell them how the business is doing today based on their niche: ${profile?.niche || 'Market'}. 
         Mention a specific goal like $${profile?.monthly_revenue_goal || '10k'} revenue.`
      : `You are the CEO of a business in the ${profile?.niche || 'Health'} niche. 
         Give a 3-sentence high-level briefing to your founder. 
         Be direct, elite, and strategic. Mention the goal of $${profile?.monthly_revenue_goal || '10,000'} monthly revenue.
         Avoid jargon, sound like a human partner.`

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : 'Ready to scale your operation today.'

    return NextResponse.json(
      { success: true, data: { text } },
      { headers: getSecureHeaders() }
    )
  } catch (error: any) {
    console.error('Briefing error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}

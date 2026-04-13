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

    const { searchParams } = new URL(request.url)
    const campaignId = searchParams.get('id')

    if (!campaignId) {
      return NextResponse.json(
        { error: 'Campaign ID is required' },
        { status: 400, headers: getSecureHeaders() }
      )
    }

    const supabase = createServerClient()
    
    // Get campaign data
    const { data: campaign } = await supabase
      .from('ad_campaigns')
      .select('*')
      .eq('id', campaignId)
      .single()

    if (!campaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404, headers: getSecureHeaders() }
      )
    }

    // AI Analysis for optimization
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `Analyze this ad campaign and provide one high-impact optimization tip (under 150 characters):
          Campaign: ${campaign.campaign_name}
          Budget: $${campaign.daily_budget}/day
          Objective: ${campaign.objective}
          Target ROAS: ${campaign.target_roas || 'N/A'}
          Current performance: Good reach but slightly high CPC.`
        }
      ]
    })

    const recommendation = response.content[0].type === 'text' ? response.content[0].text : 'Improve creative testing to lower CPC.'

    return NextResponse.json(
      { success: true, data: { recommendation } },
      { headers: getSecureHeaders() }
    )
  } catch (error: any) {
    console.error('Optimize error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: getSecureHeaders() }
    )
  }
}

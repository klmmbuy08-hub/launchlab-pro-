import { NextRequest, NextResponse } from 'next/server'
import { anthropic, DEFAULT_CONFIG } from '@/lib/agents/anthropic-client'
import { AGENT_CMO_SYSTEM_PROMPT, generateCMOPrompt } from '@/lib/agents/prompts/agent-cmo'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { launchId, task, productName, targetAudience, duration, problem, numDays } = body

    if (!task || !productName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const userPrompt = generateCMOPrompt(task, {
      productName,
      targetAudience,
      duration,
      problem,
      numDays,
    })

    const message = await anthropic.messages.create({
      ...DEFAULT_CONFIG,
      system: AGENT_CMO_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    const cleanText = content.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const result = JSON.parse(cleanText)

    // Guardar en base de datos if launchId
    if (launchId && supabase) {
      await supabase
        .from('agent_generations')
        .insert({
          launch_id: launchId,
          agent_type: 'cmo',
          task: task,
          content: result
        })
    }

    return NextResponse.json({
      success: true,
      data: result,
      tokens: message.usage,
    })

  } catch (error: any) {
    console.error('Agent CMO Error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

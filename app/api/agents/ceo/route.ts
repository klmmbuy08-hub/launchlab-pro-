import { NextRequest, NextResponse } from 'next/server'
import { anthropic, DEFAULT_CONFIG } from '@/lib/agents/anthropic-client'
import { AGENT_CEO_SYSTEM_PROMPT, generateCEOPrompt } from '@/lib/agents/prompts/agent-ceo'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { launchId, productName, productType, price, targetAudience, launchDate } = body

    // Validación
    if (!productName || !productType || !price || !targetAudience) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generar prompt
    const userPrompt = generateCEOPrompt({
      productName,
      productType,
      price,
      targetAudience,
      launchDate,
    })

    // Llamar a Claude
    const message = await anthropic.messages.create({
      ...DEFAULT_CONFIG,
      system: AGENT_CEO_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    })

    // Extraer contenido
    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    // Parsear JSON
    let result
    try {
      const cleanText = content.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      result = JSON.parse(cleanText)
    } catch (parseError) {
      console.error('JSON Parse Error:', content.text)
      throw new Error('Failed to parse AI response')
    }

    // Guardar en base de datos si existe launchId
    if (launchId) {
      const { error: dbError } = await supabase
        .from('agent_generations')
        .insert({
          launch_id: launchId,
          agent_type: 'ceo',
          task: 'full_strategy',
          content: result
        })

      if (dbError) {
        console.error('Database Error:', dbError)
      }
    }

    return NextResponse.json({
      success: true,
      data: result,
      tokens: message.usage,
    })

  } catch (error: any) {
    console.error('Agent CEO Error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

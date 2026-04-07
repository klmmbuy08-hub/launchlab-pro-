import { NextRequest, NextResponse } from 'next/server'
import { createLaunch } from '@/lib/db/launches'
import { createAgentGeneration } from '@/lib/db/agent-generations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validación básica
    if (!body.productName || !body.productType || !body.price || !body.targetAudience) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Crear lanzamiento en DB
    const launch = await createLaunch({
      name: body.productName,
      product_type: body.productType,
      price: body.price,
      target_audience: body.targetAudience,
      launch_date: body.launchDate,
      current_audience: body.currentAudience,
      budget: body.budget,
      experience_level: body.experienceLevel,
      tone: body.tone,
      copy_style: body.copyStyle,
      design_style: body.designStyle,
      risk_tolerance: body.riskTolerance,
      main_problem: body.mainProblem,
      unique_value: body.uniqueValue,
      has_testimonials: body.hasTestimonials,
      has_previous_launches: body.hasPreviousLaunches,
      onboarding_data: body,
    })

    // Crear registros de generación para cada agente (pending)
    const agents = ['ceo', 'cmo', 'sales', 'designer', 'voice', 'cdo', 'coo']
    const generationPromises = agents.map((agentType) =>
      createAgentGeneration({
        launch_id: launch.id,
        agent_type: agentType,
        input: body,
      })
    )

    await Promise.all(generationPromises)

    return NextResponse.json({
      success: true,
      launch,
    })
  } catch (error: any) {
    console.error('Create launch error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

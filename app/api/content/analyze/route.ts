import { NextRequest, NextResponse } from 'next/server'
import { ContentAnalyzer } from '@/lib/services/ai/content-analyzer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const analyzer = new ContentAnalyzer()
    const analysis = await analyzer.analyzeContent(body)

    return NextResponse.json({ success: true, analysis })
  } catch (error: any) {
    console.error('Content analysis error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

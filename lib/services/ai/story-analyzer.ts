// ============================================
// AI Story & Angle Analyzer
// Analiza qué narrativas y ángulos venden más
// ============================================

import Anthropic from '@anthropic-ai/sdk'

interface StoryAnalysisInput {
  content: {
    caption: string
    type: string
    engagement_rate: number
    revenue_attributed: number
    leads_generated: number
  }[]
}

interface StoryPattern {
  narrative_type: string
  hook_pattern: string
  avg_engagement: number
  avg_revenue: number
  frequency: number
  examples: string[]
}

interface AngleAnalysis {
  winning_angles: {
    angle: string
    description: string
    avg_performance: number
    use_cases: string[]
  }[]
  losing_angles: {
    angle: string
    why_it_fails: string
    fix: string
  }[]
  recommendations: {
    angle: string
    when_to_use: string
    template: string
  }[]
}

export class StoryAnalyzer {
  private anthropic: Anthropic

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    })
  }

  async analyzeStoryPatterns(input: StoryAnalysisInput): Promise<{
    patterns: StoryPattern[]
    insights: string[]
  }> {
    // Group content by narrative patterns
    const patterns: Record<string, StoryPattern> = {}

    input.content.forEach(item => {
      const narrativeType = this.detectNarrativeType(item.caption)
      
      if (!patterns[narrativeType]) {
        patterns[narrativeType] = {
          narrative_type: narrativeType,
          hook_pattern: '',
          avg_engagement: 0,
          avg_revenue: 0,
          frequency: 0,
          examples: [],
        }
      }

      patterns[narrativeType].avg_engagement += item.engagement_rate
      patterns[narrativeType].avg_revenue += item.revenue_attributed
      patterns[narrativeType].frequency += 1
      if (patterns[narrativeType].examples.length < 3) {
        patterns[narrativeType].examples.push(item.caption.slice(0, 100))
      }
    })

    // Calculate averages
    Object.values(patterns).forEach(pattern => {
      pattern.avg_engagement /= pattern.frequency
      pattern.avg_revenue /= pattern.frequency
    })

    const sortedPatterns = Object.values(patterns).sort((a, b) => b.avg_revenue - a.avg_revenue)

    const insights = this.generateInsights(sortedPatterns)

    return {
      patterns: sortedPatterns,
      insights,
    }
  }

  private detectNarrativeType(caption: string): string {
    const lower = caption.toLowerCase()

    if (lower.includes('transformation') || lower.includes('before') || lower.includes('after')) {
      return 'Transformation Story'
    }
    if (lower.includes('mistake') || lower.includes('error') || lower.includes('wrong')) {
      return 'Mistake/Problem Story'
    }
    if (lower.includes('how i') || lower.includes('when i')) {
      return 'Personal Journey'
    }
    if (lower.match(/\d+\s+(ways|tips|steps|secrets)/)) {
      return 'List/Framework'
    }
    if (lower.includes('myth') || lower.includes('truth') || lower.includes('reality')) {
      return 'Myth-Busting'
    }
    if (lower.includes('behind') || lower.includes('day in')) {
      return 'Behind-the-Scenes'
    }

    return 'Educational/Direct'
  }

  private generateInsights(patterns: StoryPattern[]): string[] {
    const insights: string[] = []

    if (patterns.length > 0) {
      const best = patterns[0]
      insights.push(
        `Your "${best.narrative_type}" stories generate the most revenue ($${best.avg_revenue.toFixed(0)} avg)`
      )
    }

    if (patterns.length > 1) {
      const second = patterns[1]
      insights.push(
        `"${second.narrative_type}" is your second-best performer (${second.avg_engagement.toFixed(1)}% engagement)`
      )
    }

    const lowPerformer = patterns[patterns.length - 1]
    if (lowPerformer.avg_engagement < 5) {
      insights.push(
        `Avoid "${lowPerformer.narrative_type}" - only ${lowPerformer.avg_engagement.toFixed(1)}% engagement`
      )
    }

    return insights
  }

  async analyzeAngles(input: StoryAnalysisInput): Promise<AngleAnalysis> {
    const prompt = `Analyze these content pieces to identify winning vs losing angles:

CONTENT:
${input.content.map(c => `
Caption: "${c.caption.slice(0, 200)}"
Type: ${c.type}
Engagement: ${c.engagement_rate}%
Revenue: $${c.revenue_attributed}
Leads: ${c.leads_generated}
`).join('\n---\n')}

Identify:
1. WINNING ANGLES (3-5):
   - What angle/approach works best
   - Why it performs well
   - When to use it
   
2. LOSING ANGLES (2-3):
   - What doesn't work
   - Why it fails
   - How to fix it

3. RECOMMENDATIONS (5):
   - New angles to try
   - When to use each
   - Template/example

Return ONLY valid JSON, no markdown.`

    try {
      const message = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }],
      })

      const content = message.content[0]
      if (content.type === 'text') {
        const cleanJson = content.text.replace(/```json\n?|\n?```/g, '').trim()
        return JSON.parse(cleanJson)
      }

      throw new Error('Unexpected response format')
    } catch (error) {
      console.error('Angle analysis error:', error)
      return this.fallbackAngleAnalysis()
    }
  }

  private fallbackAngleAnalysis(): AngleAnalysis {
    return {
      winning_angles: [
        {
          angle: 'Problem → Solution',
          description: 'Lead with the pain point, then offer your solution',
          avg_performance: 8.5,
          use_cases: ['Educational posts', 'Lead magnets', 'Sales content'],
        },
        {
          angle: 'Transformation Proof',
          description: 'Show before/after results with specific numbers',
          avg_performance: 9.2,
          use_cases: ['Social proof', 'Case studies', 'Testimonials'],
        },
      ],
      losing_angles: [
        {
          angle: 'Generic Motivation',
          why_it_fails: 'No specific value, just inspiration without action steps',
          fix: 'Add specific tactics or frameworks people can use',
        },
      ],
      recommendations: [
        {
          angle: 'Contrarian Take',
          when_to_use: 'When you want to stand out and spark discussion',
          template: 'Everyone says [common belief], but here\'s why [contrarian view]',
        },
        {
          angle: 'Behind-the-Numbers',
          when_to_use: 'When sharing results or achievements',
          template: 'I made $X last month. Here\'s the breakdown most people hide...',
        },
      ],
    }
  }
}

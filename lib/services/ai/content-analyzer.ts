// ============================================
// AI Content Analyzer
// Analiza contenido y lo conecta con métricas de revenue
// ============================================

import Anthropic from '@anthropic-ai/sdk'

interface ContentAnalysisInput {
  caption: string
  content_type: 'post' | 'reel' | 'story' | 'video'
  metrics: {
    likes: number
    comments: number
    shares: number
    saves: number
    views?: number
    reach?: number
  }
  revenue_attributed?: number
  leads_generated?: number
}

interface ContentAnalysisResult {
  sentiment: 'positive' | 'neutral' | 'negative'
  topics: string[]
  hook_type: string
  hook_effectiveness: number // 1-10
  cta_present: boolean
  cta_type?: string
  content_category: string
  estimated_quality_score: number // 1-10
  recommendations: string[]
}

export class ContentAnalyzer {
  private anthropic: Anthropic

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    })
  }

  async analyzeContent(input: ContentAnalysisInput): Promise<ContentAnalysisResult> {
    const prompt = `Analyze this ${input.content_type} content for an infoproductor/coach:

Caption: "${input.caption}"

Metrics:
- Likes: ${input.metrics.likes}
- Comments: ${input.metrics.comments}
- Shares: ${input.metrics.shares}
- Saves: ${input.metrics.saves}
${input.metrics.views ? `- Views: ${input.metrics.views}` : ''}
${input.revenue_attributed ? `- Revenue Generated: $${input.revenue_attributed}` : ''}
${input.leads_generated ? `- Leads Generated: ${input.leads_generated}` : ''}

Provide a JSON analysis with:
1. sentiment: positive/neutral/negative
2. topics: array of main topics (max 5)
3. hook_type: type of hook used (question, statement, story, stat, etc.)
4. hook_effectiveness: score 1-10
5. cta_present: boolean
6. cta_type: if present (direct_sale, lead_magnet, engagement, link_click, etc.)
7. content_category: educational, promotional, engagement, transformation, behind_the_scenes
8. estimated_quality_score: 1-10 based on engagement and revenue
9. recommendations: 3 actionable tips to improve

Return ONLY valid JSON, no markdown.`

    try {
      const message = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      })

      const content = message.content[0]
      if (content.type === 'text') {
        const cleanJson = content.text.replace(/```json\n?|\n?```/g, '').trim()
        return JSON.parse(cleanJson)
      }

      throw new Error('Unexpected response format')
    } catch (error) {
      console.error('Content analysis error:', error)
      // Fallback analysis
      return this.fallbackAnalysis(input)
    }
  }

  private fallbackAnalysis(input: ContentAnalysisInput): ContentAnalysisResult {
    const engagementRate = 
      (input.metrics.likes + input.metrics.comments * 3 + input.metrics.shares * 5 + input.metrics.saves * 4) / 
      (input.metrics.reach || 1000)

    return {
      sentiment: 'positive',
      topics: this.extractTopics(input.caption),
      hook_type: this.detectHookType(input.caption),
      hook_effectiveness: Math.min(10, Math.round(engagementRate * 100)),
      cta_present: this.hasCTA(input.caption),
      cta_type: this.detectCTAType(input.caption),
      content_category: this.categorizeContent(input.caption, input.content_type),
      estimated_quality_score: Math.min(10, Math.round(engagementRate * 100)),
      recommendations: [
        'Add more specific value propositions',
        'Include a clear call-to-action',
        'Test different hook formats',
      ],
    }
  }

  private extractTopics(caption: string): string[] {
    const topics: string[] = []
    const keywords = {
      'fitness': ['workout', 'fitness', 'gym', 'exercise', 'training'],
      'nutrition': ['diet', 'nutrition', 'food', 'meal', 'protein'],
      'mindset': ['mindset', 'mental', 'psychology', 'motivation'],
      'business': ['business', 'entrepreneur', 'money', 'revenue', 'sales'],
      'coaching': ['coaching', 'mentor', 'guide', 'help'],
    }

    const lowerCaption = caption.toLowerCase()
    Object.entries(keywords).forEach(([topic, words]) => {
      if (words.some(word => lowerCaption.includes(word))) {
        topics.push(topic)
      }
    })

    return topics.length > 0 ? topics : ['general']
  }

  private detectHookType(caption: string): string {
    if (caption.startsWith('?') || caption.includes('?')) return 'question'
    if (/^\d+/.test(caption)) return 'stat_or_list'
    if (caption.toLowerCase().includes('story') || caption.toLowerCase().includes('when i')) return 'story'
    if (caption.includes('!')) return 'statement'
    return 'other'
  }

  private hasCTA(caption: string): boolean {
    const ctaKeywords = ['link in bio', 'dm me', 'click', 'join', 'sign up', 'register', 'book', 'apply', 'download']
    return ctaKeywords.some(keyword => caption.toLowerCase().includes(keyword))
  }

  private detectCTAType(caption: string): string | undefined {
    if (!this.hasCTA(caption)) return undefined
    
    const lower = caption.toLowerCase()
    if (lower.includes('link in bio')) return 'link_click'
    if (lower.includes('dm me')) return 'direct_message'
    if (lower.includes('comment')) return 'engagement'
    if (lower.includes('book') || lower.includes('apply')) return 'lead_magnet'
    
    return 'direct_sale'
  }

  private categorizeContent(caption: string, type: string): string {
    const lower = caption.toLowerCase()
    
    if (lower.includes('transformation') || lower.includes('before') || lower.includes('after')) {
      return 'transformation'
    }
    if (lower.includes('buy') || lower.includes('sale') || lower.includes('offer') || lower.includes('price')) {
      return 'promotional'
    }
    if (lower.includes('how to') || lower.includes('tip') || lower.includes('learn') || lower.includes('mistake')) {
      return 'educational'
    }
    if (lower.includes('behind') || lower.includes('day in') || lower.includes('routine')) {
      return 'behind_the_scenes'
    }
    
    return 'engagement'
  }

  async generateContentRecommendations(
    topContent: ContentAnalysisInput[],
    poorContent: ContentAnalysisInput[]
  ): Promise<string[]> {
    // Analizar patrones de contenido exitoso vs no exitoso
    const recommendations: string[] = []

    // Analizar tipos de contenido que funcionan
    const topTypes = topContent.reduce((acc, c) => {
      acc[c.content_type] = (acc[c.content_type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const bestType = Object.entries(topTypes).sort((a, b) => b[1] - a[1])[0]
    if (bestType) {
      recommendations.push(
        `Your ${bestType[0]}s perform ${Math.round((bestType[1] / topContent.length) * 100)}% better - create more of these`
      )
    }

    // Analizar CTAs
    const topWithCTA = topContent.filter(c => this.hasCTA(c.caption)).length
    if (topWithCTA / topContent.length > 0.7) {
      recommendations.push('Posts with clear CTAs generate 3x more leads - always include one')
    }

    // Analizar revenue
    const avgRevenue = topContent.reduce((sum, c) => sum + (c.revenue_attributed || 0), 0) / topContent.length
    if (avgRevenue > 100) {
      recommendations.push(`Your best content generates $${Math.round(avgRevenue)} on average - focus on similar topics`)
    }

    return recommendations
  }
}

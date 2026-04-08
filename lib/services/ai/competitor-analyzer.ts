// ============================================
// AI Competitor Analyzer
// Analiza competencia y encuentra gaps de oportunidad
// ============================================

import Anthropic from '@anthropic-ai/sdk'

interface CompetitorInput {
  username: string
  platform: string
  profile_data: {
    followers: number
    following: number
    posts_count: number
    bio: string
  }
  recent_content: {
    type: string
    caption: string
    engagement_rate: number
    likes: number
    comments: number
  }[]
  pricing?: {
    products: { name: string; price: number }[]
  }
}

interface CompetitorAnalysis {
  content_strategy: {
    primary_themes: string[]
    posting_frequency: number
    best_performing_formats: string[]
    engagement_tactics: string[]
  }
  positioning: {
    unique_angle: string
    target_audience: string
    value_proposition: string
  }
  gaps_and_opportunities: {
    topic: string
    opportunity: string
    difficulty: 'easy' | 'medium' | 'hard'
    expected_impact: string
  }[]
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
}

export class CompetitorAnalyzer {
  private anthropic: Anthropic

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    })
  }

  async analyzeCompetitor(input: CompetitorInput): Promise<CompetitorAnalysis> {
    const prompt = `Analyze this competitor in the ${input.platform} space:

USERNAME: @${input.username}
FOLLOWERS: ${input.profile_data.followers.toLocaleString()}
BIO: ${input.profile_data.bio}
POSTS: ${input.profile_data.posts_count}

RECENT CONTENT:
${input.recent_content.map(c => `- ${c.type}: "${c.caption.slice(0, 100)}" (${c.engagement_rate}% engagement, ${c.likes} likes)`).join('\n')}

${input.pricing ? `PRICING:\n${input.pricing.products.map(p => `- ${p.name}: $${p.price}`).join('\n')}` : ''}

Provide a detailed analysis with:

1. CONTENT STRATEGY:
   - Primary themes (top 5)
   - Posting frequency (posts per week)
   - Best performing formats
   - Engagement tactics they use

2. POSITIONING:
   - Their unique angle
   - Target audience
   - Value proposition

3. GAPS & OPPORTUNITIES (find 5):
   - Topics they DON'T cover that you could own
   - Rate difficulty (easy/medium/hard)
   - Expected impact

4. STRENGTHS (3-5 things they do well)

5. WEAKNESSES (3-5 areas where they're vulnerable)

6. RECOMMENDATIONS (3 actionable strategies to compete)

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
      console.error('Competitor analysis error:', error)
      return this.fallbackAnalysis(input)
    }
  }

  private fallbackAnalysis(input: CompetitorInput): CompetitorAnalysis {
    return {
      content_strategy: {
        primary_themes: ['Fitness Tips', 'Nutrition', 'Transformation Stories', 'Motivation', 'Lifestyle'],
        posting_frequency: 7,
        best_performing_formats: ['Reels', 'Carousels'],
        engagement_tactics: ['Questions in captions', 'Call to action', 'User-generated content'],
      },
      positioning: {
        unique_angle: 'Evidence-based fitness for busy professionals',
        target_audience: '25-40 year old professionals',
        value_proposition: 'Get fit without spending hours in the gym',
      },
      gaps_and_opportunities: [
        {
          topic: 'Mental health & fitness connection',
          opportunity: 'They focus only on physical results, ignoring mental wellbeing',
          difficulty: 'easy',
          expected_impact: 'High - underserved niche',
        },
        {
          topic: 'Home workout equipment reviews',
          opportunity: 'No product recommendations or affiliate content',
          difficulty: 'medium',
          expected_impact: 'Medium - additional revenue stream',
        },
      ],
      strengths: [
        'Consistent posting schedule',
        'High-quality video production',
        'Strong community engagement',
      ],
      weaknesses: [
        'Limited content variety',
        'No clear funnel to paid products',
        'Weak email marketing presence',
      ],
      recommendations: [
        'Focus on mental health angle they ignore',
        'Create more interactive content (polls, Q&As)',
        'Build email list with lead magnets',
      ],
    }
  }

  async findYourUniquePositioning(
    yourProfile: any,
    competitors: CompetitorInput[]
  ): Promise<string> {
    const prompt = `Based on this competitive landscape, help define a unique positioning:

YOUR PROFILE:
${JSON.stringify(yourProfile, null, 2)}

COMPETITORS:
${competitors.map(c => `- @${c.username}: ${c.profile_data.bio}`).join('\n')}

Create a unique positioning statement that:
1. Differentiates from all competitors
2. Plays to your strengths
3. Fills a market gap
4. Resonates with your ideal follower

Format: "For [who] that [problem/need], I am [unique solution/angle] unlike [competitors who do X]."

Return just the positioning statement, nothing else.`

    try {
      const message = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 256,
        messages: [{ role: 'user', content: prompt }],
      })

      const content = message.content[0]
      return content.type === 'text' ? content.text : 'Unable to generate positioning'
    } catch (error) {
      return 'For busy professionals who struggle with consistency, I am your science-backed fitness mentor who teaches sustainable habits, not quick fixes.'
    }
  }
}

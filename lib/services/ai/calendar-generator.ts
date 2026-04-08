// ============================================
// AI Calendar Generator
// Genera calendario de contenido personalizado
// ============================================

import Anthropic from '@anthropic-ai/sdk'

export interface CalendarInput {
  business_type: string
  target_audience: string
  goals: {
    primary_goal: 'leads' | 'sales' | 'awareness' | 'engagement'
    monthly_target?: number
  }
  best_performing_content: {
    type: string
    topic: string
    engagement_rate: number
  }[]
  ideal_follower: {
    interests: string[]
    behaviors: string[]
  }
  current_date: Date
}

export interface CalendarEntry {
  date: string
  content_type: 'reel' | 'carousel' | 'post' | 'story'
  topic: string
  caption_hook: string
  content_category: 'educational' | 'promotional' | 'engagement' | 'transformation' | 'behind_the_scenes'
  cta: string
  best_time_to_post: string
  reasoning: string
  estimated_engagement: number
}

export class CalendarGenerator {
  private anthropic: Anthropic

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    })
  }

  async generate30DayCalendar(input: CalendarInput): Promise<CalendarEntry[]> {
    const prompt = `You are a content strategist for a ${input.business_type} targeting ${input.target_audience}.

PRIMARY GOAL: ${input.goals.primary_goal}
${input.goals.monthly_target ? `Monthly target: ${input.goals.monthly_target}` : ''}

BEST PERFORMING CONTENT:
${input.best_performing_content.map((c) => `- ${c.type}: "${c.topic}" (${c.engagement_rate}% engagement)`).join('\n')}

IDEAL FOLLOWER:
- Interests: ${input.ideal_follower.interests.join(', ')}
- Behaviors: ${input.ideal_follower.behaviors.join(', ')}

Generate a 30-day content calendar starting from ${input.current_date.toISOString().split('T')[0]}.

RULES:
1. Balance content types: 60% educational, 20% engagement, 20% promotional
2. Include variety: reels, carousels, posts, stories
3. Build on what's already working (topics above)
4. Each piece should align with the primary goal
5. Include clear CTAs
6. Suggest best posting times based on audience behavior

Return a JSON array of 30 entries with this structure:
{
  "date": "YYYY-MM-DD",
  "content_type": "reel|carousel|post|story",
  "topic": "specific topic",
  "caption_hook": "attention-grabbing first line",
  "content_category": "educational|promotional|engagement|transformation|behind_the_scenes",
  "cta": "specific call to action",
  "best_time_to_post": "6:00 PM EST",
  "reasoning": "why this content on this day",
  "estimated_engagement": 7.5
}

Return ONLY valid JSON array, no markdown.`

    try {
      const message = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }],
      })

      const content = message.content[0]
      if (content.type === 'text') {
        const cleanJson = content.text.replace(/```json\n?|\n?```/g, '').trim()
        return JSON.parse(cleanJson)
      }

      throw new Error('Unexpected response format')
    } catch (error) {
      console.error('Calendar generation error:', error)
      return this.fallbackCalendar(input)
    }
  }

  private fallbackCalendar(input: CalendarInput): CalendarEntry[] {
    const calendar: CalendarEntry[] = []
    const startDate = new Date(input.current_date)

    const templates = [
      {
        type: 'reel' as const,
        topics: [
          'How to get your first 10 clients',
          'Common mistakes beginners make',
          '3 tips that changed my business',
        ],
        category: 'educational' as const,
        cta: 'Save this for later!',
      },
      {
        type: 'carousel' as const,
        topics: ['5 myths about [niche]', 'Step-by-step guide to [topic]', 'My transformation journey'],
        category: 'educational' as const,
        cta: 'Follow for more tips',
      },
      {
        type: 'post' as const,
        topics: ['Client transformation story', 'Behind the scenes', 'Personal story'],
        category: 'engagement' as const,
        cta: 'Comment if you relate',
      },
    ]

    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)

      const template = templates[i % templates.length]
      const topic = template.topics[Math.floor(Math.random() * template.topics.length)]

      calendar.push({
        date: date.toISOString().split('T')[0],
        content_type: template.type,
        topic,
        caption_hook: `🚀 ${topic}`,
        content_category: template.category,
        cta: template.cta,
        best_time_to_post: i % 2 === 0 ? '6:00 PM' : '8:00 AM',
        reasoning: 'Generated based on best practices',
        estimated_engagement: 5 + Math.random() * 5,
      })
    }

    return calendar
  }

  async generateContentIdea(entry: CalendarEntry, context: CalendarInput): Promise<string> {
    const prompt = `Generate a detailed content idea for this post:

Type: ${entry.content_type}
Topic: ${entry.topic}
Category: ${entry.content_category}
Target: ${context.target_audience}

Provide:
1. Full caption (with hook, value, and CTA)
2. Visual suggestions
3. Key points to cover

Keep it ${context.business_type}-specific and actionable.`

    try {
      const message = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      })

      const content = message.content[0]
      return content.type === 'text' ? content.text : 'Content idea generation failed'
    } catch (error) {
      return 'Error generating content idea'
    }
  }
}

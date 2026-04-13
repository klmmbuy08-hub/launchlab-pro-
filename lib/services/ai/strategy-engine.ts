import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export interface AgentResponse {
  agent: 'CEO' | 'CMO' | 'SALES'
  role: string
  insight: string
  action_items: string[]
  metrics_to_watch: string[]
}

export interface FullStrategy {
  launch_title: string
  summary: string
  phase: 'planning' | 'execution' | 'optimization'
  agents: AgentResponse[]
}

export async function generateLaunchStrategy(profile: any, currentMetrics: any): Promise<FullStrategy> {
  const prompt = `You are an elite business mastermind team consisting of a CEO, CMO, and Sales Director. 
  
  **Business Context:**
  - Niche: ${profile.niche}
  - Product: ${profile.product_name}
  - Price: $${profile.product_price}
  - Monthly Revenue Goal: $${profile.monthly_revenue_goal}
  - Monthly Leads Goal: ${profile.monthly_leads_goal}
  
  **Current Status:**
  - Total Followers: ${currentMetrics.total_followers}
  - Avg Engagement: ${currentMetrics.avg_engagement}%
  - Current Revenue (Month): $${currentMetrics.revenue_month}
  
  Generate a comprehensive launch and growth strategy.
  
  Format the output as a JSON object:
  {
    "launch_title": "Actionable Name for the Strategy",
    "summary": "Overall vision in 2 sentences",
    "phase": "planning|execution|optimization",
    "agents": [
      {
        "agent": "CEO",
        "role": "Vision & Profitability",
        "insight": "High-level strategic insight",
        "action_items": ["3 specific items"],
        "metrics_to_watch": ["2 critical KPIs"]
      },
      {
        "agent": "CMO",
        "role": "Content & Awareness",
        "insight": "Marketing and message insight",
        "action_items": ["3 specific items"],
        "metrics_to_watch": ["2 marketing KPIs"]
      },
      {
        "agent": "SALES",
        "role": "Conversion & Closing",
        "insight": "Lead management and sales insight",
        "action_items": ["3 specific items"],
        "metrics_to_watch": ["2 sales KPIs"]
      }
    ]
  }`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2500,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = response.content[0]
  const text = content.type === 'text' ? content.text : ''
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  
  if (!jsonMatch) throw new Error('Failed to generate AI strategy JSON')
  
  return JSON.parse(jsonMatch[0])
}

import Anthropic from '@anthropic-ai/sdk';
import { StoryContent } from '../types/stories';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export class StoriesAgent {
  static async generate(params: {
    goal: string;
    niche: string;
    productName: string;
    audience: string;
  }): Promise<StoryContent[]> {
    const prompt = `You are a high-performance Content Creator & Social Media Strategist. 
    Your goal is to generate a sequence of 3 Instagram Stories that are high-converting and engaging.

    Business Context:
    - Niche: ${params.niche}
    - Product: ${params.productName}
    - Target Audience: ${params.audience}
    - Strategic Goal: ${params.goal}

    REQUIREMENTS:
    - Each story must have a specific role: Hook, Value/Proof, and Call to Action.
    - Use modern, punchy copy.
    - Include interactive stickers where appropriate (poll, question, quiz, countdown).
    - Suggest a background style (gradient colors or solid).

    OUTPUT FORMAT:
    Return ONLY a JSON array of 3 objects with this structure:
    {
      "id": "unique-id",
      "background": {
        "type": "gradient",
        "value": "CSS linear gradient string matching the niche vibe"
      },
      "text": {
        "content": "The main text overlay",
        "position": "top" | "center" | "bottom",
        "style": "modern" | "classic" | "neon" | "minimal"
      },
      "sticker": {
        "type": "poll" | "question" | "quiz" | "countdown",
        "question": "The question for the sticker",
        "options": ["Option 1", "Option 2"] // Only if type is poll or quiz
      }
    }

    Respond ONLY with the JSON array.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = response.content[0];
    const text = content.type === 'text' ? content.text : '';
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    
    if (!jsonMatch) throw new Error('Failed to parse AI response');
    
    return JSON.parse(jsonMatch[0]);
  }

  static async predictEngagement(story: StoryContent): Promise<{ score: number; reasoning: string }> {
    // Mock for now, but in reality would be another AI call or formula
    const score = Math.floor(Math.random() * 20) + 75; // 75-95
    return {
      score,
      reasoning: "High hook strength and interactive sticker placement likely to trigger algorithm rewards."
    };
  }
}

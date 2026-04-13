import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [
      {
        id: '1',
        title: 'Real Estate Market Update Q1 2026',
        platform: 'linkedin',
        content_type: 'post',
        status: 'published',
        published_date: '2026-04-10',
        engagement: { likes: 245, comments: 32, shares: 18, views: 3400 },
        ai_score: 85,
      },
      {
        id: '2',
        title: 'Top 5 Investment Properties This Month',
        platform: 'instagram',
        content_type: 'carousel',
        status: 'published',
        published_date: '2026-04-11',
        engagement: { likes: 412, comments: 56, shares: 24, views: 5200 },
        ai_score: 92,
      },
    ],
  })
}

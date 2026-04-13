import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      has_accounts: true,
      current_snapshot: {
        total_followers: 15420,
        follower_growth_7d: 2.3,
        avg_engagement_rate: 4.8,
        engagement_trend_7d: 1.2,
        demographics: {
          age_ranges: {
            '18-24': 15,
            '25-34': 35,
            '35-44': 28,
            '45-54': 15,
            '55+': 7,
          },
          gender: {
            female: 62,
            male: 35,
            other: 3,
          },
        },
        ideal_follower_profile: {
          ideal_customer: {
            age_range: '25-44',
            gender: 'Female',
            pain_points: ['Lead Generation', 'Time Management', 'Digital Marketing'],
            interests: ['Real Estate', 'Business Growth', 'Digital Marketing'],
          },
          content_strategy: {
            best_topics: ['Market Updates', 'Success Stories', 'Investment Tips'],
            best_formats: ['Carousel Posts', 'Reels', 'Long-form Content'],
          },
          action_items: [
            'Post real estate market analysis twice weekly',
            'Create client testimonial reels',
            'Share investment property tips',
            'Host LinkedIn live sessions',
          ],
        },
      },
      historical_data: [
        { date: 'Mon', followers: 15200 },
        { date: 'Tue', followers: 15280 },
        { date: 'Wed', followers: 15320 },
        { date: 'Thu', followers: 15380 },
        { date: 'Fri', followers: 15420 },
        { date: 'Sat', followers: 15450 },
        { date: 'Sun', followers: 15420 },
      ],
    },
  })
}

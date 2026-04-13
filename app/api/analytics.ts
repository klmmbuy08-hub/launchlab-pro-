import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      trend: [
        { date: 'Mon', views: 2400 },
        { date: 'Tue', views: 2210 },
        { date: 'Wed', views: 2290 },
        { date: 'Thu', views: 2000 },
        { date: 'Fri', views: 2181 },
        { date: 'Sat', views: 2500 },
        { date: 'Sun', views: 2100 },
      ],
      sources: [
        { name: 'Organic', value: 45 },
        { name: 'Paid', value: 35 },
        { name: 'Referral', value: 20 },
      ],
      topPages: [
        { path: '/properties', views: 1200 },
        { path: '/about', views: 890 },
        { path: '/contact', views: 650 },
      ],
      funnel: [
        { stage: 'Visitor', count: 10000 },
        { stage: 'Lead', count: 450 },
        { stage: 'Proposal', count: 120 },
        { stage: 'Client', count: 45 },
      ],
    },
  })
}

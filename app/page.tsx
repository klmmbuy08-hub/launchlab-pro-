import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <nav className="flex items-center justify-between mb-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg" />
            <span className="text-2xl font-bold text-white">LaunchOS</span>
          </div>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-white">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Business Intelligence for{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Coaches
            </span>
          </h1>
          <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto">
            LaunchOS is your AI-powered command center. Track revenue, analyze content, 
            understand your audience, and grow your business with intelligent insights.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" className="text-white border-white hover:bg-white/10 text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <FeatureCard
            icon="📊"
            title="Business Dashboard"
            description="Track revenue, leads, and conversions in real-time"
          />
          <FeatureCard
            icon="👥"
            title="Audience Intelligence"
            description="Understand your followers with AI-powered insights"
          />
          <FeatureCard
            icon="📱"
            title="Content Analytics"
            description="Optimize your content strategy with performance data"
          />
          <FeatureCard
            icon="📅"
            title="Smart Calendar"
            description="AI-generated content calendar for 30 days"
          />
          <FeatureCard
            icon="🎯"
            title="Competitor Analysis"
            description="Stay ahead with competitive intelligence"
          />
          <FeatureCard
            icon="✨"
            title="Stories AI"
            description="Generate engaging stories with AI assistance"
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-blue-200">{description}</p>
    </div>
  )
}

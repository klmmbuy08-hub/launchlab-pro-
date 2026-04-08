'use client'

import { Button } from '@/components/ui/button'
import { StoryPatternsView } from '@/components/stories/story-patterns-view'
import { RefreshCw, BookOpen } from 'lucide-react'

export default function StoriesPage() {
  // Mock data
  const storyData = {
    patterns: [
      {
        narrative_type: 'Transformation Story',
        avg_engagement: 9.2,
        avg_revenue: 850,
        frequency: 12,
        examples: [
          'How I lost 40lbs in 90 days without giving up my favorite foods',
          'From broke to $10K/month: My journey',
          'Client spotlight: Sarah lost 30lbs and gained her confidence back',
        ],
      },
      {
        narrative_type: 'Mistake/Problem Story',
        avg_engagement: 7.8,
        avg_revenue: 620,
        frequency: 8,
        examples: [
          '5 mistakes that kept me fat for years',
          'Why your workouts aren\'t working (and what to do instead)',
          'The biggest lie fitness coaches tell you',
        ],
      },
      {
        narrative_type: 'List/Framework',
        avg_engagement: 6.5,
        avg_revenue: 480,
        frequency: 15,
        examples: [
          '7 foods that burn belly fat faster',
          '3 simple exercises for a toned body',
          'My 5-step morning routine',
        ],
      },
    ],
    insights: [
      'Your "Transformation Story" stories generate the most revenue ($850 avg)',
      '"Mistake/Problem Story" is your second-best performer (7.8% engagement)',
      'List/Framework content gets the most shares but lower conversion',
    ],
  }

  return (
    <div className="space-y-8 pb-12 w-full animate-in fade-in duration-700 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Stories & Angles</h1>
          <p className="text-[#A1A1AA] text-base max-w-xl">
            Discover which narratives and angles drive the most engagement and sales.
          </p>
        </div>

        <Button className="bg-white text-black hover:bg-[#E5E7EB] transition-colors rounded-lg px-4 h-9 text-xs font-semibold">
          <RefreshCw className="w-3.5 h-3.5 mr-2" />
          Re-analyze
        </Button>
      </div>

      {/* Info Banner */}
      <div className="bg-[#141414] border border-[#8B5CF6]/20 rounded-xl overflow-hidden shadow-sm relative">
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#8B5CF6]/50" />
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-md bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex-shrink-0">
              <BookOpen className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1.5 text-sm">Understanding Story Patterns</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-4xl">
                We analyzed your last 90 days of content to identify which narrative types and storytelling angles 
                generate the most engagement and revenue. Use this data to create more of what works instead of guessing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Story Patterns */}
      <StoryPatternsView patterns={storyData.patterns} insights={storyData.insights} />
    </div>
  )
}

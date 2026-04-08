'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CompetitorCard } from '@/components/competitors/competitor-card'
import { CompetitorAnalysisView } from '@/components/competitors/competitor-analysis-view'
import { EmptyState } from '@/components/shared/empty-state'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Plus, Search, Target } from 'lucide-react'

export default function CompetitorsPage() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<any>(null)
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)

  // Mock data
  const competitors = [
    {
      id: '1',
      username: 'fitness_coach_sarah',
      platform: 'instagram',
      followers: 45600,
      engagement_rate: 7.2,
      posting_frequency: 5,
      last_analyzed: '2024-04-08',
    },
    {
      id: '2',
      username: 'transformation_tom',
      platform: 'instagram',
      followers: 32100,
      engagement_rate: 8.5,
      posting_frequency: 7,
      last_analyzed: '2024-04-07',
    },
  ]

  const mockAnalysis = {
    content_strategy: {
      primary_themes: ['Weight Loss', 'Meal Prep', 'Home Workouts', 'Motivation', 'Before/After'],
      posting_frequency: 5,
      best_performing_formats: ['Reels', 'Carousels'],
      engagement_tactics: ['Questions in captions', 'Save this for later', 'Tag a friend'],
    },
    positioning: {
      unique_angle: 'Evidence-based fitness for busy moms',
      target_audience: '25-40 year old mothers',
      value_proposition: 'Get your pre-baby body back without spending hours in the gym',
    },
    gaps_and_opportunities: [
      {
        topic: 'Mental health & postpartum fitness',
        opportunity: 'They focus only on physical results, ignoring emotional struggles',
        difficulty: 'easy' as const,
        expected_impact: 'High - underserved niche with loyal following',
      },
      {
        topic: 'Budget-friendly meal planning',
        opportunity: 'All their meal plans require expensive ingredients',
        difficulty: 'medium' as const,
        expected_impact: 'Medium - attract price-sensitive audience',
      },
    ],
    strengths: [
      'Consistent posting schedule (5x/week)',
      'High-quality transformation photos',
      'Strong community engagement in comments',
      'Clear personal brand and story',
    ],
    weaknesses: [
      'Limited content variety (mostly transformations)',
      'No clear funnel to paid products',
      'Weak email marketing presence',
      'Ignores male audience completely',
    ],
    recommendations: [
      'Focus on the mental health angle they completely ignore - create content about mindset, confidence, and emotional eating',
      'Build an email list with a budget-friendly meal plan lead magnet',
      'Create more interactive content (polls, Q&As, challenges) to increase engagement',
    ],
  }

  const handleCompetitorClick = (competitor: any) => {
    setSelectedCompetitor(competitor)
    setIsAnalysisOpen(true)
  }

  return (
    <div className="space-y-8 pb-12 w-full animate-in fade-in duration-700 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Competitor Intelligence</h1>
          <p className="text-[#A1A1AA] text-base max-w-xl">
            Track your competition and find clear market gaps to differentiate.
          </p>
        </div>

        <Button
          onClick={() => setIsAddOpen(true)}
          className="bg-white text-black hover:bg-[#E5E7EB] transition-colors rounded-lg px-4 h-9 text-xs font-semibold"
        >
          <Plus className="w-3.5 h-3.5 mr-2" />
          Add Competitor
        </Button>
      </div>

      {/* Search */}
      <div className="bg-[#141414] border border-[#27272A] rounded-xl p-2 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
          <Input
            placeholder="Search competitors..."
            className="pl-10 bg-[#0A0A0A] border-[#27272A] text-white placeholder:text-[#71717A] h-10 rounded-lg focus-visible:ring-1 focus-visible:ring-[#3F3F46]"
          />
        </div>
      </div>

      {/* Competitors List */}
      {competitors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {competitors.map(competitor => (
            <CompetitorCard
              key={competitor.id}
              competitor={competitor}
              onClick={() => handleCompetitorClick(competitor)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Target}
          title="No competitors tracked yet"
          description="Add competitors to track their strategy and find opportunities"
          action={{
            label: 'Add Your First Competitor',
            onClick: () => setIsAddOpen(true),
          }}
        />
      )}

      {/* Analysis Modal */}
      {selectedCompetitor && (
        <Dialog open={isAnalysisOpen} onOpenChange={setIsAnalysisOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#141414] border-[#27272A] p-0 shadow-2xl">
            <DialogHeader className="p-6 border-b border-[#27272A] sticky top-0 bg-[#141414]/90 backdrop-blur-md z-10">
              <DialogTitle className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-[#0A0A0A] border border-[#27272A] flex items-center justify-center text-xs">
                  {selectedCompetitor.username[0].toUpperCase()}
                </div>
                Analysis: @{selectedCompetitor.username}
              </DialogTitle>
            </DialogHeader>
            <div className="p-6">
              <CompetitorAnalysisView analysis={mockAnalysis} />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Competitor Modal */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md bg-[#141414] border-[#27272A] shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Add Competitor</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#71717A]">Platform</label>
              <select className="w-full h-10 px-3 rounded-lg bg-[#0A0A0A] border border-[#27272A] text-white focus:outline-none focus:border-[#3F3F46]">
                <option>Instagram</option>
                <option>TikTok</option>
                <option>LinkedIn</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#71717A]">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]">@</span>
                <Input
                  placeholder="competitor_username"
                  className="pl-8 bg-[#0A0A0A] border-[#27272A] text-white placeholder:text-[#4B5563]"
                />
              </div>
            </div>
            <Button className="w-full h-10 bg-white text-black hover:bg-[#E5E7EB] font-semibold tracking-wide">
              Analyze Profile
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

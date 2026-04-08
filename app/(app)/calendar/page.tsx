'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarView } from '@/components/calendar/calendar-view'
import { EntryDetailModal } from '@/components/calendar/entry-detail-modal'
import { CalendarStats } from '@/components/calendar/calendar-stats'
import { Sparkles, Download, List, CalendarDays } from 'lucide-react'

interface CalendarEntry {
  date: string
  content_type: 'reel' | 'carousel' | 'post' | 'story'
  topic: string
  caption_hook: string
  content_category:
    | 'educational'
    | 'promotional'
    | 'engagement'
    | 'transformation'
    | 'behind_the_scenes'
  cta: string
  best_time_to_post: string
  reasoning: string
  estimated_engagement: number
  status?: 'planned' | 'approved' | 'published'
}

export default function CalendarPage() {
  const [selectedEntry, setSelectedEntry] = useState<CalendarEntry | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // Mock data - En producción vendría de la API
  const calendarEntries: CalendarEntry[] = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)

    const types: CalendarEntry['content_type'][] = ['reel', 'carousel', 'post', 'story']
    const categories: CalendarEntry['content_category'][] = [
      'educational',
      'promotional',
      'engagement',
      'transformation',
      'behind_the_scenes',
    ]

    return {
      date: date.toISOString().split('T')[0],
      content_type: types[i % types.length],
      topic: [
        'How I got my first 10 clients in 30 days',
        '5 myths about fitness coaching',
        'Client transformation story',
        'Behind the scenes of my business',
        'Common mistakes that cost you money',
      ][i % 5],
      caption_hook: '🚀 This changed everything...',
      content_category: categories[i % categories.length],
      cta: 'Link in bio for free guide',
      best_time_to_post: i % 2 === 0 ? '6:00 PM EST' : '8:00 AM EST',
      reasoning:
        'Based on your best-performing content, this topic resonates with your audience and drives engagement.',
      estimated_engagement: 5 + Math.random() * 5,
      status: i < 5 ? 'approved' : 'planned',
    }
  })

  const stats = {
    total_entries: calendarEntries.length,
    by_type: [
      { type: 'reel', count: calendarEntries.filter((e) => e.content_type === 'reel').length },
      {
        type: 'carousel',
        count: calendarEntries.filter((e) => e.content_type === 'carousel').length,
      },
      { type: 'post', count: calendarEntries.filter((e) => e.content_type === 'post').length },
      { type: 'story', count: calendarEntries.filter((e) => e.content_type === 'story').length },
    ],
    by_category: [
      {
        category: 'educational',
        count: calendarEntries.filter((e) => e.content_category === 'educational').length,
      },
      {
        category: 'promotional',
        count: calendarEntries.filter((e) => e.content_category === 'promotional').length,
      },
      {
        category: 'engagement',
        count: calendarEntries.filter((e) => e.content_category === 'engagement').length,
      },
      {
        category: 'transformation',
        count: calendarEntries.filter((e) => e.content_category === 'transformation').length,
      },
      {
        category: 'behind_the_scenes',
        count: calendarEntries.filter((e) => e.content_category === 'behind_the_scenes').length,
      },
    ],
    avg_estimated_engagement:
      calendarEntries.reduce((sum, e) => sum + e.estimated_engagement, 0) /
      calendarEntries.length,
  }

  const handleEntryClick = (entry: CalendarEntry) => {
    setSelectedEntry(entry)
    setIsModalOpen(true)
  }

  const handleGenerateMore = async () => {
    setIsGenerating(true)
    // Simular generación con IA
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(false)
  }

  const handleGenerateFullContent = async (entry: CalendarEntry) => {
    console.log('Generating full content for:', entry)
    // TODO: Call AI to generate full caption + content suggestions
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Smart Calendar</h1>
          <p className="text-neutral-400">
            AI-generated content calendar based on what works for YOUR audience
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleGenerateMore}
            disabled={isGenerating}
            className="bg-gradient-to-r from-blue-500 to-purple-500"
          >
            <Sparkles className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : 'Generate 30 Days'}
          </Button>
          <Button variant="outline" className="border-neutral-700">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Info Banner */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-300 mb-2">✨ AI-Powered Calendar:</h3>
              <p className="text-sm text-blue-200">
                This calendar is generated based on your best-performing content, ideal follower
                profile, and business goals. Each piece is strategically placed to maximize
                engagement and conversions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <CalendarStats stats={stats} />

      {/* Calendar Tabs */}
      <Tabs defaultValue="calendar" className="space-y-6">
        <TabsList className="bg-neutral-900 border border-neutral-800">
          <TabsTrigger value="calendar">
            <CalendarDays className="w-4 h-4 mr-2" />
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="list">
            <List className="w-4 h-4 mr-2" />
            List View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <CalendarView
            entries={calendarEntries}
            onEntryClick={handleEntryClick}
            onGenerateMore={handleGenerateMore}
          />
        </TabsContent>

        <TabsContent value="list">
          <Card className="bg-neutral-900/50 border-neutral-800">
            <CardContent className="p-6">
              <div className="space-y-3">
                {calendarEntries.map((entry, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleEntryClick(entry)}
                    className="flex items-center justify-between p-4 rounded-lg bg-neutral-800/50 hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-center">
                        <p className="text-xs text-neutral-500">
                          {new Date(entry.date).toLocaleDateString('en-US', { month: 'short' })}
                        </p>
                        <p className="text-xl font-bold text-white">
                          {new Date(entry.date).getDate()}
                        </p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">
                            {entry.content_type === 'reel'
                              ? '🎬'
                              : entry.content_type === 'carousel'
                              ? '📸'
                              : entry.content_type === 'post'
                              ? '📄'
                              : '📱'}
                          </span>
                          <h4 className="font-medium text-white">{entry.topic}</h4>
                        </div>
                        <p className="text-xs text-neutral-500">
                          {entry.best_time_to_post} • Est. {entry.estimated_engagement.toFixed(1)}
                          % engagement
                        </p>
                      </div>
                    </div>
                    {entry.status && (
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          entry.status === 'published'
                            ? 'bg-green-500/20 text-green-400'
                            : entry.status === 'approved'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-neutral-700 text-neutral-400'
                        }`}
                      >
                        {entry.status}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Entry Detail Modal */}
      <EntryDetailModal
        entry={selectedEntry}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onGenerateFullContent={handleGenerateFullContent}
      />
    </div>
  )
}

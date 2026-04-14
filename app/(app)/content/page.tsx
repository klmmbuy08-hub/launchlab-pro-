'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Calendar, Heart, MessageCircle, Share2, Eye, Sparkles } from 'lucide-react'

interface ContentPost {
  id: string
  title: string
  platform: 'instagram' | 'linkedin' | 'tiktok' | 'twitter'
  content_type: 'reel' | 'carousel' | 'post' | 'story'
  status: 'draft' | 'scheduled' | 'published'
  scheduled_date?: string
  published_date?: string
  engagement: {
    likes: number
    comments: number
    shares: number
    views: number
  }
  ai_score?: number
}

export default function ContentPage() {
  const [posts, setPosts] = useState<ContentPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/content')
      const result = await response.json()
      if (result.success) {
        setPosts(result.data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = posts.filter((post) => {
    if (filter === 'all') return true
    return post.status === filter || post.platform === filter
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Content Management</h1>
          <p className="text-[#6B7280] mt-1">Create, schedule, and track your content</p>
        </div>
        <Button size="lg">
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-[#171717] border border-[#262626]">
          <TabsTrigger value="all" onClick={() => setFilter('all')}>All Posts</TabsTrigger>
          <TabsTrigger value="published" onClick={() => setFilter('published')}>Published</TabsTrigger>
          <TabsTrigger value="scheduled" onClick={() => setFilter('scheduled')}>Scheduled</TabsTrigger>
          <TabsTrigger value="draft" onClick={() => setFilter('draft')}>Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-4">
          {filteredPosts.length === 0 ? (
            <Card className="bg-[#171717] border-[#262626]">
              <CardContent className="py-12 text-center">
                <Sparkles className="w-12 h-12 text-[#6B7280] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No posts yet</h3>
                <p className="text-[#6B7280]">Create your first post to get started</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="bg-[#171717] border-[#262626]">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <CardTitle className="text-white">{post.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs font-medium text-blue-400">{post.platform.toUpperCase()}</span>
                          <span className="text-xs px-2 py-1 rounded bg-yellow-600 text-yellow-100">{post.status}</span>
                        </div>
                      </div>
                      {post.ai_score && (
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-400">{post.ai_score}</div>
                          <p className="text-xs text-[#6B7280]">AI Score</p>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-4 gap-3">
                      <div className="text-center">
                        <Eye className="w-4 h-4 text-[#6B7280] mx-auto mb-1" />
                        <p className="text-sm font-medium text-white">{post.engagement.views}</p>
                        <p className="text-xs text-[#6B7280]">Views</p>
                      </div>
                      <div className="text-center">
                        <Heart className="w-4 h-4 text-red-400 mx-auto mb-1" />
                        <p className="text-sm font-medium text-white">{post.engagement.likes}</p>
                        <p className="text-xs text-[#6B7280]">Likes</p>
                      </div>
                      <div className="text-center">
                        <MessageCircle className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                        <p className="text-sm font-medium text-white">{post.engagement.comments}</p>
                        <p className="text-xs text-[#6B7280]">Comments</p>
                      </div>
                      <div className="text-center">
                        <Share2 className="w-4 h-4 text-green-400 mx-auto mb-1" />
                        <p className="text-sm font-medium text-white">{post.engagement.shares}</p>
                        <p className="text-xs text-[#6B7280]">Shares</p>
                      </div>
                    </div>
                    {post.scheduled_date && (
                      <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                        <Calendar className="w-4 h-4" />
                        Scheduled for {new Date(post.scheduled_date).toLocaleDateString()}
                      </div>
                    )}
                    {post.published_date && (
                      <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                        <Calendar className="w-4 h-4" />
                        Published {new Date(post.published_date).toLocaleDateString()}
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">Edit</Button>
                      <Button size="sm" className="flex-1">View</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

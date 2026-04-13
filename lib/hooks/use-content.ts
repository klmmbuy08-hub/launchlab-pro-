import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export interface ContentPost {
  id: string
  title: string
  platform: 'instagram' | 'linkedin' | 'tiktok' | 'twitter'
  content_type: 'reel' | 'carousel' | 'post' | 'story'
  status: 'draft' | 'scheduled' | 'published'
  scheduled_date: string | null
  published_date: string | null
  ai_score: number | null
  engagement_likes: number
  engagement_comments: number
  engagement_shares: number
  engagement_views: number
  created_at: string
}

export function useContent() {
  const [posts, setPosts] = useState<ContentPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      setLoading(true)
      const { data, error: err } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false })

      if (err) throw err
      setPosts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching content')
    } finally {
      setLoading(false)
    }
  }

  const addPost = async (post: Omit<ContentPost, 'id' | 'created_at'>) => {
    try {
      const { data, error: err } = await supabase
        .from('content')
        .insert([post])
        .select()

      if (err) throw err
      if (data) setPosts([data[0], ...posts])
      return data?.[0]
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding post')
    }
  }

  return { posts, loading, error, fetchContent, addPost }
}

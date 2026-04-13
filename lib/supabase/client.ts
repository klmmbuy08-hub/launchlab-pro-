import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : {
      auth: { getSession: async () => ({ data: { session: null } }) },
      from: () => ({ select: () => Promise.resolve({ data: null, error: null }) }),
    } as any

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          company: string
          status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed'
          source: string
          value: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
      }
      content: {
        Row: {
          id: string
          title: string
          platform: 'instagram' | 'linkedin' | 'tiktok' | 'twitter'
          content_type: 'reel' | 'carousel' | 'post' | 'story'
          status: 'draft' | 'scheduled' | 'published'
          scheduled_date: string | null
          published_date: string | null
          ai_score: number | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['content']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['content']['Insert']>
      }
      workflows: {
        Row: {
          id: string
          name: string
          description: string
          status: 'active' | 'paused' | 'draft'
          platform: 'n8n' | 'make' | 'zapier'
          trigger: string
          executions: number
          last_run: string | null
          success_rate: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['workflows']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['workflows']['Insert']>
      }
    }
  }
}

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          subscription_tier: 'free' | 'pro' | 'agency'
          subscription_status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          created_at: string
          updated_at: string
        }
      }
      launches: {
        Row: {
          id: string
          user_id: string
          name: string
          product_type: string
          price: number
          target_audience: string
          description: string | null
          launch_date: string | null
          status: 'draft' | 'active' | 'completed'
          created_at: string
          updated_at: string
        }
      }
      agent_generations: {
        Row: {
          id: string
          launch_id: string
          agent_type: 'ceo' | 'cmo' | 'sales' | 'designer' | 'voice' | 'cdo' | 'coo'
          task: string
          content: any
          created_at: string
        }
        Insert: {
          id?: string
          launch_id: string
          agent_type: 'ceo' | 'cmo' | 'sales' | 'designer' | 'voice' | 'cdo' | 'coo'
          task: string
          content: any
          created_at?: string
        }
      }
    }
  }
}

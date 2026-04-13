// ============================================
// VALIDATION SCHEMAS (ZOD)
// ============================================

import { z } from 'zod'

// ============================================
// USER SCHEMAS
// ============================================

export const RegisterSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase(),
  password: z
    .string()
    .min(12, 'Password must be at least 12 characters')
    .regex(/[a-z]/, 'Password must contain lowercase letter')
    .regex(/[A-Z]/, 'Password must contain uppercase letter')
    .regex(/[0-9]/, 'Password must contain number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain special character'),
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long')
    .regex(/^[a-zA-Z\s'-]+$/, 'Invalid characters in name'),
})

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password required'),
})

// ============================================
// BUSINESS PROFILE SCHEMAS
// ============================================

export const BusinessProfileSchema = z.object({
  businessType: z.enum(['fitness_coach', 'business_coach', 'life_coach', 'other']),
  niche: z.string().min(2).max(100).optional(),
  productName: z.string().min(2).max(200),
  productPrice: z.number().positive().max(1000000),
  monthlyRevenueGoal: z.number().positive().max(10000000),
  monthlyLeadsGoal: z.number().int().positive().max(100000),
})

// ============================================
// CONTENT SCHEMAS
// ============================================

export const ContentAnalysisSchema = z.object({
  platformContentId: z.string().min(1).max(255),
  contentType: z.enum(['post', 'reel', 'story', 'carousel']),
  caption: z.string().max(5000).optional(),
  likes: z.number().int().min(0),
  comments: z.number().int().min(0),
  shares: z.number().int().min(0).optional(),
  saves: z.number().int().min(0).optional(),
})

// ============================================
// API KEY SCHEMA
// ============================================

export const APIKeySchema = z.object({
  key: z.string().regex(/^lch_[A-Za-z0-9_-]{32}$/, 'Invalid API key format'),
})

// ============================================
// SANITIZATION HELPERS
// ============================================

export const sanitizeEmail = (email: string) => email.trim().toLowerCase()

export const sanitizeName = (name: string) => 
  name
    .trim()
    .replace(/\s+/g, ' ') // Multiple spaces to single
    .replace(/[<>]/g, '') // Remove potential XSS

export const sanitizeURL = (url: string) => {
  try {
    const parsed = new URL(url)
    // Only allow http and https
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Invalid protocol')
    }
    return parsed.toString()
  } catch {
    throw new Error('Invalid URL')
  }
}

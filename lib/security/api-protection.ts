// ============================================
// API ROUTE PROTECTION UTILITIES
// ============================================

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import crypto from 'crypto'

// ============================================
// REQUEST VALIDATION
// ============================================

export function validateRequest<T extends z.ZodType>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; error: string } {
  try {
    const validated = schema.parse(data)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      }
    }
    return { success: false, error: 'Invalid request data' }
  }
}

// ============================================
// SANITIZATION
// ============================================

export function sanitizeString(str: string): string {
  // Remove potentially dangerous characters
  return str
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim()
}

export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = {} as T
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key as keyof T] = sanitizeString(value) as any
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key as keyof T] = sanitizeObject(value)
    } else if (Array.isArray(value)) {
      sanitized[key as keyof T] = value.map(item => 
        typeof item === 'string' ? sanitizeString(item) : item
      ) as any
    } else {
      sanitized[key as keyof T] = value
    }
  }
  
  return sanitized
}

// ============================================
// SQL INJECTION PREVENTION
// ============================================

const SQL_INJECTION_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
  /(UNION\s+SELECT)/gi,
  /(\bOR\b\s+\d+\s*=\s*\d+)/gi,
  /('|\"|;|--)/g,
]

export function detectSQLInjection(input: string): boolean {
  return SQL_INJECTION_PATTERNS.some(pattern => pattern.test(input))
}

// ============================================
// XSS PREVENTION
// ============================================

const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /onerror\s*=/gi,
  /onload\s*=/gi,
  /<iframe/gi,
]

export function detectXSS(input: string): boolean {
  return XSS_PATTERNS.some(pattern => pattern.test(input))
}

// ============================================
// CSRF TOKEN GENERATION & VALIDATION
// ============================================

const CSRF_SECRET = process.env.CSRF_SECRET || 'change-me-in-production'

export function generateCSRFToken(sessionId: string): string {
  const timestamp = Date.now().toString()
  const data = `${sessionId}:${timestamp}`
  const hash = crypto
    .createHmac('sha256', CSRF_SECRET)
    .update(data)
    .digest('hex')
  
  return Buffer.from(`${data}:${hash}`).toString('base64')
}

export function validateCSRFToken(token: string, sessionId: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString()
    const [receivedSessionId, timestamp, hash] = decoded.split(':')
    
    // Check session matches
    if (receivedSessionId !== sessionId) return false
    
    // Check token age (max 1 hour)
    const tokenAge = Date.now() - parseInt(timestamp)
    if (tokenAge > 3600000) return false
    
    // Verify hash
    const data = `${receivedSessionId}:${timestamp}`
    const expectedHash = crypto
      .createHmac('sha256', CSRF_SECRET)
      .update(data)
      .digest('hex')
    
    return hash === expectedHash
  } catch {
    return false
  }
}

// ============================================
// API KEY VALIDATION
// ============================================

export function validateAPIKey(apiKey: string | null): boolean {
  if (!apiKey) return false
  
  // In production, check against database
  const validKeys = process.env.VALID_API_KEYS?.split(',') || []
  
  return validKeys.includes(apiKey)
}

// ============================================
// REQUEST SIZE LIMITING
// ============================================

export async function checkRequestSize(
  request: NextRequest,
  maxSizeBytes: number = 1048576 // 1MB default
): Promise<{ valid: true } | { valid: false; error: string }> {
  const contentLength = request.headers.get('content-length')
  
  if (contentLength && parseInt(contentLength) > maxSizeBytes) {
    return {
      valid: false,
      error: `Request too large. Max size: ${maxSizeBytes} bytes`,
    }
  }
  
  return { valid: true }
}

// ============================================
// ERROR RESPONSE (without leaking info)
// ============================================

export function secureErrorResponse(
  error: any,
  isDevelopment: boolean = process.env.NODE_ENV === 'development'
): NextResponse {
  // Log full error server-side
  console.error('API Error:', error)
  
  // Return sanitized error to client
  if (isDevelopment) {
    return NextResponse.json(
      { 
        error: error.message || 'Internal Server Error',
        stack: error.stack,
      },
      { status: 500 }
    )
  }
  
  // Production: never leak implementation details
  return NextResponse.json(
    { error: 'An error occurred. Please try again later.' },
    { status: 500 }
  )
}

// ============================================
// SECURE HEADERS HELPER
// ============================================

export function getSecureHeaders(): HeadersInit {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  }
}

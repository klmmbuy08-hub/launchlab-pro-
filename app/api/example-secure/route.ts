// ============================================
// EXAMPLE: SECURE API ROUTE
// ============================================

import { NextRequest, NextResponse } from 'next/server'
import { 
  validateRequest, 
  sanitizeObject,
  detectSQLInjection,
  detectXSS,
  checkRequestSize,
  secureErrorResponse,
  getSecureHeaders
} from '@/lib/security/api-protection'
import { requireSupabaseAuth } from '@/lib/security/auth'
import { z } from 'zod'

// Define request schema
const RequestSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  amount: z.number().positive().max(1000000),
})

export async function POST(request: NextRequest) {
  try {
    // 1. Check request size
    const sizeCheck = await checkRequestSize(request, 1048576) // 1MB
    if (!sizeCheck.valid) {
      return NextResponse.json({ error: sizeCheck.error }, { status: 413 })
    }
    
    // 2. Require authentication
    const auth = await requireSupabaseAuth()
    if (!auth.authenticated) {
      return auth.response
    }
    
    // 3. Parse and validate request body
    const body = await request.json()
    
    const validation = validateRequest(RequestSchema, body)
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }
    
    // 4. Sanitize input
    const sanitized = sanitizeObject(validation.data)
    
    // 5. Check for SQL injection / XSS
    const inputString = JSON.stringify(sanitized)
    if (detectSQLInjection(inputString) || detectXSS(inputString)) {
      console.warn('⚠️ Malicious input detected from user:', auth.userId)
      return NextResponse.json({ error: 'Invalid input detected' }, { status: 400 })
    }
    
    // 6. Process request (your business logic here)
    const result = {
      id: crypto.randomUUID(),
      ...sanitized,
      userId: auth.userId,
      createdAt: new Date().toISOString(),
    }
    
    // 7. Return secure response
    return NextResponse.json(result, {
      status: 201,
      headers: getSecureHeaders(),
    })
    
  } catch (error) {
    return secureErrorResponse(error)
  }
}

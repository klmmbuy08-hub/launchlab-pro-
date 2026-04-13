// ============================================
// AUTHENTICATION & AUTHORIZATION
// ============================================

import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production'
const JWT_EXPIRES_IN = '24h'

// ============================================
// SESSION MANAGEMENT
// ============================================

export interface Session {
  userId: string
  email: string
  role: 'user' | 'admin' | 'agency'
  iat: number
  exp: number
}

export function createSession(userId: string, email: string, role: Session['role']): string {
  return jwt.sign(
    { userId, email, role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

export function verifySession(token: string): Session | null {
  try {
    return jwt.verify(token, JWT_SECRET) as Session
  } catch {
    return null
  }
}

// ============================================
// AUTHENTICATION MIDDLEWARE
// ============================================

export async function requireAuth(request: NextRequest): Promise<
  | { authenticated: true; userId: string; session: Session }
  | { authenticated: false; response: NextResponse }
> {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    return {
      authenticated: false,
      response: NextResponse.json({ error: 'Missing authorization header' }, { status: 401 }),
    }
  }
  
  const token = authHeader.substring(7)
  const session = verifySession(token)
  
  if (!session) {
    return {
      authenticated: false,
      response: NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 }),
    }
  }
  
  return {
    authenticated: true,
    userId: session.userId,
    session,
  }
}

// ============================================
// SUPABASE AUTH HELPERS
// ============================================

export async function getServerSession() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function requireSupabaseAuth() {
  const session = await getServerSession()
  
  if (!session) {
    return {
      authenticated: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    }
  }
  
  return {
    authenticated: true,
    userId: session.user.id,
    user: session.user,
  }
}

// ============================================
// ROLE-BASED ACCESS CONTROL
// ============================================

export function requireRole(session: Session, allowedRoles: Session['role'][]) {
  if (!allowedRoles.includes(session.role)) {
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 }),
    }
  }
  
  return { authorized: true }
}

// ============================================
// PASSWORD HASHING
// ============================================

const SALT_ROUNDS = 12

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// ============================================
// PASSWORD VALIDATION
// ============================================

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (password.length < 12) {
    errors.push('Password must be at least 12 characters long')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[^a-zA-Z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  // Check common passwords
  const commonPasswords = ['password123', 'admin123', 'qwerty123', '12345678']
  if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
    errors.push('Password is too common')
  }
  
  return {
    valid: errors.length === 0,
    errors,
  }
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ============================================
// SECURITY MIDDLEWARE
// ============================================

// Rate limiting storage (in production use Redis)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

// Blocked IPs (in production use Redis/DB)
const blockedIPs = new Set<string>()

// Suspicious patterns
const suspiciousPatterns = [
  /(\.\.)|(\.\/)/gi, // Path traversal
  /(union|select|insert|update|delete|drop|create|alter)/gi, // SQL injection
  /<script|javascript:|onerror=|onload=/gi, // XSS
  /(\$\{|\{\{)/gi, // Template injection
]

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // ============================================
  // 1. SECURITY HEADERS
  // ============================================
  
  const headers = new Headers(response.headers)
  
  // Strict Transport Security
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  
  // Content Security Policy
  headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://*.supabase.co https://api.anthropic.com https://graph.facebook.com https://graph.instagram.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join('; ')
  )
  
  // Prevent clickjacking
  headers.set('X-Frame-Options', 'DENY')
  
  // Prevent MIME sniffing
  headers.set('X-Content-Type-Options', 'nosniff')
  
  // XSS Protection
  headers.set('X-XSS-Protection', '1; mode=block')
  
  // Referrer Policy
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Permissions Policy
  headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )
  
  // Remove server header
  headers.delete('X-Powered-By')
  
  // ============================================
  // 2. IP BLOCKING
  // ============================================
  
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  
  if (blockedIPs.has(ip)) {
    return new NextResponse('Access Denied', { status: 403 })
  }
  
  // ============================================
  // 3. RATE LIMITING
  // ============================================
  
  const rateLimitKey = `${ip}-${request.nextUrl.pathname}`
  const now = Date.now()
  const windowMs = 60000 // 1 minute
  const maxRequests = request.nextUrl.pathname.startsWith('/api') ? 30 : 100
  
  const record = rateLimit.get(rateLimitKey)
  
  if (record) {
    if (now < record.resetTime) {
      if (record.count >= maxRequests) {
        // Too many requests
        headers.set('X-RateLimit-Limit', maxRequests.toString())
        headers.set('X-RateLimit-Remaining', '0')
        headers.set('X-RateLimit-Reset', new Date(record.resetTime).toISOString())
        
        return new NextResponse('Too Many Requests', { 
          status: 429,
          headers 
        })
      }
      record.count++
    } else {
      // Reset window
      record.count = 1
      record.resetTime = now + windowMs
    }
  } else {
    rateLimit.set(rateLimitKey, { count: 1, resetTime: now + windowMs })
  }
  
  // Clean old entries every 100 requests
  if (Math.random() < 0.01) {
    for (const [key, value] of rateLimit.entries()) {
      if (now > value.resetTime) {
        rateLimit.delete(key)
      }
    }
  }
  
  // ============================================
  // 4. INPUT VALIDATION
  // ============================================
  
  // Check URL for suspicious patterns
  const url = request.nextUrl.toString()
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(url)) {
      console.warn('⚠️ Suspicious URL pattern detected:', url, 'from IP:', ip)
      return new NextResponse('Bad Request', { status: 400 })
    }
  }
  
  // ============================================
  // 5. API ROUTES PROTECTION
  // ============================================
  
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Verify Content-Type for POST/PUT/PATCH
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      const contentType = request.headers.get('content-type')
      if (!contentType?.includes('application/json')) {
        return new NextResponse('Invalid Content-Type', { status: 400 })
      }
    }
    
    /* 
    We allow Supabase to handle its own auth via sessions/cookies in individual API routes.
    Global Bearer requirements here conflict with standard browser-based fetch calls.
    */
  }
  
  // ============================================
  // 6. CORS HEADERS (for API routes only)
  // ============================================
  
  if (request.nextUrl.pathname.startsWith('/api')) {
    const origin = request.headers.get('origin')
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      'https://launchos.com',
      'https://www.launchos.com',
    ]
    
    if (origin && allowedOrigins.includes(origin)) {
      headers.set('Access-Control-Allow-Origin', origin)
      headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
      headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      headers.set('Access-Control-Max-Age', '86400')
    }
    
    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204, headers })
    }
  }
  
  return NextResponse.next({ headers })
}

// ============================================
// MIDDLEWARE CONFIG
// ============================================

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

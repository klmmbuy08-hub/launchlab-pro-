// ============================================
// ENCRYPTION UTILITIES
// ============================================

import crypto from 'crypto'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex')
const ALGORITHM = 'aes-256-gcm'

// ============================================
// ENCRYPT SENSITIVE DATA
// ============================================

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16)
  const key = Buffer.from(ENCRYPTION_KEY, 'hex')
  
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  const authTag = cipher.getAuthTag()
  
  // Return: iv:authTag:encrypted
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`
}

// ============================================
// DECRYPT SENSITIVE DATA
// ============================================

export function decrypt(encryptedData: string): string | null {
  try {
    const [ivHex, authTagHex, encrypted] = encryptedData.split(':')
    
    const iv = Buffer.from(ivHex, 'hex')
    const authTag = Buffer.from(authTagHex, 'hex')
    const key = Buffer.from(ENCRYPTION_KEY, 'hex')
    
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
    decipher.setAuthTag(authTag)
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    
    return decrypted
  } catch {
    return null
  }
}

// ============================================
// HASH DATA (one-way)
// ============================================

export function hashData(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex')
}

// ============================================
// SECURE RANDOM TOKENS
// ============================================

export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex')
}

// ============================================
// API KEY GENERATION
// ============================================

export function generateAPIKey(): string {
  const prefix = 'lch' // LaunchOS prefix
  const key = crypto.randomBytes(24).toString('base64url')
  return `${prefix}_${key}`
}

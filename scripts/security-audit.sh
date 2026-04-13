#!/bin/bash


# ============================================
# SECURITY AUDIT SCRIPT
# ============================================

echo "🛡️  Starting Security Audit..."

# 1. Dependency Audit
echo "📦 Checking dependencies for vulnerabilities..."
npm audit

# 2. Check for sensitive files
echo "🔍 Checking for accidental sensitive file exposure..."
if [ -d ".git" ]; then
    echo "✅ .git directory found (normal for dev)"
else
    echo "⚠️  .git directory not found"
fi

# 3. Check .env.local existence and content
if [ -f ".env.local" ]; then
    echo "✅ .env.local exists"
    # Basic check for keys (without printing them)
    for key in "JWT_SECRET" "ENCRYPTION_KEY" "CSRF_SECRET" "NEXT_PUBLIC_SUPABASE_URL"; do
        if grep -q "$key" .env.local; then
            echo "   ✅ $key is defined"
        else
            echo "   ❌ $key is MISSING"
        fi
    done
else
    echo "❌ .env.local is MISSING"
fi

# 4. Check for security middleware
if [ -f "middleware.ts" ]; then
    echo "✅ middleware.ts exists"
else
    echo "⚠️  middleware.ts is MISSING (Security layer might be bypassable)"
fi

echo "🏁 Security Audit Finished"

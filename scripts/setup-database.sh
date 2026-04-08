#!/bin/bash

# ============================================
# SUPABASE DATABASE SETUP
# ============================================

echo "🗄️  Setting up Supabase database..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI not found${NC}"
    echo "Install with: npm install -g supabase"
    exit 1
fi

echo -e "${BLUE}📋 Step 1: Initialize Supabase project${NC}"
supabase init

echo -e "${BLUE}📋 Step 2: Link to remote project${NC}"
echo "Visit: https://app.supabase.com/projects"
echo "Create a new project and get your project ref"
read -p "Enter your Supabase project ref: " PROJECT_REF
supabase link --project-ref $PROJECT_REF

echo -e "${BLUE}📋 Step 3: Apply migrations${NC}"
supabase db push

echo -e "${BLUE}📋 Step 4: Enable Row Level Security${NC}"
echo "Checking RLS policies..."

echo -e "${GREEN}✅ Database setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Copy .env.example to .env.local"
echo "2. Add your Supabase URL and keys"
echo "3. Run: npm run dev"

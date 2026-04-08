#!/bin/bash

# ============================================
# LAUNCHOS V2 - QUICK START
# ============================================

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════╗"
echo "║   LAUNCHOS V2 - QUICK START SETUP    ║"
echo "╚═══════════════════════════════════════╝"
echo -e "${NC}"

# Step 1: Check dependencies
echo -e "${YELLOW}📋 Step 1: Checking dependencies...${NC}"
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install from: https://nodejs.org"
    exit 1
fi
echo "✅ Node.js $(node --version)"

if ! command -v npm &> /dev/null; then
    echo "❌ npm not found"
    exit 1
fi
echo "✅ npm $(npm --version)"

# Step 2: Install packages
echo -e "\n${YELLOW}📦 Step 2: Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Step 3: Setup environment
echo -e "\n${YELLOW}🔐 Step 3: Setting up environment...${NC}"
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo -e "${GREEN}✅ Created .env.local${NC}"
    echo -e "${YELLOW}⚠️  Please edit .env.local with your API keys${NC}"
else
    echo "⚠️  .env.local already exists"
fi

# Step 4: Database info
echo -e "\n${YELLOW}🗄️  Step 4: Database setup${NC}"
echo "To setup database, run:"
echo "  ./scripts/setup-database.sh"

# Step 5: Ready
echo -e "\n${GREEN}🎉 Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your API keys"
echo "2. Run: ./scripts/setup-database.sh"
echo "3. Run: npm run dev"
echo "4. Visit: http://localhost:3000"
echo ""
echo "Need help? Check DEPLOYMENT_CHECKLIST.md"

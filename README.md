# 🚀 LaunchOS V2

**Business Intelligence Platform for Infoproductors & Coaches**

LaunchOS V2 is an all-in-one platform that consolidates your business data, automates content planning, manages ads with AI, and provides actionable insights—all in one place.

## ✨ Features

- 📊 **Main Dashboard** - Complete business overview at a glance
- 👥 **Audience Intelligence** - AI-powered follower analysis
- 📝 **Content Intelligence** - Revenue attribution per post
- 💰 **Business Metrics** - Cash tracking & projections
- 📅 **Smart Calendar** - 30-day AI content planning
- 🎯 **Competitor Analysis** - Deep competitive insights
- 🤖 **AI Ads Manager** - Automated campaign optimization
- 📈 **Analytics & Reports** - Professional monthly reports

## 🛠️ Tech Stack

- **Frontend:** Next.js 16+, React, TypeScript, Tailwind CSS v4
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **AI:** Anthropic Claude API
- **Integrations:** Instagram API, Meta Ads API

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone <your-repo>
cd launchos-v2

# 2. Run quick start script
./scripts/quick-start.sh

# 3. Setup environment variables
# Edit .env.local with your API keys

# 4. Setup database
./scripts/setup-database.sh

# 5. Start development server
npm run dev
```

Visit: http://localhost:3000

## 📋 Requirements

- Node.js 18+
- npm 9+
- Supabase account
- Anthropic API key
- Meta Developer account (for ads)

## 🔑 Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=

# Optional (for full features)
META_APP_ID=
META_ACCESS_TOKEN=
INSTAGRAM_CLIENT_ID=
```

## 📚 Documentation

- [Deployment Guide](DEPLOYMENT_CHECKLIST.md)
- [Database Schema](supabase/migrations/)
- [API Documentation](docs/API.md)

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Build test
npm run build

# Run tests
npm test
```

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Add environment variables in Vercel dashboard.

### Manual Deployment

```bash
# Build production
npm run build

# Start production server
npm start
```

## 💰 Pricing Tiers

- **Free**: 1 social account, basic features
- **Pro ($97/mo)**: 3 accounts, AI features, basic ads
- **Pro Plus ($197/mo)**: Full features, advanced ads
- **Agency ($397/mo)**: 10 accounts, white-label

## 🤝 Contributing

This is a commercial product. For feature requests or bug reports, please contact support.

## 📄 License

Proprietary - All rights reserved

## 🆘 Support

- Documentation: Check `/docs` folder
- Issues: Create GitHub issue
- Email: support@launchos.com

## 🎯 Roadmap

- [ ] Mobile app (iOS/Android)
- [ ] Google Ads integration
- [ ] TikTok Ads integration
- [ ] Email marketing automation
- [ ] CRM integration
- [ ] Public API

---

**Built with ❤️ for coaches and infoproductors**

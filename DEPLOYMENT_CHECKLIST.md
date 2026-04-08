# 🚀 LaunchOS V2 - Deployment Checklist

## Pre-Deployment

### 1. Environment Setup
- [ ] Node.js 18+ installed
- [ ] npm 9+ installed
- [ ] Git installed
- [ ] Supabase CLI installed (`npm install -g supabase`)

### 2. Create Accounts
- [ ] Supabase account created (https://supabase.com)
- [ ] Anthropic account created (https://console.anthropic.com)
- [ ] Meta Developer account created (https://developers.facebook.com)
- [ ] Vercel account created (https://vercel.com) - optional for deployment

### 3. Get API Keys
- [ ] Anthropic API key obtained
- [ ] Supabase project created
- [ ] Supabase URL copied
- [ ] Supabase anon key copied
- [ ] Supabase service role key copied
- [ ] Meta App ID created
- [ ] Meta App Secret obtained

## Local Development Setup

### Step 1: Clone & Install
```bash
git clone <your-repo>
cd launchos-v2
npm install
```

### Step 2: Environment Variables
```bash
cp .env.example .env.local
# Edit .env.local with your actual keys
```

### Step 3: Database Setup
```bash
# Initialize Supabase
./scripts/setup-database.sh

# Or manually:
supabase init
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

### Step 4: Seed Development Data
```bash
# Update supabase/seed.sql with your user UUID
# Then run:
supabase db reset --db-url YOUR_DATABASE_URL
```

### Step 5: Run Development Server
```bash
npm run dev
```
Visit: http://localhost:3000

## Testing

### Functional Tests
- [ ] Onboarding flow completes
- [ ] Instagram OAuth simulation works
- [ ] Dashboard loads with data
- [ ] Content analysis displays
- [ ] Calendar generation works
- [ ] Ads manager displays
- [ ] Analytics page renders
- [ ] All navigation works

### Integration Tests
- [ ] Supabase connection works
- [ ] RLS policies enforced
- [ ] Claude API calls succeed
- [ ] Data persists correctly

### Performance Tests
- [ ] Page load < 3s
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Works on Chrome, Firefox, Safari

## Production Deployment (Vercel)

### Step 1: Prepare Production Build
```bash
npm run build
npm start # Test production build locally
```

### Step 2: Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Step 3: Configure Production Database
- [ ] Production Supabase project created
- [ ] Migrations applied
- [ ] RLS policies verified
- [ ] Backup strategy configured

### Step 4: Post-Deployment
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Analytics setup (Vercel Analytics)
- [ ] Error tracking (Sentry) - optional
- [ ] Monitoring (Uptime Robot) - optional

## Security Checklist

- [ ] All API keys in environment variables
- [ ] No secrets in code
- [ ] RLS policies tested
- [ ] CORS configured correctly
- [ ] Rate limiting implemented
- [ ] Input validation on all forms

## Performance Optimization

- [ ] Images optimized (Next.js Image component)
- [ ] Code splitting configured
- [ ] Bundle size < 300KB
- [ ] Lighthouse score > 90

## Documentation

- [ ] README.md updated
- [ ] API documentation complete
- [ ] User guide created
- [ ] Troubleshooting guide written

## Post-Launch

- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Gather user feedback
- [ ] Plan iteration 1 features

## Common Issues & Solutions

### Database Connection Fails
```bash
# Check .env.local has correct Supabase URL
# Verify Supabase project is active
# Check RLS policies allow access
```

### Claude API Errors
```bash
# Verify ANTHROPIC_API_KEY is set
# Check API quota not exceeded
# Test with curl to verify key works
```

### Build Fails
```bash
# Clear cache
rm -rf .next
npm run build

# Check TypeScript errors
npm run type-check
```

### Instagram OAuth Not Working
```bash
# In development, OAuth is simulated
# For production, setup Meta App
# Configure redirect URLs
# Add Instagram Basic Display product
```

## Support

- GitHub Issues: <your-repo>/issues
- Email: support@launchos.com
- Documentation: /docs

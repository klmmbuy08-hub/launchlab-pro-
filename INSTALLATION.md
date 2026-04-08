# 🚀 LaunchOS V2 - Installation Guide

## System Requirements

### Required
- **Node.js**: 18.17.0 or higher
- **npm**: 9.6.7 or higher  
- **Operating System**: macOS, Linux, or Windows (with WSL2)
- **Disk Space**: 500MB minimum
- **Memory**: 4GB RAM minimum

### Recommended
- **Node.js**: 18.19.0+ (LTS)
- **npm**: 10.0.0+
- **Memory**: 8GB RAM
- **Git**: Latest version

---

## Quick Start

```bash
# 1. Verify requirements
node -v  # Should be v18.17.0+
npm -v   # Should be v9.6.7+

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Setup environment
cp .env.example .env.local
# Edit .env.local with your API keys

# 4. Start development
npm run dev

# Visit: http://localhost:3000
```

---

## Detailed Installation

### Step 1: Verify System Requirements

```bash
# Check Node.js version
node -v
# Output should be: v18.17.0 or higher

# Check npm version
npm -v
# Output should be: 9.6.7 or higher
```

**If versions are too old:**

```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js 18
nvm install 18
nvm use 18
nvm alias default 18

# Verify
node -v  # v18.x.x
```

### Step 2: Clone Repository

```bash
git clone <repository-url>
cd launchos-v2
```

### Step 3: Install Dependencies

```bash
# Option A: Standard npm (recommended)
npm install --legacy-peer-deps

# Option B: Using pnpm (faster)
npm install -g pnpm
pnpm install

# Option C: Using yarn
yarn install
```

**Why `--legacy-peer-deps`?**
- Some packages may have conflicting peer dependencies
- This flag resolves those conflicts safely for our use case

### Step 4: Configure Environment

```bash
# Copy environment template
cp .env.example .env.local

# Edit with your API keys
nano .env.local
# or use your favorite editor
```

**Required variables:**
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Claude API
ANTHROPIC_API_KEY=your_anthropic_key

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 5: Setup Database

```bash
# Option A: Supabase CLI (recommended)
npm install -g supabase
supabase db push

# Option B: Manual
# Visit your Supabase dashboard and run migrations manually
```

### Step 6: Verify Installation

```bash
# Type check
npm run type-check

# Build
npm run build

# Start dev server
npm run dev
```

---

## Running the Application

### Development Mode

```bash
npm run dev
```

- Runs on http://localhost:3000
- Auto-reloads on file changes
- Shows TypeScript errors in terminal

### Production Mode

```bash
npm run build
npm run start
```

- Optimized build
- Better performance
- Ready for deployment

---

## Troubleshooting

### Node.js Version Issues

**Error: "Node version does not meet requirements"**

```bash
# Check installed version
node -v

# Solution: Update Node.js
nvm install 18
nvm use 18
```

### npm Installation Issues

**Error: "peer dependency conflicts"**

```bash
# Solution 1: Use --legacy-peer-deps
npm install --legacy-peer-deps

# Solution 2: Clean install
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Error: "EACCES: permission denied" (macOS/Linux)**

```bash
# Fix npm permissions
sudo chown -R $USER /usr/local/lib/node_modules
npm install -g npm@latest
```

**Error: "Module not found" after install**

```bash
# Reinstall dependencies
rm -rf node_modules
npm install --legacy-peer-deps
```

### Database Connection

**Error: "Cannot connect to Supabase"**

Checklist:
- ✓ .env.local exists
- ✓ SUPABASE_URL is correct
- ✓ SUPABASE_ANON_KEY is correct
- ✓ Supabase project is active
- ✓ Internet connection works

```bash
# Test connection
curl https://your-supabase-url/rest/v1/
```

### Build Errors

**Error: "Type errors in build"**

```bash
# Check types
npm run type-check

# Clear cache and rebuild
rm -rf .next
npm run build
```

**Error: "Out of memory during build"**

```bash
# Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Port Already in Use

**Error: "Port 3000 already in use"**

```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### TypeScript Errors

**Error: "Cannot find module '@/*'"**

- Ensure tsconfig.json has correct paths
- Restart TypeScript server in IDE
- Run `npm run type-check`

---

## Platform-Specific Notes

### macOS

```bash
# Install Xcode Command Line Tools (if needed)
xcode-select --install

# Use Homebrew for package management
brew install node@18
```

### Windows

**Option 1: Native (easier)**
- Download Node.js from https://nodejs.org
- Run installer
- Restart terminal

**Option 2: WSL2 (recommended for development)**
1. Install WSL2: https://docs.microsoft.com/windows/wsl/install
2. Install Ubuntu from Microsoft Store
3. Follow Linux instructions below

### Linux (Debian/Ubuntu)

```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install build tools (if needed)
sudo apt-get install build-essential
```

---

## Environment Setup

### For Local Development

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_local_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_local_key
ANTHROPIC_API_KEY=your_dev_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### For Testing

```env
# .env.test
NEXT_PUBLIC_SUPABASE_URL=your_test_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_test_key
ANTHROPIC_API_KEY=your_test_key
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### For Production

See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

---

## Verification Checklist

After installation, verify:

- [ ] `node -v` shows v18.17.0+
- [ ] `npm -v` shows v9.6.7+
- [ ] `npm install` completes without errors
- [ ] `.env.local` file exists with API keys
- [ ] `npm run type-check` passes
- [ ] `npm run build` completes successfully
- [ ] `npm run dev` starts without errors
- [ ] http://localhost:3000 loads in browser
- [ ] No console errors in browser DevTools
- [ ] Can navigate between pages
- [ ] Database connection works
- [ ] API calls succeed (check Network tab)

---

## Next Steps

1. **Learn the Structure**
   - Read [README.md](README.md)
   - Explore `/app` directory
   - Review `/components` directory

2. **Setup Database**
   - Run migrations
   - Seed initial data (if needed)

3. **Configure APIs**
   - Instagram/TikTok API keys
   - Claude API key
   - Other services

4. **Customize**
   - Update branding
   - Configure for your use case
   - Add custom features

5. **Deploy**
   - Follow [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
   - Deploy to Vercel or your server

---

## Performance Tips

### Development
```bash
# Use faster package manager
npm install -g pnpm
pnpm install
pnpm dev
```

### Building
```bash
# Analyze bundle size
npm run build

# Monitor performance
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

### Runtime
- Enable caching in Supabase
- Optimize images
- Use code splitting
- Monitor Core Web Vitals

---

## Getting Help

### Before Creating Issue

1. Check this guide
2. Search existing GitHub issues
3. Check [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
4. Review [README.md](README.md)

### Create Issue with

```
System Info:
- OS: [macOS/Linux/Windows]
- Node: [output of `node -v`]
- npm: [output of `npm -v`]

Error:
[Full error message/output]

Steps to Reproduce:
1. ...
2. ...
3. ...

Expected:
[What should happen]

Actual:
[What actually happens]
```

---

## Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run lint         # Check code quality
npm run type-check   # TypeScript check
npm run test         # Run tests

# Building
npm run build        # Build for production
npm start            # Start production server

# Database (if using Supabase)
npm run db:push      # Push migrations
npm run db:reset     # Reset database
npm run db:migrate   # Run migrations

# Cleanup
rm -rf node_modules  # Remove dependencies
rm -rf .next         # Remove build cache
npm cache clean --force  # Clear npm cache
```

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Claude API Documentation](https://claude.ai/docs)

---

**Last Updated**: April 2026
**Status**: Production Ready
**Support**: Create issue on GitHub or contact support

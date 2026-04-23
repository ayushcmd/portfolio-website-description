# Setup & Deployment

This document explains how to run this project locally, what environment variables are required, and how the Vercel deployment works.

---

## Prerequisites

Before you start, make sure you have these installed:

- **Node.js** — version 18 or higher. Download from [nodejs.org](https://nodejs.org)
- **npm** — comes with Node.js automatically
- **Git** — for cloning the repository

To check your versions:
```bash
node --version    # should be v18.x or higher
npm --version
git --version
```

---

## Local Setup (Step by Step)

### 1. Clone the Repository

```bash
git clone https://github.com/ayushcmd/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

This reads `package.json` and downloads all required packages into a `node_modules/` folder.

### 3. Create Environment Variables File

Create a file named `.env.local` at the root of the project (same level as `package.json`):

```bash
# Windows (PowerShell)
New-Item .env.local

# Mac/Linux
touch .env.local
```

Then open `.env.local` and add the variables listed in the next section.

### 4. Start the Development Server

```bash
npm run dev
```

Open your browser and go to: **http://localhost:3000**

Hot reload is enabled — any file change will automatically refresh the browser.

---

## Environment Variables

The `.env.local` file must contain these variables. **Never commit this file to Git** (it's already in `.gitignore`).

```env
# ── Groq API (powers KIRO AI chatbot) ──────────────────────────────────────
# Get from: https://console.groq.com → API Keys
GROQ_API_KEY=your_groq_api_key_here

# ── Upstash Redis (visitor counter + Lounge messages) ──────────────────────
# Get from: https://console.upstash.com → Create Database → REST API tab
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_rest_token_here

# ── Giphy API (GIF search in Visitor Lounge) ───────────────────────────────
# Get from: https://developers.giphy.com → Create App
GIPHY_API_KEY=your_giphy_api_key_here

# ── Analytics: Country breakdown (manually maintained) ────────────────────
# Format: CountryName:percentage,CountryName:percentage
# Update this periodically from your Google Analytics or Upstash data
ANALYTICS_COUNTRIES=India:48,United States of America:14,Bangladesh:3

# ── Analytics: OS breakdown (manually maintained) ─────────────────────────
# Format: OSName:percentage,OSName:percentage
ANALYTICS_OS=Windows:63,Mac:17,Android:10
```

---

## How to Get Each API Key

### Groq API Key (for KIRO chatbot)
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up or log in
3. Navigate to **API Keys** → **Create API Key**
4. Copy the key (starts with `gsk_`)
5. Free tier gives generous limits — more than enough for a portfolio

### Upstash Redis (for analytics + Lounge)
1. Go to [console.upstash.com](https://console.upstash.com)
2. Sign up and create a new **Redis** database
3. Choose the closest region to your Vercel deployment
4. Once created, go to the database page → **REST API** tab
5. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
6. Free tier: 10,000 commands/day — sufficient for a portfolio

### Giphy API Key (for GIF search)
1. Go to [developers.giphy.com](https://developers.giphy.com)
2. Log in and click **Create App**
3. Choose **API** (not SDK)
4. Copy the API Key shown on the dashboard
5. Free tier: 42 requests/hour — enough for casual Lounge usage

---

## Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production (outputs to .next/)
npm run build

# Start production server (after building)
npm start

# Check for TypeScript type errors
npx tsc --noEmit

# Run ESLint
npm run lint
```

---

## Deployment on Vercel

The production site deploys automatically to Vercel on every `git push` to the `main` branch.

### Initial Setup (One-Time)

1. Go to [vercel.com](https://vercel.com) and log in with GitHub
2. Click **Add New Project**
3. Select the `portfolio` repository
4. Framework will be detected as **Next.js** automatically
5. Click **Deploy**

### Add Environment Variables in Vercel

After the first deploy (which may fail without the env vars), add the variables:

1. Go to your project on Vercel dashboard
2. **Settings** → **Environment Variables**
3. Add each variable from the `.env.local` list above
4. Set them for **Production** (and optionally Preview + Development)
5. **Redeploy** after adding all variables

### Custom Domain

The site uses `ayushcmd.me` as the custom domain. This is configured via a CNAME record:

```
Host:  @  (or ayushcmd.me)
Type:  CNAME
Value: cname.vercel-dns.com
```

This record lives in your domain registrar's DNS settings. Vercel auto-issues and renews an HTTPS certificate.

---

## Build Output

```
npm run build

Output:
.next/
├── server/      → Server-side rendered pages
├── static/      → Static assets (JS, CSS, images)
└── cache/       → Build cache for faster rebuilds
```

**Build command:** `npm run build`  
**Start command:** `npm start`  
**Node version:** 18.x (managed by Vercel)

---

## Deployment Flow (How It Works)

```
1. You write code locally
       ↓
2. git push origin main
       ↓
3. GitHub receives the push
       ↓
4. GitHub sends a webhook to Vercel
       ↓
5. Vercel pulls the latest code
       ↓
6. Vercel runs: npm install → npm run build
       ↓
7. Next.js compiles TypeScript, bundles JS/CSS, optimizes images
       ↓
8. Vercel deploys the built output to their global CDN
       ↓
9. ayushcmd.me is updated live (usually in 30–60 seconds)
```

---

## Runtime Architecture on Vercel

Vercel runs two types of functions for this project:

**Serverless Functions (Node.js)**  
Standard API routes that run in a Node.js environment on demand:
- `/api/analytics`
- `/api/track`
- `/api/visitors`
- `/api/lounge/*` routes

These spin up in ~100–300ms on cold start, then stay warm for subsequent requests.

**Edge Functions**  
Faster functions that run on Vercel's edge network (closer to the user, near-zero cold start):
- `/api/kiro` — runs at the nearest edge location to the visitor

**Static Pages**  
Some pages with no dynamic data are pre-built at deploy time and served instantly from CDN:
- Pages that don't fetch live data render as static HTML + JS

---

## Common Issues

**Problem:** `Cannot find module 'three'` during build  
**Fix:** Make sure `transpilePackages: ['three', '@react-three/fiber', '@react-three/drei']` is in `next.config.js`

**Problem:** Redis connection errors  
**Fix:** Double-check `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set correctly in your environment. The variable names must match exactly (including `REST`).

**Problem:** KIRO returns "API key not configured"  
**Fix:** `GROQ_API_KEY` is missing from your environment variables.

**Problem:** GIF search not working  
**Fix:** `GIPHY_API_KEY` is missing or invalid.

**Problem:** Port 3000 already in use  
**Fix:** `npm run dev -- --port 3001` (runs on port 3001 instead)

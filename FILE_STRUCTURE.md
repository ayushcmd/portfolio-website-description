# File Structure

This document walks through every folder and file in the project and explains what it does.

---

## Top-Level Overview

```
portfolio/
│
├── app/                → All pages and backend API routes
├── components/         → Reusable UI building blocks
├── lib/                → Shared data, types, and helper functions
├── public/             → Static files served directly (images, PDF, etc.)
│
├── next.config.js      → Next.js configuration
├── tailwind.config.ts  → TailwindCSS theme customization
├── tsconfig.json       → TypeScript compiler settings
├── postcss.config.js   → CSS processing pipeline
├── package.json        → Project dependencies and scripts
├── .gitignore          → Files Git should not track
└── CNAME               → Custom domain record (ayushcmd.me)
```

---

## `app/` — The Heart of the Project

Next.js uses a convention called the **App Router**. Every folder inside `app/` that contains a `page.tsx` file becomes a URL route automatically.

```
app/
│
├── layout.tsx          → Root layout — wraps EVERY page
├── page.tsx            → The home page (/) — 60KB, main content
├── globals.css         → Global CSS styles applied everywhere
├── metadata.ts         → Basic SEO title and description
├── ClientWrapper.tsx   → A small helper to mark something as client-only
│
├── about/
│   └── page.tsx        → /about page
│
├── credentials/
│   └── page.tsx        → /credentials page (certificates, awards)
│
├── gallery/
│   └── page.tsx        → /gallery page (photo lightbox)
│
├── kiro/
│   └── page.tsx        → /kiro page (KIRO AI chatbot interface)
│
├── projects/
│   └── page.tsx        → /projects page (all projects)
│
├── skills/
│   └── page.tsx        → /skills page (tech stack breakdown)
│
├── spectrum/
│   └── page.tsx        → /spectrum page (server health dashboard)
│
└── api/                → Backend API endpoints (explained below)
```

### `app/layout.tsx`

This is the most important file in the project. It wraps **every single page** — meaning anything you put here appears on all pages. It:

- Sets the HTML `<html>` and `<body>` tags
- Loads the Comfortaa font
- Injects Google Analytics tracking scripts
- Mounts the persistent 3D background (so it never reloads between pages)
- Adds the global GlassCursor, Navbar, and Footer
- Wraps everything in ThemeProvider (dark/light mode) and LenisProvider (smooth scroll)
- Wraps page content in PageTransition (route animations)

### `app/page.tsx` (60KB)

The home page. This is the largest file in the project because it contains multiple sections:
- Hero section with animated introduction
- Featured projects grid
- Tech stack showcase
- About/intro summary
- Visitor Lounge (the real-time chat room)
- Enquiry/contact section

### `app/globals.css`

Global CSS that applies to the whole site. Contains:
- CSS custom properties (variables) for colors and spacing
- Base resets
- Custom scrollbar styling
- Keyframe animations that are used across components

---

## `app/api/` — Backend API Routes

Next.js allows you to create API endpoints inside the same project. Each folder here becomes a URL like `/api/folder-name`.

```
app/api/
│
├── analytics/
│   └── route.ts        → GET /api/analytics
│
├── gallery/
│   └── route.ts        → GET /api/gallery
│
├── kiro/
│   └── route.ts        → POST /api/kiro (AI chatbot)
│
├── spectrum/
│   └── route.ts        → GET /api/spectrum (server health)
│
├── track/
│   └── route.ts        → POST /api/track (visitor IP logging)
│
├── visitors/
│   └── route.ts        → GET /api/visitors (visitor data)
│
└── lounge/
    ├── send/
    │   └── route.ts    → POST /api/lounge/send
    ├── stream/
    │   └── route.ts    → GET /api/lounge/stream (SSE)
    ├── message/
    │   └── route.ts    → GET /api/lounge/message (history)
    ├── poll/
    │   └── route.ts    → GET/POST /api/lounge/poll
    ├── react/
    │   └── route.ts    → POST /api/lounge/react (emoji reactions)
    ├── typing/
    │   └── route.ts    → POST /api/lounge/typing (typing indicator)
    ├── gif-search/
    │   └── route.ts    → GET /api/lounge/gif-search (Giphy)
    └── delete/
        └── route.ts    → DELETE /api/lounge/delete
```

See `PAGES_AND_ROUTES.md` for detailed explanation of each API route.

---

## `components/` — UI Building Blocks

All reusable React components live here. A component is a self-contained piece of UI that can be used in multiple pages.

```
components/
│
├── 🎨 Visual & Animation
│   ├── FluidRippleBg.tsx      → Animated WebGL ripple/wave background
│   ├── Globe3D.tsx            → Interactive 3D rotating globe (Three.js)
│   ├── FloatingIcons.tsx      → Floating tech icons animation
│   ├── GlassCursor.tsx        → Custom cursor with glassmorphism effect
│   ├── ParticleField.tsx      → Particle system background
│   ├── NightModeOverlay.tsx   → Visual overlay effects for dark mode
│   └── SolarSystemBgClient.tsx → Lazy-loaded wrapper for the 3D background
│
├── 🧩 Layout & Navigation
│   ├── Navbar.tsx             → Top navigation bar (14KB)
│   ├── Footer.tsx             → Footer with socials and links (18KB)
│   └── PageTransition.tsx     → Animates content when switching routes
│
├── 📊 Content Sections
│   ├── ProjectCard.tsx        → Card component for displaying a single project
│   ├── CredentialCard.tsx     → Card for a certificate or achievement
│   ├── GallerySection.tsx     → Photo grid with lightbox viewer
│   ├── EnquirySection.tsx     → Contact form connected to email API
│   └── VisitorLounge.tsx      → Real-time visitor chat room (72KB)
│
├── 🔧 Providers & Wrappers
│   ├── ThemeProvider.tsx      → Dark/light mode context (298 bytes — tiny)
│   ├── LenisProvider.tsx      → Initializes smooth scrolling (538 bytes)
│   └── SolarSystemBgClient.tsx → Loads 3D background only on client side
│
└── 🎬 Special Components
    ├── SplashScreen.tsx       → Loading animation shown on first visit
    ├── ResumeModal.tsx        → Modal popup for viewing resume PDF
    └── LiquidButton.tsx       → Animated CTA button with liquid fill effect
```

See `COMPONENTS.md` for detailed breakdown of each component.

---

## `lib/` — Shared Data and Utilities

```
lib/
├── constants.ts    → All static data: projects list, skills list, social links
├── types.ts        → TypeScript type definitions
└── utils.ts        → Small helper functions
```

### `lib/constants.ts` (12KB)

This is the **single source of truth** for all content on the site. Instead of hardcoding project names in multiple places, they're defined once here and imported wherever needed.

Contains:
- `PROJECTS` — array of all 8 projects with title, description, tech stack, GitHub link, live link
- `SKILLS` — categorized tech skills (frontend, backend, ML, tools)
- `SOCIALS` — social media links (GitHub, LinkedIn, Kaggle, etc.)

### `lib/types.ts`

TypeScript interfaces so every component agrees on the "shape" of data. Key types:

```typescript
type Project = {
  id: number
  title: string
  description: string
  tech: string[]
  scope: string
  github: string
  live: string
  image?: string
  status?: 'coming-soon' | 'wip'
}

type ProjectStatus = 'coming-soon'
```

### `lib/utils.ts`

Small utility functions shared across components. Primarily the `cn()` helper — a function that combines `clsx` and `tailwind-merge` to cleanly build className strings.

---

## `public/` — Static Files

Anything in `public/` is served directly at the root URL. For example, `public/resume.pdf` is accessible at `ayushcmd.me/resume.pdf`.

```
public/
├── Ayush_Raj_Resume.pdf   → Downloadable resume
├── iit-patna.jpg          → IIT Patna campus image
├── iitp.jpg               → IITP logo/badge
├── india.jpg              → India background image
│
├── assets/                → Icon files and small graphics
├── certs/                 → Certificate images (used in /credentials)
├── gallery/               → Photos (used in /gallery)
└── previews/              → Project screenshot thumbnails (used in ProjectCard)
```

---

## Configuration Files

### `next.config.js`

```js
const nextConfig = {
  experimental: {},
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
}
```

`transpilePackages` tells Next.js to transform Three.js from its native CommonJS format into the ESM format that Next.js expects. Without this, Three.js would throw module errors.

### `tailwind.config.ts`

Extends Tailwind with custom colors and animations specific to this project. See `DESIGN_SYSTEM.md` for full details.

### `tsconfig.json`

Key settings:
- `"target": "ES2020"` — outputs modern JavaScript
- `"paths": { "@/*": ["./*"] }` — enables `import Foo from '@/components/Foo'` shorthand instead of long relative paths like `../../components/Foo`

### `postcss.config.js`

Standard setup — runs TailwindCSS and Autoprefixer (adds `-webkit-` vendor prefixes to CSS automatically).

---

## Notable File Sizes

| File | Size | Why it's large |
|------|------|---------------|
| `app/page.tsx` | 60KB | Contains the entire home page with multiple sections |
| `components/VisitorLounge.tsx` | 72KB | Full real-time chat with polls, GIFs, reactions, file attachments |
| `components/Footer.tsx` | 18KB | Extensive links, social grid, project previews in footer |
| `components/Navbar.tsx` | 14KB | Navigation with theme toggle, mobile menu, scroll behavior |
| `app/kiro/route.ts` | 6KB | Large system prompt embedded for the AI chatbot |
| `lib/constants.ts` | 12KB | All project and skill data |

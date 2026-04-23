<div align="center">

```
 █████╗ ██╗   ██╗██╗   ██╗███████╗██╗  ██╗    ██████╗  █████╗       ██╗
██╔══██╗╚██╗ ██╔╝██║   ██║██╔════╝██║  ██║    ██╔══██╗██╔══██╗      ██║
███████║ ╚████╔╝ ██║   ██║███████╗███████║    ███████╔╝███████║      ██║
██╔══██║  ╚██╔╝  ██║   ██║╚════██║██╔══██║    ██╔══██╗ ██╔══██║ ██   ██║
██║  ██║   ██║   ╚██████╔╝███████║██║  ██║    ██║  ██║ ██║  ██║ ╚█████╔╝
╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝  ╚═╝ ╚═╝  ╚═╝  ╚════╝
```

### Full architecture and technical breakdown of [ayushcmd.me](https://ayushcmd.me)

<br/>

![Next.js](https://img.shields.io/badge/Next.js_15-00e5ff?style=flat-square&logo=next.js&logoColor=000000)
![TypeScript](https://img.shields.io/badge/TypeScript-00e5ff?style=flat-square&logo=typescript&logoColor=000000)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-00e5ff?style=flat-square&logo=tailwindcss&logoColor=000000)
![Vercel](https://img.shields.io/badge/Vercel-00e5ff?style=flat-square&logo=vercel&logoColor=000000)
![Redis](https://img.shields.io/badge/Upstash_Redis-00e5ff?style=flat-square&logo=redis&logoColor=000000)

<br/>

[![Live Site](https://img.shields.io/badge/LIVE_SITE-ayushcmd.me-00e5ff?style=for-the-badge&logoColor=000000)](https://ayushcmd.me)
[![GitHub](https://img.shields.io/badge/GitHub-ayushcmd-00e5ff?style=for-the-badge&logo=github&logoColor=000000)](https://github.com/ayushcmd)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ayush08iitp-00e5ff?style=for-the-badge&logo=linkedin&logoColor=000000)](https://linkedin.com/in/ayush08iitp)

</div>

---

## 📁 Documentation Index

| # | File | What's Inside |
|---|------|--------------|
| 1 | [README.md](./README.md) | You're here — overview + quick nav |
| 2 | [TECH_STACK.md](./TECH_STACK.md) | Every dependency explained (beginner-friendly) |
| 3 | [FILE_STRUCTURE.md](./FILE_STRUCTURE.md) | Every folder and file with purpose |
| 4 | [PAGES_AND_ROUTES.md](./PAGES_AND_ROUTES.md) | All 8 pages + all 14 API routes |
| 5 | [COMPONENTS.md](./COMPONENTS.md) | All 20 React components explained |
| 6 | [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Colors, fonts, animations, tokens |
| 7 | [SETUP.md](./SETUP.md) | Local setup + env vars + Vercel deploy |

---

## 🌐 Live Site

```
https://ayushcmd.me
```

**Navbar:** `HOME` · `PROJECTS` · `CREDENTIALS` · `FORGE` · `PERSONA` · `KIRO`  
**Footer:** `© 2026 AYUSH RAJ` · `Visitors` · `Gallery` · `MONITOR` 

```
Building intelligent systems at the intersection of
full-stack development and machine learning.
```

> GitHub: [ayushcmd](https://github.com/ayushcmd) · LinkedIn: [ayush08iitp](https://linkedin.com/in/ayush08iitp) · Email: ayush_24a12res897@iitp.ac.in

---

## 🗺️ Site Structure at a Glance

```
ayushcmd.me/
│
├── /              → Home — hero, projects, about, experience, contact
├── /projects      → All 8 projects with tech + live links        [PROJECTS]
├── /credentials   → Certificates, awards, recognitions           [CREDENTIALS]
├── /skills        → Tech stack by category                       [FORGE]
├── /about         → Full bio, education, internship              [PERSONA]
├── /kiro          → KIRO — AI chatbot powered by Groq LLaMA      [KIRO]
├── /gallery       → Photo gallery with lightbox                  [footer]
├── /spectrum      → Live server health + portfolio stats         [Monitor]
│
└── /api/          → 14 backend API routes
```

---

## ⚡ What Makes This Portfolio Different

This is not a static page — it's a **full-stack web application** running on Vercel.

### KIRO — AI Chatbot
An AI assistant that knows Ayush's full background. Ask it anything:  
*"What projects has he built?" · "Should I hire him?" · "What's his internship experience?"*  
Powered by **Groq LLaMA 3.3 70B** on **Vercel Edge Runtime** — responds in under a second globally.

### Visitor Lounge
A real-time chat room embedded in the portfolio where visitors worldwide can:
- Send messages live via Server-Sent Events (SSE)
- React with emoji, reply to messages, attach GIFs (Giphy API)
- Vote on polls, attach files, see typing indicators
- See each other's country flags in real time

### Monitor `/spectrum`
Live server health dashboard — uptime, memory, CPU load, Node version, content stats. All from a real API endpoint, updated on every visit.

### Visitor Tracking
Every visit silently logs city + country (via `ipapi.co`) into Upstash Redis. Daily, weekly, monthly, and total counters update on every page load.

---

## 🛠️ Tech Stack (Quick Reference)

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS |
| Font | Comfortaa (Google Fonts) |
| Animation | Framer Motion + Lenis smooth scroll |
| 3D Background | Three.js (WebGL) |
| AI Chatbot | Groq API — LLaMA 3.3 70B |
| Real-time | Server-Sent Events (SSE) |
| Storage | Upstash Redis (serverless) |
| GIF Search | Giphy API |
| Geolocation | ipapi.co |
| Email | Resend API |
| Analytics | Vercel Analytics + Google Analytics |
| Hosting | Vercel (Edge + Serverless) |
| Domain | ayushcmd.me |

> Full breakdown with versions → [TECH_STACK.md](./TECH_STACK.md)

---

## 📦 Exact Repository Structure

```
portfolio/
│
├── app/
│   ├── layout.tsx                  ← Root layout (font, GA, navbar, footer, providers)
│   ├── page.tsx                    ← Home page (hero, projects, about, experience, contact)
│   ├── globals.css                 ← Global styles, CSS variables, keyframes
│   ├── metadata.ts                 ← SEO title + description
│   ├── ClientWrapper.tsx           ← Client-only component wrapper
│   │
│   ├── about/page.tsx              ← /about         [PERSONA]
│   ├── credentials/page.tsx        ← /credentials   [CREDENTIALS]
│   ├── gallery/page.tsx            ← /gallery       [footer]
│   ├── kiro/page.tsx               ← /kiro          [KIRO]
│   ├── projects/page.tsx           ← /projects      [PROJECTS]
│   ├── skills/page.tsx             ← /skills        [FORGE]
│   ├── spectrum/page.tsx           ← /spectrum      [Monitor]
│   │
│   └── api/
│       ├── analytics/route.ts      ← GET  — visitor stats (Redis counters)
│       ├── gallery/route.ts        ← GET  — gallery image data
│       ├── kiro/route.ts           ← POST — Groq AI chatbot (edge runtime)
│       ├── spectrum/route.ts       ← GET  — server health metrics
│       ├── track/route.ts          ← POST — IP geolocation + visit logging
│       ├── visitors/route.ts       ← GET  — tracked visitor records
│       └── lounge/
│           ├── send/route.ts       ← POST — send a message
│           ├── stream/route.ts     ← GET  — SSE real-time stream
│           ├── message/route.ts    ← GET  — load message history
│           ├── poll/route.ts       ← GET/POST — polls + voting
│           ├── react/route.ts      ← POST — emoji reactions
│           ├── typing/route.ts     ← POST — typing indicator
│           ├── gif-search/route.ts ← GET  — Giphy proxy
│           └── delete/route.ts     ← DELETE — remove a message
│
├── components/                     ← 20 reusable UI components
│   ├── CredentialCard.tsx          ← Certificate display card
│   ├── EnquirySection.tsx          ← Contact form (Resend email)
│   ├── FloatingIcons.tsx           ← Floating tech icons animation
│   ├── FluidRippleBg.tsx           ← WebGL ripple/wave background
│   ├── Footer.tsx                  ← Site footer with socials
│   ├── GallerySection.tsx          ← Photo grid + lightbox
│   ├── GlassCursor.tsx             ← Custom glassmorphism cursor
│   ├── Globe3D.tsx                 ← Interactive 3D globe (Three.js)
│   ├── LenisProvider.tsx           ← Smooth scroll initialization
│   ├── LiquidButton.tsx            ← CTA button with liquid fill effect
│   ├── Navbar.tsx                  ← Top navigation bar
│   ├── NightModeOverlay.tsx        ← Dark mode visual overlay
│   ├── PageTransition.tsx          ← Route transition animation
│   ├── ParticleField.tsx           ← Particle system background
│   ├── ProjectCard.tsx             ← Project showcase card
│   ├── ResumeModal.tsx             ← PDF resume viewer modal
│   ├── SolarSystemBgClient.tsx     ← Client-only 3D background wrapper
│   ├── SplashScreen.tsx            ← Initial loading animation
│   ├── ThemeProvider.tsx           ← Dark/light mode context
│   └── VisitorLounge.tsx           ← Real-time chat room (72KB)
│
├── lib/
│   ├── constants.ts                ← All static data: projects, skills, socials
│   ├── types.ts                    ← TypeScript type definitions
│   └── utils.ts                    ← Helper functions (cn utility)
│
├── public/
│   ├── assets/3d/                  ← 3D model assets for Three.js
│   ├── certs/                      ← Certificate images (/credentials page)
│   ├── gallery/                    ← Photo gallery images (/gallery page)
│   ├── previews/                   ← Project screenshot thumbnails
│   ├── Ayush_Raj_Resume.pdf        ← Downloadable resume
│   ├── iit-patna.jpg               ← IIT Patna campus image
│   ├── iitp.jpg                    ← IITP logo/badge
│   └── india.jpg                   ← India map (home page hover card)
│
├── next.config.js                  ← Next.js config (Three.js transpile)
├── tailwind.config.ts              ← Custom colors + animations
├── tsconfig.json                   ← TypeScript compiler config
├── postcss.config.js               ← CSS processing pipeline
├── package.json                    ← Dependencies + scripts
├── next-env.d.ts                   ← Next.js TypeScript declarations
├── .gitignore                      ← Git exclusions
└── CNAME                           ← Custom domain (ayushcmd.me)
```

> Full file-by-file explanation → [FILE_STRUCTURE.md](./FILE_STRUCTURE.md)

---

*This repo documents the architecture of [ayushcmd.me](https://ayushcmd.me) — built and maintained by [Ayush Raj](https://github.com/ayushcmd).*
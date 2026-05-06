# Portfolio — Public Overview

> Next.js 15 · TypeScript · TailwindCSS · Upstash Redis · Groq AI

A production-grade personal portfolio with real-time features, an AI chatbot, and custom visual effects — deployable at ₹0/month.

---

## Live Features

- **KIRO AI** — Portfolio assistant powered by Groq LLaMA 3.3 70B (Edge runtime)
- **Visitor Lounge** — Real-time multi-user chat via Server-Sent Events + Redis
- **3D Tech Globe** — Canvas2D globe with 24 orbiting tech icons (no Three.js)
- **Galaxy Background** — Particle field, spiral arms, shooting stars, ripple effects
- **Gallery** — Photo gallery with live like-counts
- **Spectrum** — Visitor analytics dashboard (countries, OS breakdown)
- **Credentials** — Certificate showcase with verification links

---

## Tech Stack

**Frontend** — Next.js 15, React 18, TypeScript, TailwindCSS, Framer Motion, Lenis

**Backend** — Next.js API Routes (Node.js + Edge runtimes), Server-Sent Events

**Data** — Upstash Redis (serverless HTTP — works on Vercel free tier)

**AI** — Groq API, LLaMA 3.3 70B Versatile

**Email** — Resend

**Analytics** — Vercel Analytics, Google Analytics

**Deployment** — Vercel (₹0/month on Hobby tier)

---

## Pages

| Route | Description |
|---|---|
| `/` | Hero, about, 3D globe, projects, skills, contact |
| `/about` | Extended bio and background |
| `/skills` | Interactive skills matrix |
| `/projects` | Full project grid |
| `/credentials` | Certificates and badges |
| `/gallery` | Photo gallery with live likes |
| `/spectrum` | Visitor analytics |
| `/kiro` | AI chatbot |

---

## Repository Structure

```
app/           Next.js pages + API routes
components/    16 shared UI components
lib/           constants.ts · types.ts · utils.ts
public/        Images and static assets
```

All personal data is replaced with `[YOUR_NAME]`, `[YOUR_UNIVERSITY]` placeholders — ready to customise and ship.

---

## Want the Full Source?

The complete source code (₹285) and architecture guide (₹95) are available at **ayushcmd.me**

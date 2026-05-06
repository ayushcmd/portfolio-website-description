# Features & Stack

> What this portfolio ships with, and the libraries behind each feature.

---

## Feature Summary

### KIRO AI Chatbot
An AI assistant pre-loaded with knowledge about the portfolio owner. Answers recruiter questions ("What's his stack?", "Is he open to work?") confidently and concisely. Built on Groq's LLaMA 3.3 70B with a structured system prompt — no fine-tuning, just good prompt engineering.

### Visitor Lounge
A real-time multi-user chat room embedded in the site. Visitors pick a Marvel/DC/Anime character username, send messages, react with emojis, vote on polls, and see who else is online — all live, all free. Backed by Upstash Redis + Server-Sent Events.

### 3D Tech Globe
An interactive spinning globe with 24 tech icons (React, Python, Next.js, etc.) orbiting its surface. Built entirely on Canvas2D with custom spherical coordinate math and orthographic projection. No Three.js, no WebGL.

### Visual Effects
- **Galaxy background** — star field, nebula orbs, spiral arms, shooting stars, cursor ripples
- **Solar system** — animated planetary orbits as a base layer
- **Glass cursor** — custom CSS cursor with cyan ring and backdrop blur
- **Page transitions** — Framer Motion fade + slide between routes

### Gallery with Live Likes
Photo gallery with per-image like counts stored in Redis. Counts update in real time across all visitors.

### Analytics Dashboard (`/spectrum`)
Visitor breakdown by country and operating system, tracked anonymously via IP headers. Displayed as a live dashboard — no Google Analytics required for this data.

---

## Libraries & Why Each Was Chosen

| Library | Version | Used For |
|---|---|---|
| `next` | 15.x | Framework — App Router, SSR, API routes |
| `framer-motion` | 11.x | Page transitions, scroll animations, stagger effects |
| `lenis` | 1.3.x | Smooth scroll with lerp interpolation |
| `@upstash/redis` | 1.37.x | Serverless Redis client (HTTP-based, Vercel-compatible) |
| `next-themes` | 0.3.x | Dark/light theme with localStorage persistence |
| `lucide-react` | 0.408.x | Icon library (used in Lounge, Navbar, Kiro page) |
| `react-world-flags` | 1.6.x | Country flag display in Visitor Lounge messages |
| `resend` | 6.x | Transactional email for the contact form |
| `web-push` | 3.6.x | Browser push notifications (optional VAPID feature) |
| `tailwind-merge` | 2.4.x | Safe Tailwind class merging without conflicts |
| `clsx` | 2.1.x | Conditional class string building |

**No UI component library** (no shadcn, no MUI, no Chakra) — every UI element is custom-built with Tailwind.

---

## What's NOT in This Stack

- ❌ No Three.js or WebGL
- ❌ No Prisma / Drizzle / SQL database
- ❌ No NextAuth / Clerk (no user accounts)
- ❌ No Pusher / Ably (SSE is sufficient)
- ❌ No separate backend server
- ❌ No paid infrastructure (₹0/month on free tiers)

---

*For the complete folder-by-folder breakdown, component decisions, Redis schema, and deployment steps — see the **Portfolio Architecture Guide** at ayushcmd.me*

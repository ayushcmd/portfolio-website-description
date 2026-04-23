# Tech Stack

This document explains every technology used in this portfolio — what it does, why it was chosen, and how it fits in.

---

## Framework: Next.js 15 (App Router)

**What it is:** Next.js is a framework built on top of React. It adds features that plain React doesn't have out of the box — things like server-side rendering, file-based routing, and built-in API routes.

**Version used:** `15.5.14`

**Why it's used here:**
- The App Router (introduced in Next.js 13+) allows each page to decide independently whether it renders on the server or the client
- API routes let us write backend logic inside the same project — no separate backend server needed for things like the analytics counter or email sending
- Built-in image optimization makes images load faster
- Automatic code splitting means each page only loads the JavaScript it needs

**Key config (`next.config.js`):**
```js
transpilePackages: ['three', '@react-three/fiber', '@react-three/drei']
```
This tells Next.js to process Three.js (a 3D library) correctly since it uses an older module format that Next.js needs to transform.

---

## Language: TypeScript

**What it is:** TypeScript is JavaScript with type annotations. You declare what "shape" your data has, and the compiler catches mistakes before the code even runs.

**Why it's used here:**
- Catches bugs at development time — for example, if a component expects a `string` but receives a `number`, TypeScript warns you immediately
- Makes the codebase easier to navigate — you always know what data a function accepts and returns
- All custom types are defined in `lib/types.ts`

**Example from this project:**
```typescript
// lib/types.ts
export type Project = {
  id: number
  title: string
  description: string
  tech: string[]
  scope: string
  github: string
  live: string
  image?: string                          // optional field
  status?: 'coming-soon' | 'wip'         // only these two values allowed
}
```

---

## Styling: TailwindCSS

**What it is:** A CSS framework where instead of writing CSS files, you apply small utility classes directly in your HTML/JSX. `className="text-lg font-bold text-cyan-400"` is all you need.

**Version:** `3.4.7`

**Why it's used here:**
- Extremely fast to build with — no context switching between JSX and CSS files
- The final CSS bundle only includes classes that are actually used (dead code elimination)
- Custom colors and animations are defined in `tailwind.config.ts`

**Custom additions in this project:**
```typescript
colors: {
  cyan: { DEFAULT: '#00d9ff' },  // primary accent color (bright cyan)
  saffron: '#f59e0b',            // Indian flag orange, used for cultural accents
  background: { dark: '#0a0a0a' }
}
```

---

## Font: Comfortaa (Google Fonts)

**What it is:** A rounded, geometric display font loaded from Google Fonts via Next.js's built-in `next/font/google` system.

**Why:** It gives the portfolio a clean, modern, slightly warm feel compared to standard system fonts. Next.js loads it efficiently — no layout shift, no external request delay.

**Code reference:** `app/layout.tsx`
```typescript
import { Comfortaa } from 'next/font/google'
const comfortaa = Comfortaa({ subsets: ['latin'], weight: ['400', '700'] })
```

For code/numbers, **JetBrains Mono** is used as a secondary monospace font.

---

## Animation: Framer Motion

**What it is:** A React animation library that makes it easy to animate components — fading in, sliding, scaling, etc. It uses the GPU (via CSS transforms) so animations are smooth even on slower devices.

**Version:** `11.18.2`

**How it's used here:**
- Page transitions — when you navigate between routes, content fades/slides out and new content fades in
- Scroll-triggered animations — elements animate into view as you scroll down
- Hover effects on cards and buttons
- The `PageTransition.tsx` component wraps all page content and applies entry/exit animations

---

## Smooth Scrolling: Lenis

**What it is:** A JavaScript library that overrides the browser's native scroll behavior to make it feel smoother and more controlled — like the scrolling you see on high-end agency websites.

**Version:** `1.3.21`

**Why not native scroll?** Native browser scroll is "instant" — pixels jump frame by frame. Lenis adds momentum and easing, making the experience feel premium.

**Implementation:** `components/LenisProvider.tsx` wraps the entire app and initializes Lenis on mount.

---

## 3D Graphics: Three.js

**What it is:** A JavaScript library for rendering 3D graphics in the browser using WebGL (the browser's low-level graphics API).

**How it's used here:**
- The animated background that runs across all pages (`SolarSystemBgClient.tsx`)
- The interactive 3D globe in `Globe3D.tsx`
- The `FluidRippleBg.tsx` component uses WebGL canvas for the ripple animation

**Important note:** Three.js is a large library (~500KB). The background component is loaded client-side only (using Next.js's `dynamic` import with `ssr: false`) so it never blocks the initial page render.

---

## AI Chatbot: Groq API

**What it is:** Groq is an AI inference provider. They run large language models (like Meta's LLaMA) on specialized hardware (LPU chips) that makes responses extremely fast — much faster than OpenAI in terms of tokens per second.

**Model used:** `llama-3.3-70b-versatile`

**How it's used here:**
- Powers **KIRO** — the AI assistant on the `/kiro` page
- KIRO has a detailed system prompt embedded in the API route with Ayush's full background: education, projects, skills, goals, social handles
- When a visitor asks KIRO a question, the message is sent to the Groq API, which returns a response in seconds
- Runs on **Vercel Edge Runtime** — this means the function runs at the closest Vercel server to the visitor, reducing latency globally

---

## Real-time Layer: Server-Sent Events (SSE)

**What it is:** SSE is a browser technology where the server keeps a connection open and "pushes" data to the client as it becomes available. Think of it like a one-way live stream from server to browser.

**How it's used here:**
- The Visitor Lounge uses SSE to deliver new messages in real time
- When someone sends a message, all connected visitors receive it instantly without refreshing
- The `/api/lounge/stream` route maintains these persistent connections

**Why SSE over WebSockets?** SSE is simpler to implement on serverless platforms like Vercel and is perfectly suited for this use case (server → client only).

---

## Cache & Real-time Storage: Upstash Redis

**What it is:** Upstash is a serverless Redis provider. Redis is an in-memory database — it stores data in RAM, making reads and writes extremely fast. Upstash's version works over HTTP, which makes it compatible with serverless and edge functions (unlike traditional Redis which uses TCP).

**How it's used here:**
- Stores all Visitor Lounge messages (last 80 messages kept)
- Stores daily/weekly/monthly view counters for the analytics display
- Stores visitor IP + geolocation data (city, country, visit count)
- Publishes messages across SSE connections using Redis Pub/Sub

**Environment variables needed:**
```
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

---

## Email: Resend

**What it is:** Resend is a modern email API service. You call their API with a recipient, subject, and body, and they deliver the email.

**Version:** `resend@6.10.0`

**How it's used here:**
- The `EnquirySection.tsx` contact form sends messages via Resend
- When someone fills the contact form, it hits an API route which calls Resend's API and delivers the email to Ayush

---

## GIF Search: Giphy API

**What it is:** Giphy is the world's largest GIF library. Their API lets you search for GIFs programmatically.

**How it's used here:**
- Inside the Visitor Lounge, there's a GIF search button
- Visitors can search for GIFs and attach them to their messages
- The `/api/lounge/gif-search` route proxies the request to Giphy (keeping the API key server-side)

---

## Visitor Geolocation: ipapi.co

**What it is:** A free IP geolocation API. Given an IP address, it returns the city, country, and other location data.

**How it's used here:**
- The `/api/track` route (called on page load) resolves the visitor's IP address to their city and country
- This data is stored in Redis and used for the visitor analytics display (country breakdown chart)

---

## Icons: lucide-react

**What it is:** A library of clean, consistent SVG icons as React components.

**Version:** `0.408.0`

**Used throughout:** Navigation, buttons, the Visitor Lounge (send icon, reply icon, reaction icons, etc.), cards.

---

## Theme: next-themes

**What it is:** A small library that handles dark/light mode toggling in Next.js. It persists the user's preference and prevents the flash of wrong theme on page load.

**Version:** `0.3.0`

**Configuration:** Default theme is `dark`. Light mode is available but dark is the primary design.

---

## Flags: react-world-flags

**What it is:** A React component library for rendering country flag images using ISO country codes.

**Used in:** The Visitor Lounge — each message shows the sender's country flag next to their username.

---

## Analytics: Vercel Analytics + Google Analytics

**Vercel Analytics** (`@vercel/analytics`)  
Tracks Core Web Vitals automatically — LCP, FID, CLS. These are Google's performance metrics. Zero config required, just add `<Analytics />` to the layout.

**Google Analytics (GA4)**  
Standard Google Analytics tracking tag (`G-NGFT9CPX8Q`) is embedded directly in `app/layout.tsx` via Next.js `<Script>` tags. Tracks page views, sessions, traffic sources.

---

## Utilities

| Package | What it does |
|---------|-------------|
| `clsx` | Builds conditional className strings cleanly — `clsx('base', condition && 'extra')` |
| `tailwind-merge` | Merges Tailwind classes intelligently, resolving conflicts (e.g., `text-sm` + `text-lg` → keeps `text-lg`) |

---

## Full Dependency List

### Production (ships to users)

```json
{
  "@google-analytics/data": "^5.2.1",
  "@upstash/redis": "^1.37.0",
  "@vercel/analytics": "^2.0.1",
  "clsx": "^2.1.1",
  "framer-motion": "^11.18.2",
  "lenis": "^1.3.21",
  "lucide-react": "^0.408.0",
  "next": "15.5.14",
  "next-themes": "^0.3.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-world-flags": "^1.6.0",
  "resend": "^6.10.0",
  "tailwind-merge": "^2.4.0"
}
```

### Development (only used while building)

```json
{
  "@types/node": "^20",
  "@types/react": "^18",
  "@types/react-dom": "^18",
  "@types/react-world-flags": "^1.6.0",
  "@types/three": "^0.167.0",
  "autoprefixer": "^10.4.20",
  "postcss": "^8.4.40",
  "tailwindcss": "^3.4.7",
  "typescript": "^5"
}
```

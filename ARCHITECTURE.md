# Architecture Overview

> High-level breakdown of how this portfolio is built and why.

---

## System Design

```
Browser
  ├── 7 Pages (Next.js App Router, SSR)
  ├── 16 Shared Components
  └── 3 Canvas FX Engines (no WebGL/Three.js)
        │
        │ fetch / EventSource
        ▼
  Next.js API Routes (Vercel Serverless)
        │
        ├── Upstash Redis  ← chat, likes, analytics
        └── Groq API       ← KIRO AI chatbot
```

The entire backend is serverless — no Express server, no Docker, no VPS. Every API is a Next.js route handler deployed on Vercel.

---

## Key Architectural Decisions

**SSE over WebSockets** — The Visitor Lounge uses Server-Sent Events for real-time updates. SSE works natively on Vercel's free tier; WebSockets require a paid adapter (Pusher, Ably). Since the server only needs to push data to clients (not receive), SSE covers 100% of the use case at ₹0 cost.

**Redis over a database** — All dynamic data (chat, likes, analytics counters) maps perfectly to Redis data structures: List for chat history, Hash for like counts, String+TTL for presence indicators. No SQL schema needed.

**Vanilla Canvas2D over Three.js** — The 3D globe and particle effects are built on raw Canvas2D with custom 3D projection math. Avoids a ~600KB Three.js bundle while achieving visually identical results for these specific effects.

**Edge runtime for AI** — The KIRO chatbot route runs on Vercel's Edge runtime, executing at the CDN node nearest to the user for lower latency on the Groq API round-trip.

---

## Data Flow Summary

| Feature | Write | Read |
|---|---|---|
| Lounge chat | `POST /api/lounge/send` → Redis RPUSH | SSE stream polls Redis every 1.5s |
| AI chatbot | `POST /api/kiro` → Groq API | Response returned directly |
| Gallery likes | `POST /api/gallery/like` → Redis HINCRBY | `GET /api/gallery/likes` → Redis HGETALL |
| Analytics | `POST /api/track` → Redis HINCRBY | `GET /api/spectrum` → Redis HGETALL |

---

## Environment Variables Needed

```
UPSTASH_REDIS_REST_URL      # from upstash.com (free)
UPSTASH_REDIS_REST_TOKEN    # from upstash.com (free)
GROQ_API_KEY                # from console.groq.com (free)
LOUNGE_ADMIN_KEY            # any secret string you choose
```

No paid services required to run the full application.

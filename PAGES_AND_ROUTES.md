# Pages and API Routes

This document covers every URL in the portfolio — the pages visitors see and the backend API routes powering them.

---

## Navigation Structure

```
Navbar:   HOME  ·  PROJECTS  ·  CREDENTIALS  ·  FORGE  ·  PERSONA  ·  KIRO
Footer:   Visitors  ·  Gallery  ·  Monitor
```

The navbar labels (FORGE, PERSONA) are display names. The actual URLs are `/skills` and `/about`.

---

## Pages

### `/` — Home
**File:** `app/page.tsx` (60KB)

The main landing page. Contains all key sections in one scroll:

- **Hero** — "Hello! I'm Ayush Raj · Full-Stack & ML Developer" with animated role cycling (STUDENT / DEVELOPER), floating tech icons (React, Next.js, TypeScript, Python, Docker, Node.js, Tailwind, LangChain, FastAPI), and CTA buttons (Lounge, Resume & CV, Launch Pad)
- **Featured Projects** — 3 highlighted projects (FitoGlobe, Dollar Hegemony, India Banking Dashboard) with tech tags and links
- **About Me** — India hover card with location (25.59°N 85.14°E · GMT+5:30), short bio, and three pillars (Growth, Focus, Craft)
- **Experience** — Education timeline (IIT Patna, 2024–2028) + Internship (AuthBridge Technologies, Backend & API Design Intern, Dec 2025–Feb 2026)
- **Reach Out** — Workflow pipeline (IDEA → PLAN → AI HELP → CODE → REVIEW → TEST → LEARN) + contact links (Mail, GitHub, LinkedIn)

---

### `/projects` — Projects `[PROJECTS]`
**File:** `app/projects/page.tsx`

All 8 projects displayed via `ProjectCard.tsx`. Each card shows:
- Title, description, and scope
- Tech stack as pill tags
- GitHub repo and live demo links
- Status badge (`wip` or `coming-soon` if applicable)

**Projects listed:** CommodityChain, FitoGlobe, Dollar Hegemony, India Crime Analytics, India Banking Dashboard, AQI PowerBI Dashboard, SchemeRadar (coming soon), BugHunterAgent (coming soon)

---

### `/credentials` — Credentials `[CREDENTIALS]`
**File:** `app/credentials/page.tsx` (16KB)

Certificates, course completions, and recognitions. Each item rendered via `CredentialCard.tsx`. Certificate images stored in `public/certs/`.

---

### `/skills` — Forge `[FORGE]`
**File:** `app/skills/page.tsx` (11KB)

Tech stack broken down by category. The navbar label "FORGE" reflects the page's identity — it's where Ayush's technical toolkit is displayed.

Categories:
- Frontend (Next.js, React, TypeScript, TailwindCSS, Framer Motion...)
- Backend (FastAPI, Node.js, Express, Prisma, JWT...)
- Databases (PostgreSQL, MongoDB Atlas, Supabase, Redis, Upstash...)
- ML/AI (XGBoost, LSTM, LangChain, LangGraph, Groq, HuggingFace, MLflow...)
- Tools (Docker, Git, Vercel, Jupyter, Power BI, Postman...)

Data source: `lib/constants.ts`

---

### `/about` — Persona `[PERSONA]`
**File:** `app/about/page.tsx` (16KB)

Full personal and professional background. The navbar label "PERSONA" reflects that this is the identity/character page.

Contains:
- Full bio and background (from Raipur, Chhattisgarh)
- Education details (IIT Patna, BSc CSDA, CPI 8.7, 2024–2028)
- Internship at AuthBridge Technologies
- Coursework (DSA, Linear Algebra, Probability, DBMS, OS, OOP...)
- Interests (macro economics, financial markets, ML research, competitive programming — 200+ LeetCode problems)
- Career goals (DS/ML and full-stack internships, long-term: ML/full-stack engineer at a product company)

---

### `/kiro` — KIRO AI Chatbot `[KIRO]`
**File:** `app/kiro/page.tsx` (11KB)

An AI assistant interface embedded in the portfolio. KIRO is a chatbot that represents Ayush and can answer any visitor question about him.

**Example questions it handles:**
- "Tell me about Ayush"
- "What projects has he built?"
- "Should I hire him?"
- "What's his CPI / GPA?"
- "What internship experience does he have?"

Powered by **Groq API** (`llama-3.3-70b-versatile`). KIRO's full knowledge base (projects, education, internship, tech stack, social links, goals) is embedded in the server-side system prompt — never exposed to the browser.

Runs on **Vercel Edge Runtime** — responds in under a second globally.

---

### `/gallery` — Gallery `[footer]`
**File:** `app/gallery/page.tsx` (10KB)

Photo gallery with lightbox viewer. Accessible from the footer. Photos stored in `public/gallery/`. Click any photo to open full-screen with arrow navigation.

---

### `/spectrum` — Monitor `[footer → Monitor]`
**File:** `app/spectrum/page.tsx` (15KB)

Live server health dashboard. Accessible from the footer as "Monitor". Calls `/api/spectrum` on load and displays:

- Server status (LIVE / DOWN)
- Uptime in seconds
- Memory: heap used, heap total, RSS (MB), efficiency %
- CPU load averages (1 min, 5 min)
- Stack versions: Next.js, React, Node.js
- Environment (production/development)
- Content counts: projects (8), credentials (3), skills (30)
- SEO status flags
- Server response latency

Demonstrates that this portfolio is a real running application, not static HTML.

---

## API Routes

Next.js API routes are server-side functions that run on Vercel. They return data (JSON) rather than rendering pages.

---

### `GET /api/analytics`
**File:** `app/api/analytics/route.ts`

Returns visitor stats for the analytics display.

**Response:**
```json
{
  "total24h": "12",
  "activeNow": "87",
  "avgSession": "204",
  "countries": [{ "name": "India", "pct": 48 }, ...],
  "os": [{ "name": "Windows", "pct": 63 }, ...]
}
```

Increments daily/weekly/monthly/total counters in Upstash Redis on every call. Country and OS breakdown are read from environment variables.

---

### `POST /api/kiro` — Edge Function
**File:** `app/api/kiro/route.ts` (6KB)

The KIRO AI chatbot endpoint. Runs on Vercel Edge Runtime.

Receives conversation history → appends system prompt → calls Groq API → returns response text.

**Request:**
```json
{ "messages": [{ "role": "user", "content": "What projects has Ayush built?" }] }
```

**Response:**
```json
{ "content": "Ayush has built several deployed projects..." }
```

---

### `GET /api/spectrum`
**File:** `app/api/spectrum/route.ts`

Returns live server health metrics. Powers the `/spectrum` (Monitor) page.

```json
{
  "status": "LIVE",
  "uptime": 3842,
  "memory": { "heapUsed": 42, "heapTotal": 68, "efficiency": 61 },
  "load": { "avg1": "0.12", "avg5": "0.08" },
  "stack": { "next": "15.5.14", "react": "18.3.1", "node": "20.x" },
  "content": { "projects": 8, "credentials": 3, "skills": 30 }
}
```

---

### `POST /api/track`
**File:** `app/api/track/route.ts`

Called silently on every page load. Logs visitor data.

1. Reads IP from request headers
2. Calls `ipapi.co/{ip}/json/` for city + country
3. Stores `{ city, country, visit_count, last_seen }` in Redis per IP
4. Adds IP to a Redis set of all unique visitors

Visitors never see or interact with this.

---

### `GET /api/visitors`
**File:** `app/api/visitors/route.ts`

Returns list of tracked visitor records from Redis. Protected endpoint — requires authorization token.

---

### `GET /api/gallery`
**File:** `app/api/gallery/route.ts`

Returns gallery image data for the `/gallery` page.

---

## Visitor Lounge API Routes

8 routes under `/api/lounge/` form a complete real-time chat backend.

---

### `POST /api/lounge/send`
Sends a new message. Validates and sanitizes: `user` (max 24 chars), `text` (max 350 chars), `country` (2-letter code), optional `replyTo` and `file` (base64).

Saves to Redis list (max 80 messages) + publishes to Redis Pub/Sub so all SSE clients get it instantly.

---

### `GET /api/lounge/stream`
The real-time connection. Uses **Server-Sent Events (SSE)** — the browser connects once and the server keeps pushing new messages as they arrive. No polling, no refresh needed.

---

### `GET /api/lounge/message`
Returns last 80 messages from Redis history. Called when Lounge first loads.

---

### `GET + POST /api/lounge/poll`
- `GET` → returns active poll + current vote counts
- `POST` → create new poll or record a vote

---

### `POST /api/lounge/react`
Adds/removes emoji reaction on a message. Per-user, per-emoji so no duplicate reactions.

---

### `POST /api/lounge/typing`
Broadcasts "user is typing" signal to all connected visitors. Powers the typing indicator.

---

### `GET /api/lounge/gif-search`
Proxies GIF search to Giphy API. API key stays server-side.

`GET /api/lounge/gif-search?q=hello` → returns Giphy results

---

### `DELETE /api/lounge/delete`
Removes a specific message. Protected — requires authorization.

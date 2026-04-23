# Pages and API Routes

This document covers every URL in the project — both the pages visitors see and the backend API routes that power the features.

---

## Pages (What Visitors See)

### `/` — Home Page
**File:** `app/page.tsx` (60KB)

The main page. It's intentionally content-rich because it's what most visitors land on. Sections include:

- **Hero** — Animated intro with name, title, and call-to-action buttons
- **Featured Projects** — Grid of project cards using the `ProjectCard` component
- **Tech Stack** — Visual display of skills and tools
- **About Snapshot** — Short bio linking to `/about`
- **Visitor Lounge** — The embedded real-time chat room (uses `VisitorLounge.tsx`)
- **Enquiry Section** — Contact form (uses `EnquirySection.tsx`)

---

### `/about` — About Page
**File:** `app/about/page.tsx` (16KB)

Covers Ayush's background in detail:
- Education at IIT Patna (BSc CSDA, 2024–2028, CPI 8.7)
- Personal background (from Raipur, Chhattisgarh)
- Academic coursework
- Interests (macro economics, financial markets, ML research)
- Career goals (DS/ML and full-stack internships)

---

### `/projects` — Projects Page
**File:** `app/projects/page.tsx`

Displays all projects from `lib/constants.ts`. Each project renders via `ProjectCard.tsx` and shows:
- Project title and description
- Tech stack tags
- Project scope (what problem it solves)
- Links to GitHub repo and live demo
- Status badge if the project is `wip` or `coming-soon`

---

### `/credentials` — Credentials Page
**File:** `app/credentials/page.tsx` (16KB)

Showcases certificates, course completions, and recognitions. Each item renders via `CredentialCard.tsx`. Certificate images are stored in `public/certs/`.

---

### `/gallery` — Gallery Page
**File:** `app/gallery/page.tsx` (10KB)

A photo gallery with a lightbox viewer. Uses `GallerySection.tsx`. Photos are stored in `public/gallery/`. Clicking a photo opens it full-screen with navigation.

---

### `/skills` — Skills Page
**File:** `app/skills/page.tsx` (11KB)

A categorized breakdown of the full tech stack. Categories include:
- Frontend
- Backend
- Databases
- ML/AI tools
- Developer tools

Data comes from `lib/constants.ts`.

---

### `/spectrum` — Server Health Dashboard
**File:** `app/spectrum/page.tsx` (15KB)

A live dashboard that displays real-time server and portfolio metrics. It calls `/api/spectrum` to fetch:
- Server uptime
- Memory usage (heap used, heap total, RSS)
- CPU load averages (1min, 5min)
- Node.js version
- Current environment (production/development)
- Portfolio content count (projects, credentials, skills)
- SEO status flags

This page is useful to demonstrate that the portfolio is a real running application, not just static HTML.

---

### `/kiro` — KIRO AI Chatbot
**File:** `app/kiro/page.tsx` (11KB)

An interactive AI assistant interface. The chatbot is named KIRO. Visitors can ask it anything about Ayush:
- "Tell me about Ayush"
- "What projects has he built?"
- "Should I hire him?"
- "What's his tech stack?"

KIRO responds in a confident, concise manner. It knows Ayush's full background because that information is embedded in the system prompt in the API route. See the API routes section below for implementation details.

---

## API Routes (Backend Endpoints)

These are server-side functions that run on Vercel. They're not pages — they return data (usually JSON) to the browser or other parts of the application.

---

### `GET /api/analytics`
**File:** `app/api/analytics/route.ts`

Returns visitor stats for the analytics display on the site.

**What it returns:**
```json
{
  "total24h": "12",
  "activeNow": "87",
  "avgSession": "204",
  "countries": [
    { "name": "India", "pct": 48 },
    { "name": "United States of America", "pct": 14 }
  ],
  "os": [
    { "name": "Windows", "pct": 63 },
    { "name": "Mac", "pct": 17 }
  ]
}
```

**How it works:**
1. Increments daily, weekly, monthly, and total view counters in Upstash Redis
2. Reads country and OS breakdown from environment variables (pre-filled manually)
3. Returns everything as JSON

**Note on field names:** The JSON field names (`total24h`, `activeNow`, `avgSession`) map to daily views, monthly views, and total views respectively — the names are slightly misleading in the raw response but the frontend labels them correctly.

---

### `POST /api/kiro`
**File:** `app/api/kiro/route.ts`

The AI chatbot endpoint.

**Runtime:** Edge (runs at the closest Vercel data center to the visitor — very fast)

**How it works:**
1. Receives the conversation history as an array of messages
2. Appends Ayush's full profile as a system prompt
3. Sends the full conversation to Groq's API (`llama-3.3-70b-versatile` model)
4. Returns the AI's response as plain text

**Request format:**
```json
{
  "messages": [
    { "role": "user", "content": "What projects has Ayush built?" }
  ]
}
```

**Response format:**
```json
{
  "content": "Ayush has built several deployed projects..."
}
```

---

### `GET /api/spectrum`
**File:** `app/api/spectrum/route.ts`

Returns live server health and portfolio metadata.

**What it returns:**
```json
{
  "status": "LIVE",
  "health": 100,
  "uptime": 3842,
  "memory": { "heapUsed": 42, "heapTotal": 68, "efficiency": 61 },
  "load": { "avg1": "0.12", "avg5": "0.08" },
  "stack": { "next": "15.5.14", "react": "18.3.1", "node": "20.11.0" },
  "content": { "projects": 8, "credentials": 3, "skills": 30 },
  "latency": { "server": 47 }
}
```

This data feeds the `/spectrum` dashboard page.

---

### `POST /api/track`
**File:** `app/api/track/route.ts`

Called automatically when a visitor loads the portfolio. Logs their visit data.

**How it works:**
1. Reads the visitor's IP address from the request headers
2. Calls `ipapi.co/{ip}/json/` to get their city and country
3. Stores `{ city, country, visit_count, last_seen }` in Redis under a key per IP
4. Adds the IP to a Redis set (`visitors:ips`) so all unique visitors can be listed

**This runs silently** — visitors don't see or interact with this.

---

### `GET /api/visitors`
**File:** `app/api/visitors/route.ts`

Returns the list of tracked visitor records from Redis. Access is protected — only authorized users can call this endpoint.

---

### `GET /api/gallery`
**File:** `app/api/gallery/route.ts`

Returns the list of gallery images to display on the `/gallery` page. Allows the gallery to be data-driven without hardcoding image filenames in the component.

---

## Visitor Lounge API Routes

All lounge routes live under `/api/lounge/`. Together they form a complete real-time chat backend.

---

### `POST /api/lounge/send`
**File:** `app/api/lounge/send/route.ts`

Sends a new message to the Visitor Lounge.

**Accepts:**
- `user` — display name (max 24 characters)
- `text` — message text (max 350 characters)
- `country` — 2-letter country code (e.g., "IN", "US")
- `replyTo` — optional: the message being replied to
- `file` — optional: base64-encoded file attachment

**What it does:**
1. Validates and sanitizes all inputs
2. Creates a message object with a unique ID and timestamp
3. Appends the message to a Redis list (max 80 messages kept)
4. Publishes the message to a Redis Pub/Sub channel so all connected SSE clients receive it instantly

---

### `GET /api/lounge/stream`
**File:** `app/api/lounge/stream/route.ts`

The real-time connection endpoint. Uses Server-Sent Events (SSE).

**How SSE works (simple explanation):**
- A normal API request is like a phone call where you ask a question and hang up
- SSE is like keeping the phone line open — the server can keep sending you updates without you asking again
- The browser connects once, and stays connected. Every new Lounge message gets pushed to the browser instantly

When a new message is published to Redis Pub/Sub, this route catches it and streams it to all connected clients.

---

### `GET /api/lounge/message`
**File:** `app/api/lounge/message/route.ts`

Returns the last 80 messages from the Lounge history (stored in Redis). Called when the Lounge first loads to show previous messages.

---

### `GET + POST /api/lounge/poll`
**File:** `app/api/lounge/poll/route.ts`

Handles polls in the Lounge.
- `GET` — returns the active poll (if any) with current vote counts
- `POST` — creates a new poll or records a vote

---

### `POST /api/lounge/react`
**File:** `app/api/lounge/react/route.ts`

Adds an emoji reaction to a specific message. Reactions are stored per-message, per-user so each person can only react once with each emoji.

---

### `POST /api/lounge/typing`
**File:** `app/api/lounge/typing/route.ts`

Broadcasts a "user is typing" signal to other connected visitors. This is how the typing indicator ("someone is typing...") works.

---

### `GET /api/lounge/gif-search`
**File:** `app/api/lounge/gif-search/route.ts`

Proxies a GIF search request to the Giphy API. The API key is kept server-side (never exposed to the browser).

**Request:** `GET /api/lounge/gif-search?q=hello`  
**Response:** Array of GIF objects from Giphy

---

### `DELETE /api/lounge/delete`
**File:** `app/api/lounge/delete/route.ts`

Removes a specific message from the Lounge. Protected endpoint — requires authorization.

---

## Navigation Flow

```
Home (/)
├── /about
├── /projects
├── /credentials
├── /gallery
├── /skills
├── /spectrum
└── /kiro

All pages share:
├── Navbar (top, fixed)
├── Footer (bottom)
├── 3D Background (always running)
├── GlassCursor (custom cursor)
└── PageTransition (route animation)
```

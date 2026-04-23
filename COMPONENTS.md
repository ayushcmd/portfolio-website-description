# Components

This document explains every component in the `components/` folder — what it does, how it works, and where it's used.

---

## What Is a Component?

In React, a component is a reusable piece of UI. Instead of copy-pasting the same navigation bar on every page, you write it once as `Navbar.tsx` and import it everywhere. Components can accept data ("props"), manage their own state, and handle interactions.

---

## Layout & Navigation

### `Navbar.tsx` (14KB)

The top navigation bar that appears on every page (mounted in `app/layout.tsx`).

**Features:**
- Logo/name linking to home
- Navigation links to all pages
- Theme toggle button (switches dark/light mode)
- Resume button (opens `ResumeModal`)
- Mobile-responsive hamburger menu for small screens
- Scroll-aware behavior (may change appearance on scroll)

**Lives outside `PageTransition`** so it stays visible and doesn't flicker during page changes.

---

### `Footer.tsx` (18KB)

The footer that appears at the bottom of every page.

**Contains:**
- Social media links (GitHub, LinkedIn, Kaggle, LeetCode, HackerRank, Email)
- Project links
- Built-with credits
- Copyright information

Large file size because it has a detailed layout with icons, links, and responsive grid.

---

### `PageTransition.tsx` (2KB)

Wraps all page content (but NOT Navbar or Footer) and animates the transition between routes.

**How it works:**
- Uses Framer Motion's `AnimatePresence` to detect when the page changes
- The outgoing page fades/slides out
- The incoming page fades/slides in
- Result: smooth transitions instead of jarring instant page swaps

---

## Providers & Wrappers

These components don't render visible UI — they provide functionality to everything inside them.

### `ThemeProvider.tsx` (298 bytes)

A tiny wrapper around `next-themes`. Provides dark/light mode context to all child components. Configured with `defaultTheme="dark"` and `enableSystem={false}` (ignores the user's OS preference).

---

### `LenisProvider.tsx` (538 bytes)

Initializes the Lenis smooth scroll library when the component mounts. Wraps the entire page content so smooth scrolling works everywhere.

---

### `SolarSystemBgClient.tsx` (206 bytes)

A wrapper that loads the Three.js background animation using Next.js's `dynamic` import with `{ ssr: false }`.

**Why this exists:** Three.js uses browser APIs (`window`, `canvas`) that don't exist on the server. If you try to import it normally, the server-side render crashes. This wrapper tells Next.js to only load it on the client side.

**Mounted in `layout.tsx` outside `PageTransition`** so the 3D background persists across all pages without reinitializing.

---

## Visual & Animation Components

### `FluidRippleBg.tsx` (12KB)

Renders an animated ripple/wave effect on a `<canvas>` element using WebGL shaders. Creates a fluid, liquid-looking background effect.

**Technical approach:** Uses raw WebGL (not Three.js) — creates vertex and fragment shaders directly, sets up a canvas, and runs an animation loop using `requestAnimationFrame`.

---

### `Globe3D.tsx` (14KB)

An interactive 3D globe built with Three.js.

**Features:**
- Rotates continuously
- Shows country outlines/dots on the surface
- Responds to mouse hover (may slow rotation or highlight regions)
- Used to represent Ayush's global visitor base

---

### `FloatingIcons.tsx` (1.8KB)

Animates tech icons (React, Python, TypeScript, etc.) floating around in the background of a section. Uses CSS animations for the floating motion.

---

### `GlassCursor.tsx` (3.8KB)

Replaces the default browser cursor with a custom cursor that has a glassmorphism effect (frosted glass look — semi-transparent with backdrop blur).

**Technical approach:** Listens to `mousemove` events and positions an absolutely-placed `<div>` to follow the cursor. The native cursor is hidden via CSS.

---

### `ParticleField.tsx` (2KB)

Renders an animated field of particles in the background. Uses a `<canvas>` element and draws/moves small dots each animation frame.

---

### `NightModeOverlay.tsx` (5.9KB)

Adds visual enhancement effects that activate in dark mode — subtle noise texture, gradient overlays, or other atmospheric effects that make the dark theme look richer.

---

## Content Section Components

### `ProjectCard.tsx` (5.8KB)

Displays a single project. Used on both the home page and `/projects` page.

**Accepts (props):**
```typescript
{
  id: number
  title: string
  description: string
  tech: string[]          // array of tech stack tags
  scope: string           // what problem it solves
  github: string          // GitHub repo URL
  live: string            // live demo URL
  image?: string          // optional thumbnail
  status?: 'coming-soon' | 'wip'
}
```

**Renders:**
- Project thumbnail image
- Title and description
- Tech stack as pill/badge tags
- GitHub and Live demo link buttons
- Status badge if the project is in progress

---

### `CredentialCard.tsx` (6.6KB)

Displays a certificate, award, or recognition. Used on the `/credentials` page.

**Renders:**
- Certificate image (from `public/certs/`)
- Title and issuing organization
- Date received
- Link to verify (if applicable)

---

### `GallerySection.tsx` (11KB)

Photo gallery with a lightbox viewer.

**Features:**
- CSS grid layout for thumbnail display
- Click to open in full-screen lightbox
- Navigation arrows to move between photos
- Click outside or press Escape to close
- Images loaded lazily (only loads images as you scroll to them)

---

### `EnquirySection.tsx` (10KB)

Contact form that submits to the Resend email API.

**Fields:**
- Name
- Email address
- Message

**How it works:**
1. User fills the form and clicks Send
2. Component calls the email API route via `fetch()`
3. API route uses the Resend SDK to deliver the email to Ayush
4. Component shows a success/error state based on the response

---

### `VisitorLounge.tsx` (72KB)

The largest component in the project. A full-featured real-time chat room embedded in the home page.

**This is not a simple chat widget.** Features include:

- **Real-time messages** — New messages appear instantly for all connected visitors (via SSE)
- **Message history** — Shows the last 80 messages when you first open it
- **Username** — Visitors enter a display name before chatting
- **Country detection** — Shows a flag next to each message based on the visitor's country
- **Reply threading** — Click reply on any message to quote it in your response
- **Emoji reactions** — React to messages with emoji; reaction counts update in real time
- **GIF search** — Search and attach GIFs from Giphy
- **File attachments** — Attach images and files to messages (base64 encoded)
- **Typing indicators** — Shows when another visitor is typing
- **Polls** — Create polls that visitors can vote on
- **Pin messages** — Pin important messages to the top
- **Copy message** — Copy any message text to clipboard
- **Sound toggle** — Enable/disable notification sounds

**Why it's 72KB:** It handles all of the above features in a single component file, including all the state management, API calls, SSE connection logic, and UI rendering. It could be split into sub-components in a future refactor.

---

## Special Components

### `SplashScreen.tsx` (2.5KB)

An animated loading screen shown briefly when the portfolio first loads. Fades out once the page is ready.

**Why it exists:** The 3D background and fonts need a moment to initialize. The splash screen prevents the visitor from seeing a partially-loaded state.

---

### `ResumeModal.tsx` (7.5KB)

A modal dialog that renders Ayush's resume PDF.

**Features:**
- Opens as an overlay on top of the current page (visitor doesn't leave the site)
- Renders the PDF inline using an `<iframe>` or `<embed>` tag
- Download button to save the PDF locally
- Close button to dismiss

---

### `LiquidButton.tsx` (8KB)

A reusable CTA button component with an animated liquid-fill effect on hover.

**How the effect works:**
- On hover, a pseudo-element with a background color "rises" from the bottom of the button
- Done with CSS `::before` pseudo-element + `height` or `clip-path` transition
- Creates a visually striking "filling" effect

Used for primary action buttons across the site (Download Resume, View Project, etc.).

---

## Component Size Reference

| Component | Size | Category |
|-----------|------|----------|
| `VisitorLounge.tsx` | 72KB | Content |
| `Footer.tsx` | 18KB | Layout |
| `Navbar.tsx` | 14KB | Layout |
| `Globe3D.tsx` | 14KB | Visual |
| `FluidRippleBg.tsx` | 12KB | Visual |
| `GallerySection.tsx` | 11KB | Content |
| `EnquirySection.tsx` | 10KB | Content |
| `LiquidButton.tsx` | 8KB | Special |
| `ResumeModal.tsx` | 7.5KB | Special |
| `CredentialCard.tsx` | 6.6KB | Content |
| `ProjectCard.tsx` | 5.8KB | Content |
| `NightModeOverlay.tsx` | 5.9KB | Visual |
| `GlassCursor.tsx` | 3.8KB | Visual |
| `SplashScreen.tsx` | 2.5KB | Special |
| `PageTransition.tsx` | 2KB | Layout |
| `ParticleField.tsx` | 2KB | Visual |
| `FloatingIcons.tsx` | 1.8KB | Visual |
| `LenisProvider.tsx` | 538B | Provider |
| `ThemeProvider.tsx` | 298B | Provider |
| `SolarSystemBgClient.tsx` | 206B | Provider |

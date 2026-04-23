# Design System

This document covers the visual design decisions in this portfolio — colors, fonts, animations, and the principles behind them.

---

## Design Philosophy

1. **Dark-first** — The default theme is dark. Light mode exists but dark is the primary experience.
2. **Glassmorphism** — Cards and panels use frosted-glass effect: semi-transparent background + `backdrop-filter: blur()`
3. **Minimal but alive** — Low element count, but everything moves. Subtle animations make the site feel premium.
4. **No decoration for its own sake** — Every visual element either communicates information or improves the experience.

---

## Color Palette

Defined in `tailwind.config.ts` as custom Tailwind colors.

### Primary Colors

| Name | Hex | Tailwind Class | Use |
|------|-----|---------------|-----|
| Cyan (default) | `#00d9ff` | `text-cyan` | Primary accent — buttons, highlights, glow |
| Cyan 400 | `#22d3ee` | `text-cyan-400` | Secondary cyan — hover states |
| Cyan 500 | `#06b6d4` | `text-cyan-500` | Tertiary cyan — borders, dividers |
| Saffron | `#f59e0b` | `text-saffron` | Cultural accent — Indian identity touches |
| Dark BG | `#0a0a0a` | `bg-background-dark` | Main background — near-black (not pure black) |

### Why These Colors?

**Cyan (`#00d9ff`)** — High contrast against dark backgrounds. Has a cyberpunk/tech aesthetic that fits a developer portfolio. Feels modern without being aggressive.

**Saffron (`#f59e0b`)** — The orange from the Indian national flag. Used sparingly for cultural identity representation (India-related sections, hover cards, etc.).

**`#0a0a0a` instead of `#000000`** — Pure black can feel harsh and "dead." Near-black has slightly more depth and warmth. Elements with slight elevation (like cards) appear over this background without harsh contrast.

---

## Typography

### Primary Font: Comfortaa

**Loaded via:** `next/font/google` (in `app/layout.tsx`)  
**Weights used:** 400 (regular), 700 (bold)  
**Applied to:** The entire `<body>` — every piece of text on the site

**Why Comfortaa:** It's a rounded geometric font. Rounded letterforms feel approachable and modern without sacrificing professionalism. It contrasts nicely with the sharp, technical nature of the content (code, data, projects).

```typescript
// app/layout.tsx
import { Comfortaa } from 'next/font/google'
const comfortaa = Comfortaa({ subsets: ['latin'], weight: ['400', '700'] })

// Applied as:
<body className={comfortaa.className}>
```

### Secondary Font: JetBrains Mono

Used for code snippets, numbers, tech tags, and monospace contexts. JetBrains Mono has ligatures and is specifically designed for readability in code contexts.

### Accent Font: Press Start 2P

A pixel/retro font used very sparingly — only for specific accent text or decorative headers where a retro-tech aesthetic is desired. Not used for body text.

---

## Animations

### Framer Motion Animations

All page-level and component-level animations use Framer Motion.

**Standard fade-in pattern (used throughout):**
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}    // starts: invisible, 20px below
  animate={{ opacity: 1, y: 0 }}     // ends: visible, at normal position
  transition={{ duration: 0.5 }}
>
  content
</motion.div>
```

**Scroll-triggered animations:**
```typescript
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}        // triggers when element enters viewport
  viewport={{ once: true }}           // only animates once, not every scroll
  transition={{ duration: 0.8 }}
>
  content
</motion.div>
```

**Hover/tap interactions:**
```typescript
<motion.button
  whileHover={{ scale: 1.05 }}        // grows 5% on hover
  whileTap={{ scale: 0.95 }}          // shrinks 5% on click
>
  Button
</motion.button>
```

---

### Tailwind Custom Animations

Defined in `tailwind.config.ts`:

```typescript
animation: {
  float: 'float 6s ease-in-out infinite',
  'pulse-slow': 'pulse 3s ease-in-out infinite',
}

keyframes: {
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' },
  },
}
```

**`float`** — Makes elements bob up and down gently (20px range, 6 second cycle). Used on floating icons and decorative elements.

**`pulse-slow`** — A slower version of Tailwind's built-in `pulse`. Used for glow effects and subtle attention cues.

---

### CSS Transitions

For simpler hover effects that don't need Framer Motion:

```css
/* Standard hover lift */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 217, 255, 0.2);  /* cyan glow */
}
```

The cubic-bezier `(0.4, 0, 0.2, 1)` is Material Design's "standard" easing — fast at start, decelrates at end. Feels natural and snappy.

---

## Glassmorphism Pattern

Cards and panels use this consistent pattern:

```css
/* Glassmorphism card */
.card {
  background: rgba(255, 255, 255, 0.05);   /* nearly transparent */
  border: 1px solid rgba(255, 255, 255, 0.1); /* faint white border */
  backdrop-filter: blur(10px);              /* frosted glass blur */
  border-radius: 12px;
}
```

**Why it works:** Against the dark background, this creates the illusion of a frosted glass panel floating above the background. It adds depth without needing shadows or gradients.

---

## Gradient Usage

Gradients are used for:
- Text highlights — `bg-gradient-to-r from-cyan to-saffron` with `bg-clip-text text-transparent`
- Section dividers
- Background depth layers
- Glow effects behind elements

**Standard cyan glow:**
```css
box-shadow: 0 0 30px rgba(0, 217, 255, 0.15),
            0 0 60px rgba(0, 217, 255, 0.05);
```

---

## Dark/Light Mode

**Implementation:** `next-themes` library with `ThemeProvider` wrapping the app.

**Configuration:**
- Default: `dark`
- `enableSystem: false` — does NOT follow the user's OS setting
- Toggle: button in the Navbar

**How components respond to theme:**  
Tailwind's `darkMode: 'class'` configuration means a `.dark` class is added to the `<html>` element in dark mode. Components use:

```typescript
// Dark mode variant of a class
<div className="bg-white dark:bg-zinc-900 text-black dark:text-white">
```

---

## Responsive Breakpoints

Using Tailwind's default breakpoints with a **mobile-first** approach. This means the base style is for mobile, and larger breakpoints override it.

| Breakpoint | Screen Width | Common Use |
|-----------|-------------|-----------|
| (base) | 0px+ | Mobile phones |
| `sm:` | 640px+ | Large phones |
| `md:` | 768px+ | Tablets (portrait) |
| `lg:` | 1024px+ | Tablets (landscape), small laptops |
| `xl:` | 1280px+ | Desktops |
| `2xl:` | 1536px+ | Large monitors |

**Example:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

---

## Custom Cursor

The `GlassCursor.tsx` component hides the default browser cursor and replaces it with a custom glassmorphism cursor.

**Design:**
- A circular element following the mouse
- Semi-transparent with a cyan border/glow
- Slightly delayed follow (adds a "weight" feel)
- Scales up when hovering over interactive elements (links, buttons)

**Implementation:** Tracks `mousemove` events with JavaScript, positions an absolutely-placed div. The native cursor is hidden via `cursor: none` in global CSS.

---

## 3D Background

The `SolarSystemBgClient.tsx` initializes a Three.js scene that runs as a persistent background layer across all pages.

**Key design decisions:**
- Very low opacity / subtle — never competes with the content
- Mounted once in `layout.tsx` outside `PageTransition` — never reinitializes during navigation
- Responsive to mouse movement (parallax-like effect)
- Automatically pauses or reduces frame rate when the tab is not visible (performance optimization)

---

## Summary: Design Token Reference

```
Background:     #0a0a0a
Primary Accent: #00d9ff  (cyan)
Secondary:      #22d3ee  (cyan-400)
Cultural:       #f59e0b  (saffron)
Font (body):    Comfortaa 400/700
Font (code):    JetBrains Mono
Font (accent):  Press Start 2P
Card BG:        rgba(255,255,255,0.05) + blur(10px)
Border:         rgba(255,255,255,0.1)
Glow:           rgba(0,217,255,0.15)
```

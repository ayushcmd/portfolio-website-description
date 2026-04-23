# Ayush Raj — Portfolio Website

**Live at:** [ayushcmd.me](https://ayushcmd.me)  
**GitHub:** [github.com/ayushcmd/portfolio](https://github.com/ayushcmd/portfolio)  
**Deployed on:** Vercel

---

## What Is This?

This is a personal portfolio website built by Ayush Raj — a 2nd-year BSc CSDA student at IIT Patna. It's not a simple static page. It's a full-stack web application with:

- A homepage showcasing projects, skills, and background
- Multiple dedicated pages for credentials, gallery, skills, and more
- A real-time visitor chat room called the **Visitor Lounge**
- An AI chatbot called **KIRO** that answers questions about Ayush
- Live server health monitoring
- Real-time visitor count tracking
- A contact/enquiry section with email delivery

---

## Pages at a Glance

| URL | What You See |
|-----|-------------|
| `/` | Home — hero section, featured projects, tech stack |
| `/about` | Background, education, and story |
| `/projects` | All projects with tech stack + live links |
| `/credentials` | Certificates, awards, recognitions |
| `/gallery` | Photo gallery with lightbox viewer |
| `/skills` | Full tech stack breakdown by category |
| `/spectrum` | Live server health and portfolio stats dashboard |
| `/kiro` | KIRO — an AI chatbot that answers questions about Ayush |

---

## Core Features

**KIRO (AI Chatbot)**  
An AI assistant powered by Groq's LLaMA 3.3 70B model. It knows Ayush's full background — projects, skills, education, goals — and answers visitor questions in real time. Runs on Vercel Edge Runtime (meaning it's extremely fast, no cold start).

**Visitor Lounge**  
A live chat room embedded in the portfolio where visitors from around the world can leave messages. Features include:
- Real-time message delivery via Server-Sent Events (SSE)
- Emoji reactions on messages
- Reply threading (quote a specific message)
- GIF search powered by the Giphy API
- File attachments (images, PDFs, etc.)
- Live typing indicators
- Polls that visitors can vote on
- Country flags next to each visitor's name

**Visitor Tracking**  
Every page visit is tracked using Upstash Redis. Daily, weekly, and monthly view counts are stored. Visitor IP addresses are resolved to city/country using the `ipapi.co` geolocation service.

**Analytics Display**  
The `/api/analytics` endpoint returns live stats: total views, daily views, visitor countries, and OS breakdown. This data is displayed visually on the site.

**3D Background**  
A Three.js-powered animated background runs throughout the site. It's initialized once and stays mounted during all page transitions so it never flickers or reloads.

**Smooth Scroll + Page Transitions**  
Lenis handles buttery smooth scrolling. Framer Motion handles page transition animations when navigating between routes.

---

## Tech Summary

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS |
| Animation | Framer Motion + Lenis |
| 3D | Three.js |
| AI | Groq API (LLaMA 3.3 70B) |
| Database/Cache | Upstash Redis |
| Real-time | Server-Sent Events (SSE) |
| Email | Resend API |
| Hosting | Vercel |

---

## Repository Structure (Top Level)

```
portfolio/
├── app/          → Pages and API routes (Next.js App Router)
├── components/   → All reusable UI components (20 files)
├── lib/          → Shared data, types, utility functions
├── public/       → Static files (images, resume PDF, certs)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

For full details on each folder, see `FILE_STRUCTURE.md`.  
For tech stack details, see `TECH_STACK.md`.  
For local setup, see `SETUP.md`.

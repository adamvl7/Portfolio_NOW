# Project Handoff — Adam Le Portfolio Website

Read this first. It captures full context on decisions made, what's done, what's placeholder, and what's next — written for a fresh Claude chat picking up this project on a new machine.

## Quick Start

```bash
git clone https://github.com/adamvl7/Portfolio_NOW.git
cd Portfolio_NOW
npm install
npm run dev
```

Site runs at `http://localhost:3000`.

## ⚠️ Read this before writing any code

The project has an `AGENTS.md` (referenced by `CLAUDE.md`) that says:

> This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Actual versions in use: **Next.js 16.2.6**, **React 19.2.4**, **Tailwind v4** (CSS-first config, no `tailwind.config.ts` — theme lives in `src/app/globals.css` via `@theme inline`), **Framer Motion 12.38**.

## Tech Stack

- Next.js 16 App Router + TypeScript
- Tailwind v4 (CSS `@import "tailwindcss"` + `@theme inline` in `globals.css`, colors driven by CSS variables with `.dark`/`.light` class toggling)
- Framer Motion for all animation
- `next-themes` (`attribute="class"`, `defaultTheme="dark"`, `enableSystem={false}`) — theme is manual toggle only, no OS-sync
- `@paper-design/shaders` — WebGL shader for the liquid metal button (dark mode CTA)
- `@radix-ui/react-slot` + `class-variance-authority` — button variant system
- `lucide-react` for icons

## Site Structure

`src/app/page.tsx` renders sections in order: **Hero → About → Projects → Skills → Experience → Contact**, plus a floating `Dock` (bottom nav) and fixed `Navbar` (top, from `layout.tsx`).

### Hero (`src/components/sections/Hero.tsx`)
- Centered single-column layout (NOT a 2-column grid — an image-based right column (`HeroVisual.tsx`) was tried and explicitly removed per user request).
- Name "Adam Le" + `GooeyText` morphing through "Hello" in 14 languages (English, Vietnamese, Tagalog, Spanish, Mandarin, French, Hindi, Japanese, Korean, Portuguese, Russian, Italian, German, Arabic — English/Vietnamese/Tagalog were explicitly requested).
- Tagline: "Computer Engineering @ UC Irvine '27. Focusing in software and AI."
- CTA buttons are **theme-aware**: dark mode → `LiquidMetalButton` (WebGL shader), light mode → `LiquidButton` (frosted glass SVG filter). Switched via `useTheme()` + `mounted` state to avoid hydration mismatch.
- Below the fold: `ContainerScroll` component showing a placeholder Unsplash "project showcase" image — **this is a placeholder, not a real project screenshot**.

### About (`src/components/sections/About.tsx`)
- Real, user-provided bio (3 paragraphs — UC Irvine CS student, sports/cooking hobbies, self-directed learning). This content is final, not placeholder.
- Right column: real photo at `public/Me (1).png`, displayed in a `3/4` aspect-ratio rounded card (`w-3/4 mx-auto aspect-[3/4]`).
- Heading is just "About Me" (no small "ABOUT" label above it — was explicitly removed).

### Projects, Skills, Experience, Contact
**All placeholder/scaffold content — not yet personalized.** Data lives in `src/data/projects.ts`, `src/data/skills.ts`, `src/data/experience.ts`:
- Projects: 4 fake projects ("Horizon Dashboard", "Flo Design System", "Capsule Notes", "Pulse API") with Unsplash stock images and `github.com/yourname/...` placeholder links.
- Skills: generic tech list (TypeScript, React, Rust, etc.) — not verified against Adam's actual skills.
- Experience: fake timeline (fictional SWE job, HackMIT win, CS degree, etc.) rendered via `RadialOrbitalTimeline` (desktop) / vertical timeline (mobile).
- Contact: form does `mailto:` composition client-side (no backend/email service wired up), links to `github.com/yourname`, `linkedin.com/in/yourname`, `your@email.com` — **all placeholders**.
- `Navbar` and `Dock` also link to `github.com/yourname` and `/resume.pdf` (resume file doesn't exist yet).

**This is the biggest pending task**: replace all of the above with Adam's real projects, skills, work history, and contact info/links.

## Custom UI Components (`src/components/ui/`)

- **`container-scroll.tsx`** — Scroll-linked 3D parallax card (used under Hero). Key detail: `useScroll` offset is explicitly `["start end", "end start"]` — do not change this without understanding why (see Known Gotchas below). Rotation: `rotateX` goes `40 → 0` over scroll progress `[0, 0.5]` (curved/tilted at top, flat by the time centered). No spring — uses direct `useTransform` with `clamp: true` because springs caused unwanted trailing animation.
- **`gooey-text-morphing.tsx`** — `GooeyText` component, SVG-filter-based text morph (gooey blob effect) between a list of strings. Size is controlled entirely via the `textClassName` prop (no hardcoded font size inside the component). The `feColorMatrix`/`feGaussianBlur` values were tuned down from the original template to reduce pixelation — don't crank the alpha matrix values back up without checking for jagged edges.
- **`liquid-glass-button.tsx`** — `LiquidButton`. Frosted-glass pill button with SVG `feTurbulence` + `feDisplacementMap` backdrop distortion filter. Used in **light mode**. Variants/sizes via `cva` (`sm`, `default`, `lg`, `xl`, `xxl`, `icon`).
- **`liquid-metal-button.tsx`** — `LiquidMetalButton`. WebGL shader button (`@paper-design/shaders` liquid metal fragment shader) with ripple-on-click and hover/press speed changes. Used in **dark mode**. Fixed pixel dimensions (142×46 text, 46×46 icon) rather than Tailwind sizing — shader canvas needs explicit dims.
- **`dock.tsx`** — Floating bottom nav bar, fixed position, icon buttons with tooltips.
- **`radial-orbital-timeline.tsx`** — Desktop experience timeline (orbiting nodes, click to expand).
- **`slide-button.tsx`** — Submit button used in Contact form.
- **`badge.tsx`, `button.tsx`, `card.tsx`** — likely shadcn-style primitives, not heavily customized (not modified this session).

## Other Notable Files

- **`src/components/HeroVisual.tsx`** — Currently **unused** (not imported by Hero.tsx anymore). Was the original hero-right-column visual: `Star.png` with an SVG `feColorMatrix` filter (`values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 -1 -1 -1 3 0"`) that converts white background pixels to transparent based on brightness, avoiding the black-outline problem `mix-blend-mode: multiply` caused in dark mode. Kept in the repo as a fallback/reference in case the right-column visual comes back.
- **`src/components/ChromeStars.tsx`** — SVG chrome star with gradient bevel system (outer bevel, chrome ring, surface gradients) + hover/press interactive filter states. Also currently unused, kept as fallback.
- **`public/Star.png`** — chrome sparkle star image (white background, used with the removal filter above).
- **`public/Me (1).png`** — Adam's real photo, used in About section. Note the space in the filename — referenced in code as `/Me%20(1).png` (URL-encoded).

## Known Gotchas / Design Decisions (don't relitigate without reason)

1. **`ContainerScroll` offset must be `["start end", "end start"]`.** The default Framer Motion offset produced an inverted/unstable `scrollYProgress` for this component's position on the page. This explicit offset is what makes progress go cleanly 0→1 as the user scrolls down through the section, regardless of where the section sits on the page.
2. **No spring physics on the scroll rotation.** A `useSpring` wrapper (tried with `stiffness: 12`) caused a long, unwanted trailing animation after the user stopped scrolling. Direct `useTransform` + smootherstep-style easing is intentional.
3. **Rotation direction**: at rest (top of page, section not yet scrolled to), the card should look **curved/tilted** (rotateX 40°); as the user scrolls down and it centers, it flattens to 0°. This was flipped back and forth several times during development — the current direction is the confirmed final one.
4. **GooeyText size is NOT hardcoded** in the component — always pass `textClassName` with the font size, or text will have no explicit size.
5. **Theme-aware button pattern**: `const isDark = !mounted || resolvedTheme === "dark"` — defaults to dark during SSR/pre-hydration to match `defaultTheme="dark"` and avoid a flash/mismatch. Follow this pattern for any other theme-conditional rendering.
6. **Git identity on this machine** is set globally: `user.email adamle11488@gmail.com`, `user.name "Adam Le"`. If working from a fresh clone on another machine, git will need identity configured there too (or it'll error on first commit).

## Repo / Git State

- Remote: `https://github.com/adamvl7/Portfolio_NOW.git`, branch `main`.
- One commit so far: initial commit with the full site as of this session.
- `.gitignore` already excludes `node_modules`, `.next`, etc. — standard Next.js gitignore, not modified this session.

## Suggested Next Steps (in likely priority order)

1. **Replace placeholder content** in Projects, Skills, Experience, Contact, Navbar, and Dock with Adam's real projects, real skills, real work/education history, and real social/contact links (currently all `yourname`/`your@email.com` placeholders).
2. Add a real resume PDF at `public/resume.pdf` (currently linked but file doesn't exist).
3. Replace the placeholder Unsplash "project showcase" image in the Hero `ContainerScroll` with a real project screenshot or product shot.
4. Decide whether `HeroVisual.tsx`/`ChromeStars.tsx` (currently unused) should be deleted or repurposed elsewhere — they're dead code right now.
5. Wire up the Contact form to something more robust than `mailto:` if a "real" submission flow is wanted (e.g., a form service or API route) — currently it just opens the user's email client.

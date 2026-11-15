# Portfolio rebuild prompt — simple, human, not "AI-looking"

Use the **full prompt** with Claude Code / Cursor / Codex / v0 when you want the whole site rebuilt.
Use the **short prompt** when you just want a quick layout pass.

The prompt is written to work with the content already in `src/data/` (Rachit, 5 projects, 3 roles, 1 degree).
Replace anything in `[brackets]` before you paste it.

---

## 1. Full prompt (copy everything in this block)

````text
You are a senior product designer and front-end engineer. Rebuild my personal
portfolio so it reads like a real person's site: quiet, fast, easy to use, and
clearly hand-made. Do not use a template, and do not use the visual language of
"AI-generated portfolio" sites.

## CONTEXT

- Me: [YOUR FULL NAME], [ROLE, e.g. front-end engineer] in [CITY, COUNTRY].
  Currently [what you're doing — employed / freelancing / open to work].
- Audience: hiring managers, design leads and potential clients. They will skim
  for 30–60 seconds, most of them on a phone.
- The job of the site: prove I ship real things, then make emailing me effortless.
- Success looks like: in 5 seconds a visitor knows who I am, in 30 seconds they
  have opened one case study, and they never have to hunt for my email.

## STACK

- Astro (preferred) or Vite + React + TypeScript. Tailwind is fine.
- No Three.js / WebGL, no GSAP, no Lenis, no Framer Motion, no animation library.
  CSS transitions only.
- No component library (no shadcn, MUI, Chakra, Aceternity, Magic UI).
  Hand-write the ~10 components this site needs.
- No icon library for decoration. Text arrows (→ ↗ ↓) are enough.
- Content must render without JavaScript.

## INFORMATION ARCHITECTURE

1. `/`            Home — intro, selected work, short about, contact
2. `/work`        Full project list as text rows
3. `/work/[slug]` Case study template
4. `/about`       Bio, experience, tools
5. `/contact`     Email + optional 3-field form
6. `/colophon`    Fonts, stack, "how this site is built" (optional, keep it)

Navigation: wordmark on the left; "Work · About · Contact" on the right.
No numbered nav items, no pills, no hamburger above 640px.
No page transitions, no loading screen.

## DESIGN TOKENS

Colour — light only, no theme toggle:
  --paper:        #F5F2EB   page background (warm off-white, not #fff)
  --paper-raised: #FCFAF5   hover rows / inputs
  --ink:          #16150F   body text
  --ink-soft:     #57554C   secondary text
  --rule:         #DDD8CB   1px borders and dividers
  --accent:       #1E5B3F   links, focus rings, active states
  --accent-ink:   #FFFFFF

One accent colour, used on less than 5% of any screen. No gradients anywhere.
No shadows except one soft shadow on screenshots (0 18px 40px -20px rgba(0,0,0,.25)).

Type — two families maximum:
  UI + body:  "Inter Tight" or "Geist", weights 400 / 500
  Editorial:  "Source Serif 4", regular + italic — only for the intro sentence
              and case-study pull quotes
  Labels/date only (max 12px): "JetBrains Mono", uppercase, 0.08em tracking
  Scale: 13 / 15 / 17 / 21 / 28 / 44 / clamp(44,7vw,76)
  Body: 17px, line-height 1.65, measure 62–68 characters
  Headings: sentence case, weight 500–600, spacing -0.01em (not -0.05em)

Layout:
  Container max-width 1120px. Padding 24px mobile / 40px desktop.
  Section spacing 72px mobile / 120px desktop.
  Grid 12 columns; use 7/5 and 8/4 splits. Never centre body paragraphs.
  Borders 1px var(--rule). Radius: 0 on cards, 2px on inputs, 999px only on
  real pills (there should be almost none).

## COMPONENTS (all of them)

- TextLink: underline, 1px, offset 3px, colour shifts to accent on hover.
  External links get " ↗". Never underline on hover only.
- Button: solid --ink background, --paper text, min-height 44px, radius 2px,
  hover darkens ~8%. At most two buttons on the home page.
- ProjectRow: grid [year | title + one-line description | →], 20px vertical
  padding, border-top 1px --rule. Hover: background --paper-raised, arrow moves
  2px right. This replaces all cards on the work list.
- Label: mono, 11px, uppercase, --ink-soft.
- Input: label above, 1px border, 44px min height, focus = 2px accent ring with
  2px offset. Error text under the field, not in a red banner.
- Figure: real screenshot or photo, 16:10, 1px border, no tilt, no fake browser
  chrome, no floating device mockups. Caption below in 13px --ink-soft.
- Footer: three columns — name/role, nav links, email + "Last updated [date]".

## MOTION

- Transitions: 120ms ease-out, only on colour / background / border / transform.
- The whole site gets two animations: mobile menu open, and form success message.
  Delete everything else.
- Wrap all motion in `prefers-reduced-motion: reduce` overrides.

## COPY RULES

Write in first person. Use contractions. Mix short sentences with the occasional
long one. Specific beats impressive.

Good: "Cut first load from 4.1s to 0.9s by removing three render-blocking scripts."
Bad:  "Optimised performance for a seamless user experience."

Banned words and phrases: passionate, crafting digital experiences, blends art
and technology, pushing boundaries, elevate, seamless, innovative solutions,
journey, "let's build something amazing", "I don't just X, I Y", "more than just",
"at the intersection of". No three-item lists of abstract nouns. No em dash used
as a personality.

Never invent testimonials, awards, client logos, project URLs, or metrics.
If a number is not real, leave it out. Placeholders in [brackets] are better
than fabrication.

## PAGE SPECS

HOME
  - Hero, left aligned, max 3 lines of type, min-height 55vh (not 100vh, so the
    work peeks in above the fold on a laptop):
      H1: "[Name] — [role] in [city]."
      Serif italic line, one sentence: what you do and who for.
      Row: [solid "See work" button] [email as a text link]
      One line of availability only if it is true.
  - "Selected work" — 3 ProjectRows, each: year, title, one honest line, arrow.
    Then a text link "All work (5) →".
  - "About" — portrait (real photo, 4:5, 1px border) + two short paragraphs,
    max 120 words total. Link to /about.
  - "Elsewhere" — GitHub, LinkedIn, X, RSS. Real URLs only.
  - Footer.

WORK INDEX
  - One paragraph of context, then 5 rows grouped by year.
  - No filters, no tags row, no grid.

CASE STUDY
  - Header: title, then a 4-column meta row (role, year, team, stack).
  - "The problem" — 2 short paragraphs, no bold headings with icons.
  - "What I built" — 3–5 bullets, each a decision and its reason.
  - 2–4 real screenshots with captions that say what to look at.
  - "Outcome" — real numbers, or the honest sentence "Too early to tell."
  - "What I'd do differently" — 2 bullets. This is the most human section on
    the site; make it specific and slightly uncomfortable.
  - Prev / next project links at the bottom.

ABOUT
  - Portrait + 3 paragraphs: where you are, what you do, what you do outside work.
  - Experience as a plain table: years | role | company. No company logos.
  - "Tools I actually use" — a comma-separated list. No progress bars, no
    percentages, no "expert" ratings.
  - One line about what you are currently learning.

CONTACT
  - "Email is best:" then the address as a 28px link.
  - Optional form with exactly three fields: name, email, message. No budget
    selector, no project-type chips, no confetti.
  - "I reply within two working days." only if that is true.

COLOPHON
  - Typefaces, stack, hosting, and one thing you deliberately left out.
    Four lines. This single page does more for "made by a human" than any
    animation.

## ANTI-AI CHECKLIST — every item must be true before you finish

[ ] Hero is left aligned, text only (or one real photo). No gradient, blob,
    particles, 3D object, or animated mesh.
[ ] No full-screen loader or intro sequence.
[ ] Native cursor everywhere. No custom cursor, no trailing dot.
[ ] Native scrolling. No Lenis, no scroll-jacking, no pinned sections.
[ ] No marquee, typewriter, auto-carousel, or animated counter.
[ ] No skill percentages, radar charts, or "95%" anything.
[ ] No glassmorphism, glow, neon, or gradient text.
[ ] Cards replaced by rows and rules wherever a table would do.
[ ] Every visual is a real screenshot or photo, not abstract SVG art.
[ ] At least one plainly human detail: a changelog, a "currently" list, a real
    desk photo, or a colophon.
[ ] The site still looks intentional with all motion removed.
[ ] Reading the copy out loud does not sound like a pitch deck.

## ACCESSIBILITY + PERFORMANCE ACCEPTANCE CRITERIA

- Lighthouse mobile: Performance ≥ 95, Accessibility 100, Best Practices 100,
  SEO 100.
- Total JS on the home page < 50KB gzipped. No JS needed to read content.
- CLS < 0.05. All images have width/height and are AVIF/WebP, lazy below fold.
- Contrast ≥ 4.5:1 for all text. 44px minimum tap targets.
- Works at 320px, 768px, 1440px; at 200% zoom; keyboard-only; screen reader
  heading order is h1 → h2 → h3 with no skips.
- One skip-to-content link. Visible focus ring on everything.
- No console errors or warnings in production build.

## PROCESS

Before writing code, output a one-page plan: sitemap, palette swatches, type
scale, and the exact copy for the home page (hero + 3 project rows). Wait for my
approval. Then build it, page by page, starting with the shared layout and the
home page.

Deliver: file tree, a single tokens.css (plus Tailwind mapping if used), all
copy written out (no lorem ipsum), and a README explaining how to add a project.
````

---

## 2. Short prompt (quick layout pass)

````text
Redesign my portfolio as a quiet, editorial one-pager: warm off-white background
(#F5F2EB), near-black text (#16150F), one deep-green accent (#1E5B3F), Inter
Tight for UI and Source Serif 4 italic for one intro line. Left-aligned hero
(name, role, one sentence, two links), then selected work as 4 text rows
(year · title · one line · arrow) instead of cards, then a short about with a
real photo, then a footer with email and "last updated".

Banned: 3D, gradients, glassmorphism, custom cursor, scroll hijacking, marquees,
loading screens, skill bars, % meters, icon libraries, card grids, fake metrics,
and any copy using "passionate", "seamless", "elevate" or "crafting digital
experiences". Motion limited to 120ms colour/border hovers. Must score 100 on
Lighthouse accessibility and render without JavaScript.
````

---

## 3. What this means for the current repo

If you rebuild in place, these are the concrete removals:

**Delete / stop using**
- `src/components/3d/HeroSculpture.tsx`, `src/components/3d/ContactDevice.tsx`
- `src/components/cursor/CustomCursor.tsx` + `src/context/CursorContext.tsx`
- `src/context/AudioContext.tsx` (nav sound toggle)
- `src/components/layout/PageTransition.tsx`
- `src/hooks/useSmoothScroll.ts` (Lenis)
- `src/components/home/PlaygroundLab.tsx`, `SkillsConstellation.tsx`
- The washi-tape / sticky-note / doodle layer inside `Sketchbook*`
- `three`, `@react-three/*`, `gsap`, `lenis`, `canvas-confetti`, `framer-motion`
  from `package.json` (keep `lucide-react` only if you actually use icons)

**Rewrite**
- `src/App.tsx` → real routes (`react-router-dom`) or Astro pages
- `Navbar.tsx` → wordmark + 3 text links, no numbers, no pills, no FX switch
- `HeroSection.tsx` → left-aligned, 55vh, two links, no 3D
- `Sketchbook.tsx` → `WorkIndex.tsx` (5 rows) + `CaseStudy.tsx`
- `AboutEditorial.tsx` → 3 paragraphs + experience table + tools list
- `ContactControlRoom.tsx` → email link + 3-field form
- `Footer.tsx` → 3 columns, small type
- `styles/index.css` → the token block from the prompt, nothing else

**Fix content**
- Verify every `liveUrl` / `githubUrl` in `projectsData.ts`; delete rows you can't
  show publicly.
- Remove invented-looking metrics (`+38%`, `0.62s`, `14,000+`, `60 FPS` targets)
  unless they're measurable and true.
- Replace `rachit.dev@playground.studio` with a real address.
- Drop the `95%` skill levels — replace with a plain list.
- Reduce 5 fonts to 2 (+1 mono for dates only).

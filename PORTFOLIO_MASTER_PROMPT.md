# MASTER PROMPT — The Digital Playground v2

A rewritten, measurable version of the GPT brief you pasted.
It fixes the contradictions, adds numbers, and puts the landing page first.

Files in this set:
- `PORTFOLIO_MASTER_PROMPT.md` ← this file (whole site)
- `LANDING_PAGE_PROMPT.md` ← hero-only deep spec
- `PORTFOLIO_PROMPT.md` ← copy voice + a11y acceptance (still valid)
- `PORTFOLIO_PROMPT_CREATIVE.md` ← sketchbook + 3D art direction (still valid)

---

## PART A — AUDIT OF THE GPT PROMPT

### What it gets right (keep)
- The sketchbook as the project page. That is genuinely the differentiator.
- "Never invent screenshots or claim nonexistent features."
- "Do not animate everything simultaneously. Use motion with purpose."
- Keyboard navigation for the book, thumbnail index, page numbers.
- "No ordinary progress bars for skills."
- The tone: experimental, editorial, premium.

### What breaks it (fix)

| # | Problem | Why it matters | Fix in this version |
|---|---|---|---|
| 1 | Four accents (orange + lime + cobalt + charcoal) | Four accents is the default AI palette. Nothing reads as "the" colour. | Orange is the only fill accent. Lime = status dot only. Cobalt = sketchbook annotations only. |
| 2 | "Chrome, glass, liquid-like geometric shapes" hero | This is the single most generated 3D asset on the internet. It contradicts rule 12 ("not template-generated"). | A fanned stack of **chrome sheets** — a metal version of the sketchbook. Same material language, different silhouette. |
| 3 | 8 global interaction systems stacked | Cursor + particles + smooth scroll + magnetics + transitions + parallax + background + grain. No hierarchy, guaranteed jank. | Three signature moments only. Everything else ≤ 240ms of colour/transform. |
| 4 | Zero numbers | "Smooth", "polished", "optimised" cannot be tested. An agent will guess. | Bundle budgets, fps targets, LCP/CLS, breakpoints, durations, easings, DPR caps. |
| 5 | Copy is unspecified | The agent will write "crafting digital experiences that blend art and technology." That single sentence is the loudest AI tell. | Banned-phrase list + good/bad examples + required specificity. |
| 6 | "Secure backend" for the form, unnamed | 100% chance of a fake success state or a dead fetch. | Three concrete options, env var, and a required fallback when unset. |
| 7 | 3D on hero + contact + about diagrams + footer | 4 WebGL contexts = 4 chances to drop frames on a mid-range Android. | Exactly **one** canvas on the whole site. |
| 8 | "Antigravity UI/UX skill" | Not a public standard. If the tool doesn't have it installed, the agent will invent its rules. | Conditional line: use it only if present, otherwise this document wins. |
| 9 | No architecture | "Organized folders" is not a spec. | Explicit file tree. |
| 10 | No definition of done | "Polished" is unmeasurable, so "done" gets declared early. | A pass/fail checklist at the end. |
| 11 | Everything is priority 0 | When time runs out, the agent ships half of all twelve sections. | P0 / P1 / P2 ladder. |
| 12 | "Small doodles animate occasionally" | Endless ambient animation is the thing that makes a page feel machine-made. | Max 2 infinite loops site-wide, named. |

---

## PART B — THE FULL CUSTOM PROMPT (copy everything in this block)

````text
You are an award-winning creative developer, art director, motion designer and
senior front-end engineer. Build a production-ready personal portfolio for
"Rachit", a creative developer / 3D web architect.

This is not a template. It is a designed object. Read the priorities in order:
1. Three spectacular moments, and silence everywhere else.
2. Every interaction must survive a mid-range Android and a keyboard.
3. No sentence of copy may sound like marketing filler.
4. If it cannot be measured, it is not finished.

## 0. EXISTING CODEBASE

Work inside the existing Vite + React + TypeScript + Tailwind repo (E:\Protfolio).
- `src/data/projects.ts`, `experience.ts`, `skills.ts` are the single source of
  truth for content. Refactor them, do not duplicate them.
- Keep: `src/components/sketchbook/` structure, `src/types/index.ts`.
- Delete before starting: `src/components/3d/HeroSculpture.tsx`,
  `src/components/3d/ContactDevice.tsx`, `src/components/cursor/` (rewrite only),
  `src/context/AudioContext.tsx` (no audio on this site), the Lenis hook (rewrite).
- Remove unused deps at the end: `canvas-confetti`, `gsap` if unused, `three` only
  if the 3D ships. `npm run build` must pass with zero TS errors.

## 1. TECH STACK

React 18 + TypeScript (strict) + Vite + Tailwind 3.
React Three Fiber + drei for the single 3D scene.
Framer Motion for layout/enter-exit only. GSAP + ScrollTrigger ONLY for the one
pinned section and the one scrubbed text reveal. Lenis for smoothing, configured
to respect prefers-reduced-motion. lucide-react for the ~6 icons actually used.
No component library. No UI kits. No additional animation packages.

## 2. ARCHITECTURE

src/
  app/            routes: home, work, work/[slug], about, contact
  components/
    layout/       Header, Footer, PageTransition, SmoothScroll
    ui/           Button, MagneticLink, Label, Reveal, Marquee, StatusDot
    cursor/       Cursor (2 states + 1 label, no particles)
    three/        Stage, ChromeStack, useSceneQuality, StaticFallback
    sketchbook/   Book, Cover, Spread, PageTurn, IndexTabs, ZoomModal, TextMode
    sections/     Hero, SelectedWork, Philosophy, SkillsIndex, ContactCTA
  data/           projects.ts, experience.ts, skills.ts, site.ts
  lib/            motion.ts, seo.ts, quality.ts
  styles/         tokens.css, base.css, grain.css

Every component ≤ 180 lines. No prop drilling beyond one level. All motion
constants imported from `lib/motion.ts`, never inline magic numbers.

## 3. DESIGN TOKENS

Colour — dark pages
  --void:      #0B0B0A   page background
  --char:      #141412   raised surfaces
  --bone:      #F2EDE3   primary text
  --bone-dim:  #A8A296   secondary text
  --rule:      #2A2A26   1px lines
  --orange:    #E24E1B   THE accent. Fills primary CTA, active states, key marks
  --lime:      #C6F24E   status dot + 1px underline ONLY. Max 2 uses per viewport
  --cobalt:    #2F4BFF   sketchbook blueprint annotations ONLY. Never on dark pages

Colour — sketchbook (light)
  --paper:     #F4EFE4
  --paper-deep:#E7DFCE
  --ink:       #1B1A16
  --pencil:    #6E6B61
  --vermillion:#C8452D

Discipline: orange is the only filled accent on dark pages. If a viewport shows
orange, lime and cobalt at once, it is wrong — cut one.
Contrast: verify every pair. If orange text is under 24px, use #FF7A45 instead.

Type (4 files max)
  Display:  Bricolage Grotesque, 200–800 variable. Fallback Space Grotesk.
  Body:     Inter Tight 400 / 500.
  Labels:   IBM Plex Mono 400 / 500, uppercase, 0.14em tracking, 11–12px.
  Hand:     Caveat 500 — sketchbook annotations ONLY.
  Scale:    12 / 14 / 16 / 18 / 22 / 28 / 40 / 64 / clamp(64px, 16vw, 240px)
  Display:  line-height 0.82, tracking -0.045em, sentence case except the hero.
  Body:     17px / 1.65, measure 58–68ch.
  Rule: headings are set in Bricolage, never in mono. Mono never exceeds 12px.

Space & grid
  4px base. Section padding 96px mobile / 160px desktop.
  12 columns, 24px gutter, 24/48px margins, max-width 1440px.
  Use asymmetry: 7/5 and 8/3 splits. Never centre a body paragraph.

Surface
  Radius 0 everywhere. 2px on inputs. Pills only for the status dot label.
  One grain layer for the whole site (SVG fractal noise, 3.5% opacity, fixed).
  One vignette on the hero only. No glow, no glassmorphism, no gradient text.

## 4. MOTION SYSTEM

Durations: 120 (micro) / 240 (standard) / 480 (entrance) / 720 (scene) /
           1100 (intro) / 24000 (the single marquee)
Easing:    standard  cubic-bezier(0.2, 0, 0, 1)
           entrance  cubic-bezier(0.16, 1, 0.3, 1)
           page turn cubic-bezier(0.2, 0.75, 0.25, 1)
           Never bounce, never elastic, never ease-in-out for entrances.
Stagger:   50ms, maximum 6 items. The 7th+ enter with the group.
Scroll:    exactly ONE pinned section and ONE scrubbed text reveal on the site.
Loops:     exactly TWO infinite animations: the status dot pulse and the scroll cue.
           Everything else is finite and interruptible.
Reduced motion: no page turn (instant swap), no parallax, no scrub, no intro
           sequence, 3D replaced by its static image. Nothing may break.

## 5. THE THREE SIGNATURE MOMENTS

S1 — Landing: one 3D chrome-sheet still-life, 3.5° pointer parallax, assembles
     once in 900ms, then idles. Full spec in LANDING_PAGE_PROMPT.md.
S2 — Projects: a physical A4 sketchbook with a 620ms interruptible page turn.
S3 — Navigation: a single 420ms paper-wipe between routes.

Nothing outside these three may exceed 240ms.

## 6. 3D SPEC (one canvas, site-wide)

Object: five thin chrome sheets, 420×300×6mm, fanned 0–22°, one sheet slightly
lifted. A metallic echo of the sketchbook. This is the concept link — a chrome
blob, torus knot, orb, or particle field is BANNED as generic.

  camera:    perspective, fov 32, [0, 0.9, 5.6], target [0, 0, 0]
  lights:    key rect area 3.0 warm #FFE3C4 at [4, 5, 4]
             fill rect area 0.55 #C9D8FF at [-5, 1, 2]
             rim directional 2.0 #FFFFFF at [0, 3, -6]
             environment RoomEnvironment at 0.28
  material:  metalness 1.0, roughness 0.07–0.12, no transmission, no glass
  shadow:    drei ContactShadows, opacity 0.32, blur 2.6, far 4.5
  post:      none. No bloom, no chromatic aberration, no grain pass.
  idle:      group rotation 0.06 rad/s + pointer parallax ±3.5° at lerp 0.06.
             Stop rotating while the pointer is over the canvas.
  dpr:       clamp [1, 1.75]. Pause on tab hidden / canvas offscreen.
  quality:   if avg frame time > 22ms for 1s → dpr 1, parallax off.
             If still > 22ms → unmount canvas, show static AVIF.
  budget:    ≤ 200KB gz JS, ≤ 300KB textures, first render ≤ 900ms after import.
  fallback:  pre-rendered AVIF ≤ 45KB, identical composition, for no-WebGL,
             reduced-motion, saveData, hidden battery, or width < 640px.
  canvas is aria-hidden, with a one-sentence text alternative.

Contact page and footer use CSS/SVG objects, never a second WebGL context.

## 7. LANDING PAGE

Follow LANDING_PAGE_PROMPT.md exactly. Summary of required content:
- 100svh hero, oversized "RACHIT.", one-line role, one-line intro, two CTAs.
- availability dot, local time, coordinates in the four corners.
- 1.4s skippable intro: mask-reveal name → 3D fade/scale → meta stagger → cue.
- Below the fold: selected work (3 rows), philosophy statement (scrubbed),
  skills index, contact CTA.

## 8. PROJECTS — INTERACTIVE SKETCHBOOK

The centrepiece. DOM + CSS 3D only. No WebGL.

Object: A4 landscape (1.414:1), wire-o bound left, 5 spreads + cover + back cover.
Container: perspective 2200px, rotateX(1.5deg), one desk shadow.

Cover: title 44–72px, one tape strip, stamped year, "01 / 05".
Spread: LEFT = process (2–3 taped process images, 3 pencil notes with SVG arrows,
one highlighted line, stamped date). RIGHT = result (one large real screenshot,
caption, meta row role · year · stack, "Open case study ↗").
Per spread caps: 2 tape pieces, 1 sticker, 6 handwritten notes maximum.
Page turn: 620ms, transform-origin left, rotateY 0 → -168deg, front + back faces,
specular band at 105° animating 0 → 0.28 → 0, mid-turn curl, under-page always
visible, reversible mid-flight by a second drag.
Navigation: drag (60px / 0.5 velocity threshold), ← → Home End, outer 8% click
zones, right-edge numbered index tabs, "02 / 05" progress.
Zoom: click image → 90vw modal, 100–300% wheel/buttons, drag to pan, focus trap,
aria-modal, Esc, 1:1 reset.
Mobile (<900px): vertical CSS scroll-snap stack, one page per screen, sticky
progress pill, bottom-sheet index. No fake 3D flip.
Text mode: a "Book / Text" toggle that renders every project as semantic HTML
with no animation. Persist in localStorage. This is required, not optional.
Every spread announced: aria-live "Spread 2 of 5, AttendX".

Content: use `src/data/projects.ts` only. Real screenshots only. Delete any
project whose link or screenshot you cannot verify. Never invent metrics.

## 9. ABOUT — EXPERIMENTAL EDITORIAL

Magazine masthead (issue number, date, one 4px rule), portrait or real desk photo
(4:5, 1px border), 3 short paragraphs, philosophy as 3 large pull quotes (no
icon cards), experience as a plain table (years / role / company), skills as a
text index with years — NO percentage bars, NO radar chart, NO star ratings.
One scrubbed element: the vertical timeline rule draws with scroll progress.

## 10. CONTACT — CONTROL ROOM

Heading "LET'S MAKE SOMETHING UNREAL." left-aligned in 3 lines, with one word
outlined in --orange (outline only, not filled).
Live IST clock, availability status, direct email as a 28px copyable link.
Form: name, email, project type (4 radio chips), budget (4 radio chips),
message. Underline inputs that draw on focus. Sequential entrance 50ms stagger.
Submit: magnetic, max 8px offset.

REAL SUBMISSION — pick one and implement it properly:
  a) Formspree: POST to https://formspree.io/f/<id> from an env var
  b) Resend via a serverless function (Vercel/Netlify/Cloudflare)
  c) Netlify Forms with data-netlify
Rules: read the endpoint from `import.meta.env.VITE_FORM_ENDPOINT`. If it is
missing, disable submit and show "Email me instead: <address>" with the mailto.
Never simulate success with setTimeout. Surface the real HTTP error.
States: idle / sending / success / error, announced via aria-live.
No confetti. A stamped "SENT" mark with a 400ms ease-out is enough.

Footer: oversized "LET'S BUILD.", CSS-only orbiting SVG object (no WebGL),
social links, email, back-to-top, dynamic year, "last updated".

## 11. CURSOR (rewritten, restrained)

Two states only: default (8px orange dot) and link (32px bone ring, 2px, no fill).
Labels (VIEW / DRAG / EXPLORE) appear inside the ring in mono 10px.
Magnetic attraction: maximum 8px, radius 90px, spring stiffness 260 / damping 30.
NO trailing particles. NO click bursts. Node rendered once outside React tree.
Disabled entirely on `(pointer: coarse)` and under prefers-reduced-motion.
Native cursor restored on inputs and text.

## 12. COPY VOICE

First person, contractions, specific. One idea per sentence.
Good: "Cut first paint from 4.1s to 0.9s by dropping three render-blocking scripts."
Bad: "Optimised performance for a seamless, elevated user experience."

Banned: passionate, crafting digital experiences, blends art and technology,
pushing boundaries, elevate, seamless, innovative solutions, journey,
"let's build something amazing", "I don't just X, I Y", "at the intersection of",
"more than just a", "unleash", "empower".
No three-item lists of abstract nouns. No emoji. No exclamation marks in body copy.
Every project must state one tradeoff or mistake. No fabricated testimonials,
awards, client logos, metrics, or URLs.

## 13. ANTI-AI CHECKLIST — all must be true

[ ] Exactly three moments exceed 240ms. Count them.
[ ] One filled accent per viewport. No orange + lime + cobalt together.
[ ] 3D object is chrome sheets, not a blob/knot/orb/particles.
[ ] No loader screen. No autoplay audio. No scroll hijacking.
[ ] No cursor particles. No confetti. No skill percentages.
[ ] No "01 / 02 / 03" icon-card feature grid.
[ ] No fake numbers, logos, testimonials, or dead links.
[ ] Max 2 infinite animations, both named.
[ ] Every image is a real screenshot or photo.
[ ] Copy passes the "read it out loud" test without sounding like a pitch deck.
[ ] Site is usable with JS off (content + links), motion off, and images off.

## 14. PERFORMANCE BUDGET

Home ≤ 320KB gz JS (3D ≤ 200KB). Projects ≤ 90KB. About/Contact ≤ 70KB.
Fonts: 4 files, only used weights, `font-display: swap`, preload the display face.
Images: AVIF, spreads 1600w, thumbs 320w, explicit dimensions, lazy below fold.
LCP < 2.0s on 4G. CLS < 0.03. INP < 200ms.
60fps on M1 and an iPhone 12; ≤ 22ms frame time on a mid-range Android.
Reserve canvas and book aspect ratios so nothing shifts.

## 15. ACCESSIBILITY ACCEPTANCE

Contrast ≥ 4.5:1 body, ≥ 3:1 large text and UI borders.
Full keyboard path on every route, visible 2px focus ring (never outline:none).
Focus trap in zoom modal and mobile index. Esc closes overlays.
Heading order h1 → h2 → h3 with no skips. One skip-to-content link.
Every image has meaningful alt; decorative images alt="".
Canvas and CSS objects are aria-hidden with text alternatives.
Live regions for form state and page turns.
Works at 320px, 200% zoom, and with reduced motion enabled.

## 16. PRIORITY LADDER — build in this order

P0 (must ship): tokens, layout, navigation, landing text + 3D + fallback,
work index, one case study, about, contact with a real working form, responsive,
keyboard access, grain, footer.
P1 (ship next): sketchbook cover + spreads + page turn, page transitions,
cursor, selected-work hover previews, marquee.
P2 (only if P0/P1 are done and fast): chrome object idle refinement, index tabs,
text-mode polish, mobile sheet animation, scroll-scrubbed philosophy line.

If you run out of time, stop at the end of a P-tier — never ship half of P0.

## 17. PROCESS — do not skip

Step 1: output a design plan only.
  · the 3 signature moments, named
  · the palette with hex + one line on where each is allowed
  · the type scale as a table
  · a text storyboard of the landing intro (5 frames)
  · a labelled diagram of one sketchbook spread
  · the motion token table
Stop and wait for approval.

Step 2: tokens + layout + header/footer. Show me the landing page static first.

Step 3: landing 3D with the static fallback wired from the start.

Step 4: projects book, one spread, then the turn. Then the remaining pages.

Step 5: responsive pass at 320 / 768 / 1024 / 1440 / 1920.

Step 6: a report — bundle sizes, LCP/CLS/INP, frame time on the page turn, list of
every animation with its duration, Lighthouse scores, and the completed
checklist from section 13.

## 18. DEFINITION OF DONE

[ ] `npm run build` passes, zero TS errors, zero console warnings in prod.
[ ] Every route reachable from the nav with no dead links.
[ ] Form posts to a real endpoint and shows real errors.
[ ] 3D has a static fallback that is visually identical in composition.
[ ] Book works with drag, keyboard, tabs, and text mode.
[ ] No horizontal scroll at 320px.
[ ] Lighthouse mobile: Perf ≥ 85 with 3D / ≥ 95 without, A11y 100, BP 100, SEO 100.
[ ] The checklist in section 13 is fully ticked.

If the Antigravity UI/UX skill is installed in your tool, use it for layout review.
If it is not installed, ignore it completely and treat this document as the
design authority — do not invent what that skill might say.
````

---

## PART C — SHORT VERSION (one paragraph, for quick runs)

````text
Rebuild my portfolio as a designed object, not a template. Dark #0B0B0A, bone
#F2EDE3 text, one accent #E24E1B (lime only as a status dot, cobalt only inside
the sketchbook). Bricolage Grotesque display + Inter Tight body + IBM Plex Mono
labels at ≤12px + Caveat only in the sketchbook. One WebGL canvas on the whole
site: five fanned chrome sheets, fov 32, contact shadow, 3.5° pointer parallax,
900ms assembly, static AVIF fallback for mobile/reduced-motion. Projects page is
a real A4 wire-o sketchbook with a 620ms interruptible CSS page turn, drag,
arrow keys, index tabs, click-to-zoom with focus trap, a mobile scroll-snap stack,
and a Text mode toggle. Exactly three moments exceed 240ms; two infinite loops
total. Real form endpoint from env, never a fake success. Banned: chrome blob,
loader screen, cursor particles, confetti, skill percentages, fake metrics,
"passionate", "seamless", "crafting digital experiences".
````

---

## PART D — WHAT TO SEND TO THE AGENT

Paste in this order, in one message:

1. Section 0 (existing codebase)
2. Sections 1–18
3. `LANDING_PAGE_PROMPT.md`
4. `PORTFOLIO_PROMPT.md` section "COPY RULES" only

Then: "Do Step 1 only. Stop and wait."

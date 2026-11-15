# PROMPT — White editorial portfolio (v3)

Self-contained. You can paste this alone, with no other document.

---

## 1. THE BRIEF

Build a portfolio for **Rachit Dudhaiya**, a creative developer. White, typographic,
editorial. The page should look like it was art-directed by one person: hard left
edges, oversized Syne type, hairline rules, mono labels, and a lot of air. Motion is
used to reveal structure, not to decorate.

The single idea: **the type is the design.** No 3D blob, no gradient mesh, no glass
cards. If a section would still work with the type set smaller and the rules removed,
it isn't designed enough yet.

Three rules in priority order:
1. Every page has motion, but no two pages use the same move twice.
2. No element may exceed 240ms unless it is a page entrance or a page transition.
3. Nothing that cannot be read at 320px wide and with motion turned off.

---

## 2. TECH

React 18 + TypeScript (strict) + Vite + Tailwind 3.
Framer Motion for entrances and layout. No GSAP. No Lenis. No WebGL.
Native scrolling only. lucide-react for a maximum of six icons.
No component library, no UI kit, no extra animation package.

```
src/
  app/            Home, Work, WorkDetail, About, Contact
  components/
    layout/       Header, Footer, RouteTransition, ScrollProgress, SkipLink
    ui/           Button, TextLink, Label, Rule, Reveal, ClipReveal, Marquee
    home/         Hero, RotatingLine, IndexCard, SelectedWork, WorkRow
    work/         WorkList, PreviewFrame
    about/        Portrait, Timeline, SkillIndex
    contact/      ContactBlock, FormField
  data/           site.ts, projects.ts, experience.ts
  lib/            motion.ts, useRotatingText.ts, useHoverPreview.ts
  styles/         tokens.css, base.css
```

---

## 3. DESIGN TOKENS — WHITE

```
--paper:        #FAFAF6   page background (warm white, never #FFFFFF)
--surface:      #FFFFFF   cards, form fields
--ink:          #0D0D0B   primary text
--ink-2:        #3A3A35   body text
--muted:        #6E6E66   captions, meta
--rule:         #E3E1D8   hairline dividers
--rule-ink:     #0D0D0B   emphasis rules (2px max)
--accent:       #2B3BFF   THE accent. Links, active states, one filled block
--accent-tint:  #EDEFFF   tag backgrounds, faint fills
--marker:       #E9FF6B   highlighter behind 1–2 words per page, never as a fill
```

Discipline:
- One accent. Ultramarine only. No second brand colour.
- One highlighter swipe per page, maximum. Two words behind it, not a sentence.
- No drop shadows except the work preview frame: `0 24px 60px -30px rgba(0,0,0,.35)`.
- Radius 0 everywhere. 2px on inputs. No pills except the availability badge.
- One grain layer at 2% opacity, hero only. No gradient backgrounds.

Grid: 12 columns, 24px gutter, margins 24 / 40 / 64, max-width 1440px.
Vertical rhythm: 4px base. Section padding 72px mobile / 112px desktop.
Dividers are 1px `--rule`, full-bleed, never inset.

---

## 4. TYPOGRAPHY SYSTEM

```
Display      Syne, variable 400–800          headings, name, numbers
Sans         Space Grotesk 400 / 500         body, subheads, UI
Mono         IBM Plex Mono 400 / 500         labels, meta, nav indices, dates
```

Load exactly three files (Syne variable, Space Grotesk 400/500, Plex 400/500).
`font-display: swap`, preload Syne only.

| Role | Spec |
|---|---|
| Hero name | Syne 800, `clamp(52px, 12.5vw, 176px)`, line-height .84, tracking -.03em, uppercase |
| Section title | Syne 700, `clamp(34px, 4.6vw, 64px)`, line-height .95, tracking -.02em |
| Card/project title | Syne 700, 28–34px, line-height 1.05 |
| Lead paragraph | Space Grotesk 400, 20px / 1.55, max 52ch |
| Body | Space Grotesk 400, 17px / 1.65, max 64ch |
| Small | Space Grotesk 400, 14px / 1.5, `--muted` |
| Label | IBM Plex Mono 500, 11.5px, uppercase, tracking .12em, `--muted` |
| Index number | IBM Plex Mono 400, 12px, tabular-nums |

Rules:
- Never set a heading in mono. Never set body copy in Syne.
- Sentence case for headings. Uppercase only for the hero name, labels, and buttons.
- Left-align everything. Zero centred paragraphs anywhere on the site.
- Every section opens with a mono label and a hairline rule: `01 — SELECTED WORK`.

---

## 5. THE ROTATING LINE (hero)

Under the name, one line of Space Grotesk 500 uppercase that types itself and
changes every few seconds.

```
Phrase list (data-driven, lib/useRotatingText.ts):
  1. CREATIVE DEVELOPER
  2. BUILDING DIGITAL EXPERIENCES_
  3. INTERFACE  /  MOTION  /  3D
  4. REACT · TYPESCRIPT · WEBGL
```

Behaviour:
- Type at **45ms per character**, hold **1400ms**, delete at **22ms per character**,
  pause **320ms**, then next phrase. Full cycle ≈ 2.8–3.4s.
- A caret sits at the end: a 2px × 1.05em block in `--accent`. It blinks at 1s
  `steps(1,end)` while idle, and stays solid while characters are being typed.
- The phrase starts at t=400ms on first load, after the name has revealed.
- Left-aligned, 18–22px, tracking .04em, `--ink-2`. The caret never moves the
  baseline: the line has a fixed height, and the widest phrase is measured once
  on mount to reserve space.
- No layout shift: the container is `min-height: 1.6em` and `white-space: nowrap`
  with `overflow: hidden` at narrow widths.
- `prefers-reduced-motion`: no typing. Crossfade phrases at 200ms, no caret blink.
- Accessibility: the animated span is `aria-hidden="true"`. A static
  `<span class="sr-only">Creative developer building digital experiences</span>`
  carries the meaning. Do not use `aria-live` here — it would announce every
  character.
- Pause the timer when the tab is hidden (`document.visibilitychange`).

---

## 6. PAGES

### HOME — `/`

**Hero (100svh, type-led, no canvas)**

```
┌──────────────────────────────────────────────────────────┐
│ RD  RACHIT DUDHAIYA      WORK  ABOUT  CONTACT   ● OPEN   │ 64px header
│                                                          │
│ RACHIT                                                   │  Syne 800, 12.5vw
│      DUDHAIYA                                            │  second line offset +6vw
│                                                          │
│  — CREATIVE DEVELOPER▌                                   │  rotating line
│                                                          │
│  I design and build interfaces that move well and        │  20px lead, 52ch
│  load fast. Currently open for select projects.          │
│                                                          │
│  [ SEE THE WORK ]   VIEW CV ↗                            │
│                                                          │
│  AVAILABLE — Q2 2026      DELHI, IN 14:32      SCROLL ↓  │ meta strip
└──────────────────────────────────────────────────────────┘
```

- Two-line name with the second line indented 6vw. That offset is the whole
  composition — do not centre it.
- To the right of the name on desktop: a 260×300 **index card** (white, 1px rule)
  containing four mono rows: Status / Location / Local time / Email. It slides in
  12px from the right at 560ms. On tablet it moves below the lead. On mobile it's
  a single row of two facts.
- Bottom meta strip sits on a full-bleed 1px rule.
- No background image, no blob, no decorative circle. Optional: one oversized
  "2026" in Syne 800 at 3% ink behind the name, cropped by the viewport.

**Entrance (900ms total)**
| t | Move |
|---|---|
| 80 | Name line 1 clip-reveals from bottom, 700ms |
| 160 | Name line 2 same, 80ms later |
| 400 | Rotating line starts typing |
| 560 | Index card slides in 12px, fades |
| 700 | Lead paragraph + CTAs, 60ms stagger |
| 820 | Meta strip fades |
| 900 | Scroll cue begins its single loop |

**Section 2 — Selected work (3 rows)**
Rows, not cards. Each row spans the full width and is 1px-ruled top and bottom:
`01` mono · project name Syne 34px · one-line description 15px muted · year mono ·
`↗`. On hover the row background turns `--surface`, the name shifts 6px right and
the arrow 4px. On desktop, a 420×315 preview frame is pinned in columns 9–12 and
crossfades (240ms) to the hovered project; the frame itself never moves. On mobile
each row shows a 16:10 thumbnail inline.

**Section 3 — Marquee**
One loop, 28s linear, 12px mono, accent dots between items. Facts only:
`5 PROJECTS · REACT + TYPESCRIPT · WEBGL · DELHI, IN · LAST UPDATED MAR 2026`.
Pauses on hover and under reduced motion. This is the only marquee on the site.

**Section 4 — Approach**
Three numbered statements, 01/02/03, set as a 2-column list: a 2px rule, a mono
number, a Syne 28px statement, one 15px line of support. No icons.

**Section 5 — CTA block**
Full-bleed `--accent` panel, `--paper` text, 96px Syne "LET'S BUILD SOMETHING."
and a single white outline button. This is the only filled accent surface on the
site. It should feel like a different room.

### WORK — `/work`
Header with a mono count (`05 PROJECTS / 2022—2026`). Then a vertical list: year
on the left in mono, title 40px, one line, stack as 12px mono tags, arrow right.
No grid. Rows reveal with a 50ms stagger on mount. Hover paints the row white and
draws a 1px ink rule under the title. Filter chips are allowed only if there are
more than eight projects.

### CASE STUDY — `/work/:slug`
Sticky left rail (320px) with mono meta: role, year, stack, live link, and a
reading-progress bar. Content column 720px max.
Order: one-line result → context (2 paragraphs) → "What I built" (4 bullets) →
2–4 images → outcome (real numbers or "too early to tell") → "What I'd do
differently" (2 bullets) → next project.
Images reveal with `clip-path: inset(0 0 100% 0) → inset(0)`, 720ms, once, on
scroll. Captions in mono 11.5px.

### ABOUT — `/about`
Masthead: mono issue line, 4px ink rule, Syne 64px "ABOUT".
Two columns: portrait (4:5, 1px border, no radius) and three short paragraphs.
Then philosophy as three pull quotes in Syne 32px.
Then experience as a plain table: years / role / company / one line. No logos.
Then "Tools I use" as a comma list with years — **no percentage bars, no radar
chart, no star ratings**.
One scrubbed animation: the vertical timeline rule draws with scroll progress.

### CONTACT — `/contact`
Split screen. Left: mono label, Syne 56px "LET'S MAKE SOMETHING.", a 28px email
link, availability, local time. Right: the form.
Fields: name, email, project type (4 choices), budget (4 choices), message.
Labels sit above fields in mono 11.5px and lift 2px on focus. The underline
draws left-to-right in 180ms on focus. The submit button fills from the bottom on
hover and sits at 100% width.
Real submission only: read `import.meta.env.VITE_FORM_ENDPOINT` (Formspree or a
serverless function). If unset, disable the button and show "Email me instead"
with a mailto. Never simulate success with a timer. Surface real HTTP errors.
States: idle / sending / success / error, announced with `aria-live="polite"`.
Success = a stamped "SENT" mark rotating in at -6° with a 400ms ease-out. No
confetti.

### FOOTER
Full-bleed 1px ink rule, then Syne 700 at `clamp(48px, 9vw, 128px)` on two lines:
"LET'S TALK." and an arrow. Below: three columns of mono links, email, and
"© 2026 RACHIT DUDHAIYA — BUILT WITH REACT". Back-to-top is a text link, not a
circle button.

---

## 7. MOTION SYSTEM

```
120ms   micro: link underline, row arrow, chip state
240ms   standard: hover surfaces, preview crossfade, tab change
480ms   entrance: section headers, rows, form fields
720ms   reveal: clip-path image reveals, hero name
420ms   route transition
```

Easing: `cubic-bezier(.2,0,0,1)` for standard, `cubic-bezier(.16,1,.3,1)` for
entrances and clips. Never bounce, never elastic, never `ease-in-out` for enters.
Stagger 50ms, capped at 6 items.

**Route transition:** 420ms. Three paper-coloured panels wipe up with 40ms
stagger and a 1px ink leading edge; the new page's mono title flashes for 180ms
at the midpoint. Use the View Transitions API where available, CSS fallback
otherwise. One transition type for the whole site. Navigation is never delayed
more than 420ms.

**Scroll progress:** 2px `--accent` bar at the top of the viewport, width bound to
scroll progress. Present on all pages except Home.

**Per-page inventory — no page repeats another's move**

| Page | Moves |
|---|---|
| Home | Name clip-reveal, typing line, card slide, row stagger, preview crossfade, marquee, accent CTA panel |
| Work | Row stagger on mount, hover rule draw, preview fade |
| Case study | Image clip reveals, sticky rail, reading progress |
| About | Portrait mask reveal, pull-quote fade, timeline scrub |
| Contact | Field underline draw, label lift, button fill, SENT stamp |
| Footer | Oversized type clip reveal |

**Reduced motion:** all entrances become a 120ms opacity change; typing becomes a
crossfade; the marquee becomes static text; the timeline scrub snaps. Nothing is
hidden or unreachable.

---

## 8. MICRO-INTERACTIONS

- Text links: a 1px underline draws from left in 180ms and retreats on blur. No
  colour change on hover — the underline is the feedback.
- Buttons: ink fill wipes upward over 200ms; label stays still.
- Nav items: the mono index (`01`) slides in from the left on hover, the label
  moves 4px right.
- Work rows: name `translateX(6px)`, arrow `translateX(4px)`.
- Form fields: label `translateY(-2px)`, underline `scaleX(0→1)` from the left.
- Focus: 2px `--accent` outline with 2px offset on every interactive element.
- Cursor: **native**. Do not build a custom cursor.

---

## 9. CONTENT

Source of truth: `src/data/`. Use only real projects, real links, real numbers.
If a link cannot be verified, remove the project.

Provisional projects: A2Z Properties (real estate discovery), AttendX (workforce
attendance), Panarait (spatial audio/visual platform), Hyperion WebOS (browser
OS), Kroma Spatial (3D configurator).

Voice: first person, contractions, specific. One long sentence is allowed per
section; the rest short.

Good: "Rebuilt the property search so results render from cache in 40ms instead
of hitting the API on every keystroke."
Bad: "Passionate about crafting seamless digital experiences that blend art and
technology."

Banned: passionate, crafting, seamless, elevate, innovative, journey, unleash,
empower, "at the intersection of", "more than just", "let's build something
amazing", "I don't just X, I Y".
No emoji. No exclamation marks in body copy. Every project states one tradeoff.

---

## 10. ANTI-GENERIC CHECKLIST

[ ] At least three different type sizes visible in every viewport.
[ ] Every section starts with a mono label + hairline rule.
[ ] Left edges are hard; no centred paragraph anywhere.
[ ] One accent colour, one highlighter swipe per page.
[ ] No gradient, no blob, no glass, no 3D object, no stock photo of a laptop.
[ ] No icon-card feature grid ("01 ⚡ Fast / 02 🎨 Beautiful").
[ ] No skill percentages, radar charts, or star ratings.
[ ] No "trusted by" logo strip, no fabricated testimonials, no fake metrics.
[ ] No custom cursor, no confetti, no autoplay audio, no loader screen.
[ ] Exactly one marquee and one scroll-scrubbed element on the whole site.
[ ] The rotating line is the only text on the page that moves on its own.
[ ] Reading the copy aloud does not sound like a pitch deck.
[ ] Site is readable with JS off and motion off.

---

## 11. PERFORMANCE + ACCESSIBILITY ACCEPTANCE

- LCP < 1.8s on 4G (the name is text, so this should be easy — do not waste it on fonts).
- CLS < 0.02. Reserve the rotating line height and every image's aspect ratio.
- Total JS ≤ 120KB gzipped. Home page must render its content without JS.
- Fonts: three files, subset to Latin, preload Syne only, `swap`.
- Images: AVIF, 1600w max for case studies, 640w for thumbnails, explicit
  width/height, lazy below the fold.
- 60fps on a mid-range Android; no layout-bound animation (animate transform and
  opacity only; never animate width, top, or box-shadow).
- Contrast ≥ 4.5:1 body, ≥ 3:1 large text. Verify `--muted` on `--paper`.
- Full keyboard path, skip link, visible focus ring, one h1 per page, heading
  order with no skips, `aria-hidden` on all decorative animation.
- Works at 320px, 768px, 1024px, 1440px, 1920px and at 200% zoom. No horizontal
  scroll at any width — fix the offending element, don't add `overflow-x: hidden`.

---

## 12. DEFINITION OF DONE

[ ] `npm run build` passes, zero TS errors, zero console warnings in production.
[ ] All five routes reachable from the nav; no dead links.
[ ] Rotating line cycles through all four phrases and pauses on hidden tab.
[ ] Rotating line is `aria-hidden` with a static screen-reader alternative.
[ ] Contact form posts to a real endpoint or is honestly disabled with a mailto.
[ ] Every page has motion per the inventory, and no page repeats another's move.
[ ] Reduced-motion pass verified with the OS setting on.
[ ] Lighthouse mobile: Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100.
[ ] Section 10 checklist fully ticked.

---

## 13. PROCESS

1. Output a plan only: the type scale as a table, the palette with hex, the hero
   wireframe (ASCII is fine), the motion inventory, and the exact hero copy.
   **Stop and wait.**
2. Build tokens + header + home hero with the static type. Show it before adding
   any motion.
3. Add the rotating line, then the home entrance sequence.
4. Build work index → case study → about → contact → footer.
5. Responsive pass at 320 / 768 / 1024 / 1440 / 1920.
6. Report: bundle size, LCP, CLS, list of every animation with its duration, and
   the completed checklist.

---

## SHORT VERSION (if you only have room for one paragraph)

````text
Build a white editorial portfolio for Rachit Dudhaiya. Warm white #FAFAF6, ink
#0D0D0B, one ultramarine accent #2B3BFF, hairlines #E3E1D8. Syne 800 for the
oversized two-line name (second line indented 6vw), Space Grotesk for body and
subheads, IBM Plex Mono for labels at 11.5px uppercase. Left-aligned everywhere,
12-column grid, max 1440px, radius 0, no shadows, no gradients, no 3D. Hero is
type-only with an index card on the right and one rotating line under the name
that types itself ("CREATIVE DEVELOPER" → "BUILDING DIGITAL EXPERIENCES_" →
"INTERFACE / MOTION / 3D") at 45ms/char, holds 1.4s, deletes, loops every ~3s
with a blinking accent caret; aria-hidden with a static screen-reader alternative.
Every page animates but no page repeats another's move: home uses a name clip
reveal, work a row stagger with a hover preview frame, case study clip-path image
reveals, about a timeline scrub, contact an underline draw and a SENT stamp.
One marquee, one scrubbed element, one filled accent panel (the CTA), native
cursor, no confetti, no loader. LCP < 1.8s, JS ≤ 120KB, Lighthouse 95+/100/100/100.
````

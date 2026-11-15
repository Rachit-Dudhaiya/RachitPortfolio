# Creative build prompt — 3D landing, sketchbook projects, motion system

Companion to `PORTFOLIO_PROMPT.md`.
Use the simple prompt for **copy, structure and accessibility rules**; use this one for **art direction, 3D and motion**.

The two do not conflict: same tone of voice, same real content, but this file turns the site into a crafted object instead of a document.

---

## 1. Full prompt (copy everything in this block)

````text
You are a senior creative developer and an art director. Build my portfolio as a
single crafted object: a physical sketchbook that happens to live in a browser.
It must feel authored by one person with taste, not assembled from effects.

Rules of engagement, in priority order:
1. Only THREE moments are allowed to be spectacular. Everything else is quiet.
2. Every animation must be interruptible, reversible, and cheap.
3. If an effect does not help someone understand the work, delete it.

## THE THREE SIGNATURE MOMENTS

S1. Landing — one 3D still-life on a desk. Loads after text, parallaxes 3°.
S2. Projects — a real sketchbook: cover, spreads, page turns, taped evidence.
S3. Navigation — a single 420ms paper slide between pages. Used once per route.

Everything outside these three gets 120–240ms of colour and transform only.
No fourth signature. No marquees, no custom cursor, no audio, no scroll-jacking.

## ART DIRECTION

Concept: a working sketchbook left open on a desk under one warm lamp. Evidence
of process, not a portfolio of achievements.

Palette
  --paper:        #F3EEE3   page
  --paper-deep:   #E8E1D2   page edges, gutter
  --desk:         #DCD3C2   surface under the book
  --ink:          #1B1A16   printed text
  --pencil:       #6E6B61   annotations, captions
  --rule:         #D5CDBC   hairlines, grid
  --vermillion:   #C8452D   ONE accent: stamps, active tab, key marks
  --blueprint:    #2B4C8C   second ink, only for technical annotations

Two inks maximum on any spread: ink + one accent. No neon, no gradients used as
decoration except real light falloff and the gutter shadow.

Type
  Printed:  "Inter Tight" 400/500 — headings and body
  Notes:    "Caveat" 500 — handwriting. HARD CAP: 6 annotations per spread,
            each 12 words or fewer. Handwriting everywhere is the fastest way
            to look generated.
  Data:     "JetBrains Mono" 11px uppercase — dates, tags, page numbers only
  Scale: 11 / 13 / 15 / 18 / 28 / 44 / clamp(44, 6vw, 72)

Material
  Paper: fractal-noise SVG at 2.5% opacity, 5mm dot grid at 4% opacity.
  One coffee ring per book (~30% opacity, blend multiply), not per page.
  Tape: 3 washi pieces max per spread, clip-path serrated edges, slightly
  rotated 1.5–4°, with a translucent tint and a 1px darker edge.
  Pages: 2px visible edge stack, gutter shadow via inset box-shadow, corner
  curl only on hover of the outer 40px.
  Desk: one soft shadow under the book (blur 28px, 12% black), no other
  shadows anywhere on the page.

## S1 — LANDING PAGE

Layout: 55vh hero, left-aligned text, the 3D still-life on the right 45% of the
grid on desktop; below the text on mobile.

  H1: [Name] — [role] in [city]
  Serif-free: one line in Inter Tight 500, plus one sentence in --pencil.
  Two links: solid "Open the sketchbook" → /projects, and a text email link.

3D SPEC (React Three Fiber + drei, three r160)
  Scene: a folded paper form resting on a sheet of paper, with a pencil and a
  6-inch ruler as scale props. One desk, one lamp, one object story — not a
  museum of shapes.

  Explicitly banned objects: chrome torus knot, floating sphere, morphing blob,
  rotating wireframe globe, glossy "AI orb", particle field, animated mesh
  gradient. If the object does not relate to paper or drawing, it is wrong.

  Camera: perspective, fov 33, position [0, 1.1, 6.2], target [0, 0.15, 0].
  No orbit controls for the user. No scroll-linked camera.

  Lighting:
    key   area light 3.2, warm #FFE7C7, from [3.2, 4.4, 3.8]
    fill  area light 0.7, cool #D9E4F2, from [-4, 1.2, 2.4]
    rim   directional 1.4, #FFFFFF, from behind [-1, 2.5, -5]
    env   RoomEnvironment at 0.25 intensity, nothing stronger
  Materials: MeshStandardMaterial, paper roughness 0.92 / metalness 0,
  a subtle normal map for fibre. No transmission, no glass.
  Shadow: drei ContactShadows, opacity 0.34, blur 2.6, far 4.5. No real-time
  shadow maps.
  Post-processing: none. No bloom, no chromatic aberration, no film grain pass.

  Idle motion: rotate the paper form at most 0.12 rad/s, plus pointer parallax
  of ±3° with lerp 0.05. That is the entire animation. No float, no bounce.
  Stop rotating while the pointer is inside the canvas.

  Performance contract:
    DPR clamped to [1, 1.75]
    pause rendering when the tab is hidden or the canvas leaves the viewport
    dynamic import the 3D chunk; never block first paint
    hero text must be readable before the model appears (target LCP < 2.0s)
    if average frame time exceeds 22ms for 1s → drop DPR to 1 and disable
    parallax. If it still exceeds → swap to the static image.
    total 3D bundle ≤ 200KB gzipped; textures ≤ 320KB total

  Fallback (required, not optional): a pre-rendered AVIF of the same still-life,
  ≤ 45KB, used for: no WebGL, prefers-reduced-motion, saveData, viewport < 640px,
  or low battery. The fallback must be visually identical in composition so
  nobody notices the swap.
  Canvas is aria-hidden with a one-sentence text alternative describing the scene.

## S2 — PROJECTS: THE SKETCHBOOK

This is the centrepiece. Build it as a real object, not a carousel.

Object: A4 landscape, wire-o bound on the left, 5 project spreads plus a cover
and a back cover. Rendered in DOM + CSS 3D (no WebGL here — a canvas book will
jank and will look worse).

Container: perspective 2200px, book tilted rotateX(1.5deg), one desk shadow.
Book width min(1180px, 92vw), aspect ratio 1.414 : 1.

COVER
  Title set 44–72px, one tape strip across the top-left corner, a stamped year
  bottom-right, "01 / 05" bottom-left in mono. Hover: the cover lifts 2px and a
  1px line of the first page shows at the edge. Click or Enter opens it with a
  700ms turn.

SPREAD ANATOMY (every project)
  Left page — process:
    · 2–3 process images taped down, each ≤ 260px wide, slight rotations
    · 3 pencil notes with hand-drawn arrows (SVG paths, 1.5px, --pencil)
    · 1 highlighted line using a marker swipe (a skewed translucent rectangle)
    · a stamped date in --vermillion, rotated -4°
  Right page — result:
    · one large real screenshot, 1px hairline, 2px white mount border
    · caption in --pencil, 13px, says what to look at
    · meta row in mono 11px: role · year · stack
    · "Open case study ↗" text link
  Gutter: 36–48px inner padding, spine shadow inset 24px.
  Outer margins: 56px. Page numbers bottom outer corners, mono 10px.
  Max per spread: 2 tape pieces, 1 sticker, 6 handwritten words-blocks.
  Restraint is the difference between "artist's book" and "scrapbook sticker pack".

PAGE TURN (the one animation people will remember)
  Duration 620ms, transform-origin left center, rotateY 0 → -168deg,
  easing cubic-bezier(0.2, 0.75, 0.25, 1).
  Implement as two stacked faces: front (current page) and back (blank paper,
  rotateY 180deg, backface-visibility hidden).
  During the turn, overlay a specular band: linear-gradient at 105deg,
  animating opacity 0 → 0.28 → 0, translated across the page.
  Add a 1px curl: border-radius 0 6px 6px 0 that peaks mid-turn.
  Under-page must be visible underneath the whole time (no white flash).
  will-change: transform only while turning; remove it after.
  Turn must be interruptible: a second drag mid-turn reverses from the current
  angle, never snaps.

NAVIGATION
  · Drag: pointer events, threshold 60px or velocity 0.5; snap back with spring
  · Keyboard: ← → Home End, Esc closes any overlay
  · Edge zones: clicking the outer 8% of either page turns it
  · Index tabs on the right edge: 5 numbered tabs, active one pulled out 10px
  · Progress: "02 / 05" in mono, bottom centre of the desk
  · Header control: "Book / Text" toggle (see accessibility)

ZOOM
  Click any image → full-bleed viewer, 90vw × 88vh, image object-contain,
  zoom 100–300% via wheel and buttons, drag to pan when zoomed, focus trap,
  aria-modal, Esc closes, "1:1" reset button. No loupe circle, no magnifier
  following the cursor.

MOBILE (< 900px)
  Do not fake the 3D flip on a phone; it looks broken and eats the battery.
  Instead: vertical snap-stack of spreads (CSS scroll-snap, y proximity), one
  page per screen, sticky "02 / 05" pill, images tap-to-zoom, index becomes a
  bottom sheet. The paper texture, tape and handwriting stay.

TEXT MODE (required)
  A "Text" toggle in the sketchbook header swaps the object for a plain list of
  projects with every case-study fact in semantic HTML. Same URL, same content,
  no animation. This is how the book stays accessible and indexable. Remember
  the choice in localStorage.

## S3 — MOTION SYSTEM (all pages)

Tokens
  micro     120ms   colour, border, underline
  standard  240ms   hover lifts, tab changes
  entrance  520ms   section headers and rows, once, on first paint
  scene     700ms   cover open, zoom open
  nav       420ms   page transition

Easing
  standard  cubic-bezier(0.2, 0, 0, 1)
  entrance  cubic-bezier(0.16, 1, 0.3, 1)
  page turn cubic-bezier(0.2, 0.75, 0.25, 1)
  Never use bounce or elastic. Ever.

Entrance choreography
  Headers: opacity 0→1, translateY 14px→0, 520ms.
  Rows: same, staggered 40ms, maximum 6 items staggered; the rest appear with
  the group.
  Trigger: on mount, not on scroll. Scroll reveals only for the About timeline.

Allowed scrubbed animation (exactly one)
  About page: the vertical timeline line draws with scaleY tied to scroll
  progress. No pinning, no horizontal scroll section, no zoom parallax.

Page transition
  420ms. A paper-coloured panel slides up 100% and out, with a 1px ink line
  leading its edge. Use the View Transitions API where supported, CSS fallback
  otherwise. One transition type for the whole site. No curtain + title flash.

Contact page
  Field underline draws left-to-right on focus (180ms). On submit success, the
  form folds upward and a stamped "SENT" mark lands with rotate(-8deg) and a
  400ms ease-out overshoot of 4%. No confetti.

Work index page
  Text rows. On hover (desktop only) a 180×110 thumbnail preview follows the
  cursor with 80ms lerp inside the row's bounds. Mobile: thumbnails are inline.

Reduced motion
  prefers-reduced-motion → no page turn (instant swap), no parallax, no scroll
  scrub, no stage entrance. 3D replaced by its static image. Nothing breaks.

## ANTI-AI / ANTI-KITSCH CHECKLIST

[ ] Exactly three spectacular moments. Count them out loud.
[ ] 3D object is paper-related and lit by one lamp story — not a chrome knot,
    an orb, a blob, or a particle field.
[ ] No custom cursor, no audio, no Lenis, no scroll hijack, no loader screen.
[ ] Handwriting capped at 6 annotations per spread, each ≤ 12 words.
[ ] Max 2 tape pieces + 1 sticker per spread. No emoji anywhere.
[ ] One accent ink (vermillion) + one technical ink (blueprint). Nothing else.
[ ] No grid of glowing cards pretending to be a notebook.
[ ] All project visuals are real screenshots or real process photos — never
    abstract SVG art standing in for work.
[ ] No "SYSTEM v5.0", "TELEMETRY", "60 FPS LOCKED" HUD copy. No fake metrics.
[ ] Copy is first person, specific, and admits one tradeoff per project.
[ ] Delete every animation that isn't S1, S2, S3, or a 120–240ms hover.
[ ] Site still reads well with motion off, images off, and JS off.

## PERFORMANCE BUDGET

  Home total JS ≤ 320KB gz, of which 3D ≤ 200KB.
  Projects page JS ≤ 90KB gz (DOM/CSS book, no WebGL).
  Fonts: 3 families, only the weights used, font-display: swap, preloaded.
  Images: AVIF, spreads at 1600w, thumbs at 320w, explicit width/height,
  priority only on the first spread, everything else lazy.
  Textures: ≤ 320KB total; prefer procedural noise over large PNGs.
  60fps target on an iPhone 12 and a mid-range Android; verify with the
  performance panel, not by eye.
  CLS < 0.05 — reserve the canvas aspect ratio and the book aspect ratio.
  LCP < 2.0s on 4G: hero text paints before any 3D.

## ACCESSIBILITY

  · Canvas aria-hidden + text alternative. Book has role="region" with a label.
  · Every turn announced via aria-live: "Spread 2 of 5, AttendX".
  · Full keyboard operation of the book, index, and zoom modal (focus trap).
  · Text Mode provides every fact in semantic HTML. This is not optional.
  · Contrast ≥ 4.5:1. Handwriting is decoration and never the only carrier of
    information — every note is duplicated in the caption.
  · 44px tap targets. Works at 320px and at 200% zoom.

## PROCESS

Step 1 — Storyboard before code. Output:
  · 5 frames of the landing (text only → 3D load → parallax → scroll → mobile)
  · 4 frames of a page turn (start, 40%, 75%, end) with the specular band
  · 1 frame of a finished spread, labelled with every element
  · the motion token table
Wait for approval.

Step 2 — Build in this order: layout + tokens → landing 3D with fallback →
book cover and one spread → page turn → remaining pages → mobile → text mode.

Step 3 — Hand me a performance report: bundle sizes, LCP, CLS, frame time on
the book turn, and a list of every animation in the build with its duration.

Deliver: file tree, all copy written out, real image slots named
`project-01-left-01.avif` etc., and a README explaining how to add a project
(add folder, add 2 process images, 1 screenshot, 3 notes → it appears in the book).
````

---

## 2. Short prompt (one paragraph)

````text
Build my portfolio as a physical sketchbook. Landing: one React Three Fiber
still-life (folded paper form + pencil + ruler on a desk, warm key light, soft
contact shadow, pointer parallax of 3°, no chrome knot, no orb, no particles) with
a static AVIF fallback for mobile and reduced-motion. Projects page: a real A4
wire-o book, cover → 5 spreads, each spread = process page (taped images, 3 pencil
notes, one stamped date) + result page (one large real screenshot, caption, meta
row), with a 620ms interruptible CSS page turn including a specular band and a
mid-turn curl; drag, arrow keys, edge click, right-edge index tabs, click-to-zoom
with focus trap, vertical snap-stack on mobile, and a "Text mode" toggle. All
other pages: 120–240ms hover only, 520ms staggered entrances on mount, and one
420ms paper-slide transition between routes. Three spectacular moments total;
everything else silent. Palette: paper #F3EEE3, ink #1B1A16, pencil #6E6B61,
vermillion #C8452D accent, blueprint #2B4C8C for technical notes. Three fonts max,
handwriting capped at 6 annotations per spread. No custom cursor, no audio, no
scroll hijacking, no loader, no fake HUD metrics, no emoji.
````

---

## 3. Assets you need before this can look good

The build prompt is only half of it. Ugly inputs make an ugly book, no matter how good the page turn is.

| Asset | Spec | Where it goes |
|---|---|---|
| 5 project screenshots | 1600×1000 min, real UI, no dribbble-style fakes | right page, full width |
| 10–15 process shots | photos of wireframes, Figma, code, whiteboard, your desk | left page, taped |
| 1 portrait or desk photo | 4:5, natural light, not a studio headshot | about page |
| 1 paper texture | or use procedural noise (preferred) | global overlay |
| 1 AVIF hero render | 1200×900, ≤ 45KB, same composition as the 3D | mobile / no-WebGL fallback |
| Handwriting style | write your real notes, then typeset them in Caveat | pencil annotations |

**Optional but strong:** export the 3D still-life as a `.glb` under 1MB from Blender — a folded paper form, a pencil, a ruler — and load that instead of building it procedurally. Procedural is cheaper and easier to light consistently; a GLB lets you sculpt something specific to you.

---

## 4. How this coexists with `PORTFOLIO_PROMPT.md`

| Concern | Use |
|---|---|
| Sitemap, page specs, copy voice, banned phrases | `PORTFOLIO_PROMPT.md` |
| Palette, type, 3D scene, sketchbook object, motion tokens | this file |
| Accessibility and Lighthouse acceptance criteria | both — they agree |
| "Don't look AI-generated" checklist | both, merged: 12 + 12 items |

If you paste both into the same agent, say this first:

> Use PORTFOLIO_PROMPT.md for information architecture, copy and accessibility.
> Use PORTFOLIO_PROMPT_CREATIVE.md for art direction, 3D and motion. Where they
> disagree on visuals, the creative file wins. Where they disagree on copy, the
> simple file wins.

---

## 5. The one risk to manage

A sketchbook with page turns, taped photos, handwriting and a 3D desk can very easily tip into **kitsch** — the same failure mode as a crypto startup site, just with paper instead of neon. The three controls that prevent it:

1. **One accent ink.** Vermillion only. The moment blueprint blue and vermillion both start appearing on every page, it becomes a craft fair.
2. **Six handwritten notes per spread, maximum.** If the pencil is everywhere, none of it reads as a note.
3. **Silence between moments.** The book should be the only loud thing on the page. Flat paper, no shadows, no hover wobble, no icons.

# LANDING PAGE PROMPT — deep spec

Companion to `PORTFOLIO_MASTER_PROMPT.md`. This file covers only `/` (home).
The landing page is the hardest page and the one people judge. Everything here
overrides the general spec where they differ.

---

## 1. The concept, in one sentence

**A chrome sketchbook-sheet stack floating over an oversized name, lit like a
product shot, assembled once and then left alone.**

Why this and not a chrome blob: the site's identity is *paper and process*. Making
the hero object a metal stack of sheets keeps one idea across the whole site —
paper on the projects page, the same paper in chrome on the landing page. A blob
would be a second, unrelated idea, which is exactly how generated portfolios feel.

Alternates, if you must change it:
- **A (safest):** extruded chrome "R" on a plinth, 40cm deep, two strip lights.
- **C (risky, not recommended):** flowing liquid ribbon. Beautiful when perfect,
  generic when not, and the most expensive to light.

---

## 2. Layer stack (z-index order, fixed)

```
100  page transition overlay
 90  grain overlay (fixed, pointer-events-none, 3.5%)
 80  cursor
 70  fixed header
 60  hero meta: corners, coordinates, time, availability
 50  CTA row
 40  intro paragraph
 30  name type (mask-revealed)
 25  canvas blend overlay (mix-blend-mode: screen, opacity .06)
 20  canvas (3D scene)
 10  vignette (radial, 22% at edges)
  0  --void background
```

The name sits **above** the canvas. The canvas gets `mix-blend-mode: screen` so
the chrome highlights bleed through the bone letterforms instead of hiding
behind them. This one blend mode is what makes the composition look composed
rather than stacked.

---

## 3. Layout

```
100svh (use svh, never vh — mobile URL bar)
grid: 12 cols, 24px gutter, 24px/48px margins, max 1440px

  ┌──────────────────────────────────────────────┐
  │ mark              nav                 CTAs    │  64px fixed header
  │                                              │
  │ RACHIT.                        [ 3D stack ]   │  name 16vw, bleeds
  │                                [  420×300 ]   │  left by -2vw
  │ CREATIVE DEVELOPER / DIGITAL BUILDER          │
  │                                              │
  │ two-line intro (max 46ch)                     │
  │ [ SEE THE WORK → ]  [ EMAIL ↗ ]               │
  │                                              │
  │ ● OPEN FOR WORK   IST 14:32   [SCROLL ↓]      │  56px footer strip
  └──────────────────────────────────────────────┘
```

- Name: `clamp(64px, 16vw, 240px)`, Bricolage 700, `line-height .8`,
  `letter-spacing -.05em`, uppercase, bone. Left edge at `-2vw` so the R is
  slightly cropped — deliberate asymmetry, not a bug.
- Role line: mono 12px, uppercase, `0.16em`, bone-dim, sits on the baseline of
  the name's last line, offset 24px right. Not centred.
- Intro: 17px/1.6, bone at 72%, `max-width: 46ch`, positioned in columns 1–5.
- CTAs: columns 1–5, aligned left. One filled orange, one 1px bone outline.
  Height 52px, padding 0 28px, radius 0, mono 12px uppercase label.
- Corners (desktop only): top-left issue tag, top-right local time, bottom-left
  `28.6139° N / 77.2090° E`, bottom-right availability. All mono 11px, bone-dim.
- One rotated element maximum: vertical `SCROLL — 01/05` on the left edge,
  `writing-mode: vertical-rl`, 10px, bone-dim. Rotate nothing else.

---

## 4. Intro timeline (1.4s, skippable, once per session)

| t (ms) | Event | Spec |
|---|---|---|
| 0 | Paint | Text is already in the DOM. No spinner, no black overlay. A 2px orange progress line under the header fills 0→100 in 900ms. |
| 150 | Name reveal | Outer `clip-path: inset(100% 0 0 0)` → `inset(0)`, 900ms entrance easing. Inner span `translateY(110%)` → `0`. Both together = a mask wipe, not a fade. |
| 420 | Role line | 2 mono lines, 50ms stagger, `translateY(12px)` → 0. |
| 550 | Canvas | `opacity 0→1` 800ms; object `scale .92→1`, `rotateY -8°→0`. Canvas mounts before t=0 with `frameloop="never"` and starts on the timeline tick. |
| 900 | Corners | 4 items, 50ms stagger. |
| 1150 | CTAs | Both, 50ms apart, `translateY(10px)` → 0. |
| 1400 | Scroll cue | Starts its infinite 1.6s drift loop (loop #1 of 2). |

Rules:
- Any `pointerdown`, `wheel`, `keydown` or `touchstart` before 1400ms jumps every
  remaining step to its end state instantly. Never trap the user.
- `sessionStorage.playground_intro_seen` → skip straight to the final state on
  return visits. Do not replay the intro on route changes.
- Under `prefers-reduced-motion`: render the final state at t=0.
- The object's 900ms "assembly" (5 sheets sliding from 40px apart to 0, staggered
  60ms) runs inside the t=550 window. It plays once and never again.

---

## 5. 3D composition — exact

```
camera     perspective, fov 32, position [0, 0.9, 5.6], target [0, 0, 0]
object     group of 5 sheets, each 4.2 × 3.0 × 0.06 units
           sheets fanned 0°, 5.5°, 11°, 16.5°, 22° around Y
           sheet 5 lifted +0.18 on Y and offset 0.12 on Z
           subtle per-sheet rotation on X: -1° to +1.5° (hand-stacked, imperfect)
material   MeshStandardMaterial, metalness 1, roughness 0.07–0.12 (vary per sheet)
           no transmission, no glass, no iridescence
bevel      small chamfer, 0.004 — the edge catch is what sells chrome
lights     key    rectAreaLight 3.0 #FFE3C4 [4, 5, 4], 4×4
           fill   rectAreaLight 0.55 #C9D8FF [-5, 1, 2], 4×4
           rim    directionalLight 2.0 #FFFFFF [0, 3, -6]
           env    RoomEnvironment, intensity 0.28
shadow     ContactShadows: opacity .32, blur 2.6, far 4.5, resolution 512
post       NONE
```

Idle motion: group `rotation.y += 0.06 * delta`, and target rotation from pointer
`±3.5°` on X and Y, lerped at 0.06. Stop the auto-rotation while the pointer is
over the canvas; resume 1.2s after it leaves. No floating up/down. No breathing
scale. No random rotation.

Quality contract:
- `dpr={[1, 1.75]}`, `gl={{ antialias: true, powerPreference: 'high-performance' }}`
- Pause on `document.hidden` and when the canvas leaves the viewport.
- Rolling average of 60 frames; if > 22ms, set dpr 1 and drop parallax.
  If it stays > 22ms for 2s, unmount and swap to the still.
- Dynamic import the scene. Suspense fallback = the AVIF still, not a spinner.
- Canvas `aria-hidden`, with the sentence: "Abstract sculpture: five reflective
  metal sheets fanned like pages."

---

## 6. Fallback still

Export a 1200×900 AVIF, ≤ 45KB, from the exact same camera and lighting.
It must be indistinguishable as a still. Serve it when any of these are true:
`!WebGL`, `prefers-reduced-motion`, `navigator.connection.saveData`,
`navigator.connection.effectiveType` is 2g/3g, `battery.level < 0.2 && !charging`,
or `innerWidth < 640`.

Preload it only in those cases — never competing with the canvas.

---

## 7. Cursor behaviour on this page

Two states only. Default: 8px orange dot. Over the canvas: a 32px bone ring with
the label `EXPLORE` in 10px mono. Magnetic pull on the two CTAs: max 8px, radius
90px. **No trailing particles, no click burst, no blend-mode inversion.** Those
are the three most-copied "creative portfolio" cursor moves and they read as
generated.

---

## 8. Below the fold (still part of the landing page)

Order matters — it's a narrative, not a list:

1. **Ticker** — one marquee, 24s linear, 12px mono, separated by orange dots.
   Contains facts, not adjectives: "5 PROJECTS · DELHI, IN · REACT + WEBGL ·
   LAST UPDATED MAR 2026". Pauses on hover and under reduced motion.
2. **Selected work** — 3 rows, not cards. Each row: `01`, title 40px, one-line
   what-it-is, year, arrow. On hover (desktop): a 200×125 preview appears offset
   32px from the pointer with 80ms lerp. Mobile: inline thumbnail.
3. **Philosophy** — one 64px statement, revealed word-by-word on scroll scrub
   (this is the single allowed scrub). Three words stay orange. No other effect.
4. **Skills index** — a text list, two columns, grouped by Frontend / Systems /
   Craft, with years of use. No bars, no percentages, no logos, no radar.
5. **Contact band** — "Let's build." 96px, plus email as a 28px link, plus the
   availability line. Not a second hero.

---

## 9. Responsive rules

**≥1280px** — as drawn above. 3D at 42% width, right side.
**1024–1279px** — name 17vw, 3D 50% width, opacity .9, sits behind the last two
letters. Corners reduce to top pair only.
**768–1023px** — name 18vw, 3D becomes a full-width band 46vh above the name,
pointer parallax still on (it's a tablet, it can take it).
**<768px** — 100svh becomes `min-height: 100svh` with content flow:
  name → role → 3D band (48vh, static AVIF unless the device benchmarks fast) →
  intro → CTAs full width stacked 12px apart → footer strip with time only.
  Disable parallax, disable magnetic pull, keep the telescoping intro but shorten
  it to 900ms.
**<420px** — name 62px fixed (never clamp below readable), hide coordinates,
shorten the role line to one item.

Never cause horizontal scroll. Test at exactly 320px. `overflow-x: hidden` on the
body is a symptom, not a fix — find the bleeding element.

---

## 10. Copy for the hero — use these, don't improvise

```
NAME      RACHIT.
ROLE      CREATIVE DEVELOPER / DIGITAL BUILDER
INTRO     I build interactive web experiences in React and WebGL, mostly for
          people who care how the thing feels, not just how it looks.
CTA 1     SEE THE WORK
CTA 2     EMAIL ME
STATUS    ● OPEN FOR SELECT PROJECTS — Q2 2026
CUE       SCROLL — SELECTED WORK BELOW
```

Rules: no "passionate", no "crafting", no "at the intersection of", no
"blending art and technology", no exclamation marks. One sentence may be long;
the others should be short.

---

## 11. Landing acceptance criteria

- [ ] LCP < 2.0s on 4G throttled; the name is visible before the canvas appears.
- [ ] CLS < 0.03 — canvas and 3D band have reserved aspect ratios.
- [ ] Intro completes in ≤1.4s and any input skips it.
- [ ] Intro does not replay on route change or return visit.
- [ ] 60fps idle on M1; ≤22ms frame time on a mid-range Android, with automatic
      downgrade proven by a throttled CPU test.
- [ ] Static fallback shows with WebGL disabled and with reduced motion.
- [ ] Keyboard: Tab order is skip-link → mark → nav → work → email; focus ring
      visible on every stop.
- [ ] Exactly two infinite loops exist on this page (status dot, scroll cue).
- [ ] No horizontal scroll at 320px, 375px, 768px, 1024px, 1440px, 1920px.
- [ ] Only one filled orange element per screen region.
- [ ] Reading the hero copy out loud does not sound like a pitch deck.

---

## 12. The five things most likely to ruin this page

1. **Starting the canvas before the type.** The name is the hero; the model is
   the supporting actor. If the model appears first, the page becomes a demo.
2. **Adding a second effect.** One parallax, one reveal, one ticker. The moment a
   glow, a gradient, or a floating label animates on its own, it's noise.
3. **Too much chrome.** Chrome needs one strong environment and a dark background
   to read. If you add more lights, it goes grey and cheap.
4. **Centring everything.** Centred hero + centred buttons + centred intro is the
   shape of every generated landing page. Keep the left edge hard.
5. **Replaying the intro.** Nothing feels more amateur on a portfolio than
   watching the same 1.4s animation on every navigation.

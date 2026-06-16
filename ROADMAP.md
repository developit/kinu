# Kinu — Component & Functionality Roadmap

A long-horizon, numbered execution plan for extending Kinu without betraying its
philosophy. Every item is validated against the current `src/components` tree
(62 components) and `src/index.ts` exports as of 2026-06-16.

This document is written to be executed **one numbered item at a time**. Each item
is self-contained. Stable IDs (e.g. `LAY-1`, `CTL-2`) are for long-running
discussion — never renumber them; mark items `DROPPED` instead of deleting.

---

## 0. How to use this document

### 0.1 ID scheme

`GROUP-N` where `GROUP` is a 3-letter code and `N` is a stable integer.

| Code | Group | Section |
| --- | --- | --- |
| `CON` | Conventions & shared infrastructure | §1 |
| `LAY` | Layout & app shell | §2 |
| `CTL` | Form controls | §3 |
| `DIS` | Display | §4 |
| `CHT` | Conversation / AI surface | §5 |
| `CMP` | Convenience compositions | §6 |
| `ENH` | Enhancements to existing components | §7 |
| `FUN` | Cross-cutting functionality (no new export) | §8 |
| `PARK` | Designed but deferred | §9 |
| `DROP` | Withdrawn (kept for the record) | §10 |

### 0.2 Status legend

- `READY` — spec complete, no blockers, can be picked up now.
- `READY*` — ready but gated behind a `CON-*` foundation item.
- `SPIKE` — needs a small investigation/decision before building.
- `PARKED` — intentionally deferred; design retained.
- `DROPPED` — will not build; rationale retained so we don't re-propose it.

### 0.3 Priority & phase

`P0` foundation · `P1` highest-leverage · `P2` valuable · `P3` polish/optional.
Phases in §11.

### 0.4 The Kinu Test (every item must pass)

1. Is there a native element to enhance? 2. Can the logic live in CSS (attribute
selectors / `attr()` / `@property` / `:has()` / anchor)? 3. If JS is unavoidable,
is it **one lazily-installed delegated singleton** or a tiny per-instance `refCb`,
never per-instance framework state? 4. Does it forward props to a single `k="…"`
attribute namespace? 5. Does it compose existing primitives? 6. Is it legible to an
LLM from a one-line example? 7. Does it refuse to become a stateful mega-widget?

### 0.5 Per-item template

Each item below carries: **Status · Priority · Depends** / **Renders** (tag + `k`
names) / **API** (props + compound parts) / **Mechanism** / **Platform** (Baseline
vs `@supports`-gated) / **Files** / **CSS/JS sketch** (where non-obvious) / **DoD
delta** (anything beyond the standard runbook) / **Demo impact** (bespoke CSS it
deletes).

### 0.6 Execution runbook — Definition of Done for any **component** item

Run this checklist for every `CTL`/`DIS`/`LAY`/`CHT`/`CMP` component. A component
is not "done" until all apply:

1. `src/components/<slug>/index.tsx` — factory (`createSimpleComponent`) or a small
   wrapper following the Dialog/Carousel pattern. Sets `k="<name>"` only via the
   factory `name` arg (never hand-write `k=`).
2. `src/components/<slug>/types.ts` — `interface <X>OwnProps extends BaseProps {…}`
   with JSDoc on **every** prop; `export type <X>Props = <X>OwnProps &
   Omit<JSX.IntrinsicElements['<tag>'], keyof <X>OwnProps>`.
3. `src/components/<slug>/style.css` — `@import "../../variables.css";`, attribute
   selectors only, `--k-*` tokens via `hsl(var(--k-*) / a)`, **`@supports`-gate any
   non-Baseline CSS** (see §1 `CON-3`), respect `prefers-reduced-motion` (handled
   globally in `base.css` but verify).
4. `src/index.ts` — export the component(s) and all public types.
5. `src/base.css` — if the component is non-interactive/shouldn't be text-selectable,
   add its `k` to the `user-select:none` group (see the existing list).
6. `docs/components/<slug>.md` — match `docs/components/button.md` exactly: H1,
   one-line intro, `## Usage`, `## Exports` table, `## Props` table, `## Notes`,
   `_Source: …_`.
7. `docs/examples/<slug>.tsx` — exports a `Demo` component (and the `code` string
   per the existing example convention).
8. `docs/manifest.json` — append an entry: `slug`, `title`, `section:"Components"`,
   `category` (Actions | Data Display | Data Input | Feedback | Layout | Navigation),
   `order`, `file`, `description`.
9. `demo/public/llms.txt` — add the component under the right category, using
   `k=` (note: the file currently says `p=` in places — see `FUN-4`; use `k=`).
10. SSR-safe — guard all `document`/`window` access; any new `install*()` singleton
    follows the `CON-3` pattern (module boolean + `typeof document === 'undefined'`
    bail). Add an SSR smoke case to `src/__tests__/ssr-smoke.test.tsx` if the item
    introduces JS.
11. `pnpm lint` (tsc + biome) clean; `pnpm test` green.
12. **Size delta (the primary KPI).** Build (`pnpm build`) and record the
    **minified + gzipped** size change for **JS and CSS separately**
    (`dist/index.js` vs `dist/index.css`), plus the per-component `bench:size` case.
    **JS min+gzip is the budget we minimize** — a pure-CSS item (most `LAY`/`DIS`)
    must add **~0 bytes JS**; only `refCb`/singleton items (`CTL-2/3/4/5`, `CHT-3`,
    `CMP-*`, `FUN-2`) may add JS, and each added byte must be justified. CSS min+gzip
    is **secondary** — tracked and kept reasonable, but not the gate. Verify
    tree-shaking (a single-component import pulls only its own bytes). Record both
    `JS Δ` and `CSS Δ` in the commit body / changeset.
13. Visual check in the demo via the Playwright MCP (`browser_*` tools); wire the
    component into a demo route or `components-index`.
14. `pnpm changeset` — patch/minor entry.

For **`FUN`** items the DoD is item-specific and stated inline.

### 0.7 Execution discipline (sequential + measured)

- **One item at a time, in order.** Work strictly sequentially by phase then
  priority (§11). Fully complete an item's DoD — **including the JS/CSS size deltas
  (§0.6 #12)** — and commit it before starting the next. Never batch multiple
  roadmap items into one change: it makes the per-item size delta unattributable and
  reviews harder.
- **JS size is the thing we protect.** If an item pushes **JS** min+gzip up
  unexpectedly, stop and re-examine before proceeding. Pure-CSS items must register
  ~0 JS; CSS growth is secondary.
- **Record as you go.** Each item's commit body states `JS Δ` and `CSS Δ`
  (min+gzip), and resolving an open question updates the §12 decisions log.

---

## 1. CON — Conventions & shared infrastructure (P0, do first)

These unblock everything else and prevent rework.

### CON-1 — Lock the contribution surface
**Status:** READY · **Priority:** P0
Codify §0.6 as `docs/pages/contributing-a-component.md` and a PR checklist. Reason:
13 of the 14 steps are mechanical; encoding them once means every later item lands
complete (export + docs + manifest + llms + example), which is the #1 way these
slip. **DoD:** the doc exists and is linked from `AGENTS.md`.

### CON-2 — Spacing scale tokens
**Status:** READY · **Priority:** P0 · **Blocks:** all `LAY`
Kinu currently uses raw `rem` literals everywhere and has **no shared spacing
scale**. The layout primitives need one shared, themeable scale.
Add to `src/variables.css`:
```css
--k-space-0: 0;
--k-space-xs: 0.25rem;
--k-space-sm: 0.5rem;
--k-space-md: 1rem;   /* default gap */
--k-space-lg: 1.5rem;
--k-space-xl: 2.5rem;
```
**Decision:** layout props expose a **token enum** (`gap="sm"`), not arbitrary
lengths — matching how `Button` does `size`. Arbitrary values are possible via
`style="--k-gap:…"`. Do **not** put typed `attr()` on the load-bearing path (it is
Chromium-only — see `CON-3`). **DoD:** tokens added; documented in `theming.md`.

### CON-3 — Platform-gating policy (write it down)
**Status:** READY · **Priority:** P0
A single rule the whole roadmap depends on. **Baseline (mid-2026), build freely:**
`:has()`, CSS nesting, container *size* queries, anchor positioning (Jan-2026
Baseline — keep a light fallback), `@starting-style` + `transition-behavior:
allow-discrete`, Popover API, Invoker Commands (`command`/`commandfor`),
`<details name>` + `::details-content`, same-document View Transitions,
`color-mix()`, `:user-invalid`, `inert`, `text-wrap: balance`, container *style*
queries (custom-prop form). **Chromium-only — `@supports`-gate as enhancement over
a working native fallback, NEVER load-bearing:** `appearance: base-select`,
`::scroll-marker`/`::scroll-button`, `interpolate-size`/`calc-size()`,
`field-sizing: content`, **typed `attr(... type(<x>))`**, scroll-driven animations.
Kinu already practices this (`accordion/style.css` gates `interpolate-size`;
`popover/style.css` gates `position-anchor`). **DoD:** captured in
`ARCHITECTURE.md` so every CSS author follows it.

### CON-4 — Singleton & command-bus conventions
**Status:** READY · **Priority:** P0
Document the canonical "tiny JS" patterns so new items reuse them instead of
inventing handlers:
- **Lazily-installed global singleton** (`src/lib/commands.ts` style): module-level
  `installed` boolean, `if (typeof document === 'undefined') return;`, add one
  delegated listener. Used for document-wide behaviors.
- **Per-instance `refCb`** (4th arg of `createSimpleComponent`): add/remove a
  listener on the element, return cleanup. Used for element-local behavior (see
  `Combobox`, `Carousel`, `ListboxInput`).
- **Custom commands** ride the existing bus: a `command` attribute beginning with
  `--` dispatches a `command` event on the `commandfor` target. New interactive
  components should prefer dispatching `--custom` commands over new listeners.
**DoD:** a short "extending behavior" section in `ARCHITECTURE.md`.

### CON-5 — Size-budget guardrail (JS primary, CSS secondary)
**Status:** READY · **Priority:** P0
Make per-change size measurable and **split JS vs CSS**. Extend `benchmarks/size` so
every scenario reports **minified + gzipped JS and CSS separately** (today it reports
a combined figure), and add a per-component case. **Primary KPI:** JS min+gzip —
minimize it; pure-CSS components must register ~0 JS. **Secondary:** CSS min+gzip —
track and keep reasonable. Every item records its `JS Δ` / `CSS Δ` in the commit body
(§0.6 #12) and the executor proceeds one item at a time (§0.7). **Target:** a single
component import adds < ~0.6 KB gzip total on top of `Button`'s baseline, with JS as
near zero as the component allows, unless justified. **DoD:** `bench:size` prints JS
and CSS gzip per scenario plus a per-component case; numbers land in
`benchmarks/size/results`.

---

## 2. LAY — Layout & app shell (P1, highest leverage)

The four demo apps hand-roll structural CSS hundreds of times; the demo needs
**5,268 lines** of bespoke CSS, much of it `display:flex;gap` and grid scaffolding.
These primitives are pure CSS, zero JS, 100% Baseline — the single biggest
return on effort. All depend on `CON-2`.

> Shared mechanism for `LAY-1..6`: a token-enum `gap` prop maps to `--k-gap`; other
> props are enum attribute selectors (exactly the `[variant]`/`[size]` pattern). No
> JS. The factory call for each is one line: `createSimpleComponent<'div', …>('<k>','div')`.

### LAY-1 — `Stack` (vertical flow)
**Status:** READY* · **Priority:** P1 · **Depends:** CON-2
**Renders:** `<div k="stack">` · **API:** `gap?: 0|xs|sm|md|lg|xl`,
`align?: start|center|end|stretch`, `justify?`, `as?` (polymorphic via tag fn if
desired — optional).
```css
[k="stack"]{display:flex;flex-direction:column;gap:var(--k-gap,var(--k-space-md))}
[k="stack"][gap="sm"]{--k-gap:var(--k-space-sm)} /* …one line per token… */
[k="stack"][align="center"]{align-items:center}
```
**Demo impact:** replaces most `linear-*`, `music-*`, `getting-started-*` column flex.

### LAY-2 — `Cluster` (wrap row, gapped)
**Status:** READY* · **Priority:** P1 · **Depends:** CON-2
**Renders:** `<div k="cluster">` · **API:** `gap?`, `align?` (default center),
`justify?`. `display:flex;flex-wrap:wrap`. **Use:** chip/tag rows, button rows,
toolbars, suggestion rows (`CHT`). Deletes the ad-hoc `flex-wrap` rows in Linear
labels and Trip features.

### LAY-3 — `Row` (horizontal flow, no wrap)
**Status:** READY* · **Priority:** P2 · **Depends:** CON-2
**Renders:** `<div k="row">` · **API:** `gap?`, `align?`, `justify?`, `wrap?`.
`display:flex`. The horizontal sibling of `Stack`. (Consider folding `Row` into
`Stack[direction]` — decide in `CON-1` review; kept separate here for LLM legibility.)

### LAY-4 — `Grid` (auto-fit/explicit)
**Status:** READY* · **Priority:** P1 · **Depends:** CON-2
**Renders:** `<div k="grid">` · **API:** `gap?`, `min?` (token or via `--k-grid-min`),
`cols?` (explicit integer for fixed grids).
```css
[k="grid"]{display:grid;gap:var(--k-gap,var(--k-space-md));
  grid-template-columns:repeat(auto-fit,minmax(var(--k-grid-min,16rem),1fr))}
[k="grid"][cols="3"]{grid-template-columns:repeat(3,1fr)} /* explicit override */
```
**Demo impact:** the dashboard card grids, `features-grid`, `principles-grid`.

### LAY-5 — `Center`
**Status:** READY · **Priority:** P2
**Renders:** `<div k="center">` · `display:grid;place-items:center`. `inline?` →
`place-content`. Trivial, ubiquitous.

### LAY-6 — `Spacer`
**Status:** READY · **Priority:** P3
**Renders:** `<div k="spacer">` · `flex:1` (push siblings apart inside `Row`/`Cluster`).
Optional `size?` for a fixed gap block. Trivial.

### LAY-7 — `AppShell` (page scaffold)
**Status:** READY · **Priority:** P1 · **Depends:** LAY composition; integrates `Sidebar`
**Renders:** `<div k="app-shell">` with compound parts
`AppShell.Header/Sidebar/Main/Footer`. **Mechanism:** CSS grid named areas, zero JS;
collapses to a single column on mobile where `AppShell.Sidebar` **delegates to the
existing `Sidebar` `<dialog>`** (which is already amodal-desktop / modal-mobile).
```css
[k="app-shell"]{display:grid;min-height:100dvh;
  grid-template:"hd hd" auto "sb mn" 1fr "sb ft" auto / minmax(0,auto) 1fr}
[k="app-shell-header"]{grid-area:hd}[k="app-shell-sidebar"]{grid-area:sb}
[k="app-shell-main"]{grid-area:mn;min-width:0}[k="app-shell-footer"]{grid-area:ft}
@media (max-width:48rem){[k="app-shell"]{grid-template:"hd" auto "mn" 1fr "ft" auto / 1fr}}
```
**DoD delta:** ship a `demo/src/routes` example that rebuilds the Linear shell with
`AppShell` + `Sidebar` to prove the bespoke `linear-app/linear-board` CSS collapses.
**Demo impact:** the structural half of every demo app.

---

## 3. CTL — Form controls (P1–P3)

All validated absent. Each is native-element-first.

### CTL-1 — `Rating`
**Status:** READY · **Priority:** P1 · **Mechanism:** pure CSS, zero JS
**Renders:** `<span k="rating">` wrapping `N` `<input type="radio">` + `<label>`
pairs in **descending** DOM order (5→1), visually reversed. Form-associated &
keyboard-accessible for free (it's a radiogroup).
**API:** `name` (required), `value?`, `count?=5`, `readOnly?`, `size?`.
```css
[k="rating"]{display:inline-flex;flex-direction:row-reverse;justify-content:flex-end}
[k="rating"] input{position:absolute;width:1px;height:1px;opacity:0}
[k="rating"] label{cursor:pointer;color:hsl(var(--k-muted-foreground)/.35)}
[k="rating"] label::before{content:"★"}
/* fill the checked star and every lower one (later in DOM) + hover preview */
[k="rating"] input:checked ~ label,
[k="rating"] label:hover, [k="rating"] label:hover ~ label{color:hsl(var(--k-warning))}
[k="rating"]:has(label:hover) input:checked ~ label:not(:hover):not(:hover ~ label){color:hsl(var(--k-muted-foreground)/.35)}
```
**DoD delta:** verify the `:has()` hover-override interaction visually with Playwright
(the only fiddly selector). **Demo impact:** Linear/Trip never need a star widget again.

### CTL-2 — `NumberField`
**Status:** READY · **Priority:** P1 · **Mechanism:** native `<input type=number>` +
**the existing command bus** (zero new global listeners)
**Renders:** wrapper → `InputGroup` containing `<Button command="--step-down">`,
`<input k="number-field" type="number">`, `<Button command="--step-up">`.
**API:** `min`, `max`, `step`, `value`, plus passthrough.
```tsx
// index.tsx — small wrapper (Dialog-style), useId() to wire commandfor → input id.
// The input's refCb listens for the bubbled `command` event and drives native stepping:
const ref = (el: HTMLInputElement) => {
  installCommands();
  const onCmd = (e: any) => {
    if (e.command === '--step-up') el.stepUp();
    else if (e.command === '--step-down') el.stepDown();
    else return;
    el.dispatchEvent(new Event('input', {bubbles: true}));
    el.dispatchEvent(new Event('change', {bubbles: true}));
  };
  el.addEventListener('command', onCmd);
  return () => el.removeEventListener('command', onCmd);
};
```
This is the model example of "new component, **zero new event-listener types**" — it
rides `--custom` commands exactly like `Carousel`'s `--prev`/`--next`.
**DoD delta:** SSR smoke case. **Note:** native Invoker Commands are Baseline
(Dec-2025), so on modern browsers the bus is native; `installCommands()` is the
old-Safari fallback.

### CTL-3 — `TagsInput`
**Status:** READY · **Priority:** P2 · **Mechanism:** the one place a little array
state is honest — a thin per-instance `refCb`, no framework store.
**Renders:** `<div k="tags-input">` = a `Cluster` of `Chip`s + a bare `<input>`; a
hidden form-associated field mirrors the value (JSON or CSV) so it submits natively.
**Behavior:** Enter adds the typed token; `Backspace` on empty removes the last;
click `×` on a chip removes it; each mutation re-writes the hidden field and
dispatches `input`. Optionally compose `Combobox` for suggestions.
**API:** `name`, `value?: string[]`, `separator?`, `max?`, `duplicates?`.
**Demo impact:** deletes the hand-rolled label editor (Linear) and feature picker (Trip).
**DoD delta:** SSR smoke case; document the value serialization format.

### CTL-4 — `PasswordInput`
**Status:** READY · **Priority:** P2 · **Mechanism:** native input + a reveal toggle
**Renders:** `InputGroup` → `<input type="password" k="password-input">` +
`<Button command="--toggle-password">`. A tiny `refCb`/command flips `type`
between `password`/`text` and the icon via a `[revealed]` attribute. **API:**
passthrough + `defaultRevealed?`. Reuses the `CTL-2` command pattern (no new singleton).

### CTL-5 — `CopyButton`
**Status:** READY · **Priority:** P1 (cheap, ubiquitous in code/AI UIs)
**Renders:** `<button k="copy-button">` · **API:** `value?: string` **or** `for?:
string` (selector whose `textContent` is copied), `label?`, `copiedLabel?`.
```tsx
const ref = (el: HTMLButtonElement) => {
  const onClick = async () => {
    const text = el.getAttribute('value') ??
      document.querySelector(el.getAttribute('for')!)?.textContent ?? '';
    try { await navigator.clipboard.writeText(text);
      el.toggleAttribute('copied', true);
      setTimeout(() => el.toggleAttribute('copied', false), 1200);
    } catch {}
  };
  el.addEventListener('click', onClick);
  return () => el.removeEventListener('click', onClick);
};
```
```css
[k="copy-button"]::after{content:attr(data-label,"Copy")}
[k="copy-button"][copied]::after{content:attr(data-copied,"Copied")}
[k="copy-button"][copied]{color:hsl(var(--k-success))}
```
**DoD delta:** SSR-safe (`navigator` guarded inside the handler, which only runs client-side).

---

## 4. DIS — Display (P1–P3)

### DIS-1 — `Stat` (metric block)
**Status:** READY · **Priority:** P1 · **Mechanism:** pure CSS presentation
**Renders:** `<div k="stat">` + `Stat.Label`, `Stat.Value`, `Stat.Delta`.
**API (Delta):** `trend?: up|down|flat` → color via attribute.
```css
[k="stat-value"]{font-size:1.875rem;font-weight:600;line-height:1.1}
[k="stat-label"]{color:hsl(var(--k-muted-foreground));font-size:.8125rem}
[k="stat-delta"][trend="up"]{color:hsl(var(--k-success))}
[k="stat-delta"][trend="down"]{color:hsl(var(--k-destructive))}
```
**Demo impact:** the dashboard `stat-*`, `budget-*`, `goal-*` families.

### DIS-2 — `Stepper` (horizontal ordered steps)
**Status:** READY · **Priority:** P2 · **Mechanism:** CSS counters + flex connectors,
zero JS. Distinct from `Timeline` (vertical) and `Progress` (continuous).
**Renders:** `<ol k="steps">` + `<li k="step" data-state="…">`.
**API (Step):** `data-state?: upcoming|current|complete`.
```css
[k="steps"]{counter-reset:k-step;display:flex}
[k="step"]{flex:1;display:flex;flex-direction:column;align-items:center;position:relative}
[k="step"]::before{counter-increment:k-step;content:counter(k-step);
  display:grid;place-items:center;width:1.75rem;height:1.75rem;border-radius:50%;
  border:1px solid hsl(var(--k-border))}
[k="step"][data-state="complete"]::before{content:"✓";background:hsl(var(--k-primary));
  color:hsl(var(--k-primary-foreground));border-color:transparent}
[k="step"][data-state="current"]::before{border-color:hsl(var(--k-primary))}
[k="step"]:not(:first-child)::after{content:"";position:absolute;top:.875rem;right:50%;
  width:100%;height:1px;background:hsl(var(--k-border));z-index:-1}
```

### DIS-3 — `Indicator` (corner overlay)
**Status:** READY · **Priority:** P3 · **Mechanism:** pure CSS positioning
**Renders:** `<span k="indicator">` (position:relative) wrapping any child, with a
`Badge`/dot positioned at a corner. **API:** `placement?: top-end|top-start|…`,
`dot?` (no count). **Use:** notification counts on `Avatar`/`Button`.
```css
[k="indicator"]{position:relative;display:inline-flex}
[k="indicator"] > [k="badge"]{position:absolute;top:0;right:0;transform:translate(40%,-40%)}
```

### DIS-4 — `Code` (styled block / inline)
**Status:** READY · **Priority:** P3 · **Decision (2026-06-16):** ship as a
component — we may later offer opt-in syntax highlighting via a plugin.
**Renders:** `<pre k="code">` (block) / `<code k="code" inline>` (inline).
**API:** `inline?`, `language?` (advisory; a future highlighting plugin reads it),
plus a `Code.Copy` slot composing `CopyButton` (`CTL-5`). **Mechanism:** pure CSS
chrome (mono font, surface, radius, horizontal scroll) — zero JS for the base.
**Highlighting stays out of core** (`DROP-6`): design **one extension seam** — accept
already-highlighted markup as children, **and/or** let an opt-in plugin target
`[k="code"][language]` — so a highlighter can be added later **without bundling one
in core** and without changing the component API. **Overlap note:** `Prose` styles
nested `<pre><code>`; `Code` is for standalone/inline code plus the copy + plugin
seam. **Demo impact:** replaces the bespoke `CodeBlock` + `highlight.ts` wiring, which
becomes the first consumer of the plugin seam.

---

## 5. CHT — Conversation / AI surface (P2)

The homepage leads with an **AI Composer**; this is 90% assemblable from existing
primitives. Ship the *chrome*, never an engine (no markdown parser, no model runtime).

### CHT-1 — `Message`
**Status:** READY · **Priority:** P2 · **Mechanism:** attribute-driven bubble, like `[variant]`
**Renders:** `<div k="message" from="user|assistant|system">` with optional
`Message.Avatar` slot + content (the app drops `<Prose>` inside for markdown).
```css
[k="message"]{display:flex;gap:.5rem;max-width:48rem}
[k="message"][from="user"]{flex-direction:row-reverse;margin-left:auto}
[k="message"] [k="message-bubble"]{padding:.5rem .75rem;border-radius:var(--k-radius)}
[k="message"][from="user"] [k="message-bubble"]{background:hsl(var(--k-primary));color:hsl(var(--k-primary-foreground))}
[k="message"][from="assistant"] [k="message-bubble"]{background:hsl(var(--k-muted))}
```
**Demo impact:** the `kh-composer-msg/-bubble` and `chat-message/message-bubble` families.

### CHT-2 — `Thread` (message list, stick-to-bottom)
**Status:** READY · **Priority:** P2 · **Mechanism:** CSS, not a scroll loop
**Renders:** `<div k="thread" scrollable>` · stick-to-bottom via
`overflow-anchor:auto` (native) so new messages pin the viewport without the
`scrollTo(9e9)` effect the demo runs today. **DoD delta:** verify `overflow-anchor`
behavior across engines; keep a one-line JS scroll-to-bottom as belt-and-braces only
if a visual test shows drift.

### CHT-3 — `Composer`
**Status:** READY · **Priority:** P2 · **Mechanism:** `<form>` + existing
`Textarea[autosize]` (already `field-sizing:content`) + send
**Renders:** `<form k="composer">` + `Textarea[autosize]` + `Composer.Send`
(submit) + optional `Composer.Actions` slot (attach/model — compose `FileUpload`,
`Select`/`ENH-1`). **Behavior:** Enter submits, Shift+Enter newline (tiny keydown
`refCb` calling `form.requestSubmit()`). **Sub-parts that need NO new component:**
"typing" indicator = existing `<Spinner type="dots">`; "suggestions" = `Cluster` of
`Chip`. **Demo impact:** the entire `kh-composer-*` block.

---

## 6. CMP — Convenience compositions (P2)

Thin wrappers over primitives that already exist; they save users the wiring the
demos repeat.

### CMP-1 — `Command` (palette)
**Status:** READY · **Priority:** P2 · **Mechanism:** `Dialog` + `Listbox` +
existing CSS `filterItems` + `installMenuShortcuts` — **all already shipped**.
**Renders:** `Command` (Dialog.Content host) → `Command.Input` (= `ListboxInput`) →
`Command.List` (= `ListboxList`) → `Item`s (already support `shortcut`,
`destructive`, `href`). Open via a hotkey (`FUN-2`). **Explicitly NOT** a fuzzy
search/keybinding engine (see `DROP-6`) — it's substring filter + the native bus.
**Demo impact:** the `kh-cmd-*` palette.

### CMP-2 — `Form`
**Status:** READY · **Priority:** P2 · **Depends:** pairs with `FUN-1`
**Mechanism:** native Constraint Validation API — **no form-state engine**.
**Renders:** `<form k="form">`. On submit: if `!form.checkValidity()` → prevent,
focus first `:invalid`, surface native messages into `Field.Error`; else call
`onValid`. Leans on `:user-invalid` CSS (`FUN-1`) and the existing
`Field`/`Field.Error[role=alert]`.
```tsx
<form k="form" onSubmit={(e) => {
  const f = e.currentTarget as HTMLFormElement;
  if (!f.checkValidity()) { e.preventDefault();
    (f.querySelector(':invalid') as HTMLElement)?.focus(); }
}} />
```
**DoD delta:** SSR smoke case; document the "bring your own submit, we own validity" contract.

---

## 7. ENH — Enhancements to existing components (P2–P3)

### ENH-1 — Customizable `Select` (rich, searchable, still native)
**Status:** READY · **Priority:** P2 · **Platform:** `@supports (appearance:
base-select)` — **Chromium-only today; clean native fallback** (with no support it's
the normal styled `<select>` Kinu already ships — zero added JS, zero risk).
**Change:** in `select/style.css`, add a gated block enabling `appearance:
base-select` on `[k="select"]` and `::picker(select)`, style `<option>` /
`<selectedcontent>` / `::picker` with `--k-*` tokens; allow rich option markup and
`<hr>` separators. Optionally a `SelectOption` helper for two-line/icon options.
**Demo impact:** deletes the ~200-line bespoke grouped **model picker** that
`ComposerPreview` reimplements because the old `<select>` couldn't show rich options.
**DoD delta:** document it degrades to a native select; visual test both paths.

### ENH-2 — `Alert` "banner" variant
**Status:** READY · **Priority:** P3
Add `[k="alert"][variant="banner"]` (full-bleed, square corners, page-level inset)
to `alert/style.css`. No new component (this replaces the proposed standalone
`Banner`). Tiny.

---

## 8. FUN — Cross-cutting functionality (P1–P3)

No new component export; these are systems.

### FUN-1 — Forms & validation CSS layer
**Status:** READY · **Priority:** P1 · **Pairs with:** `CMP-2`
Add `:user-invalid`/`:user-valid` styling that wires Input/Textarea/Select/Checkbox
to `Field`/`Field.Error`, so validation appears only after interaction with **no
"touched" state to manage** (`:user-invalid` is Baseline). Note OTP already uses
`:user-invalid`. **DoD:** a `docs/pages/forms.md` showing native-validation forms
with `Field` + `Form` and zero JS validation logic.

### FUN-2 — Hotkey registry
**Status:** READY · **Priority:** P2 · **Mechanism:** one global keydown singleton
(`installHotkeys`, `CON-4` pattern) + the command bus + `Kbd` for display.
A `<Hotkey keys="mod+k" command="show-modal" commandfor="cmdk" />` (renders nothing,
registers) or a `data-hotkey` attribute; on match, dispatch the command to the
target. Reuses `command`/`commandfor` — no bespoke per-app keyboard handlers.
**DoD:** SSR-safe; document chord syntax (`mod`, `shift`, etc.); pairs with `CMP-1`.

### FUN-3 — Motion / View-Transition kit
**Status:** READY · **Priority:** P3 · **Mechanism:** formalize the `AppFrame`'s
existing `startViewTransition` pattern.
Ship a tiny `transition(cb)` helper (no-op fallback when unsupported), documented
`view-transition-name` conventions for list reorders/route changes, and a
cross-document `@view-transition` recipe for MPA nav. Motion tokens
(`--k-ease-spring/-elastic/-out`) already exist and get a documented home.
**DoD:** `docs/pages/motion.md`; helper exported from `kinu`.

### FUN-4 — LLM-authoring contract (productize "intuitive for LLMs")
**Status:** READY · **Priority:** P1 (it's a core differentiator and currently drifts)
1. **Fix the drift now:** `demo/public/llms.txt` documents `p=` in places; the code
   emits `k=`. Correct it. 2. **Generate, don't hand-maintain:** a
   `scripts/gen-llms.mjs` that emits `llms.txt` + a machine-readable
   `components.json` (name, tag, props, one-line example) from the component
   `types.ts` + `docs/manifest.json` at build. 3. **Ship it:** add a `"./llms.txt"`
   package export. 4. **Stretch:** an MCP server / ESLint rule that steers agents to
   the right primitive and flags hand-rolled markup that a component already covers.
**DoD:** `pnpm build` regenerates `llms.txt`; it never drifts again; `kinu/llms.txt`
resolves.

### FUN-5 — Theming hardening
**Status:** READY · **Priority:** P2
**Do now (safe):** (a) document the `--k-*` token contract as a stable public surface;
(b) productize 2–3 preset themes from the existing `theme-customizer` Radix→token
generator as importable CSS; (c) use `color-mix()` (already in `Spinner`) to *derive*
hover/soft variants where it shrinks CSS.
**Decision (resolved 2026-06-16):** keep the **hand-maintained** dark palette and the
**HSL-triplet** token format for now — do **not** adopt `light-dark()`. Rationale:
its older-device coverage is still middling, and more importantly it returns a
`<color>`, which would break the deliberate `hsl(var(--k-x) / a)` alpha trick used
throughout (`--k-primary-soft: var(--k-primary) / 0.15`, etc.). The duplicated dark
block (`@media (prefers-color-scheme: dark)` + `[data-color-scheme="dark"]`) stays;
we accept it.
**Later (forward path, not scheduled):** when **CSS Custom Functions** (`@function`)
ship, dedupe the palette with a custom `--light-dark(--l, --d)` that returns the
correct **triplet** per `color-scheme` — automating the dedup *while preserving the
triplet/alpha format*. Interim option if duplication becomes a maintenance burden:
generate the dark block from the light block at build. Revisit when `@function` is
available.

### FUN-6 — Density, RTL & forced-colors pass
**Status:** READY · **Priority:** P3 · **Mechanism:** pure CSS, the kind of audit a
6 KB toolkit can do better than heavyweights.
(a) a `--k-density` scalar driving control heights/padding (compact dashboards vs.
touch); (b) a logical-property sweep (`Tabs` already models `inset-inline`); (c)
`@media (forced-colors: active)` mappings to system colors + `prefers-contrast`.
**DoD:** documented; a high-traffic component (Button/Input/Item) converted as the
reference implementation.

### FUN-7 — Virtualization-free long lists
**Status:** READY · **Priority:** P3 · **Mechanism:** `content-visibility:auto` +
`contain-intrinsic-size` so `List`/`Listbox`/`Tree` render thousands of rows without
a JS virtualizer. Ship as an opt-in `[k][virtual]` style + a `docs/pages` recipe.
**DoD:** a demo list of 10k rows that stays smooth with no virtualization library.

---

## 9. PARK — Designed but deferred

Kept with full rationale so we can revisit deliberately.

### PARK-1 — Migrate non-modal overlays to the native Popover API
**Status:** PARKED ("do later") · **Why parked:** `<dialog>` has broader and
longer-standing support than the Popover API; the current overlays
(Popover/DropdownMenu/Combobox/HoverCard) work well and are anchor-positioned with
`@position-try` flip; and Kinu has **conditional modal/amodal** cases (`--modal`,
`mobile="drawer"`, `installAdaptiveCommands`) that don't map cleanly onto
`popover="auto"`. **Design retained:** when revisited, move only the *non-modal*
overlays to `popover="auto"` (free light-dismiss + top-layer + focus, deleting
`installDialogsDropdowns`), keep true modals on `<dialog showModal()>`, and keep the
adaptive drawer path on `<dialog>`. Revisit when Popover API support ≥ `<dialog>` and
a clean modal/amodal switch is designed. **Do not schedule without a fresh decision.**

### PARK-2 — `Toolbar`
**Status:** PARKED · **Why:** overlaps the existing `Menubar` (`<nav>` of buttons +
keyboard handler). If a roving-tabindex action bar is needed (incl. the AI message
action row), prefer a `Menubar` **variant/role** over a new component. Revisit only
if `Menubar` proves insufficient.

---

## 10. DROP — Withdrawn (do not re-propose)

| ID | Item | Why dropped |
| --- | --- | --- |
| `DROP-1` | Exclusive Accordion (`<details name>`) | **Already works** via `<Accordion name="…">` — the factory forwards `name`, and `AccordionProps` types it through `Omit<JSX.IntrinsicElements['details'],…>`. Action: add a docs example only (see `DROP-1a`). |
| `DROP-2` | Carousel CSS markers/buttons (`::scroll-marker`/`::scroll-button`) | Chromium-only & unconfirmed in WebKit/Firefox; the `@supports` detection + retained JS fallback would cost **more** bytes than today's `commandFor`-driven handler, which is already effectively zero-JS at the markup level. |
| `DROP-3` | `ToggleGroup` ink-bar | ToggleGroup allows multiple simultaneously-pressed toggles, so there's no single element to anchor a sliding indicator to; and `Tabs` already owns the single-selection ink-bar. |
| `DROP-4` | `Fieldset` | Already exists as `InputGroup` (`createSimpleComponent('input-group','fieldset')`). |
| `DROP-5` | `Banner` | Not a component — implemented as `ENH-2` (`Alert variant="banner"`). |
| `DROP-6` | Full `cmdk` engine / bundled markdown parser / syntax highlighter / `SegmentedControl` | Off-philosophy: heavy deps or state machines. `Command` (`CMP-1`) stays substring-filter; `SegmentedControl` is covered by `ToggleGroup`; markdown styling is `Prose`; highlighting is the app's. |
| `DROP-7` | DataGrid / Chart / Rich Text Editor / DnD kanban engine / agent-runtime AI widgets | Explicitly out of scope ("no Excel-like data grid shit"); stateful mega-widgets that violate the Kinu Test. |

### DROP-1a — Docs task (the only surviving action from DROP-1)
**Status:** READY · **Priority:** P3 — add an exclusive-accordion example to
`docs/examples/accordion.tsx` / `accordion.md` showing `<Accordion name="faq">`.

---

## 11. Sequencing & milestones

**Phase 0 — Foundation (P0):** `CON-1 … CON-5`. Nothing else starts until the
contribution surface, spacing tokens, gating policy, singleton conventions, and size
guardrail are written down.

**Phase 1 — Highest leverage, all Baseline (P1):**
`LAY-1, LAY-2, LAY-4, LAY-7` (layout + app shell) · `CTL-1` (Rating) ·
`CTL-2` (NumberField) · `CTL-5` (CopyButton) · `DIS-1` (Stat) ·
`FUN-1` (forms layer) · `FUN-4` (llms contract). This phase alone deletes the
largest share of the 5,268 lines of demo CSS and ships the differentiator.

**Phase 2 — Conversation & convenience (P2):**
`CHT-1, CHT-2, CHT-3` · `CMP-1` (Command) · `CMP-2` (Form) · `CTL-3` (TagsInput) ·
`LAY-3, LAY-5, LAY-6` · `DIS-2` (Stepper).

**Phase 3 — Controls polish & platform enhancement (P2–P3):**
`CTL-4` (PasswordInput) · `DIS-3` (Indicator) · `DIS-4` (Code spike) ·
`ENH-1` (customizable Select) · `ENH-2` (Alert banner) · `DROP-1a` (docs).

**Phase 4 — Systemic functionality (P2–P3):**
`FUN-2` (hotkeys) · `FUN-3` (motion) · `FUN-5` (theming spike) ·
`FUN-6` (density/RTL/forced-colors) · `FUN-7` (content-visibility).

**Deferred (no schedule):** `PARK-1`, `PARK-2`.

### Dependency notes
- All `LAY` depend on `CON-2` (spacing tokens).
- `CTL-2`, `CTL-4` reuse the command-bus pattern (`CON-4`); no new singletons.
- `CMP-2` (Form) pairs with `FUN-1` (validation CSS).
- `CMP-1` (Command) benefits from `FUN-2` (hotkey to open) but can ship without it.
- `ENH-1` and any Chromium-only CSS strictly follow `CON-3` (`@supports` + fallback).

### Standing guardrails (apply to every item)
- **Sequential & measured** (§0.7): one item at a time, fully done — **including the
  separate JS/CSS min+gzip deltas** — and committed before the next. Never batch items.
- **JS size is the budget** (`CON-5`): minimize min+gzip **JS** (pure-CSS items add
  ~0); CSS min+gzip is secondary. Record `JS Δ` / `CSS Δ` per item.
- Pass the **Kinu Test** (§0.4) — if an item starts needing per-instance framework
  state, stop and redesign.
- Follow the **DoD runbook** (§0.6) — a component isn't done without export + docs +
  manifest + llms + example + size delta.
- **Gate, don't bet** (`CON-3`): Chromium-only CSS is enhancement over a working
  native fallback, never load-bearing.

---

## 12. Decisions log

Canonical decisions, newest first — reference by date + item ID over the long haul.

- **2026-06-16 · Process:** Execute roadmap items **strictly sequentially**; measure
  and record **min+gzip JS and CSS deltas separately** per item. **JS is the primary
  budget to minimize**; CSS is secondary. (See §0.7, `CON-5`.)
- **2026-06-16 · FUN-5:** Keep the hand-maintained dark palette + HSL-triplet token
  format; do **not** adopt `light-dark()` (returns a `<color>`, breaks the `/ a` alpha
  trick; coverage still middling). Automate the dedup later via CSS Custom Functions
  (`@function --light-dark`) preserving the triplet format.
- **2026-06-16 · DIS-4:** `Code` ships as a component; syntax highlighting stays out
  of core and is added later through an opt-in plugin seam (`[k="code"][language]` /
  pre-highlighted children).
- **2026-06-16 · PARK-1 / DROP-2 / DROP-3:** Popover-API overlay migration parked
  (`<dialog>` support + conditional modal/amodal cases); Carousel CSS markers dropped
  (detection + fallback costs more JS than today's `commandFor` handler); ToggleGroup
  ink-bar dropped (multi-select has no single anchor; `Tabs` owns it).

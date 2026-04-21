# Making Kinu LLM-Native

Concrete recommendations to make Kinu so predictable that a 2-sentence description plus the component list is enough for an LLM to write correct Kinu code on the first try.

Paired with `API_REVIEW.md`, which documents the current state and why each of these changes is needed.

## The LLM-native promise

Kinu can credibly promise three rules. If all three hold for every component, documentation becomes optional:

> 1. **Every component renders the HTML element its name suggests.** Props are forwarded to that element. If you know the HTML, you know the component.
> 2. **Every stateful component is controlled by its native HTML attributes** (`value`, `checked`, `open`, `selected`, `aria-selected`, `disabled`) **and native events** (`onInput`, `onChange`, `onToggle`, `onClose`).
> 3. **Every compound component uses the shape `{X}` + `{X}Trigger` / `{X}Content` / `{X}Item` / `{X}Close`**, with every part exported flat *and* attached as a static (`X.Trigger`, `X.Content`, …).

Today, rule 1 holds broadly, rule 2 holds for ~70% of components, rule 3 holds for none uniformly.

## Prioritised recommendations

Ordered by LLM-correctness payoff per unit of breakage. Numbered `R#` so they can be referenced in PRs/issues.

### R1. Pick one compound notation — ship both forms, document one

**What.** For every family (Dialog, Sheet, Popover, Tabs, Accordion, Tree, Field, Carousel, Combobox, …) export **both** flat names *and* attach dot-statics. Docs and examples use the flat form exclusively.

**Why.** LLMs trained on shadcn/Radix guess flat. LLMs trained on Mantine guess dot. Supporting both makes both correct; documenting flat gives the code generator a single path.

**Mechanics.**
```ts
// every compound component ends with:
Object.assign(Dialog, {Trigger: DialogTrigger, Content: DialogContent, Close: DialogClose});
export {Dialog, DialogTrigger, DialogContent, DialogClose};
```

**Breaking?** No. Additive. Existing `Dialog.Trigger` users keep working; existing `PopoverTrigger` users keep working.

### R2. Standardise subcomponent vocabulary

**What.** Rename to a single vocabulary across families:

| Role | Name |
|---|---|
| Root context | `{X}` (often context-only, no DOM) |
| Opens the surface | `{X}Trigger` |
| The surface itself | `{X}Content` |
| A selectable row | `{X}Item` |
| Dismisses the surface | `{X}Close` |
| Searchable input inside surface | `{X}Search` (replaces `ComboboxInput` / `ListboxInput`) |

**Renames:**
- `Tab` → `TabsTrigger`; `TabPanel` → `TabsContent`; `TabList` → `TabsList`; add `Tabs` root.
- `Accordion` → gains `AccordionItem` / `AccordionTrigger` / `AccordionContent` (currently: raw `<summary>` children).
- `Collapsible` → gains `CollapsibleTrigger` / `CollapsibleContent`.
- `ComboboxInput` → `ComboboxSearch`; `ComboboxList` → `ComboboxContent`.
- `ListboxInput` → `ListboxSearch`; `ListboxList` → `ListboxContent`.
- `Carousel*` → `CarouselContent` stays; `CarouselPrevious`/`CarouselNext` become `CarouselPrev`/`CarouselNext` (shorter) or stay; add `CarouselTrigger` if we want a single naming, otherwise accept `Previous`/`Next` as the one domain-specific deviation.
- `Tree.GroupLabel` / `Tree.GroupItems` → `Tree.ItemTrigger` / `Tree.ItemContent` inside `Tree.Item` (mirrors Accordion).
- `Timeline.Entry` → `Timeline.Item`.
- `Breadcrumb`, `NavigationMenu`, `Pagination`: keep `List` / `Item` / `Link` — these wrap `<ol>`/`<ul>` so `List` is right. Consistent with HTML.

**Why.** Shadcn's (`{X}Trigger`, `{X}Content`, `{X}Item`) vocabulary dominates LLM training data. Adopting it means every "how do I X" prompt resolves to the same names.

**Breaking?** Yes, but soft: keep old names as `@deprecated` aliases for one major version.

### R3. Unify the control protocol to native HTML + one React fallback

**What.** Three and only three protocols, one per kind of state:

| Kind | Protocol |
|---|---|
| Form control value | HTML: `value` / `checked` + `onInput` / `onChange` |
| Open/closed surface | HTML: `open` attribute + native `onToggle` / `onClose`; or declarative `commandFor` / `command` |
| Selection inside a collection | HTML: `selected` attribute on Item + `onClick`; container accepts optional `value` / `onValueChange` that reads/writes `selected` for you |

**Specific fixes:**
- `Tabs`: current `aria-selected` + `onClick` + external state is unlike everything else. Change to: `Tabs` root accepts `value` / `defaultValue` / `onValueChange`; `TabsTrigger` accepts `value`; selected state stored in context and surfaced as `selected` on the `<button>`.
- `ToggleGroup`: already has `value` / `onValueChange`. Good — keep as the template for R3.
- `Accordion`: add `value` / `onValueChange` / `type="single" | "multiple"` alongside native `name=` grouping. Native for static, React for dynamic.
- `List` / `Listbox` / `Combobox`: add optional `value` / `onValueChange` on the container; if supplied, children with matching `value` prop get `selected` auto-toggled.
- `Dialog` / `Sheet` / `Drawer` / `Popover`: already accept `open` / `onClose` on the Content; document this as the controlled path alongside `commandFor`.

**Why.** Native HTML is what LLMs write by default. A container-level `value`/`onValueChange` matches Radix/Mantine muscle memory and cuts controlled-state boilerplate from ~7 lines to 2.

**Breaking?** Additive for most. `Tab` gaining container-driven selection is breaking for the current `aria-selected` path, but the old form can be kept as fallback.

### R4. Consolidate overlapping components with an explicit axis

**What.**

- **Overlays.** Collapse `Dialog` + `Sheet` + `Drawer` into one `Dialog` with `position="center" | "left" | "right" | "top" | "bottom"` (default `center`). Keep `Sheet` and `Drawer` as thin re-exports (`Sheet = (p) => <Dialog position="right" {...p}/>`) for familiarity. Keep `AlertDialog` as a semantic marker that forces a modal + role=alertdialog. Keep `Popover` (non-modal, anchor-positioned) and `HoverCard` (hover-only) distinct.
- **Inline indicators.** Keep `Badge` as the generic label; fold `Status` into `<Badge dot pulse variant="success">`; fold `Chip` into `<Badge dismissible onDismiss=…>`. This reduces three components to one with two well-named props.
- **Progress/loading.** Keep `Progress` (linear), `ProgressRing` (circular), `Meter` (semantic gauge), `Spinner` (indeterminate). Document the axis in one paragraph on each page. This is the smallest defensible taxonomy; no consolidation gained from merging.
- **Collapsing.** `Accordion` and `Collapsible` are 95% the same. Keep `Collapsible` as the primitive; `Accordion` becomes `Accordion` + `AccordionItem` where each item *is* a Collapsible with an opt-in `name=` for exclusive-open.

**Why.** Three-to-one reductions in the Badge/Status/Chip and Dialog/Sheet/Drawer families each eliminate a decision an LLM must make without enough information.

**Breaking?** Aliases preserve call sites. Pure additive for overlay `position` prop.

### R5. Kill `Item`'s silent type-narrowing — make the differences explicit

**What.** Two paths, pick one:

- **(a) One `Item`, always the same props.** Move `value` onto every Item context (`DropdownMenuItem` *can* have `value` even if nothing reads it) and drop the narrowings. Consistent but slightly loose.
- **(b) Distinct typed wrappers.** Keep `Item` as the shared runtime but un-deprecate and *require* `DropdownMenuItem`, `ContextMenuItem`, `ComboboxItem`, `ListboxItem`, `ListItem`. Each is a one-line wrapper that sets the right type narrowing and attaches any default props (e.g. `role`). Docs use the specific names.

**Recommendation: (b).** It's what shadcn does, matches LLM priors, and lets ESLint catch `<Item href>` in a Combobox.

**Why.** A single name with five hidden type shapes is the worst of both worlds for LLMs: it looks free, but fails silently.

**Breaking?** Additive. Un-deprecate the existing aliases, update docs to use them.

### R6. Add the layout primitives LLMs reach for first

**What.** Add thin styled-`div` components:

- `Stack` (vertical flex column, `gap` prop).
- `Row` (horizontal flex row, `gap` prop, `wrap` boolean).
- `Grid` (CSS grid, `cols` / `gap`).
- `Spacer` (flex `1`).
- `Center` (centered both axes).

Each is ~5 lines of `createSimpleComponent` + 5 lines of CSS. Zero runtime cost. These are the five Mantine/Chakra names LLMs default to.

**Why.** Current Kinu examples are full of `style={{display:'flex', gap:'0.5rem'}}` boilerplate. An LLM will copy that pattern if the primitives are missing.

**Breaking?** Additive.

### R7. Add typographic components

**What.** `Text`, `Heading` (with `level={1..6}`), `Title` (alias for `<Heading level={1}>`), `Kbd` (exists), `Code`. Each renders the obvious HTML element. Keep `Prose` for long-form content.

**Why.** `Typography` as CSS-only forces the user to reach back into raw `<h1>` / `<p>` and duplicate Kinu's token names. A `<Heading>` component is the top-1 LLM guess.

**Breaking?** Additive.

### R8. Normalise casing

**What.**

- `OTPInput` → `OtpInput` (component file: `otp/index.tsx` stays; attribute `k="otp-input"`; export `OtpInput`; type `OtpInputProps`). Aligns with `DatePicker`, `TimePicker`, `ColorPicker`, `FileUpload`.
- Confirm every `k=` attribute matches the kebab-case of the component name exactly. `k="otp"` → `k="otp-input"`. `k="tablist"` → `k="tabs-list"`. Today there are several mismatches.

**Why.** LLMs predict file names, export names, and CSS selectors from the component name. Any mismatch forces documentation.

**Breaking?** Minor rename; aliases buy a deprecation cycle.

### R9. Replace the `k` attribute with `data-k` (or class)

**What.** Change the internal attribute from `k` to `data-k` in `createSimpleComponent`. Update all `[k="…"]` CSS selectors to `[data-k="…"]`. Alternatively: emit a `class` as well (`class="k-button"`) so users can target with ordinary class selectors.

**Why.** `k=` is non-standard. An LLM writing custom CSS overrides will target `.button`, `button[k="button"]`, or `[data-k="button"]` before it guesses `[k="button"]`. `data-*` is correct and guessable.

**Breaking?** Yes, for any consumer who wrote `[k="…"]` selectors. The migration is a global find-replace; ship a codemod.

### R10. One documented control pattern per component family

**What.** Every component doc page opens with a code block titled **"Copy this"** showing the canonical controlled usage — nothing else. Remove the "four ways to do it" hedging. Second section can show alternates for advanced users.

**Why.** LLMs copy the first code block they see. If the first block is `<Tabs defaultValue="overview"><TabsList><TabsTrigger value="overview">…`, every generated Tabs widget will be shaped right.

**Breaking?** Docs-only.

### R11. Fix doc drift

**What.**
- `AGENTS.md` references `[p="button"]`; source uses `[k="button"]`. Update.
- `README.md` says ~5KB JS; `ARCHITECTURE.md` says ~1.2KB. Pick one, measure, commit.
- `docs/pages/commands.md` documents `kinu-command` CustomEvent; source dispatches plain `command` events via `dispatchEvent(new Event('command'))`. Reconcile.

**Why.** Doc drift poisons LLM training data scraped from the repo.

**Breaking?** No.

### R12. Explicit "LLM usage notes" doc

**What.** Add `docs/pages/llm-usage.md` with the three rules above, the flat-name promise, the canonical control protocol for each stateful component in a 20-row table, and *nothing else*. Link it at the top of the README.

**Why.** Becomes the one file a user pastes into an LLM system prompt. Two sentences + a component list + this table = correct output.

**Breaking?** Additive.

---

## Renames at a glance

| Old | New | Kind |
|---|---|---|
| `TabList` | `TabsList` + add `Tabs` root | rename |
| `Tab` | `TabsTrigger` | rename |
| `TabPanel` | `TabsContent` | rename |
| `ComboboxInput` | `ComboboxSearch` | rename |
| `ComboboxList` | `ComboboxContent` | rename |
| `ListboxInput` | `ListboxSearch` | rename |
| `ListboxList` | `ListboxContent` | rename |
| `Timeline.Entry` | `Timeline.Item` | rename |
| `OTPInput` | `OtpInput` | rename |
| `Tree.GroupLabel` / `Tree.GroupItems` | `Tree.ItemTrigger` / `Tree.ItemContent` | rename + restructure |
| `Status` | (folded into `Badge dot pulse`) | merge |
| `Chip` | (folded into `Badge dismissible`) | merge |
| `Sheet` / `Drawer` | thin re-exports of `Dialog position=…` | collapse |
| `Accordion` (raw summary children) | `Accordion` + `AccordionItem` + `AccordionTrigger` + `AccordionContent` | restructure |
| `Collapsible` (raw children) | `Collapsible` + `CollapsibleTrigger` + `CollapsibleContent` | restructure |
| deprecated `DropdownMenuItem` etc. | un-deprecate as typed wrappers | revert |
| `k=` attribute | `data-k=` | rename |
| (new) | `Stack`, `Row`, `Grid`, `Spacer`, `Center` | add |
| (new) | `Text`, `Heading`, `Title`, `Code` | add |
| (new) | `docs/pages/llm-usage.md` | add |

---

## The test

After these changes, this prompt should produce working code on the first try, with no Kinu docs beyond the component list:

> *Kinu is a Preact UI toolkit. Every component renders the HTML element its name suggests and forwards props to it. Compound components expose `{X}Trigger`, `{X}Content`, `{X}Item`, `{X}Close` as both flat exports and statics; stateful components use `value`/`checked`/`open` with native events or a `value`/`onValueChange` container fallback. Components: Button, Input, Textarea, Select, Checkbox, Switch, Radio, RadioGroup, Slider, Label, Field, Tabs, Accordion, Collapsible, Dialog, Sheet, Drawer, Popover, HoverCard, DropdownMenu, ContextMenu, Combobox, Listbox, List, Tree, Table, Breadcrumb, NavigationMenu, Pagination, Menubar, Sidebar, Carousel, Timeline, Toast, Tooltip, Badge, Alert, Avatar, Spinner, Progress, ProgressRing, Meter, Skeleton, Card, Separator, AspectRatio, ScrollArea, Resizable, Empty, Kbd, Prose, Stack, Row, Grid, Text, Heading.*

If a specific request still requires docs after R1–R3, that's a bug.

# Kinu API Review

An audit of Kinu's component API surface and nomenclature against shadcn/ui, Radix UI, and Mantine, focused on predictability for LLMs writing code blind.

## Summary

Kinu's core idea — *every component is a styled HTML element, CSS is the state machine* — is uniquely well suited to LLMs. A model that knows HTML already knows 80% of Kinu. But the current surface has enough inconsistency that an LLM cannot safely write Kinu code without docs. The biggest blockers are:

1. Compound components use **three different notations** (dot-chain, flat, and root-less), inconsistently.
2. Subcomponent naming is **non-uniform** across families (Trigger vs Input, Content vs List, Close vs Option, Item vs Entry, Panel vs Content).
3. A handful of controls break the "native HTML events" rule Kinu otherwise follows (`ToggleGroup.onValueChange`, `Tab.aria-selected+onClick`, `Accordion.name`).
4. Three pairs of overlapping components (Badge/Status/Chip, Progress/ProgressRing/Meter, Dialog/Sheet/Drawer) without a discoverable axis that tells you which to use.
5. The `Item` component is silently re-typed in five contexts; deprecated aliases (`DropdownMenuItem`, `ComboboxOption`, …) still ship.

Addressing these turns Kinu into a toolkit an LLM can use correctly from a 2-sentence description + a component list alone.

## Methodology

- Every component under `src/components/` and `docs/components/*.md` was catalogued for export shape, rendered element, OwnProps, default values, child pattern, and event API.
- Canonical usage was extracted from `docs/examples/*.tsx`.
- Comparisons target the three toolkits most represented in LLM training data: shadcn/ui (Radix-based), Radix UI primitives, Mantine. MUI and Chakra patterns are referenced where they differ.

---

## What Kinu gets right

These patterns align with what LLMs expect from HTML / popular toolkits. Keep them.

- **`variant` / `size` prop names.** Matches shadcn, MUI, Mantine, Chakra.
- **Native HTML events on controls.** `Input`, `Textarea`, `Checkbox`, `Switch`, `Radio`, `Slider`, `Select`, `Calendar`, `DatePicker`, `TimePicker`, `FileUpload`, `ColorPicker`, `OTPInput` all accept native `value`/`checked`/`onInput`/`onChange`. An LLM that knows `<input>` writes correct Kinu.
- **`Item` as a universal menu/list row.** Collapsing DropdownMenuItem/ContextMenuItem/ListItem/ComboboxOption into one component is a big LLM win — one name, one prop shape.
- **`mobile="drawer"` adaptive content.** Obvious-once-seen. Better than shadcn's "write two components and hide one" pattern.
- **Accordion using native `<details>`.** HTML is the state machine; `name=` groups siblings for exclusive-open. Zero JS, zero new concepts.
- **Tooltip via `title` prop.** Exactly the HTML attribute. LLMs will write it correctly by accident.
- **Toast as imperative `toast.show(…)`.** Matches `sonner` and `react-hot-toast`; LLMs reach for this shape first.
- **Field composition via `Field.Label` wrapping the control.** Labels become the positioning/association primitive, consistent with HTML's implicit-label rule.

---

## Where Kinu loses LLM-predictability

### 1. Compound-component notation is mixed

Three styles coexist. An LLM has no way to guess which a given component uses.

| Style | Components |
|---|---|
| **Dot only** (`Dialog.Trigger`) | `Dialog`, `AlertDialog`, `Tree`, `Field`, `Timeline`, `Avatar` (for `.Group`), `Item` (for `.Field`) |
| **Flat only** (`DrawerTrigger`) | `Drawer`, `Sheet`*, `Popover`, `DropdownMenu`, `ContextMenu`, `HoverCard`, `Combobox`, `Listbox`, `Carousel`, `Breadcrumb`, `NavigationMenu`, `Pagination` |
| **Root-less flat** (no wrapper) | `TabList` / `Tab` / `TabPanel`, `RadioGroup` / `Radio`, `Menubar` / `MenubarItem` |

\* `Sheet` and `Drawer` actually support *both* (flat exports + `Sheet.Trigger` static), but only the flat form is documented. Same for `Combobox`/`Listbox` which also attach `.Input`/`.List`/`.Item` statics. Developers and LLMs reading the codebase will disagree about which is canonical.

This inconsistency cascades into type exports too: `Dialog` is the only runtime export from `./dialog` but `DialogTriggerProps` etc. are exported as standalone types — so the types suggest flat components that don't exist flat.

### 2. Subcomponent names are non-uniform

Across "an opener + a surface + optional items" patterns, Kinu uses five different vocabularies:

| Family | Opener | Surface | Item | Closer |
|---|---|---|---|---|
| `Dialog`, `Sheet`, `Drawer`, `AlertDialog` | `Trigger` | `Content` | — | `Close` |
| `DropdownMenu`, `ContextMenu` | `Trigger` | `Content` | `Item` | (none; Item closes) |
| `Popover`, `HoverCard` | `Trigger` | `Content` | — | `Close` |
| `Combobox`, `Listbox` | `Input` | `List` | `Item` / `Option` | (blur closes) |
| `Carousel` | (none) | `Content` | `Item` | `Previous` / `Next` |
| `Breadcrumb`, `NavigationMenu`, `Pagination` | — | `List` | `Item` + `Link` | — |
| `Tabs` | `Tab` | `TabPanel` | — | — |
| `Tree` | `Group` + `GroupLabel` | `GroupItems` | `Item` | — |
| `Field` | `Label` | — | — | `Description` / `Error` |
| `Timeline` | — | — | `Entry` | — |

Compare to shadcn/ui, which uses `Trigger` + `Content` + `Item` *everywhere*. An LLM trained on shadcn will guess `TabsTrigger` / `TabsContent` / `AccordionTrigger` / `AccordionContent` and be wrong in Kinu for most families.

### 3. The state protocol varies per component

Kinu's story is "native HTML, CSS as logic." But a handful of components deviate, and an LLM can't tell which without reading source:

| Component | State protocol |
|---|---|
| `Input`, `Textarea`, `Select`, `Slider`, `Checkbox`, `Switch`, `Radio`, `OTPInput`, `Calendar`, `DatePicker`, `TimePicker`, `FileUpload`, `ColorPicker` | Native `value`/`checked` + `onInput`/`onChange` ✅ |
| `Dialog`, `Sheet`, `Drawer`, `Popover`, `AlertDialog` | Declarative `commandFor`/`command` *or* controlled `open`/`onClose` on `*Content` |
| `DropdownMenu`, `ContextMenu` | Declarative `commandFor`/`command`; no controlled escape hatch |
| `Accordion` | `name` attribute for exclusive-open group; no `value`/`onValueChange` |
| `Collapsible` | `open` boolean only |
| `Tabs` | `aria-selected` + `onClick` + external state; no container-level `value`/`onValueChange` |
| `ToggleGroup` | `type="single" \| "multiple"`, `value`, `onValueChange` — Radix-style |
| `List`, `Listbox`, `Combobox` | `selected` boolean on Item + `onClick` + external state |
| `Toggle` | `pressed` boolean (ARIA-correct) |
| `Sidebar` | Viewport-adaptive: `toggle(hidden)` on desktop, `showModal()` on mobile |
| `Carousel` | Custom `--prev` / `--next` command events |

Five distinct controlled protocols. An LLM asked to "make a controlled X" will guess `value`/`onChange` first — correct for 13 components, wrong for 8.

### 4. Overlapping components without an obvious axis

| Category | Components | What differentiates |
|---|---|---|
| Inline indicator | `Badge`, `Status`, `Chip` | Badge = label; Status = dot + variant + pulse; Chip = Badge + optional `ChipButton` to dismiss |
| Loading/progress | `Progress`, `ProgressRing`, `Meter`, `Spinner` | Progress = linear task; ProgressRing = circular task; Meter = gauge (semantic HTML `<meter>`); Spinner = indeterminate |
| Overlay | `Dialog`, `AlertDialog`, `Sheet`, `Drawer`, `Popover` | All render `<dialog>`; differ only in position/modality |
| Collapsing | `Accordion`, `Collapsible` | Both `<details>`; Accordion supports `name=` grouping |
| Selection container | `List`, `Listbox`, `Combobox`, `DropdownMenu`, `ContextMenu` | List = nav; Listbox = inline filter; Combobox = autocomplete input; DropdownMenu = overlay; ContextMenu = right-click overlay |

The *existence* of a clear mental-model taxonomy is fine. The problem is it's not named. An LLM looking at `[Badge, Status, Chip]` cannot infer when to pick which.

### 5. `Item` is five differently-typed components in a trenchcoat

`Item`'s runtime is one component, but its TypeScript narrows the prop surface by context:

- **DropdownMenu / ContextMenu / List**: `href`, `selected`, `shortcut`, `destructive`.
- **Combobox / Listbox**: `value`, `selected`, `destructive` — no `href`, no `shortcut`.

This is invisible to an LLM: it will write `<Item href="…" shortcut="⌘K">` inside a Combobox and get a type error it can't predict. Worse, deprecated aliases still ship: `DropdownMenuItem`, `ContextMenuItem`, `ComboboxOption`, `ListboxOption`. LLMs trained on shadcn will reach for `DropdownMenuItem` and will succeed — until someone eventually deletes the deprecated symbol.

### 6. The `k` attribute

Styling is scoped by `[k="button"]` attribute selectors. `k` is:

- Not a `data-*` attribute (technically invalid HTML per spec; browsers tolerate it).
- Documented as `p=` in `AGENTS.md` — source-of-truth drift.
- Unguessable: an LLM asked to "write CSS overrides for a Kinu Button" will target `.button` or `button` first, not `[k="button"]`.

### 7. Small, high-frequency naming snags

- `OTPInput` (folder `otp/`, file `otp/index.tsx`, attribute `k="otp"`, type `OTPInputProps`). Three different cases for one concept.
- `TabList` not `TabsList`. No `Tabs` root. Every other toolkit has a `Tabs` root — an LLM's first guess will fail.
- `Radio` (not `RadioGroupItem`) is a bare `<input type="radio">`. The user must supply their own `<Label>` + layout (5-line boilerplate per option). shadcn's `RadioGroupItem` includes the label slot.
- `List` means *selectable nav list*, not generic `<ul>`. LLMs may render tabular data into `<List>` expecting `<ul>` semantics.
- `Listbox` does not mean ARIA `role="listbox"`; it's an inline, filterable command palette. Collision with a well-known ARIA term.
- `Prose`, `Typography`, and `Status` are all abstract nouns. An LLM trained on "what does a typography component export" will guess `Text`, `Heading`, `Title` — none exist.
- `FieldError` has `role="alert"` baked in; nothing in the docs signals this, so an LLM duplicating the role will double-announce.
- `Carousel`'s `Previous`/`Next` imperative triggers use a dispatched `command="--prev"` / `--next` CustomEvent — this pattern is undocumented outside `docs/pages/commands.md`.

### 8. Gaps relative to what LLMs reach for first

From shadcn/Mantine frequency in training data, LLMs will reach for these and not find them:

- `Stack` / `HStack` / `VStack` / `Flex` / `Group` / `Container` layout primitives. Kinu has none.
- `Text`, `Heading`, `Title` typographic elements. Kinu has `Typography` (CSS-only) and `Prose` (wrapper).
- `IconButton`. Kinu uses `<Button size="icon">` — discoverable only once you read the Button docs.
- `Form` / `FormField` / `FormItem` / `FormMessage`. Kinu has `Field` + `Field.Label` + `Field.Description` + `Field.Error`, which is close but uses a different vocabulary.
- `Command` / `CommandPalette`. Kinu's `Listbox` fills this role but doesn't claim the name.

---

## Comparison summary

| Axis | shadcn/ui | Radix | Mantine | **Kinu** |
|---|---|---|---|---|
| Compound style | Flat (`DialogTrigger`) | Flat (`Dialog.Root` or `DialogRoot`) | Dot (`Tabs.List`) | **Mixed** |
| Polymorphism | `asChild` | `asChild` | `component` | **Implicit child-prop-forwarding** on Trigger/Close |
| Control protocol | `value`/`onValueChange` | `value`/`onValueChange` | `value`/`onChange` | **Varies** (native events OR `commandFor` OR `onValueChange` OR `aria-selected`) |
| Theming | CSS variables | Unstyled | `MantineProvider` | CSS variables |
| Overlays | 4 separate | 4 separate | 2 (`Modal`, `Drawer`) | **5 separate** sharing `<dialog>` |
| Menu items | `{X}Item` with subtypes (`CheckboxItem`, `RadioItem`) | same | `Menu.Item` | **One `Item`** with context-narrowed types |
| Form field | `FormField` (react-hook-form) | — | `TextInput` combines label/error | **`Field` wrapper + `Field.Label/Description/Error`** |
| Tabs | `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent` | same | `Tabs`/`Tabs.List`/`Tabs.Tab`/`Tabs.Panel` | **`TabList`/`Tab`/`TabPanel`** (no root) |

---

See `LLM_NATIVE.md` for concrete recommendations.

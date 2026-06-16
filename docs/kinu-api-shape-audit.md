# Kinu API Shape Audit (Deep Review)

> Objective: audit Kinu’s API and nomenclature as if the consumer is an LLM with only a short prompt and component list.

---

## Executive summary

Kinu is already unusually close to an LLM-friendly design because it is:

1. **Platform-first** (native elements, standard attributes).
2. **Grammar-light** (thin wrappers, CSS-driven behavior).
3. **Pattern-repeating** (`createSimpleComponent` + compound slots).

However, from an LLM generation standpoint, there are still high-frequency ambiguity traps:

- **Two spellings for command target** (`commandFor` and `commandfor`) coexist in public typing and implementation.
- **Two composition styles** (flat exports and static namespace members) coexist without a declared canonical style.
- **Alias migration is partially complete** (`Option`/context items deprecated toward `Item`) but still visible in runtime API.
- **Family grammar is mostly consistent, but not contractually defined** (e.g. tabs shape differs from Radix priors).

If Kinu wants “2-sentence prompt only” usability, these need to move from **emergent consistency** to **enforced contract**.

---

## Method

Reviewed:

- Public exports (`src/index.ts`).
- Core factory and shared types (`src/lib/create-simple-component.tsx`, `src/types/component-props.ts`, `src/types/html-attributes.d.ts`).
- Command infrastructure (`src/lib/commands.ts`).
- Representative compound components (`dialog`, `sheet`, `drawer`, `popover`, `dropdown-menu`, `context-menu`, `combobox`, `listbox`, `tree`, `field`, `timeline`, `avatar`, `chip`, `list`).
- Docs metadata and taxonomy (`docs/manifest.json`, `docs/metadata.mjs`).

---

## 1) Current API shape, in concrete terms

## 1.1 Mechanical center of gravity: `createSimpleComponent`

Kinu’s dominant primitive is a monomorphic wrapper strategy:

- Choose native tag (`tag` or resolver function).
- Forward almost all native props.
- Inject stable styling marker (`k` attr).
- Optionally attach tiny behavior via ref hook.

This is the right architecture for library-level multipliers (users × apps): low runtime, low abstraction drift, high predictability.

## 1.2 Exported surface topology

Public exports in `src/index.ts` contain:

- **Standalone primitives** (e.g. `Button`, `Input`, `Badge`, `Spinner`, `Meter`, `Prose`).
- **Compound families with slot exports**:
  - Trigger/Content/Close families (`Dialog`, `Sheet`, `Drawer`, `Popover`)
  - List/Item/Link families (`Breadcrumb`, `NavigationMenu`, `Pagination`)
  - Input/List/Option families (`Combobox`, `Listbox`)
- **Hybrid family APIs** where both flat and namespaced forms exist in implementation.

### Net effect for humans
Good: easy to skim and productive.

### Net effect for LLMs
Mixed: high discoverability, but too many valid ways to write equivalent code.

## 1.3 Behavior model

Interactivity is handled with native dialog behavior + command attributes and small global installers:

- `installCommands()`
- `installAdaptiveCommands()`
- `installDialogsDropdowns()`
- `installMenuShortcuts()`

This keeps state out of component runtime and preserves platform semantics.

---

## 2) Nomenclature analysis

## 2.1 What is already excellent

### A) Slot words are semantically strong
`Trigger`, `Content`, `Close`, `List`, `Item`, `Link`, `Input` are easy for models to infer.

### B) Native nouns dominate
`Input`, `Select`, `Checkbox`, `Textarea`, `Table`, `Dialog`, etc. map directly to browser mental models.

### C) Selection is converging on one primitive
Using `Item` across menu/list families is exactly the right compression move.

## 2.2 High-value friction points

### A) `commandFor` vs `commandfor` is not just stylistic
LLMs are token pattern matchers. A single concept with two spellings causes:

- wrong prop selection in generated JSX,
- inconsistent hydration assumptions,
- import/example drift.

Today both forms are accepted in types and used in runtime paths, so the ambiguity is first-class.

### B) Flat vs namespace composition is unresolved
Examples in ecosystem often teach namespace usage (`Dialog.Trigger`).
Kinu also exports flat (`DialogTrigger`). Both are valid, neither declared canonical.

For LLMs, “both valid” often means “choose randomly per sample”.

### C) Alias layer still visible
Deprecated aliases (`ComboboxOption`, `ListboxOption`, context/menu item aliases) remain exported or assigned.

Alias presence is valuable for compatibility, but harmful as *prompt-time vocabulary*.

### D) Tabs shape fights Radix prior
Kinu uses `TabList`, `Tab`, `TabPanel`, while many model priors expect `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`.

Not wrong—just needs explicit canonical declaration or adapter naming guidance.

---

## 3) Comparison against major React toolkit priors

This section is not about feature parity; it is about *prompt-time model behavior*.

| Toolkit prior | Typical model expectation | Kinu alignment | LLM risk | Opportunity |
|---|---|---|---|---|
| **MUI** | Monolithic components, prop-rich APIs, `sx`/theme helpers | Kinu is intentionally much thinner and more native | Model may over-invent props that don’t exist | Emphasize “native-first, fewer custom props” contract |
| **Chakra UI** | Style props everywhere (`w`, `mt`, etc.) | Kinu prefers CSS selectors/tokens over prop styling | Hallucinated style props on Kinu components | Publish explicit “no style-prop DSL” rule |
| **Radix/shadcn-style** | Compound primitives with strict slot grammar | Kinu is close in spirit but has mixed flat+namespace exports and a few slot divergences | Wrong slot names/import forms | Declare fixed slot grammar + canonical usage form |

Interpretation:

- Kinu should **lean into Radix-like grammar consistency** while keeping its platform-first thinness.
- It should **actively repel MUI/Chakra hallucinations** through hard docs contract and lintable metadata.

---

## 4) LLM error surface map

These are likely failure classes even for strong models:

1. **Attribute casing drift**
   - Uses `commandFor` in one snippet, `commandfor` in another.

2. **Import form drift**
   - Mixes `DialogTrigger` and `Dialog.Trigger` in same file.

3. **Alias resurrection**
   - Uses deprecated `ComboboxOption` from prior examples.

4. **Ecosystem prior collision**
   - Writes Radix-like tabs (`Tabs.Trigger`) against Kinu tabs exports.

5. **Over-abstraction insertion**
   - Adds non-existent style-system props due Chakra/MUI priors.

---

## 5) Constraint-driven diagnosis (developit lens)

### Constraint #1: Every extra API synonym is long-term tax
- Synonyms feel ergonomic short-term.
- At scale (humans + LLMs), synonyms multiply invalid combinations.

### Constraint #2: Library runtime simplicity must match API simplicity
- Kinu runtime is simple.
- API currently has a few “historical convenience seams” that leak complexity.

### Constraint #3: “Simple case first” must be codified, not implied
- Current docs describe philosophy.
- Need a strict canonical grammar card that makes the simple case unavoidable.

---

## 6) Scorecard (LLM-native readiness)

Scored 1–10 on “can a model generate correct code from short prompt + component list”.

- **Native semantic alignment:** 9.0
- **Slot naming coherence:** 8.0
- **Single obvious way per task:** 5.5
- **Token-level consistency:** 5.5
- **Deprecated-surface containment:** 6.0
- **Prompt-only generation reliability:** 6.5

**Overall: 6.8 / 10**

Kinu’s architecture is excellent; the remaining gap is mostly API contract clarity, not implementation complexity.

---

## 7) What should *not* change

To avoid regressing performance/minimalism:

1. Do **not** add large runtime abstractions to “help DX”.
2. Do **not** introduce broad style-prop systems.
3. Do **not** replace native element strategy with synthetic state machines where platform APIs already solve it.

---

## 8) High-impact recommendations (audit output)

1. **Choose one public spelling for command targeting (`commandFor`) and hard-freeze it.**
2. **Declare one canonical composition style for docs and examples (prefer namespace).**
3. **Hide legacy aliases from docs and manifest; keep only compatibility exports for a defined deprecation window.**
4. **Publish a slot grammar contract (`Trigger|Content|Close|List|Item|Link|Input|Label|Description|Error`).**
5. **Add an API-schema artifact for tooling/LLM grounding generated from source.**
6. **Create a compile-checked “prompt fixture” suite that tests generation assumptions.**

These are mostly documentation/tooling boundary changes with minimal runtime cost.

---

## 9) Bottom line

Kinu is very close to the ideal: a low-level library with high-level clarity.

The work remaining is to turn implicit consistency into explicit, versioned contract so that **both people and models get one obvious path** every time.

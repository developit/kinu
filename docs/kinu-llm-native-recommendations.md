# Kinu LLM-Native Plan (Priors-First, Zero-Docs Target)

> Target: with only a 2-sentence description + component list, an LLM should generate correct Kinu code on first try.

---

## 0) Design stance

Kinu should win by **being guessable**, not by shipping extra metadata protocols.

Use two priors LLMs already have:

1. **HTML prior**: LLMs know native tags/attributes (`dialog`, `details`, `input`, `open`, `onInput`, `onChange`, `onToggle`).
2. **Radix/shadcn prior**: LLMs know `Component.Slot` composition (`Trigger`, `Content`, `Item`, etc.).

So the strategy is not “teach models Kinu”.
The strategy is “make Kinu look like what good models already know”.

---

## 1) Hard contract (small, strict, guessable)

## 1.1 Canonical composition: namespace-only in docs

Docs/examples should always show:

```tsx
<Dialog>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>...</Dialog.Content>
  <Dialog.Close>Close</Dialog.Close>
</Dialog>
```

Flat exports may exist internally for implementation convenience, but they should be effectively invisible in canonical docs.

**Reason:** one syntax path reduces token entropy and mixed-import hallucinations.

## 1.2 Canonical slot vocabulary (frozen)

Allowed slot words:

- `Trigger`
- `Content`
- `Close`
- `List`
- `Item`
- `Link`
- `Input`
- `Label`
- `Description`
- `Error`

New slot words require exceptional justification; synonyms are usually a bug.

## 1.3 HTML-first event and state names

Because Kinu is platform-native, canonical state/event vocabulary should mirror HTML:

- disclosure/state: `open`, `defaultOpen`, `onToggle`
- value flow: `value`, `defaultValue`, `onInput`, `onChange`

Avoid framework-invented callback names unless HTML cannot express the behavior.

## 1.4 One command target spelling

Canonical public spelling: `commandFor`.

Notes:
- In Preact, casing still maps to an attribute, so both forms may function.
- But docs + TS types should standardize on `commandFor` only to eliminate generation drift.

---

## 2) Resolve ambiguous surfaces now (no compatibility drag)

Given Kinu is currently single-user and migration burden is low, prefer immediate cleanup over long deprecation windows.

## 2.1 Immediate naming decisions

- Canonicalize `commandFor` in docs and public types.
- Standardize on namespace composition in docs.
- Replace deprecated option/item aliases in docs with canonical `Item` forms.

## 2.2 Tabs decision (explicit)

Yes—adopt Radix-prior naming for tabs because it improves first-try correctness.

Recommended canonical shape:

- `Tabs`
- `Tabs.List`
- `Tabs.Trigger`
- `Tabs.Content`

Keep current `TabList`/`Tab`/`TabPanel` only as short-term bridge if needed, but do not keep dual canonical styles in docs.

---

## 3) Replace heavy metadata plans with a tiny “grammar card”

Instead of adding `llm-api.json` as a dependency for success, optimize the API so metadata is optional.

Use one compact, human-and-LLM readable file (eg `docs/llm-grammar-card.md`) containing only:

1. Canonical composition rule (`Component.Slot`).
2. Frozen slot vocabulary.
3. HTML-first event/state naming rules.
4. 8–12 minimal golden examples (dialog, tabs, combobox, listbox, form field, menu).
5. Explicit anti-examples (`commandfor`, mixed flat+namespace imports, deprecated aliases).

This keeps complexity low and forces API clarity at the source.

---

## 4) CI checks that enforce “guessability”

## 4.1 First-try fixture checks

Add a small fixture suite where each test only sees:

- the 2-sentence Kinu card,
- component list,
- one task prompt.

Pass criteria:

- snippet typechecks,
- uses canonical slot words,
- uses HTML-native event names,
- avoids non-canonical tokens.

## 4.2 Contract lint checks

Fail PRs when:

- docs introduce non-canonical slot names,
- docs/examples use `commandfor`,
- docs/examples show flat + namespace styles mixed,
- new APIs invent callback names where HTML events suffice.

---

## 5) Rollout (aggressive, low-cost)

### Phase 1 (immediate)

1. Publish `llm-grammar-card.md`.
2. Rewrite docs/examples to one canonical grammar.
3. Switch public docs/type examples to `commandFor`.
4. Decide and document canonical Tabs shape.

### Phase 2 (lock boundaries)

1. Add contract lint rules.
2. Add first-try fixture tests.
3. Remove/stop documenting non-canonical names.

### Phase 3 (steady-state)

1. Treat API grammar changes like compatibility events.
2. Keep grammar small; reject additive synonyms by default.

---

## 6) Success metrics

Primary:

- First-try compile pass from minimal prompt: **≥ 95%**.
- Canonical token usage in generated snippets: **≥ 98%**.
- Median repair turns: **≤ 1**.

Secondary:

- Fewer docs/API naming exceptions.
- Fewer “which syntax should I use?” decisions.

---

## 7) Ultra-token-efficient 2-sentence Kinu card

“Kinu is a Preact UI toolkit of thin native-HTML wrappers: prefer real platform behavior (`dialog`, `details`, form/input semantics) and CSS-attribute styling over JS abstractions. Use `Component.Slot` composition with fixed slot names (`Trigger|Content|Close|List|Item|Link|Input`) and HTML-native state/events (`open/defaultOpen/onToggle`, `value/defaultValue/onInput/onChange`), with `commandFor` as the only command-target prop spelling.”

---

## 8) Bottom line

The fastest route to LLM-native Kinu is not extra schema.
It is a brutally consistent API grammar aligned with HTML + Radix priors, enforced by docs and tests.

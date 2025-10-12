# Checkbox

Custom styled checkbox input. Uses native `<input type="checkbox">` semantics.

## Import

```tsx
import {Checkbox} from 'pui';
```

## Usage

```tsx
<Checkbox id="accept" checked={value} onInput={(event) => setValue(event.currentTarget.checked)} />
```

## Props

- Supports every checkbox attribute, including `indeterminate` (set via `ref`), `checked`, `value`, and `disabled`.

## Accessibility

Pair the checkbox with `<Label htmlFor>` so users understand the choice. When using controlled state keep the input in sync to avoid confusing screen readers.

## CSS hooks

- `[p="checkbox"]` — box styling.
- `[p="checkbox"]:checked` — active state and checkmark animation.
- `[p="checkbox"]:disabled` — disabled presentation.

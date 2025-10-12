# Badge

Compact status pill that renders as a `<span>` so you can annotate text or UI elements without additional wrappers.

## Import

```tsx
import {Badge} from 'pui';
```

## Usage

```tsx
<Badge>Default</Badge>
<Badge variant="secondary">In review</Badge>
```

## Props

- `variant` — switches the tone. Supported values: `secondary`, `destructive`, and `outline`. When omitted the badge uses the primary palette.
- Accepts all native `<span>` attributes for labelling, tooltips, or interactions.

## Accessibility

Badge content should be short and descriptive. Add `aria-label` when the text alone is not descriptive enough (for example when the badge contains an icon).

## CSS hooks

- `[p="badge"]` — base styles.
- `[p="badge"][variant="secondary"|"destructive"|"outline"]` — tone variants from `src/components/badge/style.css`.

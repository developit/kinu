# Tooltip

Lightweight tooltip that relies on the native `title` attribute. Wrap any element and provide `title` to show the hover/focus hint.

## Import

```tsx
import {Tooltip} from 'pui';
```

## Usage

```tsx
<Tooltip title="Save">
  <Button size="icon">💾</Button>
</Tooltip>
```

## Props

- `title` — text shown in the tooltip bubble. Supports plain text only.
- Any additional attributes for the outer `<span>` wrapper (e.g. `class`, `style`).

## Accessibility

Because the tooltip uses `title`, the content is announced on focus in most browsers. If you need richer accessible content, combine the tooltip with `aria-describedby` pointing at off-screen text.

## CSS hooks

- `[p="tooltip"]` — wrapper styles.
- `[p="tooltip"][title]::after` — tooltip bubble; override to change positioning or animation.

# Button

Action trigger that renders as `<button>` by default or `<a>` when an `href` is provided. All props are forwarded to the native element so you can use the standard event model.

## Import

```tsx
import {Button} from 'pui';
```

## Usage

```tsx
<Button>Primary action</Button>
<Button variant="outline">Secondary</Button>
<Button size="icon" aria-label="Save">💾</Button>
```

## Props

- `variant` — style intent. Supported values: `secondary`, `destructive`, `outline`, `ghost`, and `link`. The default matches the primary palette.
- `size` — sizing preset (`sm`, `md`, `lg`, or `icon`). When omitted the medium button is used.
- `loading` — any truthy value disables pointer events while keeping the button rendered.
- All other `<button>`/`<a>` attributes (such as `type`, `disabled`, `aria-*`, `href`, etc.) pass through unchanged.

## Accessibility

Supply `aria-label` whenever the button’s text is not visible. When using the link variant remember to provide `href` (or `role="button"` if you intentionally act like a button).

## CSS hooks

- `[p="button"]` — base styles including focus ring.
- `[p="button"][variant="…"]` for the different tones listed above.
- `[p="button"][size="sm|lg|icon"]` to override sizing.
- `[p="button"][loading]` for disabled visuals while an async task runs.

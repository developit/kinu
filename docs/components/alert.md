# Alert

Informational callout rendered as a `<div>` with optional variants.

## Import

```tsx
import {Alert} from 'pui';
```

## Usage

```tsx
<Alert>
  <strong>Heads up:</strong> Something happened.
</Alert>
```

## Props

- `variant="destructive"` — emphasises critical issues using the destructive palette.
- Accepts standard `<div>` attributes for additional semantics (e.g. `role="alert"`).

## Accessibility

Apply `role="status"` or `role="alert"` depending on whether the message is informational or critical. Place focus on interactive elements inside the alert when you require immediate attention.

## CSS hooks

- `[p="alert"]` — base styling.
- `[p="alert"][variant="destructive"]` — destructive tone.

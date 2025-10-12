# Progress

A styled wrapper around the native `<progress>` element with zero additional JavaScript.

## Import

```tsx
import {Progress} from 'pui';
```

## Usage

```tsx
<Progress value={45} max={100} />
```

## Props

- `value` / `max` — native `<progress>` attributes that control the indicator.
- Accepts any additional `<progress>` attributes, including `aria-label` for screen reader descriptions.

## Accessibility

Pair the progress bar with text that communicates the status. When the label is not visually rendered, supply an `aria-label` or `aria-labelledby` attribute.

## CSS hooks

- `[p="progress"]` — shell styles for the control.
- `::-webkit-progress-value` / `::-moz-progress-bar` are used to theme the filled portion via `src/components/progress/style.css`.

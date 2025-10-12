# Toggle

Binary toggle button implemented with a `<button>`. Pressing it toggles `aria-pressed` and deactivates siblings inside the same `ToggleGroup`.

## Import

```tsx
import {Toggle} from 'pui';
```

## Usage

```tsx
<Toggle aria-pressed={value} onClick={() => setValue((prev) => !prev)}>
  Bold
</Toggle>
```

## Props

- Any `<button>` attribute is supported.
- Provide `aria-pressed` when you manage state manually. The built-in click handler toggles the attribute automatically and clears siblings inside a group.

## Accessibility

Use `aria-label` when the button contains icons. When part of a toggle group, wrap the toggles in `ToggleGroup` so the built-in handler coordinates pressed state.

## CSS hooks

- `[p="toggle"]` — base styling.
- `[p="toggle"][aria-pressed="true"]` — active visuals.

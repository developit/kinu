# Toggle Group

Layout helper for grouping multiple `<Toggle>` buttons so only one stays pressed at a time.

## Import

```tsx
import {ToggleGroup, Toggle} from 'pui';
```

## Usage

```tsx
<ToggleGroup role="group" aria-label="Text formatting">
  <Toggle>Bold</Toggle>
  <Toggle>Italic</Toggle>
  <Toggle>Underline</Toggle>
</ToggleGroup>
```

## Behaviour

The group listens for clicks on child toggles and clears `aria-pressed` on siblings, giving you radio-button style exclusivity without additional code. Manage the actual value in state when you need to persist the selection.

## Accessibility

Set `role="group"` or `role="toolbar"` depending on the pattern you are implementing, and provide an accessible label.

## CSS hooks

- `[p="toggle-group"]` — horizontal layout spacing.

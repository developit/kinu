# Switch

Accessible toggle built on top of an `<input type="checkbox">` with `role="switch"` applied by default.

## Import

```tsx
import {Switch} from 'pui';
```

## Usage

```tsx
<Switch checked={value} onInput={(event) => setValue(event.currentTarget.checked)} />
```

## Props

- `checked`, `onInput`, `disabled`, and other checkbox attributes all work as usual.
- No custom props—the switch is controlled exactly like a checkbox.

## Accessibility

When labelling the switch, link a `<Label>` using `htmlFor`. The default `role="switch"` exposes state as “on/off” to assistive tech.

## CSS hooks

- `[p="switch"]` — track and thumb styling.
- `[p="switch"]:checked` — active state styling.
- `[p="switch"]:disabled` — muted style for disabled switches.

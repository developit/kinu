# Input

Styling for the native `<input>` element. PUI does not wrap value handling—you get the standard DOM APIs.

## Import

```tsx
import {Input} from 'pui';
```

## Usage

```tsx
<Input type="email" placeholder="name@company.com" />
```

## Props

- `size` — visual sizing preset (`sm`, `md`, `lg`). Default is medium.
- `invalid` — optional boolean attribute that forces the error state without relying on browser validation.
- Accepts every native `<input>` attribute (`type`, `value`, `onInput`, etc.).

## Accessibility

Pair the input with a `<Label>` component using `htmlFor`. Native validation UI is still available because the component forwards the attributes unchanged.

## CSS hooks

- `[p="input"]` — base state.
- `[p="input"][size="sm|lg"]` — size variants.
- `[p="input"]:invalid` and `[p="input"][invalid]` — error presentation.

# Select

Styled wrapper for the native `<select>` element. Keeps the native dropdown behaviour while providing consistent visuals.

## Import

```tsx
import {Select} from 'pui';
```

## Usage

```tsx
<Select value={value} onInput={(event) => setValue(event.currentTarget.value)}>
  <option value="apple">Apple</option>
  <option value="orange">Orange</option>
</Select>
```

## Props

- Accepts all `<select>` attributes (`multiple`, `size`, `disabled`, etc.).

## Accessibility

Native selects already include full keyboard and screen-reader support. Remember to link them with `<Label>` using `htmlFor` when necessary.

## CSS hooks

- `[p="select"]` — base styling including the custom chevron background image.
- Use pseudo selectors (`:focus-visible`, `:disabled`) to customise additional states.

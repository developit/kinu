# Radio Group

Simple primitives for building radio groups with full control over layout.

## Import

```tsx
import {RadioGroup, Radio} from 'pui';
```

## Usage

```tsx
<RadioGroup role="radiogroup">
  <Radio id="option-1" name="choice" value="one" checked={value === 'one'} />
  <Label htmlFor="option-1">Option one</Label>
</RadioGroup>
```

## Props

- `RadioGroup` renders a `<div>` wrapper—set `role="radiogroup"` and manage spacing as needed.
- `Radio` forwards all `<input type="radio">` attributes (`name`, `value`, `checked`, `onInput`, etc.).

## Accessibility

Make sure every radio shares the same `name` attribute so the browser enforces a single selection. Connect each radio to its label using `htmlFor`.

## CSS hooks

- `[p="radio-group"]` — flex layout for the group.
- `[p="radio"]` and `[p="radio"]::before` — idle and checked visuals.

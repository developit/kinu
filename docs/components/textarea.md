# Textarea

Styled `<textarea>` element that keeps native behaviour and auto-resize controls.

## Import

```tsx
import {Textarea} from 'pui';
```

## Usage

```tsx
<Textarea rows={4} placeholder="Tell us more..." />
```

## Props

- Supports every standard `<textarea>` attribute (`rows`, `value`, `onInput`, etc.).
- Resizes vertically by default; change `style.resize` if you want to lock the size.

## Accessibility

Associate the textarea with `<Label htmlFor>` so screen readers announce the prompt. Use `aria-describedby` to provide hint text.

## CSS hooks

- `[p="textarea"]` — base styling.
- Focus and disabled states use the standard pseudo selectors defined in `src/components/textarea/style.css`.

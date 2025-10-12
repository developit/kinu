# Slider

Range input with a dynamic CSS gradient that reflects the current value.

## Import

```tsx
import {Slider} from 'pui';
```

## Usage

```tsx
<Slider min={0} max={100} value={value} onInput={(event) => setValue(Number(event.currentTarget.value))} />
```

## Props

- Built on `<input type="range">`, so all native attributes (`min`, `max`, `step`, `value`, `onInput`, `disabled`) apply.

## Accessibility

Use `aria-label` or connect the slider with a `<Label>` for screen readers. Expose the current numeric value in adjacent text so users understand the context.

## CSS hooks

- `[p="slider"]` — track styling using the `--progress` CSS variable.
- `::-webkit-slider-thumb` / `::-moz-range-thumb` — thumb styling.
- `[p="slider"]:disabled` — muted tone when interactions are disabled.

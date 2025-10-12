# Avatar

Circle avatar image with text fallback. Renders an `<img>` and uses the `alt` attribute as fallback initials.

## Import

```tsx
import {Avatar} from 'pui';
```

## Usage

```tsx
<Avatar src="/user.jpg">JD</Avatar>
```

## Props

- Accepts all `<img>` attributes (`src`, `srcset`, `loading`, etc.).
- Pass children to set the fallback text rendered when the image fails.
- Control dimensions using inline `style` or CSS utilities if you need sizes other than the default `32px` circle.

## Accessibility

Always provide descriptive alt text. If you pass initials as children the component automatically sets the same string as the `alt` attribute.

## CSS hooks

- `[p="avatar"]` — circle mask and object-fit styling.
- `[p="avatar"]::after` — fallback overlay that displays the `alt` text.

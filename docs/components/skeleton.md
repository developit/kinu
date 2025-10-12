# Skeleton

Animated placeholder block that renders as a `<div>` while content loads.

## Import

```tsx
import {Skeleton} from 'pui';
```

## Usage

```tsx
<Skeleton style={{height: '1.5rem'}} />
```

## Props

- Accepts standard `<div>` attributes. Set `style.height`/`style.width` to match the final layout.

## Accessibility

Skeletons represent loading UI. Keep them purely decorative and avoid including text nodes inside the component. Pair the skeleton with polite live-region messaging if you need to announce loading state.

## CSS hooks

- `[p="skeleton"]` — base block styles.
- Pseudo-element animation defined in `src/components/skeleton/style.css` can be overridden to match your brand shimmer.

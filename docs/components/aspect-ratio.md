# Aspect Ratio

Utility wrapper that keeps its children inside a fixed ratio box using the native `aspect-ratio` property.

## Import

```tsx
import {AspectRatio} from 'pui';
```

## Usage

```tsx
<AspectRatio style={{'--ratio': '16 / 9'}}>
  <img src="/cover.jpg" alt="" />
</AspectRatio>
```

## Props

- Accepts all `<div>` attributes.
- Control the ratio through the CSS custom property `--ratio` (`1 / 1` by default).

## CSS hooks

- `[p="aspect-ratio"]` — sets positioning and exposes the `--ratio` variable.
- `[p="aspect-ratio"] > *` — absolutely positions child content to fill the box.

# Hover Card

Simple hover/focus preview surface.

## Import

```tsx
import {HoverCard, HoverCardTrigger, HoverCardContent} from 'pui';
```

## Usage

```tsx
<HoverCard>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>
    <p>Extra detail shown on hover.</p>
  </HoverCardContent>
</HoverCard>
```

## Behaviour

The content becomes visible on hover. If you need focus or click activation you can wire your own handlers and toggle `hidden`/`data-state` attributes.

## CSS hooks

- `[p="hover-card"]` — anchor container.
- `[p="hover-card-content"]` — floating panel; override transform or transitions for custom effects.

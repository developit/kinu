# Carousel

Scroll snapping carousel with previous/next helpers.

## Usage

```tsx
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from 'kinu';

<Carousel>
  <CarouselContent>
    <CarouselItem>Slide</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Carousel | Image slider | — |
| CarouselContent | Slider content | — |
| CarouselItem | Slide item | `<div k="carousel-item">` |
| CarouselPrevious | Previous button | — |
| CarouselNext | Next button | — |

## Props

### CarouselProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | — | Optional ID for the carousel content. If not provided, one will be auto-generated. |

### CarouselContentProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| dots | `boolean` | — | Render native CSS pagination dots beneath the carousel. Progressive
enhancement — the prev/next buttons remain the baseline control, and dots
only appear where `::scroll-marker` is supported. |

## Notes

- Leverages CSS scroll snap for buttery momentum.
- Content remains fully declarative.
- Add `dots` to CarouselContent for native `::scroll-marker` pagination — CSS-only, and it degrades to no dots where the pseudo-element is unsupported.

---

_Source: `src/components/carousel/index.tsx`

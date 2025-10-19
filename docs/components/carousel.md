# Carousel

Scroll snapping carousel with previous/next helpers.

## Usage

```tsx
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from 'pui';

<Carousel>
  <CarouselContent>
    <CarouselItem>Slide</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Carousel | — | Custom component implemented in the source file. |
| CarouselContent | — | Custom component implemented in the source file. |
| CarouselItem | `<div>` | Wraps `<div>` and sets p="carousel-item". |
| CarouselPrevious | p="carousel-previous" | Renders markup that includes p="carousel-previous". |
| CarouselNext | p="carousel-next" | Renders markup that includes p="carousel-next". |

## Attributes

Inherits all native attributes from `<div>`. No additional styling attributes are required.

## Notes

- Leverages CSS scroll snap for buttery momentum.
- Content remains fully declarative.

---

_Source: `src/components/carousel/index.tsx`

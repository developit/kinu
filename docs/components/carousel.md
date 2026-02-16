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

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Carousel | Image slider | — |
| CarouselContent | Slider content | — |
| CarouselItem | Slide item | `<div p="carousel-item">` |
| CarouselPrevious | Previous button | `p="carousel-previous"` |
| CarouselNext | Next button | `p="carousel-next"` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| id | `string` | — | Optional ID for the carousel content. If not provided, one will be auto-generated. |

## Notes

- Leverages CSS scroll snap for buttery momentum.
- Content remains fully declarative.

---

_Source: `src/components/carousel/index.tsx`

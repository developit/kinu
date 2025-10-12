# Carousel

Scrollable carousel with command-based navigation.

## Import

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from 'pui';
```

## Usage

```tsx
<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious>‹</CarouselPrevious>
  <CarouselNext>›</CarouselNext>
</Carousel>
```

## Behaviour

- The content scrolls horizontally using smooth scrolling and CSS scroll snapping.
- Navigation buttons dispatch commands (`--prev`, `--next`) to move a slide at a time.

## Accessibility

Slides are normal DOM nodes. Provide headings and alt text where necessary. Offer non-pointer controls (the buttons already work with keyboard activation).

## CSS hooks

- `[p="carousel"]` — scroll container.
- `[p="carousel-item"]` — slide layout.
- `[p="carousel-previous"]`, `[p="carousel-next"]` — navigation button styling.

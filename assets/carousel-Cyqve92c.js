const e=`# Carousel

Scroll snapping carousel with previous/next helpers.

## Usage

\`\`\`tsx
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from 'pui';

<Carousel>
  <CarouselContent>
    <CarouselItem>Slide</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
\`\`\`

## Exports

| Name | DOM element | Description |
| --- | --- | --- |
| Carousel | \`<div>\` | Context provider that wires carousel commands and layout. |
| CarouselContent | \`<div>\` | Scrollable container that applies snap behavior to slides. |
| CarouselItem | \`<div>\` | Individual slide panel inside the carousel. |
| CarouselPrevious | \`<button>\` | Button that scrolls to the previous slide. |
| CarouselNext | \`<button>\` | Button that scrolls to the next slide. |

## Attributes

Inherits all native attributes from \`<div>\`. No additional styling attributes are required.

## Notes

- Leverages CSS scroll snap for buttery momentum.
- Content remains fully declarative.

---

<source-ref src="src/components/carousel/index.tsx"></source-ref>
`;export{e as default};
//# sourceMappingURL=carousel-Cyqve92c.js.map

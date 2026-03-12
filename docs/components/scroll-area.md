# Scroll Area

Overflow wrapper with custom scrollbars and shadow indicators.

## Usage

```tsx
import {ScrollArea} from 'kinu';

<ScrollArea style={{height: '200px'}}><div>Long content</div></ScrollArea>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| ScrollArea | Scrollable area | `<div k="scroll-area">` |

## Notes

- Applies scroll shadows using CSS masks.
- Forwards native overflow attributes for flexibility.

---

_Source: `src/components/scroll-area/index.tsx`

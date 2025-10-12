# Toggle Group

Container that lets Toggle buttons coordinate pressed state.

## Usage

```tsx
import {ToggleGroup} from 'pui';

<ToggleGroup>
  <Toggle>Bold</Toggle>
  <Toggle>Italic</Toggle>
</ToggleGroup>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| ToggleGroup | <div> | Wraps <div> and sets p="toggle-group". |

## Attributes

Inherits all native attributes from <div>. No additional styling attributes are required.

## Notes

- Each Toggle toggles aria-pressed and clears other toggles in the same group.
- Pass props like disabled or value straight to the underlying <button>.

---

_Source: `src/components/toggle-group/index.tsx`

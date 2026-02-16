# Input Group

Compact field wrapper for joined controls like input + button actions.

## Usage

```tsx
import {InputGroup} from 'pui';

<InputGroup>
  <Input placeholder="Search" />
  <Button variant="outline">Go</Button>
</InputGroup>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| InputGroup | `<fieldset>` | Wraps `<fieldset>` and sets `p="input-group"`. |

## Attributes

Inherits all native attributes from `<fieldset>`. No additional styling attributes are required.

## Notes

- Joins borders and corner radii across child controls using CSS only.
- Supports both PUI primitives (`[p="input"]`, `[p="button"]`) and native form elements.

---

_Source: `src/components/input-group/index.tsx`

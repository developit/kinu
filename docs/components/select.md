# Select

Styled native <select> element with size variants.

## Usage

```tsx
import {Select} from 'pui';

<Select>
  <option>One</option>
</Select>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Select | <select> | Wraps <select> and sets p="select". |

## Attributes

Inherits all native attributes from <select>. No additional styling attributes are required.

## Notes

- Leverages the platform picker on touch devices.
- Supports native multiple and size attributes.

---

_Source: `src/components/select/index.tsx`

# Input Group

Compact fieldset wrapper for joined controls like input and button rows.

## Usage

```tsx
import {InputGroup} from 'kinu';

<InputGroup>
  <Input placeholder="Search" />
  <Button variant="outline">Go</Button>
</InputGroup>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| InputGroup | Input group | `<fieldset p="input-group">` |

## Notes

- Uses CSS-only border and radius joining for grouped controls.
- Works with both Kinu primitives and native form elements.

---

_Source: `src/components/input-group/index.tsx`

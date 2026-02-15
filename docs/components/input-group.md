# Input Group

Groups adjacent controls into a single compact row with shared edges.

## Usage

```tsx
import {Button, Input, InputGroup} from 'pui';

<InputGroup>
  <Input placeholder="Search docs" />
  <Button>Search</Button>
</InputGroup>
```

## Attributes

Inherits all native attributes from `<fieldset>`. No additional styling attributes are required.

## Notes

- Removes interior border seams and radii for grouped controls.
- Supports an optional `<legend>` as a leading inline label.

---

<source-ref src="src/components/input-group/index.tsx"></source-ref>

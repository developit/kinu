# Calendar

Styled wrapper around the native `<input type="date">` element.

## Usage

```tsx
import {Calendar} from 'pui';

<Calendar />
```

## Attributes

Inherits all native attributes from `<input>`. No additional styling attributes are required.

## Notes

- Forwards every standard input attribute, defaulting type to "date".
- Uses the browser's native date picker UI for accessibility and localisation.

---

<source-ref src="src/components/calendar/index.tsx"></source-ref>

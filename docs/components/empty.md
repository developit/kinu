# Empty

Centered placeholder for no-data / no-results states.

## Usage

```tsx
import {Empty} from 'kinu';

<Empty>
  <h3>No results</h3>
  <p>Try a different search.</p>
</Empty>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Empty | Empty state placeholder | `<div k="empty">` |

## Notes

- Centers heading, body text, and optional actions in a flex column.
- Headings inherit the foreground color; body text defaults to muted foreground.

---

_Source: `src/components/empty/index.tsx`

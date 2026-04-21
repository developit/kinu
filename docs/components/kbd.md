# Kbd

Styled `<kbd>` wrapper for keyboard shortcut glyphs.

## Usage

```tsx
import {Kbd} from 'kinu';

<Kbd>⌘K</Kbd>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Kbd | Keyboard key | `<kbd k="kbd">` |

## Notes

- Wraps the native `<kbd>` element so semantics stay intact.
- Combine multiple keys in a single `<Kbd>` (e.g. `⌘S`) to render them as one keycap.
- Pairs naturally with `Item` rows — drop a `<Kbd style={{marginLeft: 'auto'}}>` inside an item to show the shortcut on the trailing edge.

---

_Source: `src/components/kbd/index.tsx`

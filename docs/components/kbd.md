# Kbd

Styled `<kbd>` wrapper for keyboard shortcut glyphs.

## Usage

```tsx
import {Kbd} from 'kinu';

<Kbd>⌘</Kbd> <Kbd>K</Kbd>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Kbd | Keyboard key | `<kbd k="kbd">` |

## Notes

- Wraps the native `<kbd>` element so semantics stay intact.
- Pairs naturally with `Item`'s `shortcut` prop or any inline label.

---

_Source: `src/components/kbd/index.tsx`

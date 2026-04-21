# Prose

Typography wrapper that styles nested HTML (markdown output, CMS content, article bodies).

## Usage

```tsx
import {Prose} from 'kinu';

<Prose><h1>Title</h1><p>Body...</p></Prose>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Prose | Typography wrapper | `<div k="prose">` |

## Notes

- Tune spacing, font, and heading weight via CSS variables: `--k-prose-spacing`, `--k-prose-font`, `--k-prose-heading-weight`.
- Only styles direct and nested standard elements; does not touch Kinu components used inside.
- First/last child margins are zeroed so the wrapper can drop into any layout without margin collapse.

---

_Source: `src/components/prose/index.tsx`

# Copy Button

One-tap copy-to-clipboard button with a CSS-only copied state.

## Usage

```tsx
import {CopyButton} from 'kinu';

<CopyButton value="npm install kinu" />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| CopyButton | Component | — |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string` | — | Text to copy. Takes precedence over `for`. |
| for | `string` | — | CSS selector whose `textContent` is copied when `value` is absent. |
| label | `string` | 'Copy' | Idle label, rendered via CSS. |
| copiedLabel | `string` | 'Copied' | Label shown briefly after a successful copy, rendered via CSS. |

## Notes

- Pass `value` to copy a string, or `for` (a CSS selector) to copy another element’s `textContent`.
- The idle and copied labels render via CSS `attr()` (`label` / `copiedLabel`), so the success state needs no JS text swap — the handler just toggles a `[copied]` attribute for ~1.2s.
- SSR-safe: `navigator.clipboard` is only touched inside the click handler, which runs client-side.

---

_Source: `src/components/copy-button/index.tsx`

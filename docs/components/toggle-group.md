# Toggle Group

Container that lets Toggle buttons coordinate pressed state.

## Usage

```tsx
import {ToggleGroup} from 'pui';

<ToggleGroup>
  <Toggle>Bold</Toggle>
  <Toggle>Italic</Toggle>
</ToggleGroup>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| ToggleGroup | Toggle group | `<div p="toggle-group">` |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| ToggleGroup | aria-pressed | true | Forwarded attribute used by the component styling. |

## Notes

- Each Toggle toggles aria-pressed and clears other toggles in the same group.
- Pass props like disabled or value straight to the underlying `<button>`.

---

_Source: `src/components/toggle-group/index.tsx`

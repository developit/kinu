# Select

Styled native `<select>` element with size variants.

## Usage

```tsx
import {Select} from 'kinu';

<Select>
  <option>One</option>
</Select>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Select | Dropdown selection | `<select p="select">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string | number | readonly string[] | undefined` | — | Current selected value. |
| onChange | `(event: Event) => void` | — | Change handler for controlled selects. |
| disabled | `boolean` | — | Disable the select input. |
| multiple | `boolean` | — | Native multiple selection toggle. |
| size | `number` | — | Number of visible options when using native size. |

## Notes

- Leverages the platform picker on touch devices.
- Supports native multiple and size attributes.

---

_Source: `src/components/select/index.tsx`

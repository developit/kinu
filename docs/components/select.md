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
| Select | Dropdown selection | `<select k="select">` |

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
- On Chromium (`@supports (appearance: base-select)`) it upgrades to a fully stylable dropdown — themed picker, hover/checked option states, rich option markup — and degrades to the native styled select everywhere else, with zero added JavaScript.

---

_Source: `src/components/select/index.tsx`

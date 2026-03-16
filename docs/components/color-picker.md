# Color Picker

Styled color swatch input that opens the native OS color picker.

## Usage

```tsx
import {ColorPicker} from 'kinu';

<ColorPicker />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| ColorPicker | Component | `<input k="color-picker">` |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string | number | readonly string[] | undefined` | — | Current color value as a hex string (e.g. "#ff0000"). |
| onChange | `(event: Event) => void` | — | Change handler for the color input. |
| disabled | `boolean` | — | Disable the input. |
| name | `string` | — | Input name used for form submissions. |

## Notes

- Sets type="color" for you and forwards all native input props.
- Pairs naturally with `Input` inside an `InputGroup` to show an editable hex value alongside the swatch.

---

_Source: `src/components/color-picker/index.tsx`

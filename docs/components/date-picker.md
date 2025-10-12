# Date Picker

Another name for the styled `<input type="date">`. Use whichever label reads better in your UI copy.

## Import

```tsx
import {DatePicker} from 'pui';
```

## Usage

```tsx
<DatePicker value={value} onInput={(event) => setValue(event.currentTarget.value)} />
```

## Notes

The implementation is identical to `Calendar`. The component exists so you can pick the semantic name that fits your design system.

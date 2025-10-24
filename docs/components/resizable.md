# Resizable

Resizable container that exposes native CSS handles.

## Usage

```tsx
import {Resizable} from 'pui';

<Resizable style={{width: "20rem", height: "12rem"}} />
```

## Attributes

Inherits all native attributes from `<div>`. No additional styling attributes are required.

## Notes

- Wraps a `<div>` with resize: both so the browser handles drag gestures.
- Perfect for scratchpads, preview panes, or demos where users adjust size.

---

<source-ref src="src/components/resizable/index.tsx"></source-ref>

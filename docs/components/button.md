# Button

Button component that forwards props to `<button>` or `<a>` when href is provided.

## Usage

```tsx
import {Button} from 'pui';

<Button variant="outline">Action</Button>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Button | p="button" | Resolves the underlying element at runtime using (props: any) => 
  props.href ? 'a' : 'button'. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Button | size | md | sm | lg | icon (omit for default) | Controls component sizing. |
| Button | loading | boolean | Boolean flag to show pending state. |
| Button | variant | destructive | outline | secondary | ghost | link | Visual style variant selector. |

## Notes

- Use the loading attribute to reflect pending state without extra handlers.
- Supports size attributes (sm, md, lg, icon) controlled purely with CSS.

---

_Source: `src/components/button/index.tsx`

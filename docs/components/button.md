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
| Button | `p="button"` | Resolves the underlying element at runtime using `(props) => (props.href ? 'a' : 'button')`. |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `ButtonVariant` | 'default' | Visual style variant. |
| size | `ButtonSize` | 'md' | Size preset for the button. |
| loading | `boolean` | — | Shows a pending state and disables interactions. |
| href | `string` | — | When provided, renders the Button as an anchor element. |
| target | `JSX.IntrinsicElements` | — | Target for anchor elements. |
| rel | `JSX.IntrinsicElements` | — | Relationship between the current page and the linked resource. |
| onClick | `JSX.IntrinsicElements` | — | Click handler for the button. |
| disabled | `boolean` | — | Disables interactions and applies disabled styling. |
| type | `JSX.IntrinsicElements` | — | Button type attribute. |

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

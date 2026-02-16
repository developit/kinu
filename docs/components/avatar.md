# Avatar

Styled `<img>` avatar that falls back to initials from the alt text.

## Usage

```tsx
import {Avatar} from 'pui';

<Avatar alt="JM" src="/user.jpg" />
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Avatar | `p="avatar"` | Renders markup that includes `p="avatar"`. |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | `string` | — | Image source for the avatar. |
| alt | `string` | — | Alt text used by the image and for fallback initials. |
| children | `any` | — | Fallback initials or text rendered via the alt attribute. |
| size | `AvatarSize` | — | Size preset for the avatar. |

## Attributes

Relies on forwarded native attributes; no additional styling attributes are defined.

## Notes

- Uses the alt attribute content as a CSS-rendered fallback when the image fails.
- Override dimensions in CSS if you need sizes other than the 2rem default.

---

_Source: `src/components/avatar/index.tsx`

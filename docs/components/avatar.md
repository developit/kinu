# Avatar

Styled `<img>` avatar that falls back to initials from the alt text.

## Usage

```tsx
import {Avatar} from 'pui';

<Avatar alt="JM" src="/user.jpg" />
```

## Attributes

Relies on forwarded native attributes; no additional styling attributes are defined.

## Notes

- Uses the alt attribute content as a CSS-rendered fallback when the image fails.
- Override dimensions in CSS if you need sizes other than the 2rem default.

---

<source-ref src="src/components/avatar/index.tsx"></source-ref>

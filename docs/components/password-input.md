# Password Input

Native password input with a Show/Hide reveal toggle.

## Usage

```tsx
import {PasswordInput} from 'kinu';

<PasswordInput name="password" placeholder="Enter password" />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| PasswordInput | Component | — |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| defaultRevealed | `boolean` | — | Start with the password revealed (type="text"). |

## Notes

- A native `<input type="password">` in an `InputGroup` with a reveal toggle. Forwards every native input attribute.
- The toggle rides the command bus (`command="--toggle-password"`) like NumberField — it flips the input `type` and a `[revealed]` attribute that drives the label. No new global listeners.
- Pass `defaultRevealed` to start with the password visible.

---

_Source: `src/components/password-input/index.tsx`

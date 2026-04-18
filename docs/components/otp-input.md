# OTP Input

Single `<input>` styled as N segmented one-time-code cells.

## Usage

```tsx
import {OTPInput} from 'kinu';

<OTPInput maxLength={6} />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| OTPInput | One-time code input | `<input k="otp">` |

## Notes

- Defaults to `type="password"`, `inputMode="numeric"`, `autoComplete="one-time-code"`, and `pattern="\\d*"` — iOS SMS autofill, paste, and password managers just work.
- The visual cell count reads directly from the `maxlength` HTML attribute via CSS `attr()`, so just set `maxLength` and the cells follow.
- Set `width` (or wrap in a sized container) to control the overall input size; cells distribute evenly across that width.

---

_Source: `src/components/otp/index.tsx`

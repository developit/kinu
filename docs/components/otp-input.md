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
- Each cell is `--k-otp-cell` wide (defaults to `2.5rem`); total input width is `maxLength × --k-otp-cell`. Override the variable to resize.

---

_Source: `src/components/otp/index.tsx`

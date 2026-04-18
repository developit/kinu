# OTP Input

Single `<input>` styled as N segmented one-time-code cells.

## Usage

```tsx
import {OTPInput} from 'kinu';

<OTPInput maxLength={6} style={{'--k-otp-len': 6}} />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| OTPInput | One-time code input | `<input k="otp">` |

## Notes

- Sets `type="text"`, `inputMode="numeric"`, and `autoComplete="one-time-code"` — iOS SMS autofill, paste, and password managers just work.
- The visual cell count is driven by the `--k-otp-len` CSS variable (defaults to 6). Set it to match your `maxLength`.
- Override `--k-otp-cell` (defaults to `2.5rem`) to resize the individual cells.
- Use a `pattern` attribute (e.g. `pattern="\\d{6}"`) to tie validation into the `:invalid` border style.

---

_Source: `src/components/otp/index.tsx`

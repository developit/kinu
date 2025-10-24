# Toggle

ARIA-pressed aware button for on/off interactions.

## Usage

```tsx
import {Toggle} from 'pui';

<Toggle aria-pressed={value}>Bold</Toggle>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| Toggle | `<button>` | Wraps `<button>` and sets p="toggle". Defaults props to {
  get 'aria-pressed'() {
    return this.pressed;
  },
  onClickCapture(e: MouseEvent) {
    const el = e.currentTarget as HTMLButtonElement;
    el.closest('[p="toggle-group"]')
      ?.querySelector('[aria-pressed]')
      ?.removeAttribute('aria-pressed');
    el.hasAttribute('aria-pressed')
      ? el.removeAttribute('aria-pressed')
      : el.setAttribute('aria-pressed', 'true');
  },
}. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Toggle | aria-pressed | true | Forwarded attribute used by the component styling. |

## Notes

- Wraps `<button>` so keyboard support comes for free.
- Style pressed state using the aria-pressed attribute selectors.

---

_Source: `src/components/toggle/index.tsx`

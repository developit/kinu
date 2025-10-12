# Toast

Lightweight notification system. Render `<ToastContainer />` once near the root of your app, then call `toast.show()` from anywhere.

## Import

```tsx
import {ToastContainer, toast} from 'pui';
```

## Usage

```tsx
<ToastContainer />
<Button onClick={() => toast.show('Saved!', {title: 'Success', duration: 4000})}>
  Show toast
</Button>
```

## Options

`toast.show(content, options?)` accepts:

- `content` — message body (string or JSX).
- `title` — optional heading rendered above the content.
- `icon` — JSX placed in the leading slot.
- `action` — JSX for an inline action button.
- `duration` — override the auto-dismiss timeout (default `3000ms`).

## Accessibility

The container uses `aria-live="polite"` semantics through native focus management. Keep toast copy short and avoid placing focusable elements other than the optional `action` button.

## CSS hooks

- `[p="toast-container"]` — positioning.
- `[p="toast"]` and `[p="toast"][data-mounted|data-closing]` — stack behaviour and transitions (see `src/lib/toast.css`).
- `[p="toast-title"]`, `[p="toast-content"]`, `[p="toast-icon"]`, `[p="toast-action"]` — internal layout slots.

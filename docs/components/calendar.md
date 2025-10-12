# Calendar

Styled `<input type="date">`.

## Import

```tsx
import {Calendar} from 'pui';
```

## Usage

```tsx
<Calendar value={date} onInput={(event) => setDate(event.currentTarget.value)} />
```

## Props

- Built on `<input type="date">`; all native attributes apply. Localised calendar UI comes from the browser.

## Accessibility

Pair with `<Label htmlFor>` and consider exposing the chosen date in a human-readable sentence elsewhere in the UI.

## CSS hooks

- `[p="calendar"]` — minimal border and radius styling.

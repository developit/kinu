# Combobox

Filterable list built on top of the native `<dialog>` + command APIs. Includes keyboard shortcuts for quick selection.

## Import

```tsx
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
} from 'pui';
```

## Usage

```tsx
<Combobox>
  <ComboboxInput placeholder="Search fruits" />
  <ComboboxList>
    <ComboboxOption>Apple</ComboboxOption>
    <ComboboxOption>Banana</ComboboxOption>
    <ComboboxOption>Orange</ComboboxOption>
  </ComboboxList>
</Combobox>
```

## Behaviour

- Typing filters the visible options and selects the first match.
- Arrow keys move between options, ENTER accepts the highlighted item, and ESC closes the list.
- Clicking an option fills the input and dispatches a synthetic `input` event so controlled components update.

## Accessibility

Use `aria-expanded`, `aria-controls`, and `aria-autocomplete="list"` on `ComboboxInput` if you need full ARIA combobox semantics. Announce results count via `aria-live` if necessary.

## CSS hooks

- `[p="combobox"]` — positioning wrapper.
- `[p="combobox-input"]` — styled text field.
- `[p="combobox-list"]` — inherits popover/dropdown panel styles.
- `[p="combobox-option"]` — list options (selected option marked via the `selected` attribute).

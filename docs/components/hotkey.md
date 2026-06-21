# Hotkey

Bind a keyboard shortcut to a command — declaratively, no handlers.

## Usage

```tsx
import {Hotkey} from 'kinu';

<Hotkey keys="mod+k" command="show-modal" commandfor="cmdk" />
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Hotkey | Component | — |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| keys | `string` | — | Key chord to bind, e.g. `"mod+k"`, `"mod+shift+p"`, `"/"`. `mod` is ⌘ on
Apple platforms and Ctrl elsewhere. |

## Notes

- Renders nothing visible. One global keydown listener matches the pressed chord against `[data-hotkey]` and fires the element’s `command` on its `commandfor` target — reusing the command bus, with no per-app key handlers.
- Chord syntax: `mod` (⌘ on Apple, Ctrl elsewhere), `alt`, `shift`, plus a key, joined with `+` — e.g. `mod+k`, `mod+shift+p`, `/`. Bare-key chords are ignored while typing in a field.
- Pairs with `Command` (open a palette on ⌘K) and `Kbd` (display the shortcut). SSR-safe.

---

_Source: `src/components/hotkey/index.tsx`

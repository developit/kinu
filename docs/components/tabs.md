# Tabs

`TabList`, `Tab`, and `TabPanel` ride on a native `<input type="radio">` group
— exclusive selection, keyboard navigation, and form-non-participation are all
the platform's job. No JS state, no event handlers.

## Usage

```tsx
import {Tab, TabList, TabPanel} from 'kinu';

<TabList>
  <Tab defaultChecked>Account</Tab>
  <Tab>Password</Tab>
</TabList>
<TabPanel>Account settings</TabPanel>
<TabPanel>Password settings</TabPanel>
```

`TabPanel`s are **siblings *after* the `TabList`**, not nested inside it. This
keeps the well a hugging pill that can scroll horizontally on its own, while
panels flow at the parent container's full width. Panels are mapped to tabs by
position: the *N*th `Tab` controls the *N*th `TabPanel`.

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| `TabList` | Tab strip (the visual well). Generates a shared radio `name`. | `<div k="tablist">` |
| `Tab` | One tab. Renders a `<label>` wrapping a hidden radio. | `<label k="tab"><input type="radio" name="…" /> …</label>` |
| `TabPanel` | One panel. Visible only when its sibling tab is selected. | `<section k="tab-panel">` |

## Props

`Tab` props forward to the underlying `<input type="radio">`. The useful ones:

| Prop | Type | Description |
| --- | --- | --- |
| `defaultChecked` | `boolean` | Pre-select this tab on mount. |
| `disabled` | `boolean` | Disable this tab. |
| `name` | `string` | Override the auto-generated group name (rare). |
| `value` | `string` | Submitted with the form if `TabList` is in one (also rare — radios default to `form=""` so they don't participate). |

`TabList` and `TabPanel` forward to `<div>` and `<section>` respectively.

## Notes

- **Selection is DOM-owned.** No `useState`, no `onChange` handler required.
  Listen to `change` on the `TabList` if you need to react to the user picking
  a tab.
- **Keyboard nav (←/→/↑/↓, Home/End) is native** to HTML radio groups — no
  library code involved.
- **Up to 12 tabs.** Panel visibility is wired by 12 unrolled CSS rules
  (`[k="tablist"]:has([k="tab"]:nth-of-type(N) :checked) ~ [k="tab-panel"]:nth-of-type(N)`).
  If you need more, raise the cap in `tabs/style.css`.
- **Accessibility caveat.** Screen readers announce this as a radio group, not
  a true ARIA tablist (no `role="tab"` / `role="tablist"` / `role="tabpanel"`).
  For a utility kit at this byte budget the trade favors zero-JS over the
  ARIA-tablist roles — `<input type="radio">` is itself an accessible
  primitive.

---

_Source: `src/components/tabs/index.tsx`_

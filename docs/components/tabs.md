# Tabs

Tabs, Tab, and TabPanel wrappers over `<input type="radio">` with native exclusive selection.

## Usage

```tsx
import {Tab, TabPanel, Tabs} from 'kinu';

<Tabs>
  <Tab checked>Account</Tab>
  <TabPanel>Account settings</TabPanel>
  <Tab>Password</Tab>
  <TabPanel>Password settings</TabPanel>
</Tabs>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| Tabs | Tab strip wrapper | `<div k="tabs">` (with a shared `name` context) |
| Tab | Tab trigger | `<label k="tab"><input type="radio" name=… /> …</label>` |
| TabPanel | Tab content | `<div k="tab-panel">` |
| TabList | Deprecated alias for Tabs | — |

## Props

### TabProps

`<Tab>` props forward to the underlying `<input type="radio">`. Notable:

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| checked | `boolean` | — | Initially selected. Becomes `checked` on the inner radio. |
| disabled | `boolean` | — | Disables this tab. |
| value | `string` | — | Optional; submitted with the form if `<Tabs>` is in one (rare; the radios set `form=""` by default so they don't participate). |

### TabPanelProps

`<TabPanel>` forwards to `<div>`.

## Notes

- All `<Tab>`s inside one `<Tabs>` share an auto-generated `name`, so opening one deselects the others — pure HTML, no JS.
- A panel is shown via `[k="tab"]:has(> input:checked) + [k="tab-panel"]` — the panel must immediately follow its tab in DOM order.
- Listen to `<Tabs onChange={…}>` to react to selection changes; the `change` event bubbles from the radio.

---

_Source: `src/components/tabs/index.tsx`_

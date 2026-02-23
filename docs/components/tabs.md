# Tabs

TabList, Tab, and TabPanel wrappers using aria attributes.

## Usage

```tsx
import {Tab, TabList, TabPanel} from 'pui';

<TabList role="tablist">
  <Tab role="tab" aria-selected="true">Account</Tab>
  <Tab role="tab" aria-selected="false">Password</Tab>
</TabList>
<TabPanel role="tabpanel">Account settings</TabPanel>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| TabList | Tab container | `<div p="tablist">` |
| Tab | Tab trigger | `<button p="tab">` |
| TabPanel | Tab content | `<div p="tab-panel">` |

## Props

### TabProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| aria-selected | `boolean | "true" | "false"` | — | Marks the tab as selected. |
| disabled | `boolean` | — | Disable tab interactions. |

### TabPanelProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| hidden | `boolean` | — | Hide the panel when inactive. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| TabList | aria-selected | true | Forwarded attribute used by the component styling. |
| Tab | aria-selected | true | Forwarded attribute used by the component styling. |
| Tab | disabled | boolean | Forwarded attribute used by the component styling. |

## Notes

- Control selection state by toggling aria-selected.
- TabPanel toggles the hidden attribute so CSS handles transitions.

---

_Source: `src/components/tabs/index.tsx`

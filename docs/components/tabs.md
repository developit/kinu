# Tabs

TabList, Tab, and TabPanel wrappers using aria attributes.

## Usage

```tsx
import {Tab, TabList, TabPanel} from 'pui';

<TabList>
  <Tab aria-selected>Tab</Tab>
</TabList>
<TabPanel>Panel</TabPanel>
```

## Exports

| Name | DOM element | Details |
| --- | --- | --- |
| TabList | `<div>` | Wraps `<div>` and sets p="tablist". |
| Tab | `<button>` | Wraps `<button>` and sets p="tab". |
| TabPanel | `<div>` | Wraps `<div>` and sets p="tab-panel". |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Tab | aria-selected | true | Forwarded attribute used by the component styling. |
| Tab | disabled | boolean | Forwarded attribute used by the component styling. |

## Notes

- Control selection state by toggling aria-selected.
- TabPanel toggles the hidden attribute so CSS handles transitions.

---

_Source: `src/components/tabs/index.tsx`

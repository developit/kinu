const t=`# Tabs

TabList, Tab, and TabPanel wrappers using aria attributes.

## Usage

\`\`\`tsx
import {Tab, TabList, TabPanel} from 'pui';

<TabList>
  <Tab aria-selected>Tab</Tab>
</TabList>
<TabPanel>Panel</TabPanel>
\`\`\`

## Exports

| Name | DOM element | Description |
| --- | --- | --- |
| TabList | \`<div>\` | Container that groups related tabs. |
| Tab | \`<button>\` | Button that selects a tab panel. |
| TabPanel | \`<div>\` | Panel that displays the active tab content. |

## Attributes

| Export | Attribute | Values | Notes |
| --- | --- | --- | --- |
| Tab | aria-selected | true | Forwarded attribute used by the component styling. |
| Tab | disabled | boolean | Forwarded attribute used by the component styling. |

## Notes

- Control selection state by toggling aria-selected.
- TabPanel toggles the hidden attribute so CSS handles transitions.

---

<source-ref src="src/components/tabs/index.tsx"></source-ref>
`;export{t as default};
//# sourceMappingURL=tabs-DrqIgPRr.js.map

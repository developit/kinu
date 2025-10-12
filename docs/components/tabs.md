# Tabs

Composable tab primitives built from `<div>` and `<button>` so you can manage state in your application logic.

## Import

```tsx
import {TabList, Tab, TabPanel} from 'pui';
```

## Usage

```tsx
<TabList role="tablist">
  <Tab role="tab" aria-selected={active === 'first'} onClick={() => setActive('first')}>
    First
  </Tab>
  <Tab role="tab" aria-selected={active === 'second'} onClick={() => setActive('second')}>
    Second
  </Tab>
</TabList>
{active === 'first' && (
  <TabPanel role="tabpanel" id="panel-first" aria-labelledby="tab-first">
    Content
  </TabPanel>
)}
```

## Props

- Every primitive accepts the underlying HTML attributes (`role`, `aria-*`, `disabled`, etc.).
- PUI does not manage the active tab. Track the state yourself (e.g. via `useState`) and apply `aria-selected` and `hidden` as appropriate.

## Accessibility

Follow the [WAI-ARIA Authoring Practices for tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/). Each `Tab` should have `role="tab"` and point to a `TabPanel` through `aria-controls`. The panel should set `role="tabpanel"` and the `aria-labelledby` reference back to the tab.

## CSS hooks

- `[p="tablist"]` — container styling.
- `[p="tab"]` and `[p="tab"][aria-selected="true"]` — idle and active tab styles.
- `[p="tab-panel"]` — spacing for the content region.

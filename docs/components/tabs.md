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

The `Tab` is just a `<label>` wrapping a hidden `<input type="radio">` — your
content (text, icons, anything) goes inside, and clicks on any of it activate
the tab via native label-radio association.

```tsx
<TabList>
  <Tab defaultChecked>
    <iconify-icon icon="lucide:home" /> Home
  </Tab>
  <Tab>
    <iconify-icon icon="lucide:settings" /> Settings
  </Tab>
</TabList>
```

## Driving external UI from tab selection

Because the radios fire native `change` events that bubble, and the `value`
prop on `<Tab>` is forwarded onto the underlying `<input>`, you can read the
active tab off any event and drive arbitrary other UI:

```tsx
const [active, setActive] = useState('overview');

<TabList
  onChange={(e) => setActive(e.target.value)}
>
  <Tab value="overview" defaultChecked>Overview</Tab>
  <Tab value="transactions">Transactions</Tab>
  <Tab value="goals">Goals</Tab>
</TabList>

<SomeOtherComponent activeTab={active} />
```

Arrow-key navigation also fires `change`, so this single handler covers both
mouse and keyboard.

For two-way sync (something outside the `TabList` can also flip the active
tab), swap `defaultChecked` for controlled `checked`:

```tsx
<Tab value="overview" checked={active === 'overview'}>Overview</Tab>
<Tab value="transactions" checked={active === 'transactions'}>Transactions</Tab>
```

## Exports

| Name | Description | Rendered HTML |
| --- | --- | --- |
| `TabList` | Tab strip (the visual well). Generates a shared radio `name`. | `<div k="tablist">` |
| `Tab` | One tab. Renders a `<label>` wrapping a hidden radio. | `<label k="tab"><input type="radio" name="…" /> …</label>` |
| `TabPanel` | One panel. Visible only when its sibling tab is selected. | `<section k="tab-panel">` |
| `Tabs` | Deprecated alias for `TabList`. | — |

## Props

`Tab` props forward to the underlying `<input type="radio">`. The useful ones:

| Prop | Type | Description |
| --- | --- | --- |
| `defaultChecked` | `boolean` | Pre-select this tab on mount (uncontrolled). |
| `checked` | `boolean` | Pre-select this tab and keep it in sync with a parent state (controlled). |
| `value` | `string` | The value the radio reports through `change` events. Use this to identify the active tab in `onChange` handlers. |
| `disabled` | `boolean` | Disable this tab. |
| `name` | `string` | Override the auto-generated group name (rare). |

`TabList` and `TabPanel` forward to `<div>` and `<section>` respectively.

## Notes

- **Selection is DOM-owned.** No `useState`, no `onChange` handler required
  for the basic case. Add `onChange` only when you need to drive external UI.
- **Keyboard nav (←/→/↑/↓) is native** to HTML radio groups — no library
  code. (Native radios don't implement Home/End — that's a Chromium choice,
  not a kinu choice.)
- **Up to 12 tabs.** Panel visibility is wired by 12 unrolled CSS rules
  (`[k="tablist"]:has([k="tab"]:nth-of-type(N) :checked) ~ [k="tab-panel"]:nth-of-type(N)`).
  If you need more, raise the cap in `tabs/style.css`.
- **Accessibility caveat.** Screen readers announce this as a radio group,
  not a true ARIA tablist (no `role="tab"` / `role="tablist"` /
  `role="tabpanel"`). For a utility kit at this byte budget the trade favors
  zero-JS over the ARIA-tablist roles — `<input type="radio">` is itself an
  accessible primitive.

---

_Source: `src/components/tabs/index.tsx`_

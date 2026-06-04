import {createContext, h} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {createSimpleComponent} from '../../lib/create-simple-component';
import type {TabListOwnProps, TabOwnProps, TabPanelOwnProps} from './types';
import './style.css';

// Tabs ride on the platform's exclusive-selection primitive: an `<input
// type="radio">` group with a shared `name`. Selection, keyboard nav (←/→/↑/↓),
// focus management, and form non-participation (form="") are all native.
//
// Panels live as `<section k="tab-panel">` siblings *after* `<TabList>`, not
// inside it — this keeps the well's `width: fit-content` while letting panels
// take their parent's full width. The tab-to-panel link is expressed by N
// unrolled `:has(:nth-of-type(i) :checked) ~ :nth-of-type(i)` rules in CSS
// (currently N=12); zero JS, no DOM-adjacency required.
//
// AT announces as a radio group, not an ARIA tablist. For an unbranded utility
// kit the byte cost of a true tablist isn't worth it.

const NameCtx = createContext('');

const TabListInner = createSimpleComponent<'div', TabListOwnProps>('tablist', 'div');
export const TabList = (p: any) =>
  h(NameCtx.Provider, {value: useId()}, h(TabListInner, p));

export const Tab = createSimpleComponent<'label', TabOwnProps>(
  'tab',
  'label',
  (p: any) => ({
    children: [
      h('input', {
        name: useContext(NameCtx),
        form: '',
        ...p,
        type: 'radio',
        children: null,
      }),
      p.children,
    ],
  }),
);

export const TabPanel = createSimpleComponent<'section', TabPanelOwnProps>(
  'tab-panel',
  'section',
);

/** @deprecated Renamed to `TabList`. */
export const Tabs = TabList;

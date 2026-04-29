import {createSimpleComponent} from '../../lib/create-simple-component';
import type {
  TabsOwnProps,
  TabOwnProps,
  TabLabelOwnProps,
  TabPanelOwnProps,
} from './types';
import './style.css';

export const Tabs = createSimpleComponent<'div', TabsOwnProps>('tabs', 'div');
export const Tab = createSimpleComponent<'details', TabOwnProps>('tab', 'details');
export const TabLabel = createSimpleComponent<'summary', TabLabelOwnProps>(
  'tab-label',
  'summary',
);
export const TabPanel = createSimpleComponent<'div', TabPanelOwnProps>(
  'tab-panel',
  'div',
);

/** @deprecated Renamed to `Tabs`. */
export const TabList = Tabs;

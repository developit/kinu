import {createSimpleComponent} from '../../lib/create-simple-component';
import type {TabListOwnProps, TabOwnProps, TabPanelOwnProps} from './types';
import './style.css';

export const TabList = createSimpleComponent<'div', TabListOwnProps>(
  'tablist',
  'div',
);
export const Tab = createSimpleComponent<'button', TabOwnProps>('tab', 'button');
export const TabPanel = createSimpleComponent<'div', TabPanelOwnProps>(
  'tab-panel',
  'div',
);

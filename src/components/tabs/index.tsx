import {createContext, h} from 'preact';
import {useId, useContext} from 'preact/hooks';
import {createSimpleComponent} from '../../lib/create-simple-component';
import type {TabsOwnProps, TabPanelOwnProps} from './types';
import './style.css';

const TabContext = createContext('');

const TabStrip = createSimpleComponent<'div', TabsOwnProps>('tabs', 'div');
export const Tabs = (p: any) =>
  h(TabContext.Provider, {value: useId()}, h(TabStrip, p));

export const Tab = ({children, ...p}: any) =>
  h('label', {k: 'tab'},
    h('input', {name: useContext(TabContext), form: '', ...p, type: 'radio'}),
    children,
  );

export const TabPanel = createSimpleComponent<'div', TabPanelOwnProps>(
  'tab-panel',
  'div',
);

/** @deprecated Renamed to `Tabs`. */
export const TabList = Tabs;

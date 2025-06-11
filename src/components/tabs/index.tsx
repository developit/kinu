import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

export const TabList = createSimpleComponent('tablist', 'div');
export const Tab = createSimpleComponent('tab', 'button');
export const TabPanel = createSimpleComponent('tab-panel', 'div');

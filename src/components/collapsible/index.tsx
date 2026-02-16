import {createSimpleComponent} from '../../lib/create-simple-component';
import type {CollapsibleOwnProps} from './types';
import './style.css';

export const Collapsible = createSimpleComponent<'details', CollapsibleOwnProps>(
  'collapsible',
  'details',
  {},
  (el: HTMLDetailsElement) => {
    el.insertBefore(document.createElement('summary'), el.firstChild);
  },
);

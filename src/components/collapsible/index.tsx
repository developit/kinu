import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

export const Collapsible = createSimpleComponent(
  'collapsible',
  'details',
  {},
  (el: HTMLDetailsElement) => {
    el.insertBefore(document.createElement('summary'), el.firstChild);
  },
);

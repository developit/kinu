import {createSimpleComponent} from '../../lib/create-simple-component';
import type {AccordionOwnProps} from './types';
import './style.css';

export const Accordion = createSimpleComponent<'details', AccordionOwnProps>(
  'accordion',
  'details',
);

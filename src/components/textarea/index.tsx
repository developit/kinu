import {createSimpleComponent} from '../../lib/create-simple-component';
import type {TextareaOwnProps} from './types';
import './style.css';

export const Textarea = createSimpleComponent<'textarea', TextareaOwnProps>(
  'textarea',
  'textarea',
);

import {createSimpleComponent} from '../../lib/create-simple-component';
import {Label} from '../label';
import type {
  FieldOwnProps,
  FieldDescriptionOwnProps,
  FieldErrorOwnProps,
} from './types';
import './style.css';

const FieldRoot = createSimpleComponent<'div', FieldOwnProps>('field', 'div');

const FieldDescription = createSimpleComponent<'div', FieldDescriptionOwnProps>(
  'field-description',
  'div',
);

const FieldError = createSimpleComponent<'div', FieldErrorOwnProps>(
  'field-error',
  'div',
  {role: 'alert'},
);

export const Field = Object.assign(FieldRoot, {
  Label,
  Description: FieldDescription,
  Error: FieldError,
});

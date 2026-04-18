import {createSimpleComponent} from '../../lib/create-simple-component';
import type {OTPInputOwnProps} from './types';
import './style.css';

export const OTPInput = createSimpleComponent<'input', OTPInputOwnProps>(
  'otp',
  'input',
  {
    type: 'text',
    inputMode: 'numeric',
    autoComplete: 'one-time-code',
  },
);

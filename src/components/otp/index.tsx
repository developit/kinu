import {createSimpleComponent} from '../../lib/create-simple-component';
import type {OTPInputOwnProps} from './types';
import './style.css';

export const OTPInput = createSimpleComponent<'input', OTPInputOwnProps>(
  'otp',
  'input',
  {
    type: 'password',
    inputMode: 'numeric',
    autoComplete: 'one-time-code',
    pattern: '\\d*',
  },
);

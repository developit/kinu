import {createSimpleComponent} from '../../lib/create-simple-component';
import type {InputOwnProps} from './types';
import './style.css';

const AUTOCOMPLETE: Record<string, string> = {
  email: 'email',
  tel: 'tel',
  password: 'current-password',
};

const InputBase = createSimpleComponent<'input', InputOwnProps>(
  'input',
  'input',
);

export const Input: typeof InputBase = (props) => (
  <InputBase
    {...props}
    autoComplete={props.autoComplete ?? AUTOCOMPLETE[props.type as string]}
  />
);

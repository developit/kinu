import type {JSX} from 'preact';
import {createSimpleComponent} from '../../lib/create-simple-component';
import type {InputOwnProps} from './types';
import './style.css';

export const Input = createSimpleComponent<'input', InputOwnProps>(
  'input',
  'input',
  {
    get autoComplete() {
      const t = (this as {type?: string}).type;
      return t === 'email' || t === 'tel'
        ? t
        : t === 'password'
          ? 'current-password'
          : undefined;
    },
  } as Partial<JSX.IntrinsicElements['input']>,
);

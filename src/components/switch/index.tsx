import { createSimpleComponent } from '../../lib/create-simple-component';
import type { JSX } from 'preact';
import './style.css';

export const Switch = createSimpleComponent(
  'switch',
  'input',
  {
    role: 'switch',
    type: 'checkbox',
  } as Partial<JSX.HTMLAttributes<HTMLInputElement>>,
);

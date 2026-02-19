import {createSimpleComponent} from '../../lib/create-simple-component';
import type {AlertOwnProps} from './types';
import './style.css';

export const Alert = createSimpleComponent<'div', AlertOwnProps>('alert', 'div');

import {createSimpleComponent} from '../../lib/create-simple-component';
import type {KbdOwnProps} from './types';
import './style.css';

export const Kbd = createSimpleComponent<'kbd', KbdOwnProps>('kbd', 'kbd');

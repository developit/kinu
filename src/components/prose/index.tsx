import {createSimpleComponent} from '../../lib/create-simple-component';
import type {ProseOwnProps} from './types';
import './style.css';

export const Prose = createSimpleComponent<'div', ProseOwnProps>('prose', 'div');

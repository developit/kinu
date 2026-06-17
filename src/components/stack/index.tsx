import {createSimpleComponent} from '../../lib/create-simple-component';
import type {StackOwnProps} from './types';
import './style.css';

export const Stack = createSimpleComponent<'div', StackOwnProps>('stack', 'div');

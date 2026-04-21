import {createSimpleComponent} from '../../lib/create-simple-component';
import type {EmptyOwnProps} from './types';
import './style.css';

export const Empty = createSimpleComponent<'div', EmptyOwnProps>('empty', 'div');

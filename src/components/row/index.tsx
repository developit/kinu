import {createSimpleComponent} from '../../lib/create-simple-component';
import type {RowOwnProps} from './types';
import './style.css';

export const Row = createSimpleComponent<'div', RowOwnProps>('row', 'div');

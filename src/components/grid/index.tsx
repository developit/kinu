import {createSimpleComponent} from '../../lib/create-simple-component';
import type {GridOwnProps} from './types';
import './style.css';

export const Grid = createSimpleComponent<'div', GridOwnProps>('grid', 'div');

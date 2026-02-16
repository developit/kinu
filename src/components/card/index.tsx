import {createSimpleComponent} from '../../lib/create-simple-component';
import type {CardOwnProps} from './types';
import './style.css';

export const Card = createSimpleComponent<'div', CardOwnProps>('card', 'div');

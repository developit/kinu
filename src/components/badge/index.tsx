import {createSimpleComponent} from '../../lib/create-simple-component';
import type {BadgeOwnProps} from './types';
import './style.css';

export const Badge = createSimpleComponent<'span', BadgeOwnProps>('badge', 'span');

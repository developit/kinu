import {createSimpleComponent} from '../../lib/create-simple-component';
import type {
  HoverCardOwnProps,
  HoverCardTriggerOwnProps,
  HoverCardContentOwnProps,
} from './types';
import './style.css';

export const HoverCard = createSimpleComponent<'div', HoverCardOwnProps>(
  'hover-card',
  'div',
);
export const HoverCardTrigger = createSimpleComponent<
  'span',
  HoverCardTriggerOwnProps
>('hover-card-trigger', 'span');
export const HoverCardContent = createSimpleComponent<
  'div',
  HoverCardContentOwnProps
>('hover-card-content', 'div');

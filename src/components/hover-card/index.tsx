import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

export const HoverCard = createSimpleComponent('hover-card', 'div');
export const HoverCardTrigger = createSimpleComponent('hover-card-trigger', 'span');
export const HoverCardContent = createSimpleComponent('hover-card-content', 'div');

import {createSimpleComponent} from '../../lib/create-simple-component';
import type {
  HoverCardOwnProps,
  HoverCardTriggerOwnProps,
  HoverCardContentOwnProps,
} from './types';
import './style.css';

let hoverCardId = 0;

/* Where Interest Invokers exist, wire the trigger's link/button to the content
 * via `interestfor` + popover="hint": keyboard focus and touch long-press gain
 * access (the CSS :hover path alone has neither), and the card renders in the
 * top layer instead of clipping under ancestor overflow. Elsewhere the
 * attributes are never set and the CSS :hover behavior stands unchanged. Both
 * elements unmount with the card, so there is nothing to undo. */
export const HoverCard = createSimpleComponent<'div', HoverCardOwnProps>(
  'hover-card',
  'div',
  {},
  (el: HTMLElement) => {
    if (!('interestForElement' in HTMLButtonElement.prototype)) return;
    const invoker = el.querySelector('[k="hover-card-trigger"] :is(a[href],button)');
    const content = el.querySelector('[k="hover-card-content"]');
    if (!invoker || !content) return;
    content.id ||= `k-hover-card-${++hoverCardId}`;
    content.setAttribute('popover', 'hint');
    invoker.setAttribute('interestfor', content.id);
  },
);
export const HoverCardTrigger = createSimpleComponent<
  'span',
  HoverCardTriggerOwnProps
>('hover-card-trigger', 'span');
export const HoverCardContent = createSimpleComponent<
  'div',
  HoverCardContentOwnProps
>('hover-card-content', 'div');

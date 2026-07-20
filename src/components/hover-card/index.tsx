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
 * attributes are never set and the CSS :hover behavior stands unchanged. */
export const HoverCard = createSimpleComponent<'div', HoverCardOwnProps>(
  'hover-card',
  'div',
  {},
  (el: HTMLElement) => {
    if (!('interestForElement' in HTMLButtonElement.prototype)) return;
    const trigger = el.querySelector<HTMLElement>('[k="hover-card-trigger"]');
    const content = el.querySelector<HTMLElement>('[k="hover-card-content"]');
    const invoker = trigger?.matches('a[href], button')
      ? trigger
      : trigger?.querySelector<HTMLElement>('a[href], button');
    if (!invoker || !content) return;
    if (!content.id) content.id = `k-hover-card-${++hoverCardId}`;
    content.setAttribute('popover', 'hint');
    invoker.setAttribute('interestfor', content.id);
    return () => {
      content.removeAttribute('popover');
      invoker.removeAttribute('interestfor');
    };
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

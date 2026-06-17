import {createSimpleComponent} from '../../lib/create-simple-component';
import type {ThreadOwnProps, ThreadProps} from './types';
import './style.css';

const ThreadRoot = createSimpleComponent<'div', ThreadOwnProps>('thread', 'div');

export function Thread({children, ...props}: ThreadProps) {
  return (
    <ThreadRoot {...props}>
      {children}
      {/* Bottom anchor: the browser keeps this in view as content grows, so the
          thread sticks to the latest message without a scrollTo loop. */}
      <div k="thread-anchor" aria-hidden="true" />
    </ThreadRoot>
  );
}

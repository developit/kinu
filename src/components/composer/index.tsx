import {createSimpleComponent} from '../../lib/create-simple-component';
import type {
  ComposerOwnProps,
  ComposerSendOwnProps,
  ComposerActionsOwnProps,
} from './types';
import './style.css';

// Enter submits, Shift+Enter inserts a newline. A single delegated keydown on
// the form drives it via requestSubmit() — no per-textarea wiring, IME-safe.
const ComposerRoot = createSimpleComponent<'form', ComposerOwnProps>(
  'composer',
  'form',
  {},
  (el: HTMLFormElement) => {
    const onKeydown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        e.key === 'Enter' &&
        !e.shiftKey &&
        !e.isComposing &&
        target?.tagName === 'TEXTAREA'
      ) {
        e.preventDefault();
        el.requestSubmit();
      }
    };
    el.addEventListener('keydown', onKeydown);
    return () => el.removeEventListener('keydown', onKeydown);
  },
);

const ComposerSend = createSimpleComponent<'button', ComposerSendOwnProps>(
  'composer-send',
  'button',
  {type: 'submit'},
);

const ComposerActions = createSimpleComponent<'div', ComposerActionsOwnProps>(
  'composer-actions',
  'div',
);

export const Composer = Object.assign(ComposerRoot, {
  Send: ComposerSend,
  Actions: ComposerActions,
});

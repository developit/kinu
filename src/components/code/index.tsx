import {createSimpleComponent} from '../../lib/create-simple-component';
import type {CodeOwnProps, CodeCopyOwnProps} from './types';
import './style.css';

// Pure-CSS chrome over <pre>/<code>. No highlighter in core — the seam is the
// `[language]` attribute (a plugin can target it) and/or pre-highlighted markup
// passed as children.
const CodeBase = createSimpleComponent<'pre' | 'code', CodeOwnProps>(
  'code',
  (props) => (props.inline ? 'code' : 'pre'),
);

// A corner copy button that copies the enclosing code block. Its label renders
// via CSS ::after, so it contributes no text to the block's textContent.
const CodeCopy = createSimpleComponent<'button', CodeCopyOwnProps>(
  'code-copy',
  'button',
  {type: 'button'},
  (el: HTMLButtonElement) => {
    const onClick = async () => {
      const code = el.closest('[k="code"]');
      const text = (code?.textContent ?? '').trim();
      try {
        await navigator.clipboard.writeText(text);
        el.toggleAttribute('copied', true);
        setTimeout(() => el.toggleAttribute('copied', false), 1200);
      } catch {
        // Clipboard blocked or unavailable.
      }
    };
    el.addEventListener('click', onClick);
    return () => el.removeEventListener('click', onClick);
  },
);

export const Code = Object.assign(CodeBase, {Copy: CodeCopy});

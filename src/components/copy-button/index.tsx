import {createSimpleComponent} from '../../lib/create-simple-component';
import type {CopyButtonOwnProps, CopyButtonProps} from './types';
import './style.css';

// Factory button whose internal ref wires click → clipboard. `navigator` is
// only touched inside the handler, which runs client-side on a real click, so
// the component stays SSR-safe.
const CopyButtonBase = createSimpleComponent<'button', CopyButtonOwnProps>(
  'copy-button',
  'button',
  {type: 'button'},
  (el: HTMLButtonElement) => {
    const onClick = async () => {
      const target = el.getAttribute('data-for');
      const text =
        el.getAttribute('value') ??
        (target ? document.querySelector(target)?.textContent : null) ??
        '';
      try {
        await navigator.clipboard.writeText(text);
        el.toggleAttribute('copied', true);
        setTimeout(() => el.toggleAttribute('copied', false), 1200);
      } catch {
        // Clipboard blocked or unavailable; leave the idle label in place.
      }
    };
    el.addEventListener('click', onClick);
    return () => el.removeEventListener('click', onClick);
  },
);

export function CopyButton({
  value,
  for: forTarget,
  label,
  copiedLabel,
  ...props
}: CopyButtonProps) {
  return (
    <CopyButtonBase
      value={value ?? undefined}
      data-for={forTarget ?? undefined}
      data-label={label ?? undefined}
      data-copied={copiedLabel ?? undefined}
      {...props}
    />
  );
}

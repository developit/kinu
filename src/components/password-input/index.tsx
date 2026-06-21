import {useId} from 'preact/hooks';
import {installCommands} from '../../lib/commands';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {InputGroup} from '../input-group';
import type {
  PasswordInputProps,
  PasswordFieldOwnProps,
  PasswordToggleOwnProps,
} from './types';
import './style.css';

// The reveal toggle rides the command bus (like NumberField) — a `--toggle-
// password` command flips the input's type and a [revealed] attribute that
// drives the toggle's label. No new global listeners, SSR-safe.
const PasswordField = createSimpleComponent<'input', PasswordFieldOwnProps>(
  'password-input',
  'input',
  {type: 'password'},
  (el: HTMLInputElement) => {
    installCommands();
    // Reflect the initial type into [revealed] so the toggle label is correct.
    if (el.type === 'text') el.setAttribute('revealed', '');
    const onCommand = (e: Event) => {
      if ((e as Event & {command?: string}).command !== '--toggle-password') {
        return;
      }
      const reveal = el.type === 'password';
      el.type = reveal ? 'text' : 'password';
      el.toggleAttribute('revealed', reveal);
    };
    el.addEventListener('command', onCommand);
    return () => el.removeEventListener('command', onCommand);
  },
);

const PasswordToggle = createSimpleComponent<'button', PasswordToggleOwnProps>(
  'password-toggle',
  'button',
  {type: 'button'},
);

export function PasswordInput({
  id: idProp,
  defaultRevealed,
  ...props
}: PasswordInputProps) {
  installCommands();
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <InputGroup>
      <PasswordField
        {...props}
        id={id}
        type={defaultRevealed ? 'text' : 'password'}
      />
      <PasswordToggle
        command="--toggle-password"
        commandfor={id}
        aria-label="Toggle password visibility"
      />
    </InputGroup>
  );
}

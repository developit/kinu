import {useId} from 'preact/hooks';
import {installCommands} from '../../lib/commands';
import {createSimpleComponent} from '../../lib/create-simple-component';
import {Button} from '../button';
import {InputGroup} from '../input-group';
import type {NumberFieldOwnProps, NumberFieldProps} from './types';
import './style.css';

// Dedicated number input whose internal ref translates the bubbled command-bus
// events (`--step-up` / `--step-down`) into native stepping, then fires
// input/change so listeners and form state stay in sync. Rides the existing
// command bus — no new global listeners — exactly like Carousel's
// `--prev`/`--next`.
const NumberFieldInput = createSimpleComponent<'input', NumberFieldOwnProps>(
  'number-field',
  'input',
  {type: 'number'},
  (el: HTMLInputElement) => {
    installCommands();
    const onCommand = (e: Event) => {
      const command = (e as Event & {command?: string}).command;
      if (command === '--step-up') el.stepUp();
      else if (command === '--step-down') el.stepDown();
      else return;
      el.dispatchEvent(new Event('input', {bubbles: true}));
      el.dispatchEvent(new Event('change', {bubbles: true}));
    };
    el.addEventListener('command', onCommand);
    return () => el.removeEventListener('command', onCommand);
  },
);

export function NumberField({id: idProp, ...props}: NumberFieldProps) {
  installCommands();
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <InputGroup>
      <Button
        type="button"
        variant="outline"
        command="--step-down"
        commandfor={id}
        aria-label="Decrease"
      >
        −
      </Button>
      <NumberFieldInput id={id} {...props} />
      <Button
        type="button"
        variant="outline"
        command="--step-up"
        commandfor={id}
        aria-label="Increase"
      >
        +
      </Button>
    </InputGroup>
  );
}

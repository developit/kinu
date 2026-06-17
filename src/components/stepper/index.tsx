import {createSimpleComponent} from '../../lib/create-simple-component';
import type {StepperOwnProps, StepOwnProps, StepProps} from './types';
import './style.css';

const Steps = createSimpleComponent<'ol', StepperOwnProps>('steps', 'ol');

const StepBase = createSimpleComponent<'li', StepOwnProps>('step', 'li');

function Step({state, ...props}: StepProps) {
  return <StepBase data-state={state ?? undefined} {...props} />;
}

export const Stepper = Object.assign(Steps, {Step});

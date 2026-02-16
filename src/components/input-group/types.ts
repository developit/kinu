import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface InputGroupOwnProps extends BaseProps {}

export type InputGroupProps = InputGroupOwnProps &
  Omit<JSX.IntrinsicElements['fieldset'], keyof InputGroupOwnProps>;

import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface NumberFieldOwnProps extends BaseProps {}

/**
 * NumberField forwards every native `<input>` attribute (`min`, `max`, `step`,
 * `value`, `defaultValue`, `disabled`, `name`, …) to the underlying control.
 */
export type NumberFieldProps = NumberFieldOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof NumberFieldOwnProps | 'k' | 'ref'>;

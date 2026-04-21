import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface OTPInputOwnProps extends BaseProps {}

export type OTPInputProps = OTPInputOwnProps &
  Omit<JSX.IntrinsicElements['input'], keyof OTPInputOwnProps>;

import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface KbdOwnProps extends BaseProps {}

export type KbdProps = KbdOwnProps &
  Omit<JSX.IntrinsicElements['kbd'], keyof KbdOwnProps>;

import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface ProseOwnProps extends BaseProps {}

export type ProseProps = ProseOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof ProseOwnProps>;

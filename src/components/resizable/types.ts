import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface ResizableOwnProps extends BaseProps {}

export type ResizableProps = ResizableOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof ResizableOwnProps>;

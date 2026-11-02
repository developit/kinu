import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface CommandOwnProps extends BaseProps {}

// `id` comes from the parent <Dialog> context, not Command directly.
export type CommandProps = CommandOwnProps &
  Omit<JSX.IntrinsicElements['dialog'], keyof CommandOwnProps | 'k' | 'ref' | 'id'>;

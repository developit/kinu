import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface CenterOwnProps extends BaseProps {
  /**
   * Shrink to content and center inline, instead of filling the parent box.
   */
  inline?: boolean | null;
}

export type CenterProps = CenterOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof CenterOwnProps>;

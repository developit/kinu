import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface ThreadOwnProps extends BaseProps {
  /**
   * Make the thread a scroll container that sticks to the bottom as new
   * messages arrive (via native scroll anchoring — no scroll loop).
   */
  scrollable?: boolean | null;
}

export type ThreadProps = ThreadOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof ThreadOwnProps | 'k' | 'ref'>;

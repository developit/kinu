import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface ListOwnProps extends BaseProps {
  /**
   * Visual variant for the list.
   * - `nav`: Uses accent colors for hover/focus/selected (sidebar-style).
   */
  variant?: 'nav';

  /**
   * Render rows on demand via CSS content-visibility — keeps very long lists
   * fast without a virtualization library, while rows stay in the DOM for
   * find-in-page and assistive tech.
   */
  virtual?: boolean;
}

export type ListProps = ListOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof ListOwnProps>;

// Backward compat re-exports from unified Item types
export type {ListItemOwnProps, ListItemProps} from '../item/types';

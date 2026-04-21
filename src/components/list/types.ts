import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface ListOwnProps extends BaseProps {
  /**
   * Visual variant for the list.
   * - `nav`: Uses accent colors for hover/focus/selected (sidebar-style).
   */
  variant?: 'nav';
}

export type ListProps = ListOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof ListOwnProps>;

// Backward compat re-exports from unified Item types
export type {ListItemOwnProps, ListItemProps} from '../item/types';

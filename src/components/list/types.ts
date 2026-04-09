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

export interface ListItemOwnProps extends BaseProps {
  /**
   * When provided, renders the item as an anchor element.
   */
  href?: string;

  /**
   * Marks the item as selected for styling.
   */
  selected?: boolean;

  /**
   * Optional shortcut hint rendered on the trailing edge.
   */
  shortcut?: string;

  /**
   * Applies destructive styling to the item.
   */
  destructive?: boolean;
}

export type ListItemProps = ListItemOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof ListItemOwnProps> &
  Omit<JSX.IntrinsicElements['a'], keyof ListItemOwnProps>;

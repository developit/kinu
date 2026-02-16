import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface TreeRootOwnProps extends BaseProps {}

export interface TreeGroupOwnProps extends BaseProps {
  /**
   * Controls the open state of the tree group.
   */
  open?: boolean;
}

export interface TreeGroupLabelOwnProps extends BaseProps {}

export interface TreeGroupItemsOwnProps extends BaseProps {}

export interface TreeItemOwnProps extends BaseProps {
  /**
   * Disable tree item interactions.
   */
  disabled?: boolean;
}

export type TreeRootProps = TreeRootOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof TreeRootOwnProps>;

export type TreeGroupProps = TreeGroupOwnProps &
  Omit<JSX.IntrinsicElements['details'], keyof TreeGroupOwnProps>;

export type TreeGroupLabelProps = TreeGroupLabelOwnProps &
  Omit<JSX.IntrinsicElements['summary'], keyof TreeGroupLabelOwnProps>;

export type TreeGroupItemsProps = TreeGroupItemsOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof TreeGroupItemsOwnProps>;

export type TreeItemProps = TreeItemOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof TreeItemOwnProps>;

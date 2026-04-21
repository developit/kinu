import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface PaginationOwnProps extends BaseProps {
}

export interface PaginationListOwnProps extends BaseProps {
}

export interface PaginationItemOwnProps extends BaseProps {
}

export interface PaginationLinkOwnProps extends BaseProps {

  /**
   * Marks the current page for styling.
   */
  'aria-current'?: 'page' | 'true' | 'false' | boolean;
}

export type PaginationProps = PaginationOwnProps &
  Omit<JSX.IntrinsicElements['nav'], keyof PaginationOwnProps>;

export type PaginationListProps = PaginationListOwnProps &
  Omit<JSX.IntrinsicElements['ul'], keyof PaginationListOwnProps>;

export type PaginationItemProps = PaginationItemOwnProps &
  Omit<JSX.IntrinsicElements['li'], keyof PaginationItemOwnProps>;

export type PaginationLinkProps = PaginationLinkOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof PaginationLinkOwnProps>;

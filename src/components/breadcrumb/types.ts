import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface BreadcrumbOwnProps extends BaseProps {
}

export interface BreadcrumbListOwnProps extends BaseProps {
}

export interface BreadcrumbItemOwnProps extends BaseProps {
}

export interface BreadcrumbLinkOwnProps extends BaseProps {
}

export type BreadcrumbProps = BreadcrumbOwnProps &
  Omit<JSX.IntrinsicElements['nav'], keyof BreadcrumbOwnProps>;

export type BreadcrumbListProps = BreadcrumbListOwnProps &
  Omit<JSX.IntrinsicElements['ol'], keyof BreadcrumbListOwnProps>;

export type BreadcrumbItemProps = BreadcrumbItemOwnProps &
  Omit<JSX.IntrinsicElements['li'], keyof BreadcrumbItemOwnProps>;

export type BreadcrumbLinkProps = BreadcrumbLinkOwnProps &
  Omit<JSX.IntrinsicElements['a'], keyof BreadcrumbLinkOwnProps>;

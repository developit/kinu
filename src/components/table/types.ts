import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface TableOwnProps extends BaseProps {
}

export type TableProps = TableOwnProps &
  Omit<JSX.IntrinsicElements['table'], keyof TableOwnProps>;

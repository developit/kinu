import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface TimelineOwnProps extends BaseProps {}

export type TimelineProps = TimelineOwnProps &
  Omit<JSX.IntrinsicElements['ol'], keyof TimelineOwnProps>;

export interface TimelineEntryOwnProps extends BaseProps {}

export type TimelineEntryProps = TimelineEntryOwnProps &
  Omit<JSX.IntrinsicElements['li'], keyof TimelineEntryOwnProps>;

import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface HoverCardOwnProps extends BaseProps {}

export interface HoverCardTriggerOwnProps extends BaseProps {}

export interface HoverCardContentOwnProps extends BaseProps {}

export type HoverCardProps = HoverCardOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof HoverCardOwnProps>;

export type HoverCardTriggerProps = HoverCardTriggerOwnProps &
  Omit<JSX.IntrinsicElements['span'], keyof HoverCardTriggerOwnProps>;

export type HoverCardContentProps = HoverCardContentOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof HoverCardContentOwnProps>;

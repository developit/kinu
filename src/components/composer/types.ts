import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface ComposerOwnProps extends BaseProps {}
export type ComposerProps = ComposerOwnProps &
  Omit<JSX.IntrinsicElements['form'], keyof ComposerOwnProps>;

export interface ComposerSendOwnProps extends BaseProps {}
export type ComposerSendProps = ComposerSendOwnProps &
  Omit<JSX.IntrinsicElements['button'], keyof ComposerSendOwnProps>;

export interface ComposerActionsOwnProps extends BaseProps {}
export type ComposerActionsProps = ComposerActionsOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof ComposerActionsOwnProps>;

import type {JSX} from 'preact';
import type {BaseProps} from '../../types/component-props';

export interface FieldOwnProps extends BaseProps {}

export type FieldProps = FieldOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof FieldOwnProps>;

export interface FieldDescriptionOwnProps extends BaseProps {}

export type FieldDescriptionProps = FieldDescriptionOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof FieldDescriptionOwnProps>;

export interface FieldErrorOwnProps extends BaseProps {}

export type FieldErrorProps = FieldErrorOwnProps &
  Omit<JSX.IntrinsicElements['div'], keyof FieldErrorOwnProps>;

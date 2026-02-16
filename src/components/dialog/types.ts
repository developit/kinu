import type {JSX} from 'preact';
import type {BaseProps, RequiredChildrenProps} from '../../types/component-props';

export interface DialogOwnProps extends RequiredChildrenProps {
  /**
   * Optional ID for the dialog. If not provided, one will be auto-generated.
   */
  id?: string;

}

export type DialogProps = DialogOwnProps;

export interface DialogTriggerOwnProps extends BaseProps {
}

export interface DialogContentOwnProps {
  /**
   * Override the auto-generated dialog ID.
   */
  id?: string;
}

export interface DialogCloseOwnProps extends BaseProps {
}

export type DialogTriggerProps = DialogTriggerOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>;

export type DialogContentProps = DialogContentOwnProps &
  Omit<JSX.IntrinsicElements['dialog'], keyof DialogContentOwnProps>;

export type DialogCloseProps = DialogCloseOwnProps &
  JSX.ElementChildrenAttribute & JSX.HTMLAttributes<HTMLElement>;
